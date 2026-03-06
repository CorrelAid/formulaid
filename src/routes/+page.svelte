<script lang="ts">
</script>

<div class="container">
	<h1>Formulaid</h1>
	
	<div class="card">
		<p>
			Formulaid is a small tool designed to help researchers and practitioners create better surveys. 
			It's built with simplicity in mind, focusing on making the process of questionnaire generation 
			and question refinement easier and more accessible.
		</p>
		
		<p>
			Our goal is to provide a helpful assistant that can bridge the gap between research ideas 
			and well-structured XLSForms. We use AI to suggest questions based on your research goals 
			and to improve existing formulations.
		</p>

		<div class="nav-links">
			<a href="/wizard" class="nav-card">
				<h3>Survey Wizard</h3>
				<p>Generate a complete questionnaire from scratch based on your research goal and context examples.</p>
			</a>

			<a href="/search" class="nav-card">
				<h3>Question Search</h3>
				<p>Explore our database of questions semantically. Find the best wording for your research topic.</p>
			</a>
			
			<a href="/improve-question" class="nav-card">
				<h3>Question Improver</h3>
				<p>Have a single question and choices? Let the AI help you refine the wording and options.</p>
			</a>
		</div>
	</div>

	<footer>
		<div class="imprint">
			<p>
				<strong>Imprint & Liability:</strong> This is a client-side only application. 
				Your API key is never sent to our servers. Use this tool at your own risk and liability. 
				The app is open source and available at <a href="https://github.com/CorrelAid/formulaid" target="_blank" rel="noopener">GitHub</a>.
			</p>
		</div>
	</footer>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 4rem 2rem;
	}

	h1 {
		text-align: center;
		color: var(--color-text-primary);
		margin-bottom: 3rem;
		font-family: var(--font-family-heading);
		font-size: 2.5rem;
	}

	.card {
		background: white;
		width: 100%;
		max-width: 800px;
		padding: 4rem;
		border-radius: 2rem;
		box-shadow: 0 15px 35px rgba(0,0,0,0.07);
	}

	p {
		color: #666;
		margin-bottom: 1.5rem;
		line-height: 1.6;
	}

	.nav-links {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
		gap: 2rem;
		margin-top: 3rem;
	}

	.nav-card {
		display: block;
		padding: 2rem;
		background: #f8faff;
		border: 2px solid #f0f0f0;
		border-radius: 1.5rem;
		text-decoration: none;
		color: inherit;
		transition: all 0.2s;
	}

	.nav-card:hover {
		border-color: var(--color-secondary);
		transform: translateY(-4px);
		box-shadow: 0 10px 20px rgba(0,0,0,0.05);
	}

	.nav-card h3 {
		margin-top: 0;
		color: var(--color-secondary);
		margin-bottom: 1rem;
	}

	.nav-card p {
		margin-bottom: 0;
		font-size: 0.95rem;
	}

	footer {
		margin-top: 4rem;
		text-align: center;
		color: var(--color-secondary);
		font-size: 0.85rem;
		opacity: 0.7;
	}

	@media (max-width: 600px) {
		.nav-links {
			grid-template-columns: 1fr;
		}
	}
</style>
