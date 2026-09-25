<script lang="ts">
	import { t } from '$lib/i18n';
	import type { Question, Survey } from '$lib/agents/types';
	import { detectDemographicsStart } from './surveyView';

	let {
		survey,
		/** qwac ids of the demographics the wizard appended, so the view can
		 *  group them under their own heading instead of mixing them with
		 *  the AI-written questions (#47). */
		demographicIds = []
	}: { survey: Survey; demographicIds?: string[] } = $props();

	/** `assembleSurvey` names the opening and closing note `welcome` and `end`,
	 *  so formtransform turns them into LimeSurvey's welcome and end texts.
	 *  They are shown as callouts, not as numbered questions. */
	function isNote(q: Question): boolean {
		return q.type === 'note';
	}

	/** Visual group for the badge: long type strings get the family name. */
	function typeGroup(t: Question['type']): string {
		if (t.startsWith('select_one')) return 'select';
		if (t.startsWith('select_multiple')) return 'multiple';
		if (t === 'text') return 'text';
		if (t === 'integer' || t === 'decimal' || t === 'range') return 'number';
		if (t === 'date' || t === 'time') return 'date';
		if (t === 'note') return 'note';
		return 'other';
	}

	/** The card list excludes the welcome/end notes — those are callouts. */
	let bodyQuestions = $derived(survey.questions.filter((q) => !isNote(q)));
	let welcomeNote = $derived(survey.questions.find((q) => q.name === 'welcome'));
	let endNote = $derived(survey.questions.find((q) => q.name === 'end'));
	let demoIdSet = $derived(new Set(demographicIds));

	/** The first demographic index in `bodyQuestions`, or -1 when none. */
	let demographicsStart = $derived(detectDemographicsStart(bodyQuestions, demoIdSet));

	let rqs = $derived(survey.researchQuestions ?? []);
	let hasMultipleRqs = $derived(rqs.length > 1);
</script>

