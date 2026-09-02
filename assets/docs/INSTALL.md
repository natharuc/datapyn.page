# Instalacao

Guia de instalacao do DataPyn para Windows, Linux e macOS.

---

## Requisitos

### Sistema operacional

| Plataforma | Artefato | Arquitetura |
|------------|----------|-------------|
| Windows 10 (1903+) / Windows 11 | `DataPyn-Setup.exe` | x64 |
| Ubuntu/Debian 22.04+ | `datapyn_amd64.deb` | amd64 |
| Outras distros Linux | `DataPyn-linux-x86_64.tar.gz` | x86_64 |
| macOS 13+ | `DataPyn-macos-arm64.dmg` | Apple Silicon (arm64) |

Os instaladores ja incluem Python. Nao e necessario instalar Python no sistema para uso normal.

Downloads: [datapyn.page/downloads.html](https://datapyn.page/downloads.html) ou [GitHub Releases](https://github.com/natharuc/datapyn/releases/latest).

### Drivers de banco (opcionais)

| Banco | Windows | Linux / macOS |
|-------|---------|----------------|
| SQL Server | ODBC Driver 17/18, ou pymssql | **pymssql** (FreeTDS no wheel). `pyodbc` exige `unixodbc` + driver Microsoft/FreeTDS no sistema |
| PostgreSQL | psycopg2 (bundled) | psycopg2 (bundled) |
| MySQL / MariaDB | PyMySQL (bundled) | PyMySQL (bundled) |
| Databricks | connector bundled | connector bundled |

---

## Windows

1. Baixe `DataPyn-Setup.exe` em [Downloads](https://datapyn.page/downloads.html).
2. Execute o assistente. Destino padrao: `%LOCALAPPDATA%\DataPyn`.
3. Atalhos sao criados no Menu Iniciar e na Area de trabalho.

ZIP portatil: extraia `DataPyn-{version}-windows.zip` e execute `DataPyn.exe`.

Atualizacao automatica (somente Windows) baixa o ZIP da release e aplica ao sair.

---

## Linux (Ubuntu/Debian)

```bash
sudo apt install ./datapyn_amd64.deb
datapyn
```

O pacote instala em `/opt/datapyn`, registra o tipo MIME `.dpw` e cria o comando `datapyn`. Dependencias de Qt/WebEngine entram via `Depends` do `.deb`. Recomendado: `libsecret-1-0` (keyring) e `unixodbc` (SQL Server via pyodbc).

### Tarball (Fedora, Arch e outros)

```bash
tar -xzf DataPyn-linux-x86_64.tar.gz
cd DataPyn
QTWEBENGINE_DISABLE_SANDBOX=1 ./DataPyn
```

O WebEngine do bundle precisa das flags de sandbox desabilitadas na maioria dos desktops.

---

## macOS (Apple Silicon)

O DMG **nao e assinado**. O Gatekeeper bloqueia a primeira abertura.

1. Abra `DataPyn-macos-arm64.dmg` e arraste `DataPyn.app` para Applications.
2. No Finder: clique com o botao direito em DataPyn → **Abrir**.
3. Ou no Terminal:

```bash
xattr -cr /Applications/DataPyn.app
open /Applications/DataPyn.app
```

Intel Mac nao e suportado nesta versao.

---

## A partir do codigo-fonte

Requisito: Python **3.12+** e [uv](https://docs.astral.sh/uv/).

### Windows

```powershell
git clone https://github.com/natharuc/datapyn.git
cd datapyn
scripts\install.bat
scripts\run.bat
```

### Linux / macOS

```bash
git clone https://github.com/natharuc/datapyn.git
cd datapyn
chmod +x scripts/linux/install.sh scripts/linux/run.sh
./scripts/linux/install.sh
./scripts/linux/run.sh
```

O `install.sh` instala dependencias de sistema (Qt, ODBC, libpq) quando o `apt-get` esta disponivel.

---

## Configuracao inicial

Pasta de dados do usuario:

- Windows: `%APPDATA%\DataPyn\`
- macOS: `~/Library/Application Support/datapyn/`
- Linux: `~/.local/share/datapyn/` (ou `$XDG_DATA_HOME/datapyn/`)

Arquivos tipicos: `connections.json`, `settings.json`, `shortcuts.json`.

---

## Desinstalacao

**Windows:** `DataPyn-Setup.exe --uninstall`, ou o atalho de desinstalacao.

**Linux (.deb):**

```bash
sudo apt remove datapyn
```

**macOS:** apague `/Applications/DataPyn.app`.

Dados do usuario nao sao removidos automaticamente.

---

## Solucao de problemas

### Linux: Monaco / Pynia em branco

Confirme `QTWEBENGINE_DISABLE_SANDBOX=1`. O `.deb` ja lanca o wrapper com essa variavel.

### Linux: SQL Server

Prefira o driver pymssql na conexao. pyodbc so funciona com ODBC instalado no sistema.

### macOS: "app is damaged" / nao abre

O binario nao e notarizado. Use **Abrir** no menu de contexto ou `xattr -cr`.

### Windows: VCRUNTIME140.dll

Instale o [Visual C++ Redistributable](https://aka.ms/vs/17/release/vc_redist.x64.exe).

---

## Build dos instaladores

```bash
uv sync --dev
uv run pyinstaller scripts/datapyn.spec --clean
```

- Linux: `bash scripts/linux/package.sh <version>` (requer `fpm`)
- macOS: `uv run python scripts/macos/generate_icns.py` antes do PyInstaller; depois `bash scripts/macos/package_dmg.sh <version>`
- Windows setup: `uv run pyinstaller installer/datapyn_setup.spec --clean`

A esteira **Continuous Delivery - PSR** publica os tres sistemas no mesmo GitHub Release. Dry-run do `.deb`: Actions → **Build Linux Installers (dry run)**.

---

## Suporte

- **Issues**: [GitHub Issues](https://github.com/natharuc/datapyn/issues)

*Problemas com a instalacao? Abra uma issue com o sistema operacional e o log de erro.*
