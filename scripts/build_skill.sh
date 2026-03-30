#!/usr/bin/env bash
set -euo pipefail

# ── build_skill.sh ───────────────────────────────────────────────────────────
# Assembles the generating-xlsforms skill from content templates + live data.
#
# Content:  scripts/skill-content/SKILL.md                → skill root
# Fetches:  umfragen.civic-data.de/llm.txt                → references/survey-methodology.md
#           umfragen.civic-data.de/llm-xlsform.txt         → references/xlsform-spec.md
#           qwacback.correlaid.org API demographics        → references/demographic-templates.md
#
# Usage:
#   ./scripts/build_skill.sh                          # default output
#   ./scripts/build_skill.sh ./custom-dir             # custom output dir
#   EXTRA_QUERIES="Ehrenamt Vertrauen" ./scripts/build_skill.sh
# ─────────────────────────────────────────────────────────────────────────────

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
CONTENT_DIR="$SCRIPT_DIR/skill-content"

OUT="${1:-$PROJECT_ROOT/skills/xlsform}"
REFS="$OUT/references"

LLM_METHODOLOGY_URL="https://umfragen.civic-data.de/llm-phases12-xlsform.txt"
QWAC_API="https://qwacback.correlaid.org/api"

# Demographic sources (specific question + study)
DEMOGRAPHIC_QUESTION_ID="z4bm7lrn7mopedd"
DEMOGRAPHIC_STUDY_ID="2z4e5jfgc6s6mwy"

# ── helpers ──────────────────────────────────────────────────────────────────

log()  { echo "  $1"; }
ok()   { echo "     ✓ $1"; }
fail() { echo "     ✗ $1"; }
warn() { echo "     ⚠ $1"; }

fetch_to_file() {
  local url="$1" dest="$2" label="$3"
  log "⬇  $label"
  local http_code
  http_code=$(curl -sS -w "%{http_code}" -o "$dest" \
    -H "User-Agent: xlsform-skill-builder/1.0" \
    --max-time 30 "$url" 2>/dev/null) || true
  if [[ "$http_code" == "200" && -s "$dest" ]]; then
    ok "$(wc -c < "$dest" | awk '{printf "%.1f KB", $1/1024}')"
    return 0
  else
    fail "HTTP $http_code — $url"
    rm -f "$dest"
    return 1
  fi
}

fetch_json() {
  local url="$1" label="$2"
  log "⬇  $label" >&2
  local body http_code tmpfile
  tmpfile=$(mktemp)
  http_code=$(curl -sS -w "%{http_code}" -o "$tmpfile" \
    -H "Accept: application/json" \
    -H "User-Agent: xlsform-skill-builder/1.0" \
    --max-time 20 "$url" 2>/dev/null) || true
  if [[ "$http_code" == "200" && -s "$tmpfile" ]]; then
    body=$(cat "$tmpfile")
    ok "$(echo "$body" | wc -c | awk '{printf "%.1f KB", $1/1024}')" >&2
    rm -f "$tmpfile"
    echo "$body"
  else
    fail "HTTP $http_code" >&2
    rm -f "$tmpfile"
    echo ""
  fi
}

# URL-encode a string
urlencode() {
  python3 -c "import urllib.parse, sys; print(urllib.parse.quote(sys.argv[1]))" "$1" 2>/dev/null \
    || echo "${1// /+}"
}

# ── clean & create dirs ─────────────────────────────────────────────────────

echo ""
echo "🔧 Building xlsform skill → $OUT"
echo ""

[[ -d "$OUT" ]] && rm -rf "$OUT"
mkdir -p "$REFS"

# ── 1. Copy SKILL.md ────────────────────────────────────────────────────────

echo "📝 SKILL.md"
if [[ -f "$CONTENT_DIR/SKILL.md" ]]; then
  cp "$CONTENT_DIR/SKILL.md" "$OUT/SKILL.md"
  ok "copied from $CONTENT_DIR/SKILL.md"
else
  fail "SKILL.md template not found at $CONTENT_DIR/SKILL.md"
  exit 1
fi

if [[ -f "$CONTENT_DIR/generate-instructions.md" ]]; then
  cp "$CONTENT_DIR/generate-instructions.md" "$OUT/generate-instructions.md"
  ok "generate-instructions.md copied"
else
  warn "generate-instructions.md not found at $CONTENT_DIR/generate-instructions.md"
fi

# ── 2. Fetch methodology references ─────────────────────────────────────────

echo ""
echo "📚 Fetching methodology references"

# 2a. Survey methodology + XLSForm spec (phases 1–2 with XLSForm examples)
if ! fetch_to_file "$LLM_METHODOLOGY_URL" "$REFS/survey-methodology.md" "llm-phases12-xlsform.txt"; then
  cat > "$REFS/survey-methodology.md" << 'FALLBACK'
# Survey Methodology (fetch failed at build time)