<section class="survey-view">
	<header class="survey-header">
		<h2>{survey.title}</h2>
		{#if survey.formId}<p class="form-id">form_id: <code>{survey.formId}</code></p>{/if}
	</header>

	{#if hasMultipleRqs}
		<details class="rqs" open>
			<summary>{$t('surveyView.researchQuestionsHeading')} ({rqs.length})</summary>
			<ol class="rqs-list">
				{#each rqs as rq, i (i)}
					<li><span class="rq-num">{$t('wizard.researchShort')} {i + 1}</span>{rq}</li>
				{/each}
			</ol>
		</details>
	{/if}

	{#if survey.reasoning}
		<details class="reasoning">
			<summary>{$t('surveyView.reasoningHeading')}</summary>
			<p class="reasoning-text">{survey.reasoning}</p>
		</details>
	{/if}

	{#if welcomeNote}
		<aside class="callout callout-welcome">
			<span class="callout-tag">{$t('surveyView.intro')}</span>
			<p>{welcomeNote.label}</p>
		</aside>
	{/if}

	<ol class="question-list">
		{#each bodyQuestions as q, i (q.name)}
			{@const isDemographic = demographicsStart >= 0 && i >= demographicsStart}
			<li class="question-card" class:demographic={isDemographic}>
				{#if isDemographic && i === demographicsStart}
					<div class="section-divider">
						<span>{$t('surveyView.demographicsHeading')}</span>
					</div>
				{/if}
				<div class="card-header">
					<span class="question-number">{i + 1}</span>
					<span class="type-badge type-{typeGroup(q.type)}" title={q.type}>{q.type}</span>
				</div>
				<h3 class="question-label">{q.label}</h3>
				{#if q.hint}
					<p class="question-hint">{q.hint}</p>
				{/if}
				{#if q.choices && q.choices.length > 0}
					<table class="choices">
						<thead>
							<tr>
								<th class="code-col">{$t('surveyView.choiceCode')}</th>
								<th>{$t('surveyView.choiceLabel')}</th>
							</tr>
						</thead>
						<tbody>
							{#each q.choices as c (c.name)}
								<tr>
									<td><code>{c.name}</code></td>
									<td>
										{c.label}
										{#if c.exclusive}
											<span class="exclusive-tag">{$t('surveyView.exclusive')}</span>
										{/if}
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				{/if}
				{#if q.relevant}
					<div class="relevant">
						<span class="meta-label">{$t('surveyView.relevant')}:</span>
						<code>{q.relevant}</code>
					</div>
				{/if}
				{#if q.rationale || q.source || (q.researchQuestions && hasMultipleRqs)}
					<details class="card-meta">
						<summary>{$t('surveyView.details')}</summary>
						<dl>
							<dt>{$t('surveyView.name')}</dt>
							<dd><code>{q.name}</code></dd>
							{#if q.rationale}
								<dt>{$t('surveyView.rationale')}</dt>
								<dd>{q.rationale}</dd>
							{/if}
							{#if q.source}
								<dt>{$t('surveyView.source')}</dt>
								<dd>{q.source}</dd>
							{/if}
							{#if q.researchQuestions?.length && hasMultipleRqs}
								<dt>{$t('wizard.reasoningServes')}</dt>
								<dd>
									{q.researchQuestions.map((n) => `${$t('wizard.researchShort')} ${n}`).join(', ')}
								</dd>
							{/if}
						</dl>
					</details>
				{/if}
			</li>
		{/each}
	</ol>

	{#if endNote}
		<aside class="callout callout-end">
			<span class="callout-tag">{$t('surveyView.outro')}</span>
			<p>{endNote.label}</p>
		</aside>
	{/if}
</section>

<style>
	.survey-view {
		background: var(--color-white);
		border: var(--dimension-border-width) solid var(--color-text-primary);
		border-radius: var(--radius-lg);
		padding: var(--spacing-lg);
		display: flex;
		flex-direction: column;
		gap: var(--spacing-base);
	}

	.survey-header h2 {
		margin: 0;
		color: var(--color-text-primary);
	}

	.form-id {
		margin: var(--spacing-xs) 0 0;
		font-size: 0.85rem;
		opacity: 0.6;
	}

	.rqs,
	.reasoning {
		border: 1px solid color-mix(in srgb, var(--color-text-primary) 15%, white);
		border-radius: var(--radius-md);
		padding: var(--spacing-sm) var(--spacing-base);
	}

	.rqs > summary,
	.reasoning > summary {
		cursor: pointer;
		font-weight: var(--font-weight-semibold);
	}

	.rqs-list {
		margin: var(--spacing-sm) 0 0;
		padding-left: 1.5rem;
		display: flex;
		flex-direction: column;
		gap: var(--spacing-xs);
	}

	.rq-num {
		font-weight: var(--font-weight-semibold);
		color: var(--color-secondary);
		margin-right: var(--spacing-xs);
	}

	.reasoning-text {
		margin: var(--spacing-sm) 0 0;
		white-space: pre-wrap;
	}

	.callout {
		padding: var(--spacing-base);
		border-radius: var(--radius-md);
		background: color-mix(in srgb, var(--color-tertiary) 35%, white);
		border-left: 3px solid var(--color-secondary);
	}

	.callout p {
		margin: var(--spacing-xs) 0 0;
	}

	.callout-tag {
		font-size: 0.7rem;
		font-weight: var(--font-weight-semibold);
		text-transform: uppercase;
		letter-spacing: var(--letter-spacing-wider);
		color: var(--color-secondary);
	}

	.question-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: var(--spacing-base);
		counter-reset: question;
	}

	.question-card {
		border: 1px solid color-mix(in srgb, var(--color-text-primary) 20%, white);
		border-radius: var(--radius-md);
		padding: var(--spacing-base);
		display: flex;
		flex-direction: column;
		gap: var(--spacing-xs);
		background: var(--color-white);
	}

	.question-card.demographic {
		background: color-mix(in srgb, var(--color-tertiary) 25%, white);
	}

	.section-divider {
		grid-column: 1 / -1;
		text-align: center;
		font-size: 0.7rem;
		font-weight: var(--font-weight-semibold);
		text-transform: uppercase;
		letter-spacing: var(--letter-spacing-wider);
		color: var(--color-secondary);
		margin: var(--spacing-sm) 0;
		opacity: 0.7;
	}

	.card-header {
		display: flex;
		align-items: center;
		gap: var(--spacing-sm);
	}

	.question-number {
		font-family: var(--font-family-mono, monospace);
		font-size: 0.85rem;
		color: var(--color-secondary);
		font-weight: var(--font-weight-semibold);
		min-width: 1.5rem;
	}

	.type-badge {
		display: inline-block;
		padding: 0.1rem 0.55rem;
		border-radius: 99px;
		font-family: var(--font-family-mono, monospace);
		font-size: 0.7rem;
		font-weight: var(--font-weight-semibold);
		text-transform: lowercase;
		letter-spacing: 0.02em;
	}

	/* The badge alone isn't enough to read for colour-blind users; the family
	   is also in the text via the badge itself, and `title=` shows the full
	   type string (e.g. select_one_from_file). */
	.type-select {
		background: #dbeafe;
		color: #1e40af;
	}

	.type-multiple {
		background: #ede9fe;
		color: #5b21b6;
	}

	.type-text {
		background: color-mix(in srgb, var(--color-text-primary) 12%, white);
		color: var(--color-text-primary);
	}

	.type-number {
		background: #dcfce7;
		color: #166534;
	}

	.type-date {
		background: #fef3c7;
		color: #92400e;
	}

	.type-note {
		background: #f3f4f6;
		color: #374151;
	}

	.type-other {
		background: #fee2e2;
		color: #991b1b;
	}

	.question-label {
		margin: 0;
		font-size: 1.05rem;
		font-weight: var(--font-weight-semibold);
		color: var(--color-text-primary);
		line-height: var(--line-height-snug);
	}

	.question-hint {
		margin: 0;
		font-size: 0.9rem;
		color: color-mix(in srgb, var(--color-text-primary) 70%, white);
	}

	.choices {
		margin-top: var(--spacing-xs);
		border-collapse: collapse;
		width: 100%;
		font-size: 0.9rem;
	}

	.choices th,
	.choices td {
		text-align: left;
		padding: 0.35rem 0.6rem;
		border-bottom: 1px solid color-mix(in srgb, var(--color-text-primary) 10%, white);
	}

	.choices th {
		font-size: 0.7rem;
		font-weight: var(--font-weight-semibold);
		text-transform: uppercase;
		letter-spacing: var(--letter-spacing-wider);
		color: var(--color-secondary);
	}

	.choices .code-col {
		width: 6rem;
	}

	.choices code {
		font-family: var(--font-family-mono, monospace);
		font-size: 0.85em;
	}

	.exclusive-tag {
		display: inline-block;
		margin-left: var(--spacing-xs);
		padding: 0.05rem 0.4rem;
		border-radius: 99px;
		background: #fef3c7;
		color: #92400e;
		font-size: 0.65rem;
		font-weight: var(--font-weight-semibold);
		text-transform: uppercase;
		letter-spacing: 0.04em;
	}

	.relevant {
		display: flex;
		align-items: baseline;
		gap: var(--spacing-xs);
		margin-top: var(--spacing-xs);
		font-size: 0.85rem;
	}

	.relevant code {
		font-family: var(--font-family-mono, monospace);
		font-size: 0.85em;
		padding: 0.1rem 0.4rem;
		background: color-mix(in srgb, var(--color-tertiary) 40%, white);
		border-radius: var(--radius-sm);
	}

	.meta-label {
		font-size: 0.7rem;
		font-weight: var(--font-weight-semibold);
		text-transform: uppercase;
		letter-spacing: var(--letter-spacing-wider);
		color: var(--color-secondary);
	}

	.card-meta {
		margin-top: var(--spacing-xs);
		border-top: 1px dashed color-mix(in srgb, var(--color-text-primary) 15%, white);
		padding-top: var(--spacing-xs);
	}

	.card-meta > summary {
		cursor: pointer;
		font-size: 0.8rem;
		color: var(--color-secondary);
		font-weight: var(--font-weight-medium);
	}

	.card-meta dl {
		display: grid;
		grid-template-columns: max-content 1fr;
		gap: var(--spacing-xs) var(--spacing-base);
		margin: var(--spacing-xs) 0 0;
		font-size: 0.85rem;
	}

	.card-meta dt {
		font-weight: var(--font-weight-semibold);
		color: var(--color-secondary);
	}

	.card-meta dd {
		margin: 0;
	}
</style>
