# Arquitetura do DataPyn Tauri

A aplicação padrão em `main` usa **Tauri 2**, com host Rust, interface React/TypeScript e um runtime Python separado da UI. A versão PyQt6 é histórica e mantém canal de release e armazenamento próprios.

## Camadas

```text
Interface React / TypeScript
  Monaco, blocos, conexões, grade, gráficos e Pynia
              |
              v
Host Tauri / Rust
  Janelas, arquivos, perfil, processos e updater assinado
              |
              v
Supervisor Python (sidecar distribuído)
  RPC, conexões, serviços de linguagem e integrações
              |
              v
Kernel Python por sessão
  SQL / Python, namespace, resultados e cancelamento
```

O runtime embute Python, bibliotecas de dados, drivers Python e ferramentas como uv e Ruff. O usuário do aplicativo instalado não precisa de Python ou Node.js externos.

## Isolamento de sessões

Cada aba mantém seus blocos, namespace Python, resultados e conversa Pynia. Uma conexão padrão da sessão pode ser sobrescrita em um bloco SQL com conexão, database e schema próprios.

O cancelamento encerra o grupo de processos do kernel afetado, sem bloquear a interface ou outras sessões. As variáveis e conexões desse kernel podem precisar ser recriadas.

## Editor e execução

Monaco mantém modelos, histórico de edição e estado de foco por bloco. Autocomplete SQL usa keywords e metadados da conexão; autocomplete Python usa os serviços de linguagem e o namespace da sessão.

- **F5 / Ctrl+Enter**: executar a seleção, ou o bloco atual quando não houver seleção.
- **Shift+Enter**: executar e avançar para o próximo bloco.
- **Ctrl+F5**: executar os blocos ativos em sequência.
- **Ctrl+Shift+B**: adicionar bloco.

SQL produz DataFrames nomeados disponíveis no kernel Python da mesma sessão. Objetos Python e engines SQLAlchemy permanecem no runtime; a interface recebe referências e páginas de resultados.

## Dados e resultados

Os conectores atendem SQL Server, PostgreSQL, MySQL, MariaDB, Databricks e SQLite. SQL Server usa pyodbc e exige o driver Microsoft nativo; o instalador Windows prepara ODBC quando necessário.

A grade virtual busca páginas do runtime, com ordenação, filtros e formatação de colunas. Exportações incluem CSV, TSV/TXT, XLSX, JSON, SQL e Parquet. Download direto de consultas oferece CSV/Parquet com progresso e cancelamento.

## Pynia

Pynia conecta agentes **Claude, Cursor, GitHub Copilot e Codex** via ACP. Instalação, autenticação, modelos e plano pertencem ao agente escolhido. Cada aba tem conversa e histórico próprios.

O runtime disponibiliza ferramentas DataPyn via MCP para ler contexto, consultar bancos, executar SQL/Python, editar blocos e gerar gráficos. Solicitações de permissão e perguntas aguardam resposta no chat. Sugestões inline opcionais usam uma sessão própria do agente.

## Persistência

O perfil Tauri tem identificador **`app.datapyn.tauri`**. Documentos e estado de sessão são salvos no perfil nativo e restaurados sem executar código. Workspaces públicos `.dpw` preservam blocos, referências de conexão e estado da análise.

Credenciais usam o cofre do sistema sob **`DataPyn.Tauri.Connections`**. Configurações históricas só são importadas explicitamente; o host não herda automaticamente o perfil PyQt6. Snapshots de DataFrames em Parquet são opcionais e separados do documento `.dpw`.

## Distribuição e atualização

Instaladores são publicados em tags imutáveis **`tauri-vX.Y.Z`**. O feed `tauri-stable/latest.json` coordena atualizações assinadas nas três plataformas; o `releases/latest` do GitHub continua reservado ao app histórico.

- Windows x64: Setup NSIS e ZIP portátil.
- Linux x64, base Ubuntu 22.04+: DEB, AppImage e tar.gz.
- macOS 14+, Apple Silicon: DMG e pacote do updater.

O app baixa updates em segundo plano e pede ação do usuário para instalar. A instalação salva o workspace e aguarda o fim das operações em andamento.

## Estrutura principal

```text
datapyn/
├── desktop/
│   ├── src/                 # React, Monaco e estado da UI
│   └── src-tauri/           # Host Rust e integrações nativas
├── source/
│   ├── datapyn_runtime/     # Supervisor e kernels sem Qt
│   └── src/                 # Serviços e conectores reutilizados
├── runtime_tests/           # Contratos do runtime Tauri
├── scripts/tauri/           # Desenvolvimento, build e distribuição
└── docs/                    # Contratos técnicos e paridade
```

O `source/main.py`, a UI Qt e os testes Qt retidos são artefatos da manutenção histórica; não são o entry point do app Tauri.

## Desenvolvimento e validação

```bash
uv sync --dev --frozen
npm --prefix desktop ci
npm --prefix desktop run desktop:dev

npm --prefix desktop test
npm --prefix desktop run build
uv run pytest -c runtime_tests/pytest.ini runtime_tests -q
```

Em `desktop/src-tauri`, use `cargo fmt --check`, `cargo check --locked` e `cargo test --locked`. Para validar o executável nativo, use `npm --prefix desktop run desktop:build -- --no-bundle`.

Contratos e requisitos completos no repositório:

- [Paridade funcional](https://github.com/natharuc/datapyn/blob/main/docs/TAURI_FEATURE_PARITY.md).
- [Distribuição Tauri](https://github.com/natharuc/datapyn/blob/main/docs/TAURI_DISTRIBUTION.md).
- [Drivers e dependências nativas](https://github.com/natharuc/datapyn/blob/main/docs/TAURI_RUNTIME_DISTRIBUTION.md).
- [Release e assinatura](https://github.com/natharuc/datapyn/blob/main/docs/TAURI_RELEASE.md).
