# Guia de Inicio Rapido

Comece a usar o DataPyn Tauri com SQL e Python no mesmo fluxo de análise.

---

## 1. Instalacao

Instaladores oficiais: [Downloads](https://datapyn.page/downloads.html) — Windows x64 `Setup.exe` ou ZIP; Linux x64 DEB, AppImage ou tar.gz (base Ubuntu 22.04+); macOS 14+ Apple Silicon DMG. Escolha arquivos `DataPyn-Tauri-*` de tags `tauri-vX.Y.Z`.

Python e bibliotecas de análise já vêm embutidos. O Setup Windows inclui WebView2 e prepara ODBC para SQL Server. No Linux/macOS, SQL Server exige o driver Microsoft ODBC nativo. Veja [INSTALL.md](INSTALL.md) para pré-requisitos por plataforma.

### Desenvolvimento pelo código-fonte

Requisitos: Node.js 22, Rust 1.90+, Python 3.12+, uv e dependências nativas da plataforma. O app padrão está em `main`.

```powershell
# Clone o repositorio
git clone https://github.com/natharuc/datapyn.git
cd datapyn

uv sync --dev --frozen
npm --prefix desktop ci
npm --prefix desktop run desktop:dev
```

---

## 2. Primeira Conexao

### Passo 1: Abrir Gerenciador de Conexoes

Clique no ícone de banco de dados no painel lateral esquerdo, ou pressione `Ctrl+Shift+M` para gerenciar conexões.

### Passo 2: Criar Nova Conexao

Clique em **"+ Nova Conexao"** e preencha:

| Campo | Exemplo |
|-------|---------|
| Nome | Producao SQL Server |
| Tipo | SQL Server |
| Host | servidor.empresa.com |
| Porta | 1433 |
| Banco | MeuBanco |
| Usuario | admin |
| Senha | ******** |

### Passo 3: Testar Conexao

Clique em **"Testar Conexao"** para verificar se os dados estao corretos.

### Passo 4: Salvar e Conectar

Clique em **"Salvar"** e depois **duplo-clique** na conexao para conectar.

---

## 3. Primeira Query SQL

### Passo 1: Criar Bloco SQL

Com a conexao ativa, voce ja tem um bloco SQL pronto. Digite sua query:

```sql
SELECT TOP 10 * FROM Clientes
```

### Passo 2: Executar

Pressione **F5**, **Ctrl+Enter** ou clique no botão **Executar**. Uma seleção executa só o trecho selecionado; sem seleção, executa o bloco atual.

### Passo 3: Ver Resultados

Os resultados aparecem no painel **Results** na parte inferior.

---

## 4. Manipular com Python

### Passo 1: Adicionar Bloco Python

Clique no botao **"+"** no final do ultimo bloco e escolha **"Python"**, ou clique no seletor de linguagem do bloco para trocar.

### Passo 2: Usar o Resultado SQL

O resultado da query SQL esta automaticamente disponivel como `df`:

```python
# Ver estatisticas
print(df.describe())

# Filtrar dados
clientes_sp = df[df['Estado'] == 'SP']
print(f"Clientes em SP: {len(clientes_sp)}")

# Criar grafico
df['Estado'].value_counts().plot(kind='bar')
```

### Passo 3: Executar Python

Pressione **F5**, **Ctrl+Enter** ou clique em **Executar**. O sistema usa a linguagem do bloco atual. **Ctrl+F5** executa os blocos ativos em sequência.

---

## 5. Fluxo de Trabalho Tipico

```
1. Conectar ao banco
        |
        v
2. Escrever query SQL no bloco
        |
        v
3. Executar (F5)
        |
        v
4. Analisar resultado
        |
        v
5. Adicionar novo bloco Python (botao +)
        |
        v
6. Executar Python (F5)
        |
        v
7. Exportar ou continuar analise
```

---

## 6. Dicas Importantes

### Atalhos Essenciais

| Acao | Atalho |
|------|--------|
| Executar bloco atual ou seleção | `F5` / `Ctrl+Enter` |
| Executar todos os blocos | `Ctrl+F5` |
| Executar e avancar | `Shift+Enter` |
| Nova aba | `Ctrl+T` |
| Novo bloco | `Ctrl+Shift+B` |
| Salvar | `Ctrl+S` |
| Configuracoes | `Ctrl+,` |

### Variavel `df`

Apos executar SQL, o resultado fica disponivel em Python como `df`:

```python
# df e um pandas.DataFrame com o resultado da ultima query
df.head()        # Primeiras 5 linhas
df.columns       # Nomes das colunas
df.shape         # (linhas, colunas)
df.dtypes        # Tipos de dados
```

### Importar Arquivos

Arraste arquivos CSV, JSON ou Excel diretamente para o editor!

### Multiplas Conexoes

Cada aba pode ter sua propria conexao. Use isso para comparar dados entre ambientes (desenvolvimento, homologacao, producao).

---

## 7. Pynia (opcional)

A **Pynia** conecta o DataPyn a agentes ACP: **Claude, Cursor, GitHub Copilot e Codex**. Cada aba tem conversa e histórico próprios.

1. Abra o painel **Pynia** e clique na engrenagem **Agentes e configuração**.
2. Instale o agente escolhido ou verifique a instalação existente. Siga as instruções de login do agente.
3. Escolha o agente para a aba e envie sua mensagem. Após o primeiro envio, ele permanece associado à conversa; use **Novo chat** para trocar.
4. Pergunte em linguagem natural; use referências `@` a blocos, variáveis, seleção e schema. Responda no chat quando o agente pedir permissão ou fizer perguntas.

Ghost text no editor: ative **Sugestões inline da Pynia** em **Configurações → Editor**. Exige um agente instalado e autenticado. **Ctrl+.** solicita sugestão; **Tab** aceita. Conta, plano e modelos dependem do agente escolhido.

---

## 8. Proximos Passos

- [FEATURES.md](FEATURES.md) - Lista completa de funcionalidades
- [EXAMPLES.md](EXAMPLES.md) - Exemplos praticos detalhados
- [SHORTCUTS.md](SHORTCUTS.md) - Todos os atalhos de teclado
- [FAQ.md](FAQ.md) - Perguntas frequentes

---

## Problemas Comuns

### "Nao consigo conectar ao SQL Server"

1. Verifique se ODBC 17/18 x64 está instalado no Windows, ou o driver Microsoft nativo e unixODBC no Linux/macOS
2. Confirme que o servico SQL Server esta rodando
3. Teste a conectividade: `telnet servidor 1433`

### "Erro: modulo nao encontrado"

Use o gerenciador de pacotes integrado ao DataPyn para instalar bibliotecas adicionais no perfil Tauri. O Python do sistema é independente do runtime embutido.

### "Interface nao abre"

Confira se baixou um pacote Tauri para a arquitetura correta. No ZIP Windows, mantenha os executáveis juntos e confira WebView2. Para AppImage sem FUSE, use `APPIMAGE_EXTRACT_AND_RUN=1`. Veja [INSTALL.md](INSTALL.md) para dependências nativas e suporte.

---

*Precisa de ajuda? Abra uma issue no [GitHub](https://github.com/natharuc/datapyn/issues) ou veja [datapyn.page/docs.html](https://datapyn.page/docs.html).*
