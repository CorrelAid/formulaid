<script lang="ts">
  import { onMount } from 'svelte';
  import { ai, agent } from '@ax-llm/ax';
  import type { AxAIService } from '@ax-llm/ax';
  import tokens from '../../tokens.json';

  const SESSION_KEY = 'formulaid_api_key';
  const EXPIRY_KEY = 'formulaid_key_expiry';
  const TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes

  let apiKey = $state('');
  let keepInSession = $state(false);
  let isKeyLocked = $state(false);
  let storageInfo = $state('');
  
  let internalKey = ''; // The active key in memory
  let model = $state('mistralai/ministral-3b');
  let llm: AxAIService | null = $state(null);
  let status = $state('Enter your OpenRouter API Key and Model to initialize');
  let error = $state('');

  // Key stats
  let keyStats = $state<{ limit: number; usage: number; limit_remaining: number } | null>(null);

  // Calculator states
  let query = $state('multiply six with 167');
  let result = $state('');
  let isCalculating = $state(false);
  let calcError = $state('');

  onMount(() => {
    checkAndRecoverSession();
  });

  function checkAndRecoverSession() {
    const savedKey = sessionStorage.getItem(SESSION_KEY);
    const expiry = sessionStorage.getItem(EXPIRY_KEY);

    if (savedKey && expiry) {
      if (Date.now() < parseInt(expiry)) {
        internalKey = savedKey;
        storageInfo = 'Stored in Session (Auto-clears in 30m inactivity)';
        initWithKey(savedKey);
      } else {
        clearKey();
      }
    }
  }

  function updateInactivityTimer() {
    if (keepInSession && internalKey) {
      const newExpiry = Date.now() + TIMEOUT_MS;
      sessionStorage.setItem(EXPIRY_KEY, newExpiry.toString());
    }
  }

  async function fetchKeyStats(keyToUse: string) {
    try {
      updateInactivityTimer();
      const response = await fetch(window.location.origin + '/api/v1/key', {
        headers: {
          Authorization: `Bearer ${keyToUse}`
        }
      });
      
      if (!response.ok) {
        const text = await response.text();
        throw new Error(`API Key validation failed: ${response.status} ${response.statusText}. ${text.slice(0, 100)}`);
      }
      
      let data;
      try {
        data = await response.json();
      } catch (jsonErr) {
        const text = await response.clone().text();
        console.error('Failed to parse API key response as JSON:', jsonErr, 'Raw response:', text);
        throw new Error('API Key validation failed: Server returned an invalid response format.');
      }

      if (data.data) {
        const limit = data.data.limit;
        
        if (limit === null || limit === 0) {
          throw new Error('This API key has no credit limit set. Please set a limit of $5 or less.');
        }
        if (limit > 5) {
          throw new Error(`API key limit is too high ($${limit}). Only limits ≤ $5 allowed.`);
        }

        keyStats = {
          limit: limit,
          usage: data.data.usage,
          limit_remaining: data.data.limit_remaining
        };
      }
    } catch (e) {
      error = (e as Error).message;
      status = 'Initialization failed';
      clearKey();
      throw e;
    }
  }

  function clearKey() {
    llm = null;
    keyStats = null;
    isKeyLocked = false;
    apiKey = '';
    internalKey = '';
    storageInfo = '';
    sessionStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem(EXPIRY_KEY);
    status = 'Key cleared.';
  }

  async function initWithKey(keyToUse: string) {
    try {
      llm = ai({
        name: 'openai',
        apiKey: keyToUse,
        apiURL: window.location.origin + '/api/v1',
        config: { model: model as any }
      });
      
      error = '';
      status = 'Validating API Key...';
      await fetchKeyStats(keyToUse);
      
      if (llm) {
        status = `AI Initialized Successfully with ${model}!`;
        apiKey = ''; 
        isKeyLocked = true;
      }
    } catch (e) {
      console.error(e);
      llm = null;
    }
  }

  async function initAI() {
    if (!apiKey) {
      error = 'Please enter an API Key';
      return;
    }

    internalKey = apiKey;
    
    if (keepInSession) {
      sessionStorage.setItem(SESSION_KEY, apiKey);
      sessionStorage.setItem(EXPIRY_KEY, (Date.now() + TIMEOUT_MS).toString());
      storageInfo = 'Stored in Session (Auto-clears on tab close or 30m inactivity)';
    } else {
      storageInfo = 'Memory only (Will clear on refresh)';
    }

    await initWithKey(internalKey);
  }

  // Define the calculation tool
  const calculateTool = {
    name: 'calculate',
    description: 'Evaluate a mathematical expression string (e.g., "6 * 167")',
    parameters: {
      type: 'object',
      properties: {
        formula: { type: 'string', description: 'The mathematical expression to evaluate' }
      },
      required: ['formula']
    },
    func: async ({ formula }: { formula: string }) => {
      updateInactivityTimer();
      try {
        const sanitized = formula.replace(/[^0-9+\-*/().\s]/g, '');
        const compute = new Function(`return ${sanitized}`);
        const val = compute();
        return { result: val };
      } catch (e) {
        return { error: 'Invalid formula generated' };
      }
    }
  };

  async function performCalculation() {
    if (!llm) return;
    updateInactivityTimer();
    isCalculating = true;
    calcError = '';
    result = '';

    try {
      const calcAgent = agent(
        'query:string "User natural language math query" -> answer:string "The final calculated answer"',
        {
          name: 'math_wizard',
          description: 'Converts natural language to math and calculates it',
          definition: `You are a math assistant. Use the calculate tool. Access design tokens: ${JSON.stringify(tokens, null, 2)}`,
          ai: llm,
          functions: [calculateTool]
        }
      );

      const response = await calcAgent.forward(llm, { query });
      result = response.answer;
    } catch (e) {
      console.error(e);
      calcError = 'Calculation failed: ' + (e as Error).message;
    } finally {
      isCalculating = false;
    }
  }