Reference data unavailable. Apply general survey methodology principles:
- Start with easy questions; move sensitive topics to later
- Use validated instruments when available (search qwac first)
- Collect numeric values as numbers, not category intervals
- Include DSGVO consent statement when collecting personal data
- Keep surveys as short as possible; every question must serve a research question
- Pre-test before deployment
FALLBACK
  warn "fallback written"
fi

# ── 3. Fetch demographic templates from qwac ────────────────────────────────

echo ""
echo "🔍 Fetching demographics from qwac"

DEMO_FILE="$REFS/demographic-templates.md"
cp "$CONTENT_DIR/demographic-header.md" "$DEMO_FILE"

FOUND_RESULTS=false

# 3a. Fetch single demographic question
q_result=$(fetch_json "$QWAC_API/questions/$DEMOGRAPHIC_QUESTION_ID" "Question: $DEMOGRAPHIC_QUESTION_ID")
if [[ -n "$q_result" && "$q_result" != "null" ]]; then
  printf '\n## Question: %s\n\n```json\n%s\n```\n' "$DEMOGRAPHIC_QUESTION_ID" "$q_result" >> "$DEMO_FILE"
  q_xlsform=$(fetch_json "$QWAC_API/questions/$DEMOGRAPHIC_QUESTION_ID/xlsform" "  → XLSForm: $DEMOGRAPHIC_QUESTION_ID")
  if [[ -n "$q_xlsform" && "$q_xlsform" != "null" ]]; then
    printf '\n### XLSForm\n\n```json\n%s\n```\n' "$q_xlsform" >> "$DEMO_FILE"
  fi
  FOUND_RESULTS=true
fi
sleep 0.3

# 3b. Fetch all questions from demographic study + XLSForm export
meta=$(fetch_json "$QWAC_API/studies/$DEMOGRAPHIC_STUDY_ID" "Study: $DEMOGRAPHIC_STUDY_ID")
if [[ -n "$meta" && "$meta" != "null" ]]; then
  title=$(echo "$meta" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('title',''))" 2>/dev/null || echo "$DEMOGRAPHIC_STUDY_ID")
  printf '\n## Study: %s (id: %s)\n\n```json\n%s\n```\n' "$title" "$DEMOGRAPHIC_STUDY_ID" "$(echo "$meta" | head -c 3000)" >> "$DEMO_FILE"
  FOUND_RESULTS=true
fi

study_qs=$(fetch_json "$QWAC_API/studies/$DEMOGRAPHIC_STUDY_ID/questions?perPage=100" "  → Questions")
if [[ -n "$study_qs" && "$study_qs" != "null" ]]; then
  printf '\n### Questions\n\n```json\n%s\n```\n' "$(echo "$study_qs" | head -c 15000)" >> "$DEMO_FILE"
fi

xlsform=$(fetch_json "$QWAC_API/studies/$DEMOGRAPHIC_STUDY_ID/xlsform" "  → XLSForm export")
if [[ -n "$xlsform" && "$xlsform" != "null" ]]; then
  printf '\n### XLSForm Export\n\n```json\n%s\n```\n' "$(echo "$xlsform" | head -c 10000)" >> "$DEMO_FILE"
fi

if [[ "$FOUND_RESULTS" == "false" ]]; then
  cat "$CONTENT_DIR/demographic-fallback.md" >> "$DEMO_FILE"
fi

# ── 4. Embed references into generate-instructions.md ───────────────────────

echo ""
echo "📎 Embedding references into generate-instructions.md"

GEN_INSTR="$OUT/generate-instructions.md"
if [[ -f "$REFS/survey-methodology.md" ]]; then
  printf '\n\n---\n\n## Survey Methodology\n\n' >> "$GEN_INSTR"
  cat "$REFS/survey-methodology.md" >> "$GEN_INSTR"
  ok "survey-methodology.md appended"
fi

# ── 5. Package as zip ──────────────────────────────────────────────────────

echo ""
echo "📦 Packaging"

SKILLS_DIR="$(dirname "$OUT")"
SKILL_NAME="$(basename "$OUT")"
ZIP_PATH="$SKILLS_DIR/${SKILL_NAME}.zip"

rm -f "$ZIP_PATH"
(cd "$SKILLS_DIR" && zip -rq "$ZIP_PATH" "$SKILL_NAME")
ok "$ZIP_PATH"

# ── 6. Stage outputs ────────────────────────────────────────────────────────

git -C "$PROJECT_ROOT" add "$OUT" "$ZIP_PATH" 2>/dev/null || true

# ── Summary ─────────────────────────────────────────────────────────────────

echo ""
TOTAL_SIZE=$(find "$OUT" -type f -exec cat {} + | wc -c | awk '{printf "%.0f", $1/1024}')
FILE_COUNT=$(find "$OUT" -type f | wc -l)
echo "✅ $FILE_COUNT files, ${TOTAL_SIZE} KB → $ZIP_PATH"
echo ""
