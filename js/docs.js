(function () {
  'use strict';

  const STORAGE_KEY = 'datapyn-lang';

  const translations = {
    en: {
      'docs.page_title': 'Documentation — DataPyn',
      'docs.nav.home': 'Home',
      'docs.nav.downloads': 'Downloads',
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
      'docs.nav.pynia_setup': 'Agents & settings',
      'docs.nav.pynia_chat': 'Chat',
      'docs.nav.pynia_ac': 'Inline autocomplete',
      'docs.nav.pynia_tools': 'Tools',
      'docs.nav.pynia_prompts': 'Example prompts',
      'docs.nav.ref': 'Reference',
      'docs.nav.shortcuts': 'Shortcuts',
      'docs.nav.faq': 'FAQ',

      'docs.intro.title': 'Introduction',
      'docs.intro.p1':
        'DataPyn is a desktop IDE built with Tauri for people who work with data every day. SQL and Python live in the same session — query, transform, chart, and export.',
      'docs.intro.p2':
        'Pynia is the AI built into DataPyn. Choose Claude, Cursor, GitHub Copilot, or Codex, install and sign in to that agent, then chat from the same place you run queries.',
      'docs.intro.f1_title': 'Mixed blocks',
      'docs.intro.f1_desc': 'SQL and Python blocks in one file. SQL results become DataFrames automatically.',
      'docs.intro.f2_title': 'Per-block connections',
      'docs.intro.f2_desc': 'Each SQL block can point at a different saved connection.',
      'docs.intro.f3_title': 'Pynia',
      'docs.intro.f3_desc': 'Chat, edit blocks, inspect schema, run queries — with the provider you choose.',
      'docs.intro.f4_title': 'Monaco + offline SQL',
      'docs.intro.f4_desc': 'Autocomplete and validation from your schema, including cross-database names like other_db..table.',

      'docs.install.title': 'Installation',
      'docs.install.channel': 'Choose the Tauri channel with tags tauri-vX.Y.Z. Python and the analysis libraries are bundled. The historical PyQt6 channel has separate installers and updates.',
      'docs.install.windows_title': 'Windows',
      'docs.install.windows_desc':
        'Windows x64: choose the Tauri Setup.exe or portable ZIP. Setup includes WebView2 and prepares the SQL Server ODBC driver when needed. Keep both executables together in the ZIP; WebView2 and ODBC are prerequisites for portable use.',
      'docs.install.linux_title': 'Linux',
      'docs.install.linux_desc':
        'Linux x64, Ubuntu 22.04+: choose DEB, AppImage, or tar.gz. SQL Server requires unixODBC and the Microsoft ODBC driver. Use APPIMAGE_EXTRACT_AND_RUN=1 if FUSE is unavailable. DEB and tar.gz keep an updateable AppImage in your user profile.',
      'docs.install.macos_title': 'macOS',
      'docs.install.macos_desc':
        'macOS 14+, Apple Silicon: download the Tauri DMG and copy DataPyn Tauri to Applications. The current distribution may require permission in Privacy & Security. SQL Server requires the native arm64 Microsoft ODBC driver and unixODBC.',
      'docs.install.downloads_page': 'All downloads',
      'docs.install.releases_link': 'Tauri releases',
      'docs.install.update_title': 'Updates',
      'docs.install.update_desc': 'Windows, Linux, and macOS use the signed Tauri update channel. Downloads run in the background; when an update is ready, save your work and install it from the app. Installation waits until running operations finish.',
      'docs.install.source_title': 'From source',
      'docs.install.source_desc': 'For contributors: Node.js 22, Rust 1.90+, Python 3.12+, uv, and the native dependencies documented in the repository. Develop the Tauri app from main:',

      'docs.connection.title': 'First connection',
      'docs.connection.p1': 'You need at least one saved connection before SQL blocks can run.',
      'docs.connection.s1': 'Open the connection manager (<span class="kbd">Ctrl+Shift+M</span>) or use the database icon in the sidebar.',
      'docs.connection.s2': 'Click <strong>New connection</strong> and fill in host, database, and credentials.',
      'docs.connection.s3': 'Hit <strong>Test connection</strong>, then save.',
      'docs.connection.s4': 'Double-click the connection (or connect from a block header) to attach it to the session.',
      'docs.connection.p2': 'The schema tree loads after connect — that powers autocomplete and Pynia context.',

      'docs.blocks.title': 'Code blocks',
      'docs.blocks.p1':
        'A session is a stack of SQL and Python blocks. Run one block or the whole tab in order. Imported notebook Markdown and raw cells are preserved without execution.',
      'docs.blocks.add_title': 'Add or switch blocks',
      'docs.blocks.add1': '<span class="kbd">+ SQL</span> / <span class="kbd">+ Python</span> in the toolbar',
      'docs.blocks.add2': '<span class="kbd">Ctrl+Shift+B</span> adds a block; choose SQL or Python in its language picker.',
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
        'Optional inline suggestions while you type. Enable Pynia inline suggestions in Settings → Editor and configure an authenticated ACP agent.',

      'docs.db.title': 'Databases',
      'docs.db.p1': 'Supported connectors today:',
      'docs.db.th1': 'Database',
      'docs.db.th2': 'Notes',
      'docs.db.sqlserver': 'Windows Auth, SQL Auth, Microsoft Entra, per-block database',
      'docs.db.mysql': 'Multiple databases, charset options',
      'docs.db.postgresql': 'Schemas, custom types',
      'docs.db.mariadb': 'MySQL-compatible',
      'docs.db.sqlite': 'Local file',
      'docs.db.databricks': 'SQL warehouse, Unity Catalog',

      'docs.exec.title': 'Execution',
      'docs.exec.p1': 'Common shortcuts:',
      'docs.exec.th1': 'Shortcut',
      'docs.exec.th2': 'Action',
      'docs.exec.f5': 'Run selection, or the current block if nothing is selected',
      'docs.exec.ctrl_f5': 'Run every block in order',
      'docs.exec.shift_enter': 'Run current block and move to the next',
      'docs.exec.cross_title': 'SQL → Python',
      'docs.exec.cross_desc': 'The latest SQL result is available in Python (named block or <code>df</code>):',

      'docs.viz.title': 'Visualization',
      'docs.viz.p1': 'Use Python visualization libraries such as matplotlib. Python rich output and charts appear in the results panel.',
      'docs.viz.p2': 'Pynia can also build charts via the <code>datapyn_chart</code> tool when you ask in chat.',

      'docs.import.title': 'Import & export',
      'docs.import.drag_title': 'Drag & drop',
      'docs.import.drag_desc': 'Drop CSV, Excel, JSON, or Parquet into the editor — DataPyn inserts a Python read call with import options. SQL, Python, Jupyter notebooks, and .dpw workspaces can also be opened.',
      'docs.import.out_title': 'Export',
      'docs.import.out1': 'Results grid → Excel / CSV / JSON / SQL / Parquet (context menu); direct SQL download supports CSV and Parquet.',
      'docs.import.out2': 'Menu → Export → Python script (standalone pipeline)',
      'docs.import.out3': 'Workspace <code>.dpw</code> — tabs, blocks, and connection refs',

      'docs.pynia.title': 'What is Pynia',
      'docs.pynia.p1':
        'Pynia connects DataPyn to Claude, Cursor, GitHub Copilot, and Codex through ACP. Each tab has its own agent conversation and history.',
      'docs.pynia.p2':
        'It sees the active tab, blocks, connection, schema, and selection. Ask in plain language; Pynia can read context, run SQL/Python, edit blocks, and chart results.',
      'docs.pynia.warn_title': 'Billing is on you',
      'docs.pynia.warn':
        'DataPyn is free and open source. Your chosen agent uses its own installation, account, authentication, and plan. Charges and model availability depend on that agent.',

      'docs.pynia_setup.title': 'Agents & settings',
      'docs.pynia_setup.p1': 'Open <strong>Agents & configuration</strong> using the gear in the Pynia chat panel.',
      'docs.pynia_setup.copilot':
        '<strong>GitHub Copilot</strong> — Install or update the agent and use its GitHub login flow.',
      'docs.pynia_setup.claude': '<strong>Claude</strong> — Install the agent and authenticate with your Claude account.',
      'docs.pynia_setup.cursor': '<strong>Cursor</strong> — Use the installed Cursor agent and its authentication flow.',
      'docs.pynia_setup.codex': '<strong>Codex</strong> — Install the agent and use its authentication flow.',
      'docs.pynia_setup.tip':
        'The agent manager offers installation, login instructions, and installation checks. Choose an agent for each tab; after the first message, it stays associated with that conversation. Start a new chat to choose another.',

      'docs.pynia_chat.title': 'Chat',
      'docs.pynia_chat.p1': 'Open the Pynia panel from the toolbar or the View menu.',
      'docs.pynia_chat.p2':
        'Use <code>@</code> references for blocks, variables, selection, and schema. Attach files or images when the agent supports them. Permission requests and questions are answered in the chat.',
      'docs.pynia_chat.p3':
        'Choose a model and reasoning level in the composer when the agent exposes those options. Each tab keeps its own chat history; cancel a response from the send button.',

      'docs.pynia_ac.title': 'Inline autocomplete',
      'docs.pynia_ac.p1':
        'Ghost-text completions while typing in SQL/Python blocks. Enable Pynia inline suggestions under Settings → Editor. Ctrl+. requests a suggestion and Tab accepts it.',
      'docs.pynia_ac.p2':
        'Requires an installed, authenticated ACP agent. Inline completion uses its own agent session; local schema and Python autocomplete are also available.',

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
      'docs.shortcuts.add_block': 'Add block',
      'docs.shortcuts.connections': 'Manage connections',
      'docs.shortcuts.pynia_title': 'Pynia & connections',

      'docs.faq.title': 'FAQ',
      'docs.faq.q1': 'Windows Auth for SQL Server?',
      'docs.faq.a1': 'In the connection dialog choose Windows authentication — DataPyn uses your logged-in Windows user.',
      'docs.faq.q2': 'Multiple databases in one file?',
      'docs.faq.a2': 'Yes. Each SQL block has its own connection selector in the block header.',
      'docs.faq.q3': 'Where are passwords stored?',
      'docs.faq.a3': 'Saved connection credentials use your operating system credential store under DataPyn.Tauri.Connections. Tauri settings and credentials are separate from the historical app.',
      'docs.faq.q4': 'How do I open Pynia?',
      'docs.faq.a4': 'Use the Pynia toolbar button or show the Pynia panel from the View menu.',
      'docs.faq.q5': 'Which agents are available?',
      'docs.faq.a5': 'Claude, Cursor, GitHub Copilot, and Codex. Open Agents & configuration to check installation and authentication, then choose an agent for the tab.',
      'docs.faq.q6': 'Export as a .py script?',
      'docs.faq.a6': 'Menu → Export → Python script. Queries are embedded; Python blocks are copied verbatim.',

      'docs.footer.license': 'DataPyn — MIT License',
    },
    pt: {
      'docs.page_title': 'Documentação — DataPyn',
      'docs.nav.home': 'Início',
      'docs.nav.downloads': 'Downloads',
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
      'docs.nav.pynia_setup': 'Agentes e configuração',
      'docs.nav.pynia_chat': 'Chat',
      'docs.nav.pynia_ac': 'Autocomplete inline',
      'docs.nav.pynia_tools': 'Ferramentas',
      'docs.nav.pynia_prompts': 'Exemplos de prompts',
      'docs.nav.ref': 'Referência',
      'docs.nav.shortcuts': 'Atalhos',
      'docs.nav.faq': 'FAQ',

      'docs.intro.title': 'Introdução',
      'docs.intro.p1':
        'O DataPyn é uma IDE desktop construída com Tauri pra quem vive de dados. SQL e Python na mesma sessão — consulte, transforme, gere gráficos e exporte.',
      'docs.intro.p2':
        'A Pynia é a IA dentro do DataPyn. Escolha Claude, Cursor, GitHub Copilot ou Codex, instale e faça login no agente, e converse no mesmo lugar onde roda as consultas.',
      'docs.intro.f1_title': 'Blocos mistos',
      'docs.intro.f1_desc': 'Blocos SQL e Python no mesmo arquivo. Resultado SQL vira DataFrame automaticamente.',
      'docs.intro.f2_title': 'Conexão por bloco',
      'docs.intro.f2_desc': 'Cada bloco SQL pode usar uma conexão salva diferente.',
      'docs.intro.f3_title': 'Pynia',
      'docs.intro.f3_desc': 'Chat, editar blocos, ver schema, rodar SQL — com o provedor que você quiser.',
      'docs.intro.f4_title': 'Monaco + SQL offline',
      'docs.intro.f4_desc': 'Autocomplete e validação pelo schema, inclusive referências cross-database tipo outro_banco..tabela.',

      'docs.install.title': 'Instalação',
      'docs.install.channel': 'Escolha o canal Tauri, com tags tauri-vX.Y.Z. Python e bibliotecas de análise já vêm embutidos. O canal histórico PyQt6 tem instaladores e atualizações separados.',
      'docs.install.windows_title': 'Windows',
      'docs.install.windows_desc':
        'Windows x64: escolha o Setup.exe Tauri ou o ZIP portátil. O Setup inclui WebView2 e prepara o driver ODBC do SQL Server quando necessário. No ZIP, mantenha os dois executáveis juntos; WebView2 e ODBC são pré-requisitos do portátil.',
      'docs.install.linux_title': 'Linux',
      'docs.install.linux_desc':
        'Linux x64, Ubuntu 22.04+: escolha DEB, AppImage ou tar.gz. SQL Server exige unixODBC e o driver ODBC da Microsoft. Use APPIMAGE_EXTRACT_AND_RUN=1 quando FUSE não estiver disponível. DEB e tar.gz mantêm um AppImage atualizável no perfil do usuário.',
      'docs.install.macos_title': 'macOS',
      'docs.install.macos_desc':
        'macOS 14+, Apple Silicon: baixe o DMG Tauri e copie DataPyn Tauri para Applications. A distribuição atual pode exigir liberação em Privacidade e Segurança. SQL Server exige o driver ODBC Microsoft arm64 e unixODBC nativos.',
      'docs.install.downloads_page': 'Todos os downloads',
      'docs.install.releases_link': 'Releases Tauri',
      'docs.install.update_title': 'Atualizações',
      'docs.install.update_desc': 'Windows, Linux e macOS usam o canal de atualização assinado do Tauri. O download ocorre em segundo plano; quando estiver pronto, salve seu trabalho e instale pelo app. A instalação aguarda o fim das operações em andamento.',
      'docs.install.source_title': 'Pelo código-fonte',
      'docs.install.source_desc': 'Para contribuir: Node.js 22, Rust 1.90+, Python 3.12+, uv e dependências nativas descritas no repositório. Desenvolva o app Tauri a partir de main:',

      'docs.connection.title': 'Primeira conexão',
      'docs.connection.p1': 'Você precisa de pelo menos uma conexão salva antes de rodar SQL.',
      'docs.connection.s1': 'Abra o gerenciador de conexões (<span class="kbd">Ctrl+Shift+M</span>) ou o ícone de banco na barra lateral.',
      'docs.connection.s2': 'Clique em <strong>Nova conexão</strong> e preencha host, banco e credenciais.',
      'docs.connection.s3': 'Use <strong>Testar conexão</strong> e salve.',
      'docs.connection.s4': 'Dê duplo clique na conexão (ou conecte pelo cabeçalho do bloco) pra ligar na sessão.',
      'docs.connection.p2': 'O schema carrega depois da conexão — isso alimenta autocomplete e contexto da Pynia.',

      'docs.blocks.title': 'Blocos de código',
      'docs.blocks.p1':
        'Uma sessão é uma pilha de blocos SQL e Python. Rode um ou a aba inteira em sequência. Células Markdown e raw de notebooks importados são preservadas sem execução.',
      'docs.blocks.add_title': 'Adicionar ou trocar blocos',
      'docs.blocks.add1': '<span class="kbd">+ SQL</span> / <span class="kbd">+ Python</span> na barra',
      'docs.blocks.add2': '<span class="kbd">Ctrl+Shift+B</span> adiciona um bloco; escolha SQL ou Python no seletor de linguagem.',
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
        'Sugestões inline opcionais enquanto digita. Ative as sugestões da Pynia em Configurações → Editor e configure um agente ACP autenticado.',

      'docs.db.title': 'Bancos de dados',
      'docs.db.p1': 'Conectores suportados hoje:',
      'docs.db.th1': 'Banco',
      'docs.db.th2': 'Observações',
      'docs.db.sqlserver': 'Windows Auth, SQL Auth, Microsoft Entra, banco por bloco',
      'docs.db.mysql': 'Vários bancos, charset configurável',
      'docs.db.postgresql': 'Schemas, tipos customizados',
      'docs.db.mariadb': 'Compatível com MySQL',
      'docs.db.sqlite': 'Arquivo local',
      'docs.db.databricks': 'SQL warehouse, Unity Catalog',

      'docs.exec.title': 'Execução',
      'docs.exec.p1': 'Atalhos mais usados:',
      'docs.exec.th1': 'Atalho',
      'docs.exec.th2': 'Ação',
      'docs.exec.f5': 'Roda a seleção, ou o bloco atual se nada estiver selecionado',
      'docs.exec.ctrl_f5': 'Roda todos os blocos em ordem',
      'docs.exec.shift_enter': 'Roda o bloco atual e vai pro próximo',
      'docs.exec.cross_title': 'SQL → Python',
      'docs.exec.cross_desc': 'O último resultado SQL fica disponível no Python (bloco nomeado ou <code>df</code>):',

      'docs.viz.title': 'Visualização',
      'docs.viz.p1': 'Use bibliotecas de visualização Python como matplotlib. Saída rica Python e gráficos aparecem no painel de resultados.',
      'docs.viz.p2': 'A Pynia também monta gráficos pela ferramenta <code>datapyn_chart</code> quando você pede no chat.',

      'docs.import.title': 'Importar e exportar',
      'docs.import.drag_title': 'Arrastar e soltar',
      'docs.import.drag_desc': 'Solte CSV, Excel, JSON ou Parquet no editor — o DataPyn insere um leitor Python com opções de importação. Também é possível abrir SQL, Python, notebooks Jupyter e workspaces .dpw.',
      'docs.import.out_title': 'Exportar',
      'docs.import.out1': 'Grid de resultados → Excel / CSV / JSON / SQL / Parquet (menu de contexto); download direto do SQL suporta CSV e Parquet.',
      'docs.import.out2': 'Menu → Exportar → Script Python (pipeline standalone)',
      'docs.import.out3': 'Workspace <code>.dpw</code> — abas, blocos e refs de conexão',

      'docs.pynia.title': 'O que é a Pynia',
      'docs.pynia.p1':
        'A Pynia conecta o DataPyn a Claude, Cursor, GitHub Copilot e Codex via ACP. Cada aba tem sua própria conversa e histórico com o agente.',
      'docs.pynia.p2':
        'Ela enxerga aba ativa, blocos, conexão, schema e seleção. Pergunta em linguagem natural; a Pynia lê contexto, roda SQL/Python, edita blocos e gera gráficos.',
      'docs.pynia.warn_title': 'Cobrança é sua',
      'docs.pynia.warn':
        'O DataPyn é gratuito e open source. O agente escolhido usa sua própria instalação, conta, autenticação e plano. Cobrança e modelos disponíveis dependem desse agente.',

      'docs.pynia_setup.title': 'Agentes e configurações',
      'docs.pynia_setup.p1': 'Abra <strong>Agentes e configuração</strong> pela engrenagem no painel de chat Pynia.',
      'docs.pynia_setup.copilot':
        '<strong>GitHub Copilot</strong> — Instale ou atualize o agente e use o fluxo de login GitHub dele.',
      'docs.pynia_setup.claude': '<strong>Claude</strong> — Instale o agente e autentique com sua conta Claude.',
      'docs.pynia_setup.cursor': '<strong>Cursor</strong> — Use o agente Cursor instalado e seu fluxo de autenticação.',
      'docs.pynia_setup.codex': '<strong>Codex</strong> — Instale o agente e use o fluxo de autenticação dele.',
      'docs.pynia_setup.tip':
        'O gerenciador oferece instalação, instruções de login e verificação de instalações. Escolha um agente por aba; após a primeira mensagem, ele fica associado à conversa. Inicie um novo chat para escolher outro.',

      'docs.pynia_chat.title': 'Chat',
      'docs.pynia_chat.p1': 'Abra o painel Pynia pela barra de ferramentas ou pelo menu Exibir.',
      'docs.pynia_chat.p2':
        'Use referências <code>@</code> para blocos, variáveis, seleção e schema. Anexe arquivos ou imagens quando o agente oferecer suporte. Responda no chat às solicitações de permissão e perguntas.',
      'docs.pynia_chat.p3':
        'Escolha modelo e nível de raciocínio no campo de mensagem quando o agente oferecer essas opções. Cada aba mantém seu histórico; cancele uma resposta pelo botão de envio.',

      'docs.pynia_ac.title': 'Autocomplete inline',
      'docs.pynia_ac.p1':
        'Sugestões em ghost text enquanto digita em blocos SQL/Python. Ative as sugestões da Pynia em Configurações → Editor. Ctrl+. solicita uma sugestão e Tab aceita.',
      'docs.pynia_ac.p2':
        'Exige agente ACP instalado e autenticado. O autocomplete inline usa uma sessão própria do agente; autocomplete local de schema e Python também está disponível.',

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
      'docs.shortcuts.add_block': 'Adicionar bloco',
      'docs.shortcuts.connections': 'Gerenciar conexões',
      'docs.shortcuts.pynia_title': 'Pynia e conexões',

      'docs.faq.title': 'FAQ',
      'docs.faq.q1': 'Windows Auth no SQL Server?',
      'docs.faq.a1': 'No diálogo de conexão escolha autenticação Windows — o DataPyn usa seu usuário logado.',
      'docs.faq.q2': 'Vários bancos no mesmo arquivo?',
      'docs.faq.a2': 'Sim. Cada bloco SQL tem seletor de conexão no cabeçalho.',
      'docs.faq.q3': 'Onde ficam as senhas?',
      'docs.faq.a3': 'As credenciais salvas usam o cofre do sistema operacional sob DataPyn.Tauri.Connections. Configurações e credenciais Tauri são separadas do app histórico.',
      'docs.faq.q4': 'Como abro a Pynia?',
      'docs.faq.a4': 'Use o botão Pynia na barra de ferramentas ou mostre o painel pelo menu Exibir.',
      'docs.faq.q5': 'Quais agentes estão disponíveis?',
      'docs.faq.a5': 'Claude, Cursor, GitHub Copilot e Codex. Abra Agentes e configuração para verificar instalação e autenticação, e escolha um agente para a aba.',
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
