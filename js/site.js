(function () {
  'use strict';

  const STORAGE_KEY = 'datapyn-lang';
  const SETUP_DOWNLOAD_URL =
    'https://github.com/natharuc/datapyn/releases/latest/download/DataPyn-Setup.exe';

  const translations = {
    en: {
      'nav.features': 'Features',
      'nav.pynia': 'Pynia',
      'nav.databases': 'Databases',
      'nav.docs': 'Docs',
      'nav.github': 'GitHub',
      'nav.download': 'Download',
      'download.releases': 'View Releases',
      'hero.badge': 'Desktop IDE · SQL + Python',
      'hero.title': 'One workspace for queries, pipelines, and analysis.',
      'hero.lead':
        'DataPyn is built for analysts and data engineers who work directly against databases: block-based SQL and Python, Monaco editing with schema intelligence, and Pynia for LLM-assisted development — connect GitHub Copilot, OpenAI, Anthropic, or Open Router under Settings → Pynia.',
      'hero.cta.primary': 'Download',
      'hero.cta.secondary': 'Documentation',
      'hero.meta.windows': 'Windows',
      'hero.meta.offline': 'Offline SQL completion',
      'hero.meta.open': 'Open source',
      'preview.title': 'session.sql — DataPyn',
      'preview.chat.title': 'Pynia',
      'preview.chat.sub': 'Session-aware assistant',
      'preview.user': 'Aggregate revenue by region for Q1 2025.',
      'preview.agent': 'Proposed T-SQL and a pandas follow-up:',
      'preview.block.sql': 'SQL',
      'preview.block.python': 'Python',
      'preview.block.connection': 'SQL Server · sales',
      'preview.composer': 'Ask Pynia about this session…',
      'features.title': 'Engineering-oriented workflow',
      'features.sub':
        'Designed for reproducible analysis: named block outputs, per-connection schema, and export to scripts or workspace files.',
      'features.blocks.title': 'SQL + Python blocks',
      'features.blocks.desc':
        'Interleave queries and scripts in one document. Execute a single block, a selection, or the full tab; SQL results surface as named DataFrames in Python.',
      'features.schema.title': 'Schema-driven SQL',
      'features.schema.desc':
        'Autocomplete and validation from live metadata, including cross-database references (e.g. catalog..table). Core completions work offline on the local schema cache.',
      'features.connect.title': 'Enterprise databases',
      'features.connect.desc':
        'SQL Server, PostgreSQL, MySQL, MariaDB, SQLite, Databricks — with per-block connection binding.',
      'features.session.title': 'Tabs & workspaces',
      'features.session.desc':
        'Multiple sessions with isolated Python namespaces. Save and restore .dpw workspaces with connections and layout.',
      'features.monaco.title': 'Monaco editor',
      'features.monaco.desc':
        'Syntax highlighting, minimap, find/replace, and optional Pynia inline ghost completions for SQL and Python blocks.',
      'features.export.title': 'Export & integration',
      'features.export.desc':
        'Export result grids to Excel/CSV/JSON, generate standalone Python scripts, or hand off logic to your orchestration stack.',
      'pynia.eyebrow': 'Pynia',
      'pynia.title': 'LLM assistance with full session context',
      'pynia.lead':
        'Pynia is integrated into the IDE: it reads the active connection, schema, blocks, and selection, then can author SQL/Python, run blocks via tool calls, inspect results, and build charts — using whichever connector your organization already standardizes on.',
      'pynia.l1.title': 'Connector choice',
      'pynia.l1.desc': 'GitHub Copilot (device login), OpenAI, Anthropic, and Open Router — each with its own credentials and model list.',
      'pynia.l2.title': 'Grounded in metadata',
      'pynia.l2.desc': 'Tooling exposes workspace state, table/column lists, block code, and execution output — not a disconnected chat window.',
      'pynia.l3.title': 'SQL → Python continuity',
      'pynia.l3.desc': 'Generate or refactor queries, then chain pandas/matplotlib steps on the same result set inside the session.',
      'pynia.notice':
        'LLM usage is billed by the provider (Copilot subscription or API credits). Configure connectors in Settings → Pynia.',
      'providers.label': 'LLM connectors',
      'databases.title': 'Database connectivity',
      'databases.sub': 'Native drivers, encrypted credential storage, and connection testing from the manager panel.',
      'start.title': 'Quick start',
      'start.sub': 'Typical setup for a Windows workstation.',
      'start.s1.title': 'Install DataPyn',
      'start.s1.desc': 'Download DataPyn-Setup.exe from GitHub Releases (installs the latest build).',
      'start.s2.title': 'Register a connection',
      'start.s2.desc': 'Define host, database, and auth in Connections; validate before saving.',
      'start.s3.title': 'Configure Pynia (optional)',
      'start.s3.desc': 'Add API tokens or sign in to GitHub Copilot under Settings → Pynia.',
      'start.s4.title': 'Execute blocks',
      'start.s4.desc': 'Run with F5 or Shift+Enter; open the Pynia panel from the toolbar when you need generation or explanation.',
      'docs.title': 'Documentation',
      'docs.sub': 'Connections, block model, SQL editor behavior, Pynia connectors, and shortcuts.',
      'docs.all': 'Full documentation',
      'docs.connections': 'Connections',
      'docs.pynia': 'Pynia',
      'docs.sql': 'SQL editor',
      'cta.title': 'Run your next analysis in a single IDE',
      'cta.sub': 'Install DataPyn, connect to your databases, and optionally wire Pynia to your LLM provider.',
      'footer.tagline': 'DataPyn — SQL + Python IDE with Pynia',
      'cta.btn': 'Download for Windows',
      'footer.docs': 'Documentation',
      'footer.github': 'GitHub',
      'footer.license': 'Open source',
    },
    pt: {
      'nav.features': 'Recursos',
      'nav.pynia': 'Pynia',
      'nav.databases': 'Bancos',
      'nav.docs': 'Docs',
      'nav.github': 'GitHub',
      'nav.download': 'Download',
      'download.releases': 'Ver Releases',
      'hero.badge': 'IDE desktop · SQL + Python',
      'hero.title': 'Um ambiente para consultas, pipelines e análise.',
      'hero.lead':
        'O DataPyn é voltado a analistas e engenheiros de dados que trabalham direto no banco: blocos SQL e Python no mesmo documento, editor Monaco com inteligência de schema e a Pynia para apoio com LLM — configure GitHub Copilot, OpenAI, Anthropic ou Open Router em Configurações → Pynia.',
      'hero.cta.primary': 'Download',
      'hero.cta.secondary': 'Documentação',
      'hero.meta.windows': 'Windows',
      'hero.meta.offline': 'Autocomplete SQL offline',
      'hero.meta.open': 'Código aberto',
      'preview.title': 'sessao.sql — DataPyn',
      'preview.chat.title': 'Pynia',
      'preview.chat.sub': 'Assistente com contexto da sessão',
      'preview.user': 'Agregue receita por região no 1º trimestre de 2025.',
      'preview.agent': 'Sugestão de T-SQL e complemento em pandas:',
      'preview.block.sql': 'SQL',
      'preview.block.python': 'Python',
      'preview.block.connection': 'SQL Server · vendas',
      'preview.composer': 'Pergunte à Pynia sobre esta sessão…',
      'features.title': 'Fluxo orientado a engenharia de dados',
      'features.sub':
        'Análises reproduzíveis: saídas nomeadas por bloco, schema por conexão e exportação para script ou workspace.',
      'features.blocks.title': 'Blocos SQL + Python',
      'features.blocks.desc':
        'Intercale consultas e scripts no mesmo arquivo. Execute bloco, seleção ou aba inteira; o resultado SQL vira DataFrame nomeado no Python.',
      'features.schema.title': 'SQL guiado pelo schema',
      'features.schema.desc':
        'Autocomplete e validação a partir do metadata da conexão, inclusive referências cross-database (ex.: catalogo..tabela). O núcleo do autocomplete funciona offline no cache local.',
      'features.connect.title': 'Bancos corporativos',
      'features.connect.desc':
        'SQL Server, PostgreSQL, MySQL, MariaDB, SQLite, Databricks — com vínculo de conexão por bloco.',
      'features.session.title': 'Abas e workspaces',
      'features.session.desc':
        'Várias sessões com namespace Python isolado. Salve e restaure workspaces .dpw com conexões e layout.',
      'features.monaco.title': 'Editor Monaco',
      'features.monaco.desc':
        'Destaque de sintaxe, minimapa, busca/substituição e ghost text opcional da Pynia em blocos SQL e Python.',
      'features.export.title': 'Exportação e integração',
      'features.export.desc':
        'Exporte grids para Excel/CSV/JSON, gere scripts Python standalone ou encaminhe a lógica ao seu orquestrador.',
      'pynia.eyebrow': 'Pynia',
      'pynia.title': 'Assistência por LLM com contexto da sessão',
      'pynia.lead':
        'A Pynia está integrada ao IDE: enxerga conexão ativa, schema, blocos e seleção; pode produzir SQL/Python, executar blocos via ferramentas, inspecionar resultados e montar gráficos — usando o conector que sua equipe já padronizou.',
      'pynia.l1.title': 'Escolha do conector',
      'pynia.l1.desc': 'GitHub Copilot (login por dispositivo), OpenAI, Anthropic e Open Router — credenciais e lista de modelos por provedor.',
      'pynia.l2.title': 'Ancorada no metadata',
      'pynia.l2.desc': 'Ferramentas expõem estado do workspace, tabelas/colunas, código dos blocos e saída de execução — não é um chat desconectado do editor.',
      'pynia.l3.title': 'Continuidade SQL → Python',
      'pynia.l3.desc': 'Gere ou refatore consultas e encadeie pandas/matplotlib no mesmo resultado, dentro da sessão.',
      'pynia.notice':
        'O uso de LLM é cobrado pelo provedor (assinatura Copilot ou créditos de API). Configure os conectores em Configurações → Pynia.',
      'providers.label': 'Conectores de LLM',
      'databases.title': 'Conectividade com bancos',
      'databases.sub': 'Drivers nativos, credenciais criptografadas localmente e teste de conexão no gerenciador.',
      'start.title': 'Início rápido',
      'start.sub': 'Configuração típica em estação Windows.',
      'start.s1.title': 'Instalar o DataPyn',
      'start.s1.desc': 'Baixe o DataPyn-Setup.exe em Releases no GitHub (instala a build mais recente).',
      'start.s2.title': 'Cadastrar conexão',
      'start.s2.desc': 'Informe host, banco e autenticação em Conexões; valide antes de salvar.',
      'start.s3.title': 'Configurar a Pynia (opcional)',
      'start.s3.desc': 'Informe tokens de API ou autentique no GitHub Copilot em Configurações → Pynia.',
      'start.s4.title': 'Executar blocos',
      'start.s4.desc': 'Use F5 ou Shift+Enter; abra o painel Pynia na barra de ferramentas quando precisar gerar ou explicar código.',
      'docs.title': 'Documentação',
      'docs.sub': 'Conexões, modelo de blocos, editor SQL, conectores Pynia e atalhos.',
      'docs.all': 'Documentação completa',
      'docs.connections': 'Conexões',
      'docs.pynia': 'Pynia',
      'docs.sql': 'Editor SQL',
      'cta.title': 'Concentre a próxima análise em um único IDE',
      'cta.sub': 'Instale o DataPyn, conecte aos seus bancos e, se quiser, vincule a Pynia ao provedor de LLM da sua equipe.',
      'footer.tagline': 'DataPyn — IDE SQL + Python com Pynia',
      'cta.btn': 'Download para Windows',
      'footer.docs': 'Documentação',
      'footer.github': 'GitHub',
      'footer.license': 'Código aberto',
    },
  };

  function getLang() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'pt' || stored === 'en') return stored;
    const nav = (navigator.language || '').toLowerCase();
    return nav.startsWith('pt') ? 'pt' : 'en';
  }

  function setLang(lang) {
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
    applyTranslations(lang);
    document.querySelectorAll('.lang-switch button').forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });
  }

  function applyTranslations(lang) {
    const dict = translations[lang] || translations.en;
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      const text = dict[key];
      if (text == null) return;
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = text;
      } else {
        el.textContent = text;
      }
    });
  }

  function initLang() {
    const lang = getLang();
    setLang(lang);
    document.querySelectorAll('.lang-switch button').forEach((btn) => {
      btn.addEventListener('click', () => setLang(btn.dataset.lang));
    });
  }

  function initMobileNav() {
    const toggle = document.getElementById('menu-toggle');
    const drawer = document.getElementById('mobile-drawer');
    if (!toggle || !drawer) return;

    toggle.addEventListener('click', () => {
      const open = drawer.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    drawer.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        drawer.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  function initNavShadow() {
    const nav = document.querySelector('.nav');
    if (!nav) return;
    window.addEventListener(
      'scroll',
      () => {
        nav.style.borderColor =
          window.scrollY > 8
            ? 'rgba(148, 163, 184, 0.18)'
            : 'rgba(148, 163, 184, 0.12)';
      },
      { passive: true }
    );
  }

  function pickSetupAsset(assets) {
    return (
      assets.find((a) => a.name === 'DataPyn-Setup.exe') ||
      assets.find((a) => /^DataPyn-Setup-[\d.]+\.exe$/i.test(a.name)) ||
      null
    );
  }

  function applyDownloadButtons(buttons, downloadUrl, version, lang) {
    buttons.forEach(({ btn, text }) => {
      btn.href = downloadUrl;
      if (!text) return;
      text.removeAttribute('data-i18n');
      if (text.id === 'download-text-nav') {
        text.textContent = version ? `v${version}` : lang === 'pt' ? 'Baixar' : 'Download';
      } else if (text.id === 'download-text-hero') {
        text.textContent = version
          ? lang === 'pt'
            ? `Baixar v${version}`
            : `Download v${version}`
          : lang === 'pt'
            ? 'Baixar Setup'
            : 'Download Setup';
      } else {
        text.textContent = version
          ? lang === 'pt'
            ? `Download para Windows v${version}`
            : `Download for Windows v${version}`
          : lang === 'pt'
            ? 'Download para Windows'
            : 'Download for Windows';
      }
    });
  }

  async function initDownloadLinks() {
    const isWindows = /Win/i.test(navigator.platform) || /Windows/i.test(navigator.userAgent);
    const buttons = [
      { btn: document.getElementById('download-btn-nav'), text: document.getElementById('download-text-nav') },
      { btn: document.getElementById('download-btn-hero'), text: document.getElementById('download-text-hero') },
      { btn: document.getElementById('download-btn-cta'), text: document.getElementById('download-text-cta') },
    ].filter((x) => x.btn);

    if (!buttons.length) return;

    const lang = getLang();
    const dict = translations[lang] || translations.en;

    if (!isWindows) {
      buttons.forEach(({ btn, text }) => {
        btn.href = 'https://github.com/natharuc/datapyn/releases/latest';
        if (!text) return;
        text.setAttribute('data-i18n', 'download.releases');
        text.textContent = dict['download.releases'];
      });
      return;
    }

    applyDownloadButtons(buttons, SETUP_DOWNLOAD_URL, null, lang);

    const CACHE_KEY = 'datapyn-release-cache';
    const CACHE_DURATION = 60 * 1000;
    let releaseData = null;

    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_DURATION) releaseData = data;
      }
    } catch (_) {
      /* ignore */
    }

    if (!releaseData) {
      try {
        const response = await fetch(
          'https://api.github.com/repos/natharuc/datapyn/releases/latest'
        );
        if (response.ok) {
          releaseData = await response.json();
          try {
            localStorage.setItem(
              CACHE_KEY,
              JSON.stringify({ data: releaseData, timestamp: Date.now() })
            );
          } catch (_) {
            /* ignore */
          }
        }
      } catch (_) {
        /* ignore */
      }
    }

    if (!releaseData) return;

    const setupAsset = pickSetupAsset(releaseData.assets || []);
    const version = releaseData.tag_name.replace(/^v/, '');
    const downloadUrl = setupAsset
      ? setupAsset.browser_download_url
      : SETUP_DOWNLOAD_URL;

    applyDownloadButtons(buttons, downloadUrl, version, lang);
  }

  document.addEventListener('DOMContentLoaded', () => {
    initLang();
    initMobileNav();
    initNavShadow();
    initDownloadLinks();
    if (window.lucide) window.lucide.createIcons();
  });
})();
