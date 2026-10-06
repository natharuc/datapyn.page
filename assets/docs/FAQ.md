# FAQ - Perguntas Frequentes

Duvidas comuns sobre o DataPyn.

---

## Geral

### O que e o DataPyn?

DataPyn é uma IDE desktop Tauri para análise de dados que combina SQL e Python em um único ambiente. Cada sessão usa um kernel Python isolado. Você pode escrever consultas SQL, manipular resultados com pandas ou Polars e gerar visualizações na mesma interface.

### Quais sistemas operacionais sao suportados?

Pacotes oficiais do canal Tauri, disponíveis em [Downloads](https://datapyn.page/downloads.html):

- **Windows 10/11** (x64): Setup.exe Tauri e ZIP portátil.
- **Linux** (x64, base Ubuntu 22.04+): DEB, AppImage e tar.gz.
- **macOS 14+** (Apple Silicon): DMG Tauri.

Os tags atuais usam `tauri-vX.Y.Z`; `releases/latest` no GitHub continua reservado ao canal histórico PyQt6.

### O DataPyn e gratuito?

Sim, o DataPyn e **open-source e gratuito** para uso pessoal e comercial.

### Preciso instalar Python separadamente?

Os pacotes Tauri incluem Python e as bibliotecas de análise. Para desenvolver pelo código-fonte, instale Node.js 22, Rust 1.90+, Python 3.12+, uv e os pré-requisitos nativos descritos em [INSTALL.md](INSTALL.md).

---

## Conexoes

### Quais bancos de dados sao suportados?

- SQL Server (2012+)
- MySQL (5.7+)
- PostgreSQL (10+)
- MariaDB (10+)
- SQLite
- Databricks SQL Warehouse

### Como me conecto ao SQL Server com autenticacao Windows?

1. Clique em **Nova Conexao**
2. Selecione **SQL Server**
3. Preencha servidor e banco
4. Marque **Autenticacao Windows**
5. Teste e salve

### Minhas senhas sao seguras?

Credenciais de conexões salvas usam o cofre do sistema sob **`DataPyn.Tauri.Connections`**. O perfil Tauri é separado do perfil histórico. No Linux, salvar senhas requer um serviço Secret Service ativo; sem cofre, informe a senha ao conectar.

### Posso usar conexoes via SSH tunnel?

Atualmente nao ha suporte nativo para SSH tunnel. Como alternativa:

1. Configure o tunnel externamente (ex: PuTTY)
2. Conecte ao localhost na porta redirecionada

### O DataPyn suporta conexoes SSL?

Sim, para MySQL e PostgreSQL. Configure na aba **Avancado** do dialogo de conexao.

---

## Execucao

### Como executo apenas parte do codigo?

Selecione o texto e pressione `Ctrl+Enter`. Apenas a selecao sera executada.

Se nao houver selecao, o bloco inteiro e executado.

### Por que minha query esta demorando?

Possiveis causas:

1. **Query pesada** - Adicione filtros WHERE ou LIMIT
2. **Rede lenta** - Verifique conexao com o servidor
3. **Lock no banco** - Outra transacao pode estar bloqueando

Use a ação **Cancelar** ou **Escape**. O cancelamento encerra o kernel afetado; as outras sessões continuam disponíveis. Variáveis desse kernel podem precisar ser recriadas.

### Como uso variaveis Python no SQL?

Use o painel de parâmetros SQL. Parâmetros locais usam `@nome`; parâmetros compartilhados usam `{{nome}}` quando esse delimitador está configurado:

```sql
SELECT * FROM vendas WHERE YEAR(data) = @ano
```

Defina `ano` como inteiro no painel. Os parâmetros são enviados ao driver como valores tipados, preservando strings, datas e valores nulos.

### Posso executar DDL (CREATE, ALTER, DROP)?

Sim, mas com cautela. Nao ha confirmacao automatica para comandos DDL. Recomendamos:

1. Sempre testar em ambiente de dev primeiro
2. Usar transacoes quando possivel

---

## Resultados

### Como exporto os resultados para Excel?

1. Execute a query
2. Clique direito na tabela de resultados
3. Selecione **Exportar > Excel**

Use o menu de exportação da grade. Ele oferece Excel, CSV, JSON, SQL e Parquet; o download direto de consultas oferece CSV e Parquet.

### Por que a tabela mostra apenas parte das linhas?

O limite padrão de visualização é **100 linhas** e pode ser alterado nas configurações. O DataFrame contém o resultado completo. A exportação da grade usa a seleção ou a visualização completa, incluindo os filtros e a ordenação aplicados.

Para ver mais:

```python
# Ver todas as linhas no output
print(df.to_string())

# Ou alterar limite nas configuracoes
```

### Como copio dados para o clipboard?

Selecione celulas na tabela e use `Ctrl+C`. Os dados sao copiados em formato tabulado, pronto para colar no Excel.

---

## Python

### Quais bibliotecas estao disponiveis?

O DataPyn ja inclui:

- `pandas` - Manipulacao de dados
- `numpy` - Operacoes numericas
- `polars` - DataFrames
- `matplotlib` - Graficos
- `datetime` - Datas e horas

### Como instalo bibliotecas adicionais?

Use o gerenciador de pacotes integrado ao DataPyn. Os pacotes adicionais ficam no perfil Tauri, sem modificar o Python do sistema ou o app histórico. Reinicie a sessão quando o gerenciador solicitar.

### Por que minha variavel sumiu?

Cada **aba/sessao** tem seu proprio namespace Python. Variaveis nao sao compartilhadas entre abas.

Salvar um `.dpw` preserva o documento, mas não implica salvar todos os objetos do namespace. A restauração de DataFrames por snapshots Parquet é opcional e precisa estar habilitada.

### Como limpo o namespace?

Clique direito no painel de variaveis e selecione **Limpar Namespace**, ou execute:

```python
# Remove todas as variaveis
for var in list(dir()):
    if not var.startswith('_'):
        del globals()[var]
```

---

## Interface

### Como mudo o tema para escuro?

**Configuracoes > Aparencia > Tema > Escuro**

Ou use `Ctrl+,` para abrir configuracoes.

### Posso redimensionar os paineis?

Sim. Arraste as bordas dos paineis de resultados, output e variaveis para redimensionar. As posicoes sao salvas automaticamente.

### Como volto ao layout padrao?

**Configuracoes > Interface > Restaurar Layout Padrao**

### Os paineis sumiram. Como recupero?

Mostre os painéis pelo menu **Exibir**. Use `Ctrl+Shift+R` para restaurar a visualização ou `Ctrl+Shift+Alt+R` para restaurar a disposição.

---

## Workspace

### O que e um workspace?

Workspace e o estado completo da sua sessao de trabalho:

- Todas as abas abertas
- Codigo de cada aba
- Conexoes ativas
- Posicao da janela

### Onde os workspaces sao salvos?

Você escolhe o destino ao salvar arquivos `.dpw`. Configurações e sessões restauradas automaticamente ficam no perfil Tauri: `%LOCALAPPDATA%/app.datapyn.tauri` no Windows, `~/Library/Application Support/app.datapyn.tauri` no macOS e `$XDG_DATA_HOME/app.datapyn.tauri` (ou `~/.local/share/app.datapyn.tauri`) no Linux.

### Como abro um workspace antigo?

**Arquivo > Abrir Workspace** ou `Ctrl+O`

Navegue ate o arquivo `.dpw`.

### Posso abrir multiplos workspaces?

O app gerencia perfis de workspace separados, com conexões, atalhos, configurações e sessões próprios. Troque pelo gerenciador de workspaces quando não houver operações em andamento.

---

## Problemas Comuns

### Erro: "Driver ODBC nao encontrado"

SQL Server usa `pyodbc` com o driver Microsoft nativo. O Setup Windows prepara ODBC 18 x64 se necessário; Linux/macOS exigem instalação do driver e unixODBC. MySQL, MariaDB, PostgreSQL e Databricks usam os drivers Python embutidos. Veja [INSTALL.md](INSTALL.md).

### Erro: "Conexao recusada"

Verifique:

1. Servidor esta acessivel (ping)
2. Porta esta correta
3. Firewall permite conexao
4. Servico do banco esta rodando

### A aplicacao travou. Perdi meu trabalho?

O Tauri salva rascunhos de documentos no perfil do workspace após alterações e restaura as sessões ao iniciar. Código não é executado automaticamente na restauração. Salve também o `.dpw` com `Ctrl+S`; a restauração de variáveis Python é um recurso separado e opcional.

### Caracteres especiais aparecem errados

O DataPyn usa **UTF-8** por padrao. Se o banco usa outra codificacao:

1. Configuracoes da conexao > Avancado
2. Defina o charset correto (ex: `latin1`, `cp1252`)

---

## Performance

### Como melhoro a performance com tabelas grandes?

1. **Limite resultados** no SQL: `SELECT TOP 1000` ou `LIMIT 1000`

2. **Use tipos corretos** no pandas:

```python
df['quantidade'] = df['quantidade'].astype('int32')  # menor que int64
df['categoria'] = df['categoria'].astype('category')  # economiza memoria
```

3. **Processe em chunks**:

```python
for chunk in pd.read_sql(query, conn, chunksize=10000):
    processar(chunk)
```

### O DataPyn usa muita memoria?

Cada DataFrame fica na memoria. Para liberar:

```python
del df_grande
import gc
gc.collect()
```

Ou feche abas que nao esta usando.

---

## Pynia

### O que e a Pynia?

A IA integrada do DataPyn: chat, ferramentas que editam/executam blocos e autocomplete inline opcional. Ela se conecta a agentes externos via ACP; instalação, conta e login do agente são próprios.

### Quais agentes funcionam?

- **Claude**
- **Cursor**
- **GitHub Copilot**
- **Codex**

Abra a engrenagem **Agentes e configuração** no painel Pynia para instalar/atualizar, seguir as instruções de login e verificar as instalações. Modelos e raciocínio dependem das opções anunciadas pelo agente. Após a primeira mensagem, o agente fica associado à conversa da aba; inicie **Novo chat** para trocar.

### Como abro o chat?

Use o botão Pynia na barra de ferramentas ou mostre o painel pelo menu **Exibir**. Cada aba mantém seu próprio histórico.

### A Pynia envia meus dados pra onde?

Para o agente escolhido, que usa sua conta e serviço. O DataPyn fornece contexto da sessão, como código, schema, seleção e anexos. Responda no chat às permissões solicitadas pelo agente e consulte as políticas desse serviço.

### Ferramentas `datapyn_*` — preciso decorar?

Nao. Pergunte "lista as tabelas", "roda o bloco vendas", "plota um grafico" — a Pynia escolhe `datapyn_snapshot`, `datapyn_run`, `datapyn_chart`, etc.

---

## Mais Ajuda

### Onde reporto bugs?

[GitHub Issues](https://github.com/natharuc/datapyn/issues)

### Como contribuo?

Veja [CONTRIBUTING.md](https://github.com/natharuc/datapyn/blob/main/CONTRIBUTING.md)

### Tem comunidade?

- **Discord**: [link]
- **GitHub Discussions**: [link]

---

*Esta FAQ e atualizada regularmente. Se sua duvida nao esta aqui, abra uma issue no GitHub.*
