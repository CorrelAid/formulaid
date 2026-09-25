"""Kobo check for layer 1: convert every workbook pipeline.test.ts wrote to
./output with pyxform, the XLSForm → XForm converter Kobo (and ODK) runs on
import. Fails on errors and on warnings.

With Java installed, ODK Validate (bundled with pyxform) also checks the XForm
against JavaRosa, the stricter step Kobo's deployment relies on. Set
E2E_ODK_VALIDATE=0 to skip it, e.g. locally without Java.
"""

import os
import shutil
from pathlib import Path

import pytest
from pyxform.xls2xform import convert

OUTPUT = Path(__file__).parent / "output"
WORKBOOKS = sorted(OUTPUT.glob("*.xlsx"))
VALIDATE = os.environ.get("E2E_ODK_VALIDATE", "1") != "0" and shutil.which("java")


def test_workbooks_exist():
    assert WORKBOOKS, "no workbooks in output/: run `bunx vitest run tests/e2e` first"


@pytest.mark.parametrize("workbook", WORKBOOKS, ids=lambda p: p.stem)
def test_converts_like_kobo(workbook: Path):
    warnings: list[str] = []
    result = convert(str(workbook), warnings=warnings, validate=bool(VALIDATE))
    assert result.xform, "pyxform produced no XForm"
    assert warnings == []
