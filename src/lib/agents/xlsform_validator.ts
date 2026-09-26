import {
	XLSLoader,
	XLSValidator,
	type DiagnosticCode,
	type SubsetViolation
} from '@correlaid/formtransform';

/** formtransform's findings, each with a stable `code` (branch on that, not on
 *  the message). `validator-failed` is formulaid's own: the check itself threw. */
export type ValidationFinding = Omit<SubsetViolation, 'code'> & {
	code: DiagnosticCode | 'validator-failed';
};

/**
 * Re-parse a generated XLSForm workbook and run it through the registry subset
 * check. The generator only knows how to emit; the validator owns the rules
 * (allowlist of types, appearances, naming, choice codes). Findings are
 * returned, never thrown — the caller decides whether to ship the file with
 * warnings or refuse delivery.
 */
export class XLSFormValidator {
	validate(workbookBytes: Uint8Array): ValidationFinding[] {
		const buf =
			workbookBytes.buffer instanceof ArrayBuffer
				? workbookBytes.buffer.slice(
						workbookBytes.byteOffset,
						workbookBytes.byteOffset + workbookBytes.byteLength
					)
				: new ArrayBuffer(0);
		const parsed = XLSLoader.parseXLSData(buf, { skipValidation: true });
		return XLSValidator.validateSubset(parsed.surveyData, parsed.choicesData);
	}
}
