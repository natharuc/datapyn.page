(function () {
  'use strict';

  const STORAGE_KEY = 'datapyn-lang';
  let activeLang = null;
  const RELEASES_PAGE_URL = 'https://github.com/natharuc/datapyn/releases';
  const DOWNLOADS_PAGE = 'downloads.html';
  const ASSET_BUTTONS = {
    windows: 'dl-btn-windows', windowsZip: 'dl-btn-windows-zip',
    linuxDeb: 'dl-btn-linux-deb', linuxAppImage: 'dl-btn-linux-appimage',
    linuxTarball: 'dl-btn-linux-tar', macos: 'dl-btn-macos', checksums: 'dl-btn-checksums',
  };
  let downloadState = { os: 'other', linuxFamily: 'universal', version: null, urls: {}, source: null, releaseUrl: RELEASES_PAGE_URL };

  const translations = {
    en: {
      'nav.features': 'Features',
      'nav.pynia': 'Pynia',
      'nav.databases': 'Databases',
      'nav.docs': 'Docs',
      'nav.github': 'GitHub',
      'nav.download': "Download",
      'nav.downloads': 'Downloads',
      'download.releases': 'View Releases',
      'download.all': 'All downloads',
      'hero.badge': "Tauri desktop · SQL + Python",
      'hero.title': 'One workspace for queries, pipelines, and analysis.',
      'hero.lead': "A desktop workspace built with Tauri for analysts and data engineers. Combine SQL and Python blocks, explore your database with Monaco, and work with Pynia using Claude, Cursor, GitHub Copilot, or Codex. Python is included.",
      'hero.cta.primary': 'Download',
      'hero.cta.secondary': 'Documentation',
      'hero.cta.downloads': 'All downloads',
      'hero.meta.windows': 'Windows',
      'hero.meta.platforms': "Windows · Linux · macOS",
      'hero.meta.offline': 'Offline SQL completion',
      'hero.meta.open': 'Open source',
      'preview.title': "DataPyn · Tauri",
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
      'features.session.desc': "Keep independent Python sessions in tabs, arrange dockable panels, and save your work in .dpw workspaces.",
      'features.monaco.title': 'Monaco editor',
      'features.monaco.desc': "Syntax highlighting, find/replace, schema-aware SQL completion, and optional Pynia inline suggestions.",
      'features.export.title': 'Export & integration',
      'features.export.desc': "Import CSV, JSON, and Excel files. Export result grids, charts, Python scripts, and .dpw workspaces.",
      'pynia.eyebrow': 'Pynia',
      'pynia.title': "Your coding agent, inside the workspace",
      'pynia.lead': "Pynia connects Claude, Cursor, GitHub Copilot, and Codex to the active session. Ask it to explore the schema, write SQL and Python, inspect results, and build charts. Review permissions in the conversation before an agent proceeds.",
      'pynia.l1.title': "Choose your agent",
      'pynia.l1.desc': "Claude, Cursor, GitHub Copilot, and Codex, with installation and sign-in controls in Pynia settings.",
      'pynia.l2.title': "Session context",
      'pynia.l2.desc': "Each tab keeps its conversation and execution context, including blocks, schema, and results.",
      'pynia.l3.title': 'SQL → Python continuity',
      'pynia.l3.desc': "Write or refactor queries, then continue with Python on the same result set.",
      'pynia.notice': "Agents use their own authentication and subscriptions. Configure your preferred agent in Settings → Pynia.",
      'providers.label': "Available agents",
      'pynia.screenshot.caption': 'Choose your Pynia agent in the Tauri app.',
      'databases.title': 'Database connectivity',
      'databases.sub': "SQL Server, PostgreSQL, MySQL, MariaDB, SQLite, and Databricks, with connections per block.",
      'start.title': 'Quick start',
      'start.sub': "Install on Windows, Linux, or macOS, then connect and run your first block.",
      'start.s1.title': 'Install DataPyn',
      'start.s1.desc': "Download the latest Tauri installer for your platform. The Python runtime is included.",
      'start.s2.title': 'Register a connection',
      'start.s2.desc': 'Define host, database, and auth in Connections; validate before saving.',
      'start.s3.title': 'Configure Pynia (optional)',
      'start.s3.desc': "Choose Claude, Cursor, GitHub Copilot, or Codex in Settings → Pynia and sign in to your agent.",
      'start.s4.title': 'Execute blocks',
      'start.s4.desc': 'Run the current block or selection with F5. Open Pynia from the toolbar when you need help writing or explaining code.',
      'docs.title': 'Documentation',
      'docs.sub': "Installation, connections, blocks, Pynia agents, and shortcuts.",
      'docs.all': 'Full documentation',
      'docs.connections': 'Connections',
      'docs.pynia': 'Pynia',
      'docs.sql': 'SQL editor',
      'cta.title': 'Run your next analysis in a single IDE',
      'cta.sub': "Install the Tauri desktop app, connect your databases, and bring your coding agent into the session.",
      'footer.tagline': 'DataPyn — SQL + Python IDE with Pynia',
      'cta.btn': 'Download',
      'footer.docs': 'Documentation',
      'footer.downloads': 'Downloads',
      'footer.github': 'GitHub',
      'footer.license': 'Open source',
      'dl.title': 'Downloads',
      'dl.sub': "The current DataPyn desktop app, built with Tauri. Python and its database libraries are included.",
      'dl.your_os': 'Your system',
      'dl.windows.title': 'Windows',
      'dl.windows.arch': 'x64 · Windows 10/11',
      'dl.windows.primary': 'Download Setup.exe',
      'dl.windows.zip': 'Portable ZIP',
      'dl.windows.note': "The setup prepares WebView2 and Microsoft ODBC when needed. For the ZIP, keep datapyn-desktop.exe and datapyn-runtime.exe together; WebView2 and ODBC are prerequisites.",
      'dl.linux.title': 'Linux',
      'dl.linux.arch': "x86_64 · Ubuntu 22.04+ base",
      'dl.linux.primary': 'Download .deb',
      'dl.linux.deb': 'Ubuntu / Debian (.deb)',
      'dl.linux.appimage': "AppImage",
      'dl.linux.tarball': "Portable tar.gz",
      'dl.linux.note': "Choose DEB for Ubuntu/Debian, or AppImage/tar.gz for other compatible x86_64 desktops. The DEB and tar.gz launchers prepare a user-managed installation without FUSE. SQL Server via ODBC needs the native Microsoft driver.",
      'dl.macos.title': 'macOS',
      'dl.macos.arch': "Apple Silicon (arm64) · macOS 14+",
      'dl.macos.primary': 'Download .dmg',
      'dl.macos.note': "Open the DMG and copy DataPyn Tauri to Applications. This build is not notarized; if macOS blocks it, allow it in System Settings → Privacy & Security.",
      'dl.source.title': 'From source',
      'dl.source.desc': "Development requires Node.js 22, Rust 1.90+, Python 3.12+, uv, and your platform’s native dependencies.",
      'dl.releases': "All GitHub Releases",
      'preview.caption': "Current Tauri interface · demonstration data",
      'screenshots.title': "A closer look at the Tauri workspace",
      'screenshots.sub': "SQL and Python blocks, result grids, and dockable panels in the current desktop interface.",
      'screenshots.dark': "Dark workspace",
      'screenshots.light': "Light workspace",
      'screenshots.open': "Open full screenshot",
      'features.runtime.title': "Tauri desktop, Python included",
      'features.runtime.desc': "Native installers with the Python runtime and isolated kernels for each session.",
      'dl.release.loading': "Checking the Tauri release",
      'dl.release.current': "Latest Tauri release",
      'dl.release.fallback': "Last verified Tauri release",
      'dl.release.unavailable': 'Tauri installers available below',
      'dl.release.notes': "Release notes",
      'dl.checksums': "Verify downloads (SHA256)",
      'dl.source.requirements': "Development prerequisites",
    },
    pt: {
      'nav.features': 'Recursos',
      'nav.pynia': 'Pynia',
      'nav.databases': 'Bancos',
      'nav.docs': 'Docs',
      'nav.github': 'GitHub',
      'nav.download': "Baixar",
      'nav.downloads': 'Downloads',
      'download.releases': 'Ver Releases',
      'download.all': 'Todos os downloads',
      'hero.badge': "Desktop Tauri · SQL + Python",
      'hero.title': 'Um ambiente para consultas, pipelines e análise.',
      'hero.lead': "Um ambiente desktop feito com Tauri para analistas e engenheiros de dados. Combine blocos SQL e Python, explore seu banco com o Monaco e trabalhe com a Pynia usando Claude, Cursor, GitHub Copilot ou Codex. O Python já vem incluído.",
      'hero.cta.primary': 'Download',
      'hero.cta.secondary': 'Documentação',
      'hero.cta.downloads': 'Todos os downloads',
      'hero.meta.windows': 'Windows',
      'hero.meta.platforms': "Windows · Linux · macOS",
      'hero.meta.offline': 'Autocomplete SQL offline',
      'hero.meta.open': 'Código aberto',
      'preview.title': "DataPyn · Tauri",
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
      'features.session.desc': "Mantenha sessões Python independentes em abas, reorganize os painéis e salve seu trabalho em workspaces .dpw.",
      'features.monaco.title': 'Editor Monaco',
      'features.monaco.desc': "Destaque de sintaxe, busca/substituição, autocomplete SQL baseado no schema e sugestões inline opcionais da Pynia.",
      'features.export.title': 'Exportação e integração',
      'features.export.desc': "Importe CSV, JSON e Excel. Exporte grades de resultados, gráficos, scripts Python e workspaces .dpw.",
      'pynia.eyebrow': 'Pynia',
      'pynia.title': "Seu agente de código, dentro do workspace",
      'pynia.lead': "A Pynia conecta Claude, Cursor, GitHub Copilot e Codex à sessão ativa. Peça para explorar o schema, escrever SQL e Python, inspecionar resultados e criar gráficos. Revise as permissões na conversa antes de o agente prosseguir.",
      'pynia.l1.title': "Escolha seu agente",
      'pynia.l1.desc': "Claude, Cursor, GitHub Copilot e Codex, com controles de instalação e login nas configurações da Pynia.",
      'pynia.l2.title': "Contexto da sessão",
      'pynia.l2.desc': "Cada aba mantém sua conversa e seu contexto de execução, incluindo blocos, schema e resultados.",
      'pynia.l3.title': 'Continuidade SQL → Python',
      'pynia.l3.desc': "Escreva ou refatore consultas e continue em Python no mesmo resultado.",
      'pynia.notice': "Os agentes usam autenticação e assinatura próprias. Configure seu agente em Configurações → Pynia.",
      'providers.label': "Agentes disponíveis",
      'pynia.screenshot.caption': 'Escolha seu agente Pynia no aplicativo Tauri.',
      'databases.title': 'Conectividade com bancos',
      'databases.sub': "SQL Server, PostgreSQL, MySQL, MariaDB, SQLite e Databricks, com conexão por bloco.",
      'start.title': 'Início rápido',
      'start.sub': "Instale no Windows, Linux ou macOS, conecte o banco e execute seu primeiro bloco.",
      'start.s1.title': 'Instalar o DataPyn',
      'start.s1.desc': "Baixe o instalador Tauri mais recente para sua plataforma. O runtime Python vem incluído.",
      'start.s2.title': 'Cadastrar conexão',
      'start.s2.desc': 'Informe host, banco e autenticação em Conexões; valide antes de salvar.',
      'start.s3.title': 'Configurar a Pynia (opcional)',
      'start.s3.desc': "Escolha Claude, Cursor, GitHub Copilot ou Codex em Configurações → Pynia e faça login no agente.",
      'start.s4.title': 'Executar blocos',
      'start.s4.desc': 'Execute o bloco atual ou a seleção com F5. Abra a Pynia pela barra de ferramentas quando precisar escrever ou explicar código.',
      'docs.title': 'Documentação',
      'docs.sub': "Instalação, conexões, blocos, agentes Pynia e atalhos.",
      'docs.all': 'Documentação completa',
      'docs.connections': 'Conexões',
      'docs.pynia': 'Pynia',
      'docs.sql': 'Editor SQL',
      'cta.title': 'Concentre a próxima análise em um único IDE',
      'cta.sub': "Instale o desktop Tauri, conecte seus bancos e traga seu agente de código para a sessão.",
      'footer.tagline': 'DataPyn — IDE SQL + Python com Pynia',
      'cta.btn': 'Download',
      'footer.docs': 'Documentação',
      'footer.downloads': 'Downloads',
      'footer.github': 'GitHub',
      'footer.license': 'Código aberto',
      'dl.title': 'Downloads',
      'dl.sub': "O DataPyn desktop atual, feito com Tauri. Python e suas bibliotecas de banco de dados vêm incluídos.",
      'dl.your_os': 'Seu sistema',
      'dl.windows.title': 'Windows',
      'dl.windows.arch': 'x64 · Windows 10/11',
      'dl.windows.primary': 'Baixar Setup.exe',
      'dl.windows.zip': 'ZIP portátil',
      'dl.windows.note': "O instalador prepara WebView2 e Microsoft ODBC quando necessário. No ZIP, mantenha datapyn-desktop.exe e datapyn-runtime.exe juntos; WebView2 e ODBC são pré-requisitos.",
      'dl.linux.title': 'Linux',
      'dl.linux.arch': "x86_64 · base Ubuntu 22.04+",
      'dl.linux.primary': 'Baixar .deb',
      'dl.linux.deb': 'Ubuntu / Debian (.deb)',
      'dl.linux.appimage': "AppImage",
      'dl.linux.tarball': "tar.gz portátil",
      'dl.linux.note': "Use DEB no Ubuntu/Debian ou AppImage/tar.gz em outros desktops x86_64 compatíveis. Os launchers DEB e tar.gz preparam uma instalação por usuário sem FUSE. SQL Server via ODBC precisa do driver Microsoft nativo.",
      'dl.macos.title': 'macOS',
      'dl.macos.arch': "Apple Silicon (arm64) · macOS 14+",
      'dl.macos.primary': 'Baixar .dmg',
      'dl.macos.note': "Abra o DMG e copie DataPyn Tauri para Applications. Este build não é notarizado; se o macOS bloquear, libere em Ajustes do Sistema → Privacidade e Segurança.",
      'dl.source.title': 'Pelo código-fonte',
      'dl.source.desc': "O desenvolvimento requer Node.js 22, Rust 1.90+, Python 3.12+, uv e as dependências nativas da sua plataforma.",
      'dl.releases': "Todas as releases no GitHub",
      'preview.caption': "Interface Tauri atual · dados de demonstração",
      'screenshots.title': "Conheça o workspace Tauri",
      'screenshots.sub': "Blocos SQL e Python, grades de resultados e painéis reorganizáveis na interface desktop atual.",
      'screenshots.dark': "Workspace escuro",
      'screenshots.light': "Workspace claro",
      'screenshots.open': "Abrir print completo",
      'features.runtime.title': "Desktop Tauri, Python incluído",
      'features.runtime.desc': "Instaladores nativos com runtime Python e kernels isolados por sessão.",
      'dl.release.loading': "Consultando a release Tauri",
      'dl.release.current': "Última release Tauri",
      'dl.release.fallback': "Última release Tauri confirmada",
      'dl.release.unavailable': 'Instaladores Tauri disponíveis abaixo',
      'dl.release.notes': "Notas da versão",
      'dl.checksums': "Verificar downloads (SHA256)",
      'dl.source.requirements': "Pré-requisitos de desenvolvimento",
    },

  };

  function getLang() {
    if (activeLang) return activeLang;
    let stored = null;
    try { stored = localStorage.getItem(STORAGE_KEY); } catch (_) { /* Optional preference. */ }
    if (stored === 'pt' || stored === 'en') return stored;
    const nav = (navigator.language || '').toLowerCase();
    return nav.startsWith('pt') ? 'pt' : 'en';
  }

  function setLang(lang) {
    activeLang = lang;
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (_) { /* Optional preference. */ }
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
    applyTranslations(lang);
    document.querySelectorAll('.lang-switch button').forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    applyCtaFromState();
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

  function detectOS() {
    const ua = String(navigator.userAgent || '').toLowerCase();
    if (/android|iphone|ipad|ipod/.test(ua)) return 'other';
    const uaDataPlatform =
      (navigator.userAgentData && navigator.userAgentData.platform) || '';
    const platform = String(uaDataPlatform || navigator.platform || '').toLowerCase();
    if (platform.includes('win') || ua.includes('windows')) return 'windows';
    if (platform.includes('mac') || ua.includes('macintosh') || ua.includes('mac os')) {
      return 'macos';
    }
    if (platform.includes('linux') || ua.includes('linux') || ua.includes('cros') || ua.includes('x11')) {
      return 'linux';
    }
    return 'other';
  }

  function detectLinuxFamily() {
    const ua = String(navigator.userAgent || '').toLowerCase();
    if (/ubuntu|debian|linux mint|pop!_os|elementary|kali|raspbian|zorin/.test(ua)) {
      return 'debian';
    }
    if (/fedora|rhel|centos|rocky|alma|red hat|suse|opensuse/.test(ua)) {
      return 'rpm';
    }
    if (/arch|manjaro|endeavouros|cachyos|garuda|artix/.test(ua)) {
      return 'arch';
    }
    return 'universal';
  }

  function platformLabel(os) {
    if (os === 'windows') return 'Windows';
    if (os === 'macos') return 'macOS';
    if (os === 'linux') return 'Linux';
    return null;
  }

  function linuxCtaKey() {
    return downloadState.linuxFamily === 'debian' ? 'linuxDeb' : 'linuxAppImage';
  }

  function ctaUrlForOs(os) {
    // Mobile and known unsupported desktop architectures go to the platform list.
    const ua = String(navigator.userAgent || '').toLowerCase();
    if (os !== 'macos' && /aarch64|arm64|armv7|i686/.test(ua)) return DOWNLOADS_PAGE;
    const key = os === 'linux' ? linuxCtaKey() : os;
    return downloadState.urls[key] || DOWNLOADS_PAGE;
  }

  function setBtnHref(id, href) {
    const el = document.getElementById(id);
    if (!el || !href) return;
    el.href = href;
    if (href.startsWith('https:')) {
      el.target = '_blank';
      el.rel = 'noopener';
    } else {
      el.removeAttribute('target');
      el.removeAttribute('rel');
    }
  }

  function applyCtaFromState() {
    const lang = getLang();
    const dict = translations[lang] || translations.en;
    const label = platformLabel(downloadState.os);
    const url = ctaUrlForOs(downloadState.os);
    const buttons = [
      ['download-btn-nav', 'download-text-nav'],
      ['download-btn-hero', 'download-text-hero'],
      ['download-btn-cta', 'download-text-cta'],
      ['download-btn-mobile', null],
    ];
    for (const [id, textId] of buttons) {
      setBtnHref(id, url);
      const text = document.getElementById(textId || id);
      if (!text) continue;
      const direct = url !== DOWNLOADS_PAGE;
      text.textContent = direct
        ? (id === 'download-btn-nav' ? `${dict['nav.download']} v${downloadState.version}` : `${dict['nav.download']} ${label} · v${downloadState.version}`)
        : dict['download.all'];
    }
    applyDownloadsPageLinks();
  }

  function applyDownloadsPageLinks() {
    if (downloadState.version) {
      for (const [key, id] of Object.entries(ASSET_BUTTONS)) {
        const button = document.getElementById(id);
        if (!button) continue;
        button.hidden = !downloadState.urls[key];
        if (downloadState.urls[key]) setBtnHref(id, downloadState.urls[key]);
      }
      setBtnHref('dl-release-link', downloadState.releaseUrl);
    }
    const linuxKey = linuxCtaKey();
    document.querySelectorAll('[data-linux-format]').forEach((button) => {
      const recommended = downloadState.os === 'linux' && button.dataset.linuxFormat === linuxKey;
      button.classList.toggle('recommended', recommended);
      button.classList.toggle('btn-primary', recommended);
      button.classList.toggle('btn-ghost', !recommended);
    });
    document.querySelectorAll('.dl-card[data-os]').forEach((card) => {
      const detected = card.dataset.os === downloadState.os;
      card.classList.toggle('detected', detected);
      const badge = card.querySelector('.dl-detected-badge');
      if (badge) badge.hidden = !detected;
    });
    const status = document.getElementById('release-status');
    if (status) {
      const dict = translations[getLang()] || translations.en;
      const key = !downloadState.version ? (downloadState.source === 'unavailable' ? 'dl.release.unavailable' : 'dl.release.loading') : downloadState.source === 'fallback' ? 'dl.release.fallback' : 'dl.release.current';
      status.textContent = dict[key] + (downloadState.version ? ` · v${downloadState.version}` : '');
    }
  }

  async function initDownloadLinks() {
    if (!window.DataPynReleases) return;
    let storage = null;
    try { storage = window.localStorage; } catch (_) { /* Private browsing can disable storage. */ }
    const latest = await window.DataPynReleases.loadLatest({ storage });
    downloadState = latest ? { ...downloadState, ...latest } : { ...downloadState, source: 'unavailable' };
    applyCtaFromState();
  }

  document.addEventListener('DOMContentLoaded', () => {
    downloadState.os = detectOS();
    downloadState.linuxFamily = detectLinuxFamily();
    initLang();
    initMobileNav();
    initNavShadow();
    initDownloadLinks();
    if (window.lucide) window.lucide.createIcons();
  });
})();
