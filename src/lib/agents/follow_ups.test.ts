import { describe, it, expect } from 'vitest';
import {
	findFollowUps,
	linkFollowUps,
	openQuestions,
	orphanedFollowUps,
	unconditionedQuestions
} from './follow_ups.js';
import { sanitizeSurvey } from './sanitize.js';
import type { Question } from './types.js';

const select = (
	name: string,
	type: 'select_one' | 'select_multiple',
	choices: [string, string][]
): Question => ({
	id: name,
	name,
	label: `${name}?`,
	type,
	required: true,
	choices: choices.map(([code, label]) => ({ name: code, label }))
});
const text = (name: string, label: string, relevant?: string): Question => ({
	id: name,
	name,
	label,
	type: 'text',
	required: false,
	...(relevant ? { relevant } : {})
});

const bereich = select('bereich', 'select_multiple', [
	['orga', 'Organisation'],
	['other', 'Sonstiges']
]);
const nutzt = select('nutzt', 'select_one', [
	['ja', 'Ja'],
	['nein', 'Nein']
]);

describe('linkFollowUps', () => {
	it('links a Sonstiges follow-up to the select before it', () => {
		const out = linkFollowUps([bereich, text('bereich_other', 'Falls Sonstiges: bitte angeben')]);
		expect(out[1].relevant).toBe("selected(${bereich}, 'other')");
	});

	it('links "Falls ja" after a yes/no select_one (#54)', () => {
		const out = linkFollowUps([nutzt, text('jadetails', 'Falls ja, welche?')]);
		expect(out[1].relevant).toBe("${nutzt} = 'ja'");
	});

	it('links both follow-ups of one parent', () => {
		const parent = select('hilfe', 'select_one', [
			['ja', 'Ja'],
			['nein', 'Nein'],
			['sonst', 'Sonstiges']
		]);
		const out = linkFollowUps([
			parent,
			text('hilfeja', 'Falls ja, welche?'),
			text('hilfesonst', 'Sonstiges: bitte angeben')
		]);
		expect(out.map((q) => q.relevant)).toEqual([
			undefined,
			"${hilfe} = 'ja'",
			"${hilfe} = 'other'"
		]);
		// The Sonstiges pair follows the registry convention (see below).
		expect(out[2].name).toBe('hilfe_other');
		expect(out[0].choices!.map((c) => c.name)).toEqual(['ja', 'nein', 'other']);
	});

	it('keeps a relevant the model wrote', () => {
		const f = text('bereich_other', 'Falls Sonstiges', "selected(${bereich}, 'orga')");
		expect(linkFollowUps([bereich, f])[1].relevant).toBe("selected(${bereich}, 'orga')");
	});

	it('survives sanitizing: the relevant follows the renamed codes and names', () => {
		const parent = select('arbeits_bereich', 'select_multiple', [
			['orga', 'Organisation'],
			['sonstiges', 'Sonstiges']
		]);
		const survey = sanitizeSurvey({
			title: 't',
			questions: linkFollowUps([
				parent,
				text('arbeits_bereich_sonstiges', 'Falls Sonstiges: welche?')
			])
		});
		const [p, f] = survey.questions;
		expect(f.relevant).toBe(`selected(\${${p.name}}, '${p.choices![1].name}')`);
	});
});

describe('Sonstiges pairs follow the registry convention', () => {
	it('renames the answer to other and the follow-up to <parent>_other', () => {
		const out = linkFollowUps([
			select('vorteile', 'select_multiple', [
				['zeit', 'Zeitersparnis'],
				['sonst', 'Sonstiges']
			]),
			text('vorteilesonstige', 'Sonstige Vorteile (bitte angeben)')
		]);
		expect(out[0].choices!.map((c) => c.name)).toEqual(['zeit', 'other']);
		expect(out[1]).toMatchObject({
			name: 'vorteile_other',
			relevant: "selected(${vorteile}, 'other')"
		});
	});

	it('keeps the code when another question refers to it', () => {
		const out = linkFollowUps([
			select('vorteile', 'select_multiple', [
				['zeit', 'Zeitersparnis'],
				['sonst', 'Sonstiges']
			]),
			text('vorteilesonstige', 'Sonstige Vorteile (bitte angeben)'),
			text('warum', 'Warum?', "selected(${vorteile}, 'sonst')")
		]);
		expect(out[0].choices!.map((c) => c.name)).toEqual(['zeit', 'sonst']);
		expect(out[1].relevant).toBe("selected(${vorteile}, 'sonst')");
	});
});

describe('findFollowUps after sanitizing (#53)', () => {
	it('still finds a follow-up whose name lost its underscore', () => {
		const qs = [
			select('bereich', 'select_multiple', [
				['orga', 'Organisation'],
				['sonst', 'Sonstiges']
			]),
			text('bereichsonstiges', 'Welche Bereiche noch?')
		];
		expect(orphanedFollowUps(qs).map((q) => q.name)).toEqual(['bereichsonstiges']);
		expect(linkFollowUps(qs)[1].relevant).toBe("selected(${bereich}, 'other')");
	});
});

describe('false positives (#54)', () => {
	it('ignores a closing "Sonstige Anmerkungen?" question', () => {
		const qs = [bereich, text('anmerkungen', 'Sonstige Anmerkungen?')];
		expect(findFollowUps(qs)).toEqual([]);
		expect(linkFollowUps(qs)[1].relevant).toBeUndefined();
	});

	it('ignores a name ending in "other" without a parent that offers it', () => {
		expect(findFollowUps([nutzt, text('mother', 'Wie heißt deine Mutter?')])).toEqual([]);
	});
});

describe('orphanedFollowUps', () => {
	it('reports a follow-up with no parent to link to', () => {
		const qs = [text('intro', 'Worum geht es?'), text('x', 'Falls Sonstiges: bitte angeben')];
		expect(orphanedFollowUps(qs).map((q) => q.name)).toEqual(['x']);
	});
});

describe('openQuestions (#55)', () => {
	it('does not count follow-ups or conditional text questions', () => {
		const qs = [
			bereich,
			text('bereich_other', 'Falls Sonstiges: bitte angeben'),
			text('warum', 'Warum?', "${nutzt} = 'nein'"),
			text('anmerkungen', 'Sonstige Anmerkungen?')
		];
		expect(openQuestions(qs).map((q) => q.name)).toEqual(['anmerkungen']);
	});
});

describe('unconditionedQuestions (#46)', () => {
	it('flags wording for some respondents only, without relevant', () => {
		const qs = [
			select('haeufig', 'select_one', [
				['nie', 'Noch nie'],
				['oft', 'Oft']
			]),
			select('grund', 'select_one', [['a', 'A']]),
			text('x', 'Was hat gefehlt?', "${haeufig} = 'nie'")
		];
		qs[1] = {
			...qs[1],
			label:
				'Welche Aussage trifft am ehesten zu, wenn Sie die Fähigkeiten (noch) nicht angewendet haben?'
		};
		expect(unconditionedQuestions(qs).map((q) => q.name)).toEqual(['grund']);
	});

	it('leaves follow-ups to the follow-up check', () => {
		expect(unconditionedQuestions([nutzt, text('f', 'Falls ja, welche?')])).toEqual([]);
	});
});
