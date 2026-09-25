import type { Question } from '$lib/agents/types';

/** Index in `questions` of the first demographic question, or -1 when there
 *  are none. `questions` is the body list (welcome/end notes already stripped).
 *
 *  A question is a demographic iff its `id` is one of the qwac ids the wizard
 *  appended (#47): we can't trust the `name` because a model-generated question
 *  about, say, age is naturally called `age` too, and might miss a `rationale`,
 *  so the old name-based check pulled generated questions into the
 *  "automatically added" divider. Demographics also have no `rationale`, so
 *  requiring its absence is a cheap belt-and-braces check against a model
 *  that ever copies a qwac id verbatim. */
export function detectDemographicsStart(
	questions: Question[],
	demographicIds: ReadonlySet<string>
): number {
	for (let i = 0; i < questions.length; i++) {
		const q = questions[i];
		if (demographicIds.has(q.id) && !q.rationale) return i;
	}
	return -1;
}