</script>

<div class="container">
  <h1>Formulaid</h1>
  
  <div class="card">
    {#if !isKeyLocked}
      <div class="input-group">
        <label for="apikey">OpenRouter API Key</label>
        <input 
          id="apikey" 
          type="password" 
          bind:value={apiKey} 
          placeholder="sk-or-..." 
          autocomplete="off"
          spellcheck="false"
        />
      </div>

      <div class="input-group">
        <label for="model">OpenRouter Model</label>
        <input 
          id="model" 
          type="text" 
          bind:value={model} 
          placeholder="e.g. mistralai/ministral-3b" 
        />
      </div>

      <div class="checkbox-group">
        <input type="checkbox" id="keep" bind:checked={keepInSession} />
        <label for="keep">Keep key for this session (survives refresh)</label>
      </div>

      <button class="primary-btn" onclick={initAI} disabled={!apiKey || !model}>
        Initialize AI Instance
      </button>
    {:else}
      <div class="locked-status">
        <span class="icon">🔑</span>
        <div class="text">
          <strong>API Key Active</strong>
          <p>{storageInfo}</p>
        </div>
        <button class="small-btn" onclick={clearKey}>Clear & Wipe Key</button>
      </div>
    {/if}

    {#if error}
      <div class="message error">
        {error}
      </div>
    {/if}

    {#if status && !error}
      <div class="message info">
        {status}
      </div>
    {/if}

    {#if llm}
      <div class="success-box">
        <h3>AI Instance Ready</h3>
        <p class="model-info">Model: {model}</p>
        
        {#if keyStats}
          <div class="stats-grid">
            <div class="stat-item">
              <span class="stat-label">Limit</span>
              <span class="stat-value">${keyStats.limit?.toFixed(2) || '0.00'}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">Usage</span>
              <span class="stat-value">${keyStats.usage?.toFixed(2) || '0.00'}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">Remaining</span>
              <span class="stat-value">${keyStats.limit_remaining?.toFixed(2) || '0.00'}</span>
            </div>
          </div>
        {/if}
      </div>

      <div class="calculator-section">
        <hr />
        <h3>Natural Language Calculator</h3>
        <div class="input-group">
          <label for="query">What should I calculate?</label>
          <input 
            id="query" 
            type="text" 
            bind:value={query} 
            placeholder="e.g. multiply six with 167" 
          />
        </div>
        
        <button class="primary-btn" onclick={performCalculation} disabled={isCalculating || !query}>
          {isCalculating ? 'Calculating...' : 'Calculate'}
        </button>

        {#if calcError}
          <div class="message error">
            {calcError}
          </div>
        {/if}

        {#if result}
          <div class="result-box">
            <strong>Result:</strong>
            <p>{result}</p>
          </div>
        {/if}
      </div>
    {/if}
  </div>

  <footer>
    <div class="imprint">
      <p>
        <strong>Imprint & Liability:</strong> This is a client-side only application. 
        Your API key is never sent to our servers. Use this tool at your own risk and liability. 
        We assume no responsibility for any costs incurred or data handled through your OpenRouter account.
        The app is open source and available at <a href="https://github.com/CorrelAid/formulaid" target="_blank" rel="noopener">GitHub</a>.
      </p>
      <p class="credits">
        A project by <a href="https://correlaid.org" target="_blank" rel="noopener">CorrelAid</a>.
      </p>
    </div>
  </footer>
</div>

<style>
  :global(body) {
    font-family: var(--font-family-body);
    background-color: var(--color-background-primary);
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    color: var(--color-text-primary);
  }

  .container {
    width: 100%;
    max-width: var(--dimension-content-max-width);
    padding: var(--spacing-lg);
  }

  h1 {
    text-align: center;
    color: var(--color-text-primary);
    margin-bottom: var(--spacing-xl);
    font-family: var(--font-family-heading);
    font-size: calc(var(--font-size-h1-max) * 1px);
  }

  .card {
    background: var(--color-white);
    padding: var(--spacing-2xl);
    border-radius: var(--radius-xl);
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  }

  .input-group {
    margin-bottom: var(--spacing-lg);
  }

  .checkbox-group {
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);
    margin-bottom: var(--spacing-lg);
    font-size: 0.9rem;
    color: var(--color-secondary);
  }

  .checkbox-group input {
    width: auto;
  }

  label {
    display: block;
    margin-bottom: var(--spacing-xs);
    font-weight: var(--font-weight-medium);
    color: var(--color-secondary);
  }

  input {
    width: 100%;
    padding: var(--spacing-sm);
    border: var(--dimension-border-width) solid var(--color-tertiary);
    border-radius: var(--radius-lg);
    font-size: calc(var(--font-size-body-min) * 1px);
    box-sizing: border-box;
    font-family: var(--font-family-body);
  }

  input:focus {
    outline: none;
    border-color: var(--color-primary-darker);
    box-shadow: 0 0 0 2px rgba(91, 146, 246, 0.2);
  }

  .primary-btn {
    width: 100%;
    padding: var(--spacing-sm);
    background-color: var(--color-secondary);
    color: var(--color-text-secondary);
    border: none;
    border-radius: var(--radius-lg);
    font-size: calc(var(--font-size-body-min) * 1px);
    font-weight: var(--font-weight-bold);
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .primary-btn:hover:not(:disabled) {
    background-color: var(--color-primary-darker);
  }

  .primary-btn:disabled {
    background-color: var(--color-tertiary);
    cursor: not-allowed;
    opacity: 0.7;
  }

  .locked-status {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    padding: var(--spacing-sm);
    background-color: #e3f2fd;
    border: 1px solid #90caf9;
    border-radius: var(--radius-lg);
    margin-bottom: var(--spacing-lg);
  }

  .locked-status .icon {
    font-size: 1.5rem;
  }

  .locked-status .text {
    flex-grow: 1;
  }

  .locked-status p {
    margin: 0;
    font-size: 0.8rem;
    color: #1565c0;
  }

  .small-btn {
    padding: var(--spacing-2xs) var(--spacing-sm);
    background: white;
    border: 1px solid #90caf9;
    border-radius: var(--radius-md);
    cursor: pointer;
    font-size: 0.8rem;
    color: #1565c0;
  }

  .small-btn:hover {
    background-color: #f9fdf5;
  }

  .message {
    margin-top: var(--spacing-lg);
    padding: var(--spacing-sm);
    border-radius: var(--radius-md);
    text-align: center;
  }

  .error {
    background-color: #ffebee;
    color: #c62828;
  }

  .info {
    background-color: var(--color-tertiary);
    color: var(--color-secondary);
  }

  .success-box {
    margin-top: var(--spacing-xl);
    padding: var(--spacing-lg);
    background-color: var(--color-tertiary);
    border: var(--dimension-border-width) solid var(--color-secondary);
    border-radius: var(--radius-lg);
    text-align: center;
  }

  .success-box h3 {
    margin: 0 0 var(--spacing-xs) 0;
    color: var(--color-secondary);
  }

  .model-info {
    font-family: var(--font-family-mono);
    background: rgba(255,255,255,0.5);
    padding: var(--spacing-2xs) var(--spacing-xs);
    border-radius: var(--radius-sm);
    display: inline-block;
    margin-top: var(--spacing-xs);
    font-size: calc(var(--font-size-mono-min) * 1px);
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--spacing-sm);
    margin-top: var(--spacing-lg);
    background: rgba(255, 255, 255, 0.3);
    padding: var(--spacing-sm);
    border-radius: var(--radius-md);
  }

  .stat-item {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .stat-label {
    font-size: 0.75rem;
    text-transform: uppercase;
    color: var(--color-secondary);
    opacity: 0.8;
  }

  .stat-value {
    font-weight: var(--font-weight-bold);
    font-family: var(--font-family-mono);
  }

  .calculator-section {
    margin-top: var(--spacing-2xl);
    text-align: left;
  }

  .calculator-section hr {
    border: 0;
    border-top: var(--dimension-border-width) solid var(--color-tertiary);
    margin-bottom: var(--spacing-xl);
  }

  .calculator-section h3 {
    color: var(--color-secondary);
    margin-bottom: var(--spacing-lg);
  }

  .result-box {
    margin-top: var(--spacing-lg);
    padding: var(--spacing-sm);
    background-color: var(--color-white);
    border-left: 4px solid var(--color-primary);
    border-radius: var(--radius-sm);
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  }

  .result-box p {
    margin: var(--spacing-xs) 0 0 0;
    font-size: calc(var(--font-size-h3-min) * 1px);
    color: var(--color-secondary);
  }

  footer {
    margin-top: var(--spacing-2xl);
    padding: var(--spacing-lg);
    border-top: 1px solid var(--color-tertiary);
    text-align: center;
    color: var(--color-secondary);
    font-size: 0.85rem;
    opacity: 0.8;
  }

  .imprint p {
    margin: var(--spacing-xs) 0;
    line-height: 1.4;
  }

  .imprint a, .credits a {
    color: var(--color-secondary);
    text-decoration: underline;
    font-weight: var(--font-weight-bold);
  }

  .imprint a:hover, .credits a:hover {
    opacity: 0.8;
  }
</style>