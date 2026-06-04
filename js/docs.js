(function () {
  'use strict';

  const STORAGE_KEY = 'datapyn-lang';

  const translations = {
    en: {
      'docs.page_title': 'Documentation — DataPyn',
      'docs.nav.home': 'Home',
      'docs.nav.start': 'Getting started',
      'docs.nav.intro': 'Introduction',
      'docs.nav.install': 'Installation',
      'docs.nav.connection': 'First connection',
      'docs.nav.editor_section': 'Editor',
      'docs.nav.blocks': 'Code blocks',
      'docs.nav.sql': 'SQL editor',
      'docs.nav.databases': 'Databases',
      'docs.nav.execution': 'Execution',
      'docs.nav.viz': 'Visualization',
      'docs.nav.import': 'Import & export',
      'docs.nav.pynia_section': 'Pynia',
      'docs.nav.pynia': 'What is Pynia',
      'docs.nav.pynia_setup': 'Connectors & settings',
      'docs.nav.pynia_chat': 'Chat',
      'docs.nav.pynia_ac': 'Inline autocomplete',
      'docs.nav.pynia_tools': 'Tools',
      'docs.nav.pynia_prompts': 'Example prompts',
      'docs.nav.ref': 'Reference',
      'docs.nav.shortcuts': 'Shortcuts',
      'docs.nav.faq': 'FAQ',

      'docs.intro.title': 'Introduction',
      'docs.intro.p1':
        'DataPyn is an IDE for people who work with data every day. SQL and Python live in the same session — query, transform, chart, export, without juggling five apps.',
      'docs.intro.p2':
        'Pynia is the AI built into DataPyn. Pick OpenAI, Claude, Open Router, or GitHub Copilot, plug in your credentials, and chat from the same place you run queries.',
      'docs.intro.f1_title': 'Mixed blocks',
      'docs.intro.f1_desc': 'SQL and Python blocks in one file. SQL results become DataFrames automatically.',
      'docs.intro.f2_title': 'Per-block connections',
      'docs.intro.f2_desc': 'Each SQL block can point at a different saved connection.',
      'docs.intro.f3_title': 'Pynia',
      'docs.intro.f3_desc': 'Chat, edit blocks, inspect schema, run queries — with the provider you choose.',
      'docs.intro.f4_title': 'Monaco + offline SQL',
      'docs.intro.f4_desc': 'Autocomplete and validation from your schema, including cross-database names like other_db..table.',

      'docs.install.title': 'Installation',
      'docs.install.windows_title': 'Windows (recommended)',
      'docs.install.windows_desc':
        'Download the MSI from GitHub Releases. Python is bundled — you do not need a separate install.',
      'docs.install.source_title': 'From source',
      'docs.install.source_desc': 'For contributors or custom setups on Windows:',

      'docs.connection.title': 'First connection',
      'docs.connection.p1': 'You need at least one saved connection before SQL blocks can run.',
      'docs.connection.s1': 'Open the connections panel (<span class="kbd">Ctrl+Shift+C</span>) or use the database icon in the sidebar.',
      'docs.connection.s2': 'Click <strong>New connection</strong> and fill in host, database, and credentials.',
      'docs.connection.s3': 'Hit <strong>Test connection</strong>, then save.',
      'docs.connection.s4': 'Double-click the connection (or connect from a block header) to attach it to the session.',
      'docs.connection.p2': 'The schema tree loads after connect — that powers autocomplete and Pynia context.',

      'docs.blocks.title': 'Code blocks',
      'docs.blocks.p1':
        'A session is a stack of blocks. Each block is SQL, Python, or HTML. Run one block or the whole tab in order.',
      'docs.blocks.add_title': 'Add or switch blocks',
      'docs.blocks.add1': '<span class="kbd">+ SQL</span> / <span class="kbd">+ Python</span> in the toolbar',
      'docs.blocks.add2': '<span class="kbd">Ctrl+Shift+S</span> (SQL) · <span class="kbd">Ctrl+Shift+P</span> (Python)',
      'docs.blocks.add3': 'Use the language picker on a block to convert SQL ↔ Python',
      'docs.blocks.name_title': 'Named results',
      'docs.blocks.name_desc':
        'Name a SQL block (e.g. <code>sales</code>). The DataFrame keeps that name so Python can use <code>sales.head()</code> instead of generic <code>df</code>.',

      'docs.sql.title': 'SQL editor',
      'docs.sql.p1':
        'Blocks use the Monaco editor with SQL highlighting, formatting helpers, and schema-aware completions.',
      'docs.sql.offline_title': 'Offline intelligence',
      'docs.sql.offline_desc':
        'Keywords, joins, and objects from the connected schema work without internet. Handy on VPNs or locked-down networks.',
      'docs.sql.cross_title': 'Cross-database references',
      'docs.sql.cross_desc':
        'On SQL Server-style setups you can reference <code>OtherDatabase..TableName</code>. DataPyn resolves schema for autocomplete and validation when those databases are reachable.',
      'docs.sql.ghost_title': 'Pynia ghost text',
      'docs.sql.ghost_desc':
        'Optional inline suggestions while you type (Settings → Pynia → Inline autocomplete). Uses the same connector token as chat; pick a fast model if you want snappier completions.',

      'docs.db.title': 'Databases',
      'docs.db.p1': 'Supported connectors today:',
      'docs.db.th1': 'Database',
      'docs.db.th2': 'Notes',
      'docs.db.sqlserver': 'Windows Auth, SQL Auth, dynamic database',
      'docs.db.mysql': 'Multiple databases, charset options',
      'docs.db.postgresql': 'Schemas, custom types',
      'docs.db.mariadb': 'MySQL-compatible',
      'docs.db.sqlite': 'Local file',
      'docs.db.databricks': 'SQL warehouse, Unity Catalog',

      'docs.exec.title': 'Execution',
      'docs.exec.p1': 'Common shortcuts:',
      'docs.exec.th1': 'Shortcut',
      'docs.exec.th2': 'Action',
      'docs.exec.f5': 'Run selection, or all blocks if nothing is selected',
      'docs.exec.ctrl_f5': 'Run every block in order',
      'docs.exec.shift_enter': 'Run current block and move to the next',
      'docs.exec.cross_title': 'SQL → Python',
      'docs.exec.cross_desc': 'The latest SQL result is available in Python (named block or <code>df</code>):',

      'docs.viz.title': 'Visualization',
      'docs.viz.p1': 'Use matplotlib, seaborn, plotly, etc. Charts show in the results panel.',
      'docs.viz.p2': 'Pynia can also build charts via the <code>datapyn_chart</code> tool when you ask in chat.',

      'docs.import.title': 'Import & export',
      'docs.import.drag_title': 'Drag & drop',
      'docs.import.drag_desc': 'Drop CSV, Excel, or JSON into the editor — DataPyn inserts the right <code>pandas</code> read call.',
      'docs.import.out_title': 'Export',
      'docs.import.out1': 'Results grid → Excel / CSV / JSON (context menu)',
      'docs.import.out2': 'Menu → Export → Python script (standalone pipeline)',
      'docs.import.out3': 'Workspace <code>.dpw</code> — tabs, blocks, and connection refs',

      'docs.pynia.title': 'What is Pynia',
      'docs.pynia.p1':
        'Pynia is the chat and tooling layer inside DataPyn. Same panel whether you use Copilot or your own API keys — one UI, your choice of backend.',
      'docs.pynia.p2':
        'It sees the active tab, blocks, connection, schema, and selection. Ask in plain language; Pynia can read context, run SQL/Python, edit blocks, and chart results.',
      'docs.pynia.warn_title': 'Billing is on you',
      'docs.pynia.warn':
        'DataPyn is free and open source. Connectors may need a paid plan (Copilot subscription) or API credits (OpenAI, Anthropic, Open Router).',

      'docs.pynia_setup.title': 'Connectors & settings',
      'docs.pynia_setup.p1': 'Open <strong>Settings → Pynia</strong> (or the gear in the chat panel).',
      'docs.pynia_setup.copilot':
        '<strong>GitHub Copilot</strong> — Sign in with GitHub (device code). DataPyn can install/update the Copilot CLI runtime from the usage panel.',
      'docs.pynia_setup.openai':
        '<strong>OpenAI</strong> — Paste an API key, optional custom base URL, then <strong>Verify</strong>.',
      'docs.pynia_setup.anthropic':
        '<strong>Claude (Anthropic)</strong> — API key from the Anthropic console.',
      'docs.pynia_setup.or':
        '<strong>Open Router</strong> — One key for many models; credits show in the usage panel when available.',
      'docs.pynia_setup.tip':
        'Chat model and autocomplete model are separate. You can use a smaller model for ghost text to save cost.',

      'docs.pynia_chat.title': 'Chat',
      'docs.pynia_chat.p1': 'Open the Pynia panel from the toolbar, <strong>View → Pynia</strong>, or <strong>Pynia → Open Pynia Chat</strong>.',
      'docs.pynia_chat.p2':
        'In the input, reference context with <code>#block:name</code> or <code>#tab:title</code>. Paste or attach images when the model supports vision.',
      'docs.pynia_chat.p3':
        'Switch connector and model from the header. Use <strong>Refresh</strong> to reload models and usage hints.',

      'docs.pynia_ac.title': 'Inline autocomplete',
      'docs.pynia_ac.p1':
        'Ghost-text completions while typing in SQL/Python blocks. Enable under Settings → Pynia → Inline autocomplete.',
      'docs.pynia_ac.p2':
        'Requires a saved API token for the active connector (not separate from chat). Copilot autocomplete may use its own sign-in flow depending on version.',

      'docs.pynia_tools.title': 'Tools Pynia can call',
      'docs.pynia_tools.p1':
        'You do not need to memorize these — just describe what you want. Pynia picks the right tool.',
      'docs.pynia_tools.th1': 'Tool',
      'docs.pynia_tools.th2': 'What it does',
      'docs.pynia_tools.t1': 'Workspace snapshot (context, blocks, schema, variables)',
      'docs.pynia_tools.t2': 'Inspect block code, results, variables, or selection',
      'docs.pynia_tools.t3': 'Run SQL/Python quietly (exploration)',
      'docs.pynia_tools.t4': 'Run or write blocks visibly',
      'docs.pynia_tools.t5': 'Edit, rename, delete, or change block language',
      'docs.pynia_tools.t6': 'Create blocks, focus a block, or open a new tab',
      'docs.pynia_tools.t7': 'Connect, list connections, read schema, sample tables',
      'docs.pynia_tools.t8': 'Create, edit, or export charts from results',
      'docs.pynia_tools.t9': 'Parallel read-only sub-jobs for heavy discovery',
      'docs.pynia_tools.t10': 'Toast when a long task finishes',

      'docs.prompts.title': 'Example prompts',
      'docs.prompts.p1': 'Stuff that works well on day one:',
      'docs.prompts.a_title': 'Explore data',
      'docs.prompts.v_title': 'Charts',
      'docs.prompts.m_title': 'Fix & automate',

      'docs.shortcuts.title': 'Keyboard shortcuts',
      'docs.shortcuts.exec_title': 'Execution',
      'docs.shortcuts.edit_title': 'Editing',
      'docs.shortcuts.tabs_title': 'Tabs',
      'docs.shortcuts.blocks_title': 'Blocks',
      'docs.shortcuts.pynia_title': 'Pynia & connections',

      'docs.faq.title': 'FAQ',
      'docs.faq.q1': 'Windows Auth for SQL Server?',
      'docs.faq.a1': 'In the connection dialog choose Windows authentication — DataPyn uses your logged-in Windows user.',
      'docs.faq.q2': 'Multiple databases in one file?',
      'docs.faq.a2': 'Yes. Each SQL block has its own connection selector in the block header.',
      'docs.faq.q3': 'Where are passwords stored?',
      'docs.faq.a3': 'Encrypted locally (AES-256). They never leave your machine.',
      'docs.faq.q4': 'How do I open Pynia?',
      'docs.faq.a4': 'Toolbar Pynia button, menu <strong>Pynia → Open Pynia Chat</strong>, or show the Pynia dock from <strong>View</strong>.',
      'docs.faq.q5': 'Which AI provider should I use?',
      'docs.faq.a5': 'Already on Copilot? Use that connector. Otherwise OpenAI or Open Router are the quickest with an API key. Claude is great for long SQL/Python refactors.',
      'docs.faq.q6': 'Export as a .py script?',
      'docs.faq.a6': 'Menu → Export → Python script. Queries are embedded; Python blocks are copied verbatim.',

      'docs.footer.license': 'DataPyn — MIT License',
    },
    pt: {
      'docs.page_title': 'Documentação — DataPyn',
      'docs.nav.home': 'Início',
      'docs.nav.start': 'Começando',
      'docs.nav.intro': 'Introdução',
      'docs.nav.install': 'Instalação',
      'docs.nav.connection': 'Primeira conexão',
      'docs.nav.editor_section': 'Editor',
      'docs.nav.blocks': 'Blocos de código',
      'docs.nav.sql': 'Editor SQL',
      'docs.nav.databases': 'Bancos de dados',
      'docs.nav.execution': 'Execução',
      'docs.nav.viz': 'Visualização',
      'docs.nav.import': 'Importar e exportar',
      'docs.nav.pynia_section': 'Pynia',
      'docs.nav.pynia': 'O que é a Pynia',
      'docs.nav.pynia_setup': 'Conectores e config',
      'docs.nav.pynia_chat': 'Chat',
      'docs.nav.pynia_ac': 'Autocomplete inline',
      'docs.nav.pynia_tools': 'Ferramentas',
      'docs.nav.pynia_prompts': 'Exemplos de prompts',
      'docs.nav.ref': 'Referência',
      'docs.nav.shortcuts': 'Atalhos',
      'docs.nav.faq': 'FAQ',

      'docs.intro.title': 'Introdução',
      'docs.intro.p1':
        'O DataPyn é uma IDE pra quem vive de dados. SQL e Python na mesma sessão — consulta, transforma, gráfico e exporta sem ficar pulando de app.',
      'docs.intro.p2':
        'A Pynia é a IA dentro do DataPyn. Escolhe OpenAI, Claude, Open Router ou GitHub Copilot, coloca suas credenciais e conversa no mesmo lugar onde você roda as queries.',
      'docs.intro.f1_title': 'Blocos mistos',
      'docs.intro.f1_desc': 'Blocos SQL e Python no mesmo arquivo. Resultado SQL vira DataFrame automaticamente.',
      'docs.intro.f2_title': 'Conexão por bloco',
      'docs.intro.f2_desc': 'Cada bloco SQL pode usar uma conexão salva diferente.',
      'docs.intro.f3_title': 'Pynia',
      'docs.intro.f3_desc': 'Chat, editar blocos, ver schema, rodar SQL — com o provedor que você quiser.',
      'docs.intro.f4_title': 'Monaco + SQL offline',
      'docs.intro.f4_desc': 'Autocomplete e validação pelo schema, inclusive referências cross-database tipo outro_banco..tabela.',

      'docs.install.title': 'Instalação',
      'docs.install.windows_title': 'Windows (recomendado)',
      'docs.install.windows_desc':
        'Baixe o MSI em Releases no GitHub. Python já vem embutido — não precisa instalar separado.',
      'docs.install.source_title': 'Pelo código-fonte',
      'docs.install.source_desc': 'Pra contribuir ou ambiente customizado no Windows:',

      'docs.connection.title': 'Primeira conexão',
      'docs.connection.p1': 'Você precisa de pelo menos uma conexão salva antes de rodar SQL.',
      'docs.connection.s1': 'Abra o painel de conexões (<span class="kbd">Ctrl+Shift+C</span>) ou o ícone de banco na barra lateral.',
      'docs.connection.s2': 'Clique em <strong>Nova conexão</strong> e preencha host, banco e credenciais.',
      'docs.connection.s3': 'Use <strong>Testar conexão</strong> e salve.',
      'docs.connection.s4': 'Dê duplo clique na conexão (ou conecte pelo cabeçalho do bloco) pra ligar na sessão.',
      'docs.connection.p2': 'O schema carrega depois da conexão — isso alimenta autocomplete e contexto da Pynia.',

      'docs.blocks.title': 'Blocos de código',
      'docs.blocks.p1':
        'Uma sessão é uma pilha de blocos. Cada bloco é SQL, Python ou HTML. Rode um ou a aba inteira em sequência.',
      'docs.blocks.add_title': 'Adicionar ou trocar blocos',
      'docs.blocks.add1': '<span class="kbd">+ SQL</span> / <span class="kbd">+ Python</span> na barra',
      'docs.blocks.add2': '<span class="kbd">Ctrl+Shift+S</span> (SQL) · <span class="kbd">Ctrl+Shift+P</span> (Python)',
      'docs.blocks.add3': 'Use o seletor de linguagem no bloco pra converter SQL ↔ Python',
      'docs.blocks.name_title': 'Resultados nomeados',
      'docs.blocks.name_desc':
        'Nomeie o bloco SQL (ex.: <code>vendas</code>). O DataFrame fica com esse nome — no Python use <code>vendas.head()</code> em vez de <code>df</code> genérico.',

      'docs.sql.title': 'Editor SQL',
      'docs.sql.p1':
        'Os blocos usam Monaco com destaque SQL, formatação e completions ligados ao schema.',
      'docs.sql.offline_title': 'Inteligência offline',
      'docs.sql.offline_desc':
        'Palavras-chave, joins e objetos do schema funcionam sem internet. Bom em VPN ou rede restrita.',
      'docs.sql.cross_title': 'Cross-database',
      'docs.sql.cross_desc':
        'Em ambientes estilo SQL Server dá pra referenciar <code>OutroBanco..Tabela</code>. O DataPyn resolve schema pra autocomplete e validação quando o banco está acessível.',
      'docs.sql.ghost_title': 'Ghost text da Pynia',
      'docs.sql.ghost_desc':
        'Sugestões inline enquanto digita (Configurações → Pynia → Autocomplete inline). Usa o mesmo token do conector; modelo menor = mais rápido e barato.',

      'docs.db.title': 'Bancos de dados',
      'docs.db.p1': 'Conectores suportados hoje:',
      'docs.db.th1': 'Banco',
      'docs.db.th2': 'Observações',
      'docs.db.sqlserver': 'Windows Auth, SQL Auth, banco dinâmico',
      'docs.db.mysql': 'Vários bancos, charset configurável',
      'docs.db.postgresql': 'Schemas, tipos customizados',
      'docs.db.mariadb': 'Compatível com MySQL',
      'docs.db.sqlite': 'Arquivo local',
      'docs.db.databricks': 'SQL warehouse, Unity Catalog',

      'docs.exec.title': 'Execução',
      'docs.exec.p1': 'Atalhos mais usados:',
      'docs.exec.th1': 'Atalho',
      'docs.exec.th2': 'Ação',
      'docs.exec.f5': 'Roda seleção, ou todos os blocos se nada estiver selecionado',
      'docs.exec.ctrl_f5': 'Roda todos os blocos em ordem',
      'docs.exec.shift_enter': 'Roda o bloco atual e vai pro próximo',
      'docs.exec.cross_title': 'SQL → Python',
      'docs.exec.cross_desc': 'O último resultado SQL fica disponível no Python (bloco nomeado ou <code>df</code>):',

      'docs.viz.title': 'Visualização',
      'docs.viz.p1': 'Use matplotlib, seaborn, plotly, etc. Gráficos aparecem no painel de resultados.',
      'docs.viz.p2': 'A Pynia também monta gráficos pela ferramenta <code>datapyn_chart</code> quando você pede no chat.',

      'docs.import.title': 'Importar e exportar',
      'docs.import.drag_title': 'Arrastar e soltar',
      'docs.import.drag_desc': 'Solte CSV, Excel ou JSON no editor — o DataPyn insere o <code>read_*</code> certo do pandas.',
      'docs.import.out_title': 'Exportar',
      'docs.import.out1': 'Grid de resultados → Excel / CSV / JSON (menu de contexto)',
      'docs.import.out2': 'Menu → Exportar → Script Python (pipeline standalone)',
      'docs.import.out3': 'Workspace <code>.dpw</code> — abas, blocos e refs de conexão',

      'docs.pynia.title': 'O que é a Pynia',
      'docs.pynia.p1':
        'A Pynia é o chat e as ferramentas de IA dentro do DataPyn. Mesmo painel pro Copilot ou pras suas chaves de API — uma UI, backend à sua escolha.',
      'docs.pynia.p2':
        'Ela enxerga aba ativa, blocos, conexão, schema e seleção. Pergunta em linguagem natural; a Pynia lê contexto, roda SQL/Python, edita blocos e gera gráficos.',
      'docs.pynia.warn_title': 'Cobrança é sua',
      'docs.pynia.warn':
        'O DataPyn é gratuito e open source. Conectores podem exigir plano pago (Copilot) ou créditos de API (OpenAI, Anthropic, Open Router).',

      'docs.pynia_setup.title': 'Conectores e configurações',
      'docs.pynia_setup.p1': 'Abra <strong>Configurações → Pynia</strong> (ou a engrenagem no painel de chat).',
      'docs.pynia_setup.copilot':
        '<strong>GitHub Copilot</strong> — Entre com GitHub (código no dispositivo). Dá pra instalar/atualizar o runtime do Copilot CLI pelo painel de uso.',
      'docs.pynia_setup.openai':
        '<strong>OpenAI</strong> — Cole a API key, base URL opcional, depois <strong>Verificar</strong>.',
      'docs.pynia_setup.anthropic':
        '<strong>Claude (Anthropic)</strong> — API key do console Anthropic.',
      'docs.pynia_setup.or':
        '<strong>Open Router</strong> — Uma chave, vários modelos; créditos aparecem no painel quando disponível.',
      'docs.pynia_setup.tip':
        'Modelo do chat e do autocomplete são separados. Modelo menor no ghost text economiza.',

      'docs.pynia_chat.title': 'Chat',
      'docs.pynia_chat.p1': 'Abra o painel pela barra, <strong>Exibir → Pynia</strong> ou <strong>Pynia → Abrir chat Pynia</strong>.',
      'docs.pynia_chat.p2':
        'No input, referencie com <code>#block:nome</code> ou <code>#tab:titulo</code>. Cole ou anexe imagens se o modelo tiver visão.',
      'docs.pynia_chat.p3':
        'Troque conector e modelo no cabeçalho. <strong>Atualizar</strong> recarrega modelos e dicas de uso.',

      'docs.pynia_ac.title': 'Autocomplete inline',
      'docs.pynia_ac.p1':
        'Completions em ghost text enquanto digita em blocos SQL/Python. Ative em Configurações → Pynia → Autocomplete inline.',
      'docs.pynia_ac.p2':
        'Precisa de token salvo pro conector ativo (o mesmo do chat). Autocomplete do Copilot pode ter fluxo próprio conforme a versão.',

      'docs.pynia_tools.title': 'Ferramentas que a Pynia chama',
      'docs.pynia_tools.p1':
        'Não precisa decorar — descreve o que quer e a Pynia escolhe a ferramenta.',
      'docs.pynia_tools.th1': 'Ferramenta',
      'docs.pynia_tools.th2': 'Função',
      'docs.pynia_tools.t1': 'Snapshot do workspace (contexto, blocos, schema, variáveis)',
      'docs.pynia_tools.t2': 'Inspecionar código, resultado, variável ou seleção',
      'docs.pynia_tools.t3': 'Rodar SQL/Python em silêncio (exploração)',
      'docs.pynia_tools.t4': 'Rodar ou escrever blocos visivelmente',
      'docs.pynia_tools.t5': 'Editar, renomear, apagar ou trocar linguagem do bloco',
      'docs.pynia_tools.t6': 'Criar blocos, focar bloco ou abrir nova aba',
      'docs.pynia_tools.t7': 'Conectar, listar conexões, ler schema, amostrar tabelas',
      'docs.pynia_tools.t8': 'Criar, editar ou exportar gráficos dos resultados',
      'docs.pynia_tools.t9': 'Sub-tarefas paralelas só leitura pra descoberta pesada',
      'docs.pynia_tools.t10': 'Toast quando uma tarefa longa termina',

      'docs.prompts.title': 'Exemplos de prompts',
      'docs.prompts.p1': 'Coisas que funcionam bem no primeiro dia:',
      'docs.prompts.a_title': 'Explorar dados',
      'docs.prompts.v_title': 'Gráficos',
      'docs.prompts.m_title': 'Corrigir e automatizar',

      'docs.shortcuts.title': 'Atalhos de teclado',
      'docs.shortcuts.exec_title': 'Execução',
      'docs.shortcuts.edit_title': 'Edição',
      'docs.shortcuts.tabs_title': 'Abas',
      'docs.shortcuts.blocks_title': 'Blocos',
      'docs.shortcuts.pynia_title': 'Pynia e conexões',

      'docs.faq.title': 'FAQ',
      'docs.faq.q1': 'Windows Auth no SQL Server?',
      'docs.faq.a1': 'No diálogo de conexão escolha autenticação Windows — o DataPyn usa seu usuário logado.',
      'docs.faq.q2': 'Vários bancos no mesmo arquivo?',
      'docs.faq.a2': 'Sim. Cada bloco SQL tem seletor de conexão no cabeçalho.',
      'docs.faq.q3': 'Onde ficam as senhas?',
      'docs.faq.a3': 'Criptografadas localmente (AES-256). Não saem da sua máquina.',
      'docs.faq.q4': 'Como abro a Pynia?',
      'docs.faq.a4': 'Botão Pynia na barra, menu <strong>Pynia → Abrir chat Pynia</strong> ou dock Pynia em <strong>Exibir</strong>.',
      'docs.faq.q5': 'Qual provedor de IA usar?',
      'docs.faq.a5': 'Já tem Copilot? Use esse conector. Senão OpenAI ou Open Router são os mais rápidos com API key. Claude é ótimo pra refatorar SQL/Python longo.',
      'docs.faq.q6': 'Exportar como .py?',
      'docs.faq.a6': 'Menu → Exportar → Script Python. Queries viram strings; blocos Python são copiados.',

      'docs.footer.license': 'DataPyn — licença MIT',
    },
  };

  function getLang() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'pt' || stored === 'en') return stored;
    return (navigator.language || '').toLowerCase().startsWith('pt') ? 'pt' : 'en';
  }

  function applyLang(lang) {
    const dict = translations[lang] || translations.en;
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
    document.title = dict['docs.page_title'] || document.title;

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      const text = dict[key];
      if (text == null) return;
      if (text.includes('<') && (el.tagName === 'P' || el.tagName === 'LI' || el.tagName === 'TD' || el.tagName === 'SPAN')) {
        el.innerHTML = text;
      } else {
        el.textContent = text;
      }
    });

    document.querySelectorAll('.lang-switch button').forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });
  }

  function initLang() {
    const lang = getLang();
    applyLang(lang);
    document.querySelectorAll('.lang-switch button').forEach((btn) => {
      btn.addEventListener('click', () => {
        localStorage.setItem(STORAGE_KEY, btn.dataset.lang);
        applyLang(btn.dataset.lang);
      });
    });
  }

  function initSidebar() {
    const toggle = document.getElementById('sidebar-toggle');
    const sidebar = document.getElementById('docs-sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    if (!toggle || !sidebar) return;

    const close = () => {
      sidebar.classList.remove('open');
      overlay?.classList.remove('open');
    };

    toggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      overlay?.classList.toggle('open');
    });
    overlay?.addEventListener('click', close);
    sidebar.querySelectorAll('.nav-link').forEach((a) => a.addEventListener('click', close));
  }

  function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const links = document.querySelectorAll('.docs-sidebar .nav-link');

    function update() {
      const y = window.scrollY + 120;
      sections.forEach((sec) => {
        const top = sec.offsetTop;
        const h = sec.offsetHeight;
        const id = sec.id;
        if (y >= top && y < top + h) {
          links.forEach((l) => {
            l.classList.toggle('active', l.getAttribute('href') === `#${id}`);
          });
        }
      });
    }

    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  function initSmoothNav() {
    const navH = 72;
    document.querySelectorAll('.docs-sidebar .nav-link').forEach((link) => {
      link.addEventListener('click', (e) => {
        const id = link.getAttribute('href');
        if (!id?.startsWith('#')) return;
        const target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        const y = target.getBoundingClientRect().top + window.pageYOffset - navH;
        window.scrollTo({ top: y, behavior: 'smooth' });
      });
    });

    const hash = window.location.hash;
    if (hash === '#copilot') {
      history.replaceState(null, '', '#pynia');
    }
    const resolved = hash === '#copilot' ? '#pynia' : hash;
    if (resolved) {
      setTimeout(() => {
        const t = document.querySelector(resolved);
        if (t) {
          const y = t.getBoundingClientRect().top + window.pageYOffset - navH;
          window.scrollTo({ top: y });
        }
      }, 80);
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    initLang();
    initSidebar();
    initScrollSpy();
    initSmoothNav();
    if (window.lucide) window.lucide.createIcons();
  });
})();
