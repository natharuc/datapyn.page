# DataPyn - Documentacao Oficial

> **IDE desktop Tauri para consultas SQL com Python integrado**

DataPyn e uma ferramenta de produtividade para analistas de dados, desenvolvedores e DBAs que precisam executar queries SQL e manipular resultados com Python de forma integrada e eficiente.

A aplicação padrão usa **Tauri 2, Rust, React/TypeScript e kernels Python isolados por sessão**. A distribuição PyQt6 é histórica e tem instaladores, versão e canal de atualização independentes. Para instalar o app atual, use [Downloads](https://datapyn.page/downloads.html) e tags `tauri-vX.Y.Z`.

---

## Indice da Documentacao

| Documento | Descricao |
|-----------|-----------|
| [README.md](README.md) | Este arquivo - visao geral |
| [FEATURES.md](FEATURES.md) | Lista completa de funcionalidades |
| [GETTING_STARTED.md](GETTING_STARTED.md) | Guia de inicio rapido |
| [INSTALL.md](INSTALL.md) | Instalação e atualização Tauri |
| [EXAMPLES.md](EXAMPLES.md) | Exemplos praticos de uso |
| [ARCHITECTURE.md](ARCHITECTURE.md) | Arquitetura tecnica |
| [SHORTCUTS.md](SHORTCUTS.md) | Atalhos de teclado |
| [FAQ.md](FAQ.md) | Perguntas frequentes |
| [CHANGELOG.md](CHANGELOG.md) | Historico de versoes |

---

## Por que DataPyn?

### O Problema

Analistas de dados frequentemente enfrentam um fluxo de trabalho fragmentado:

1. Conectar ao banco de dados com uma ferramenta (SSMS, DBeaver, etc.)
2. Executar queries SQL e exportar resultados para CSV/Excel
3. Abrir Python/Jupyter para manipular os dados
4. Voltar ao SQL para novas queries baseadas na analise
5. Repetir o ciclo...

### A Solucao

DataPyn unifica todo esse fluxo em uma unica interface:

```
+------------------------------------------+
|  DataPyn                                 |
|  +------------------------------------+  |
|  |  SQL Editor          Python Editor |  |
|  |  SELECT * FROM       df.groupby()  |  |
|  |  customers           .agg()        |  |
|  +------------------------------------+  |
|  +------------------------------------+  |
|  |  Results | Variables | Output      |  |
|  |  Tabela interativa com dados       |  |
|  +------------------------------------+  |
+------------------------------------------+
```

---

## Principais Diferenciais

### 1. Blocos de Codigo Mistos

Escreva SQL e Python no mesmo arquivo, alternando conforme necessario:

```sql
-- Bloco SQL
SELECT customer_id, SUM(amount) as total
FROM orders
GROUP BY customer_id
```

```python
# Bloco Python - usa o resultado do SQL automaticamente
df_top = df.nlargest(10, 'total')
df_top.plot(kind='bar', x='customer_id', y='total')
```

### 2. Multiplas Sessoes Independentes

Cada aba tem:
- Sua propria conexao de banco
- Seu proprio namespace Python (variaveis)
- Seus proprios paineis de resultados

### 3. Importacao Inteligente

Arraste arquivos diretamente para a interface:
- **CSV** → `pd.read_csv()`
- **JSON** → `pd.read_json()`
- **Excel** → `pd.read_excel()`
- **SQL/Python** → Abre em nova aba

### 4. Produtividade Maxima

- Atalhos de teclado para tudo
- Autocompletar SQL e Python
- Historico de execucoes
- Workspaces salvos/restaurados automaticamente

### 5. Pynia por sessão

Converse com **Claude, Cursor, GitHub Copilot ou Codex** no painel Pynia. Agentes usam instalação e autenticação próprias via ACP. Cada aba mantém contexto e histórico; a engrenagem **Agentes e configuração** permite preparar e selecionar o agente. Ferramentas integradas consultam dados, editam blocos e geram gráficos.

---

## Bancos Suportados

| Banco | Driver | Autenticacao |
|-------|--------|--------------|
| SQL Server | pyodbc + ODBC Microsoft nativo | Windows Auth, SQL Auth, Microsoft Entra |
| MySQL | PyMySQL | Usuario/Senha |
| MariaDB | PyMySQL | Usuario/Senha |
| PostgreSQL | psycopg2 | Usuario/Senha |
| SQLite | sqlite3 (built-in) | Arquivo local |
| Databricks | databricks-sql-connector | PAT ou OAuth, catálogo/schema |

---

## Requisitos do Sistema

- **Sistema Operacional**: Windows 10/11 x64, Linux x64 com base Ubuntu 22.04+, macOS 14+ Apple Silicon.
- **Pacotes**: Setup/ZIP no Windows, DEB/AppImage/tar.gz no Linux, DMG no macOS.
- **Runtime**: Python e bibliotecas de análise embutidos; Python e Node.js externos não são necessários para usar o app instalado.
- **Desenvolvimento**: Node.js 22, Rust 1.90+, Python 3.12+, uv e dependências nativas da plataforma.
- **Drivers nativos**: Setup Windows prepara WebView2 e ODBC; SQL Server no Linux/macOS exige ODBC Microsoft e unixODBC.
- **Memória e disco**: dependem do volume de dados e pacotes instalados. Cada sessão tem seu próprio kernel Python.

Consulte [INSTALL.md](INSTALL.md) para instalação, armazenamento e atualização assinada.

---

## Licenca

MIT License - Uso livre para projetos pessoais e comerciais.

---

## Links Uteis

- [Downloads Tauri](https://datapyn.page/downloads.html)
- [Repositorio GitHub](https://github.com/natharuc/datapyn)
- [Reportar Bug](https://github.com/natharuc/datapyn/issues)
- [Solicitar Feature](https://github.com/natharuc/datapyn/issues)

---

*DataPyn - Simplifique sua analise de dados*
