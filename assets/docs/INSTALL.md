# Instalação

O aplicativo padrão do DataPyn usa **Tauri 2**, com interface React/TypeScript, host Rust e kernels Python isolados por sessão.

## Downloads oficiais

Use a [página de downloads](https://datapyn.page/downloads.html) para encontrar a release Tauri estável e os arquivos da sua plataforma. Os instaladores usam tags **`tauri-vX.Y.Z`** e nomes **`DataPyn-Tauri-<versão>-<plataforma>`**.

O endereço GitHub `releases/latest` permanece reservado ao PyQt6 histórico. Instaladores e atualizações desse canal são independentes e não instalam o aplicativo Tauri.

| Plataforma | Formatos Tauri | Arquitetura |
|------------|----------------|-------------|
| Windows 10/11 | NSIS Setup.exe, ZIP portátil | x64 |
| Linux, base Ubuntu 22.04+ | DEB, AppImage, tar.gz | x64 / amd64 |
| macOS 14+ | DMG | Apple Silicon / arm64 |

O runtime Python, as bibliotecas de análise/exportação e os drivers Python acompanham os pacotes. Para usar o app instalado, você não precisa instalar Python ou Node.js.

## Windows

1. Baixe o arquivo `DataPyn-Tauri-<versão>-windows-x86_64-setup.exe` em [Downloads](https://datapyn.page/downloads.html).
2. Execute o assistente de instalação.
3. Abra **DataPyn Tauri** pelo atalho criado.

O Setup inclui WebView2 offline e o instalador Microsoft ODBC Driver 18 x64. Um ODBC 17/18 x64 já instalado é preservado. Se o driver estiver ausente, o Setup pede consentimento; apenas a instalação desse driver compartilhado solicita permissão de administrador.

Para o ZIP portátil, extraia o pacote e mantenha os dois executáveis juntos. WebView2 e ODBC são pré-requisitos do portátil; o Setup os prepara. Atualizar uma instalação portátil usa o NSIS na mesma pasta e preserva o caminho.

## Linux

A distribuição Tauri publica DEB, AppImage e tar.gz para x64, com base Ubuntu 22.04+. RPM e pacote Arch pertencem ao canal histórico.

### DEB

Baixe o arquivo `.deb` Tauri e instale-o pelo gerenciador de pacotes:

```bash
sudo apt install ./DataPyn-Tauri-<versão>-linux-x86_64.deb
```

Substitua `<versão>` pelo número do arquivo baixado. Abra **DataPyn Tauri** pelo menu de aplicativos.

### AppImage

Torne o arquivo baixado executável e abra-o:

```bash
chmod +x DataPyn-Tauri-<versão>-linux-x86_64.AppImage
./DataPyn-Tauri-<versão>-linux-x86_64.AppImage
```

Se FUSE não estiver disponível, use o modo extract-and-run:

```bash
APPIMAGE_EXTRACT_AND_RUN=1 ./DataPyn-Tauri-<versão>-linux-x86_64.AppImage
```

### tar.gz

Extraia o pacote Tauri e siga as instruções incluídas no arquivo. DEB e tar.gz iniciam um AppImage gerenciado em `$XDG_DATA_HOME/datapyn-tauri/installation`, com padrão `~/.local/share/datapyn-tauri/installation`. Essa cópia gravável recebe as atualizações assinadas; atualizar o DEB não substitui uma versão já atualizada pelo app.

Para SQL Server, instale unixODBC e o driver Microsoft nativo (`msodbcsql18`). unixODBC sozinho não é o driver de SQL Server. Para salvar senhas, a sessão desktop precisa de um cofre Secret Service e D-Bus do usuário.

## macOS (Apple Silicon)

1. Baixe o DMG Tauri para macOS 14+ e Apple Silicon em [Downloads](https://datapyn.page/downloads.html).
2. Abra a imagem e copie **DataPyn Tauri** para Applications.
3. Abra o aplicativo. A distribuição atual pode exigir liberação em **Ajustes do Sistema → Privacidade e Segurança**.

A assinatura do updater é independente da notarização Apple. Para SQL Server, instale o driver Microsoft ODBC arm64 e unixODBC pelo Homebrew nativo; evite misturar drivers Intel/Rosetta com o app arm64.

## Atualização automática

Windows, Linux e macOS usam o canal Tauri assinado. O app consulta o feed ao iniciar e a cada seis horas, e baixa a atualização em segundo plano. Quando aparecer **Atualização pronta**, instale pelo próprio aplicativo.

A instalação exige ação do usuário e salva o workspace. Operações em andamento ou falha ao salvar impedem a instalação. Sair antes de instalar descarta o download e exige baixá-lo novamente.

O feed é `https://github.com/natharuc/datapyn/releases/download/tauri-stable/latest.json`. O app valida o canal e a versão, e verifica a assinatura do pacote. O tag `tauri-stable` serve o feed; os instaladores ficam nas releases imutáveis `tauri-vX.Y.Z`.

## A partir do código-fonte

Pré-requisitos: **Node.js 22**, **Rust 1.90+**, **Python 3.12+**, [uv](https://docs.astral.sh/uv/) e dependências nativas da plataforma descritas no [AGENTS.md do repositório](https://github.com/natharuc/datapyn/blob/main/AGENTS.md).

```bash
git clone https://github.com/natharuc/datapyn.git
cd datapyn
uv sync --dev --frozen
npm --prefix desktop ci
npm --prefix desktop run desktop:dev
```

`main` contém o app Tauri. Os scripts antigos de `scripts/linux/`, `scripts/install.bat`, `scripts/run.bat` e `source/main.py` são exclusivos da manutenção histórica PyQt6.

## Configurações e dados

O perfil Tauri tem identidade própria, **`app.datapyn.tauri`**:

- Windows: `%LOCALAPPDATA%/app.datapyn.tauri`.
- macOS: `~/Library/Application Support/app.datapyn.tauri`.
- Linux: `$XDG_DATA_HOME/app.datapyn.tauri` ou `~/.local/share/app.datapyn.tauri`.

Credenciais de conexões usam o cofre do sistema sob `DataPyn.Tauri.Connections`. Configurações históricas podem ser importadas explicitamente; o app não herda automaticamente o perfil PyQt6. Workspaces usam arquivos `.dpw`.

## Desinstalação

Use o desinstalador registrado no Windows, o gerenciador do pacote DEB no Linux ou remova o aplicativo de Applications no macOS. Para arquivos portáteis, remova os arquivos extraídos.

A desinstalação não apaga workspaces nem remove drivers compartilhados.

## Build e publicação

Para validar o executável nativo:

```bash
npm --prefix desktop run desktop:build -- --no-bundle
```

Saída: `desktop/src-tauri/target/release/`. Instaladores distribuídos exigem o fluxo de assinatura descrito na [distribuição Tauri](https://github.com/natharuc/datapyn/blob/main/docs/TAURI_DISTRIBUTION.md).

Um push em `main` publica a versão dos manifests quando seu tag `tauri-vX.Y.Z` ainda não existe, depois da validação nas três plataformas. Um tag existente evita nova publicação. Consulte [TAURI_RELEASE.md](https://github.com/natharuc/datapyn/blob/main/docs/TAURI_RELEASE.md) para preparar uma versão.

## Suporte

- [Drivers e pré-requisitos nativos](https://github.com/natharuc/datapyn/blob/main/docs/TAURI_RUNTIME_DISTRIBUTION.md).
- [GitHub Issues](https://github.com/natharuc/datapyn/issues).

Ao reportar um problema, inclua plataforma, arquitetura, versão Tauri e log de erro.
