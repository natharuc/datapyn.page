# Arquitetura Tecnica

Visao geral da arquitetura e estrutura interna do DataPyn.

---

## Visao Geral

```
+--------------------------------------------------+
|                    DataPyn                        |
|                                                  |
|  +--------------------------------------------+  |
|  |              UI Layer (PyQt6)              |  |
|  |  MainWindow, Dialogs, Panels, Editors      |  |
|  +--------------------------------------------+  |
|                       |                          |
|  +--------------------------------------------+  |
|  |            Services Layer                  |  |
|  |  SessionLifecycle, PanelManager, FileImport|  |
|  +--------------------------------------------+  |
|                       |                          |
|  +--------------------------------------------+  |
|  |              Core Layer                    |  |
|  |  Session, SessionManager, WorkspaceManager |  |
|  +--------------------------------------------+  |
|                       |                          |
|  +--------------------------------------------+  |
|  |            Database Layer                  |  |
|  |  DatabaseConnector, ConnectionManager      |  |
|  +--------------------------------------------+  |
|                       |                          |
|  +--------------------------------------------+  |
|  |         External Dependencies              |  |
|  |  SQLAlchemy, Pandas, PyODBC, Matplotlib    |  |
|  +--------------------------------------------+  |
+--------------------------------------------------+
```

---

## Estrutura de Diretorios

```
datapyn/
|
+-- source/                    # Codigo-fonte
|   +-- main.py                # Entry point
|   +-- src/
|       +-- core/              # Logica central
|       |   +-- session.py           # Classe Session
|       |   +-- session_manager.py   # Gerenciador de sessoes
|       |   +-- workspace_manager.py # Persistencia de workspace
|       |   +-- theme_manager.py     # Temas claro/escuro
|       |   +-- shortcut_manager.py  # Atalhos de teclado
|       |   +-- mixed_executor.py    # Execucao cross-syntax
|       |
|       +-- database/          # Camada de dados
|       |   +-- database_connector.py   # Conexao com bancos
|       |   +-- connection_manager.py   # CRUD de conexoes
|       |
|       +-- services/          # Servicos de negocio
|       |   +-- session_lifecycle_service.py  # Ciclo de vida
|       |   +-- panel_manager.py              # Gerenciar paineis
|       |   +-- file_import_service.py        # Importacao de arquivos
|       |
|       +-- editors/           # Editores de codigo
|       |   +-- block_editor.py       # Editor de blocos
|       |   +-- code_editor.py        # Editor base
|       |   +-- sql_editor.py         # Syntax SQL
|       |   +-- python_editor.py      # Syntax Python
|       |
|       +-- ui/                # Interface grafica
|       |   +-- main_window.py        # Janela principal
|       |   +-- components/           # Componentes reutilizaveis
|       |   +-- dialogs/              # Dialogos modais
|       |
|       +-- assets/            # Recursos estaticos
|           +-- icons/                # Icones
|           +-- themes/               # Arquivos de tema
|
+-- tests/                     # Testes automatizados
|   +-- test_*.py              # Arquivos de teste
|   +-- conftest.py            # Fixtures compartilhadas
|
+-- scripts/                   # Scripts de build/deploy
|   +-- install.bat            # Instalador Windows
|   +-- run.bat                # Executar aplicacao
|   +-- build.bat              # Gerar executavel
|
+-- docs/                      # Documentacao
+-- requirements.txt           # Dependencias Python
+-- pyproject.toml             # Configuracao do projeto
```

---

## Componentes Principais

### Session

Representa uma sessao de trabalho (aba):

```python
class Session(QObject):
    """
    Cada sessao tem:
    - session_id: Identificador unico
    - title: Nome da aba
    - connection_name: Conexao ativa
    - connector: DatabaseConnector instance
    - namespace: Variaveis Python
    - blocks: Lista de blocos de codigo
    """
    
    # Sinais
    connection_changed = pyqtSignal(str)
    status_changed = pyqtSignal(str)
    execution_started = pyqtSignal(str)
    execution_finished = pyqtSignal(bool, str)
    variables_changed = pyqtSignal(dict)
```

### SessionManager

Gerencia multiplas sessoes:

```python
class SessionManager(QObject):
    """
    - sessions: Lista de Session
    - focused_session: Sessao ativa
    - create_session(): Cria nova sessao
    - close_session(): Fecha sessao
    - load_sessions(): Restaura do disco
    - save_sessions(): Persiste no disco
    """
```

### DatabaseConnector

Abstrai conexao com diferentes bancos:

```python
class DatabaseConnector:
    """
    - connect(): Estabelece conexao
    - execute_query(): Executa SQL, retorna DataFrame
    - get_tables(): Lista tabelas
    - change_database(): Muda banco (USE)
    - disconnect(): Fecha conexao
    
    Suporta: SQL Server, MySQL, PostgreSQL, MariaDB, SQLite
    """
```

### MainWindow

Janela principal da aplicacao:

```python
class MainWindow(QMainWindow):
    """
    Componentes:
    - session_tabs: QTabWidget com abas de sessao
    - connection_panel: Painel lateral de conexoes
    - results_dock: Dock com ResultsViewer
    - output_dock: Dock com OutputPanel
    - variables_dock: Dock com VariablesPanel
    """
```

---

## Fluxo de Dados

### Execucao SQL

```
Usuario digita SQL
        |
        v
[BlockEditor] captura Ctrl+Enter / F5
        |
        v
[SessionWidget] recebe sinal execute_sql
        |
        v
[Session] inicia execucao em thread separada
        |
        v
[DatabaseConnector] executa via SQLAlchemy/pyodbc
        |
        v
[Session] recebe DataFrame resultado
        |
        v
[ResultsViewer] exibe tabela interativa
        |
        v
[Session] atualiza namespace (df = resultado)
```

### Execucao Python

```
Usuario digita Python
        |
        v
[BlockEditor] captura Shift+F5
        |
        v
[SessionWidget] recebe sinal execute_python
        |
        v
[Session] executa com exec() no namespace isolado
        |
        v
Stdout/stderr capturados
        |
        v
[OutputPanel] exibe output
        |
        v
[VariablesPanel] atualiza lista de variaveis
```

---

## Padroes de Design

### Singleton

Usado para gerenciadores globais:

- `ConnectionManager` - Unica instancia gerencia todas conexoes salvas
- `ThemeManager` - Unica instancia controla tema atual

### Observer (Signals/Slots)

PyQt6 signals para comunicacao entre componentes:

```python
# Session emite sinal
self.connection_changed.emit(connection_name)

# MainWindow conecta slot
session.connection_changed.connect(self._on_connection_changed)
```

### Factory

Criacao de editores baseada no tipo:

```python
def create_editor(language: str) -> CodeEditor:
    if language == 'sql':
        return SqlEditor()
    elif language == 'python':
        return PythonEditor()
```

### Service Layer

Servicos encapsulam logica de negocio:

```python
class SessionLifecycleService:
    """Gerencia ciclo de vida de sessoes"""
    
    def create_session(self, title: str = None) -> Session:
        ...
    
    def close_session(self, session_id: str) -> bool:
        ...
```

---

## Pool de Conexoes

O DatabaseConnector usa SQLAlchemy com pool de conexoes:

```python
engine = create_engine(
    connection_string,
    pool_pre_ping=True,  # Verifica conexao antes de usar
    pool_size=5,         # Conexoes no pool
    max_overflow=10      # Conexoes extras permitidas
)
```

### Problema do USE Database

Quando usuario executa `USE outro_banco`, apenas uma conexao do pool e afetada. Solucao:

```python
# Event listener no pool - toda conexao retorna ao banco correto
@event.listens_for(engine, "checkout")
def on_checkout(dbapi_conn, connection_record, connection_proxy):
    cursor = dbapi_conn.cursor()
    cursor.execute(f"USE [{current_database}]")
    cursor.close()
```

---

## Threading

Execucoes SQL e Python rodam em threads separadas:

```python
class ExecutionThread(QThread):
    finished = pyqtSignal(object, str)  # resultado, erro
    
    def run(self):
        try:
            result = self.connector.execute_query(self.query)
            self.finished.emit(result, None)
        except Exception as e:
            self.finished.emit(None, str(e))
```

Isso mantem a UI responsiva durante queries longas.

---

## Persistencia

### Workspace (.dpw)

Arquivo JSON com estado completo:

```json
{
    "version": "1.0",
    "sessions": [
        {
            "session_id": "abc123",
            "title": "Analise Vendas",
            "connection_name": "Producao",
            "blocks": [
                {"language": "sql", "code": "SELECT * FROM vendas"},
                {"language": "python", "code": "df.head()"}
            ]
        }
    ],
    "focused_session_id": "abc123",
    "window_geometry": {...}
}
```

### Conexoes (connections.json)

```json
{
    "connections": {
        "Producao": {
            "db_type": "sqlserver",
            "host": "srv-prod",
            "port": 1433,
            "database": "AppDB",
            "use_windows_auth": true,
            "color": "#4CAF50"
        }
    }
}
```

Senhas sao criptografadas com AES-256 se salvas.

---

## Testes

### Estrutura

```
tests/
+-- conftest.py              # Fixtures globais
+-- test_database_connector.py
+-- test_session_manager.py
+-- test_block_editor.py
+-- test_ui_integration.py
+-- ...
```

### Executar Testes

```bash
# Todos os testes
python -m pytest tests/ -v

# Teste especifico
python -m pytest tests/test_database_connector.py -v

# Com cobertura
python -m pytest tests/ --cov=source/src --cov-report=html
```

### Fixtures Qt

```python
@pytest.fixture
def main_window(qtbot):
    window = MainWindow()
    window.show()
    qtbot.addWidget(window)
    return window
```

---

## Build e Distribuicao

### PyInstaller

```bash
# Gerar executavel
pyinstaller scripts/datapyn.spec
```

### Estrutura do Executavel

```
dist/datapyn/
+-- datapyn.exe      # Executavel principal
+-- _internal/       # Dependencias
+-- assets/          # Recursos
```

---

## Dependencias Principais

| Pacote | Versao | Uso |
|--------|--------|-----|
| PyQt6 | 6.6+ | Interface grafica |
| QScintilla | 2.14+ | Editor de codigo |
| SQLAlchemy | 2.0+ | ORM / conexao DB |
| pandas | 2.0+ | Manipulacao de dados |
| pyodbc | 5.0+ | Driver ODBC |
| matplotlib | 3.8+ | Graficos |
| cryptography | 41+ | Criptografia de senhas |

---

*Para contribuir, veja nosso [CONTRIBUTING.md](https://github.com/seu-usuario/datapyn/blob/main/CONTRIBUTING.md).*
