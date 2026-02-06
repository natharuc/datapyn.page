# FAQ - Perguntas Frequentes

Duvidas comuns sobre o DataPyn.

---

## Geral

### O que e o DataPyn?

DataPyn e uma IDE para analise de dados que combina SQL e Python em um unico ambiente. Voce pode escrever queries SQL, manipular os resultados com pandas, e gerar visualizacoes - tudo em uma interface unificada.

### Quais sistemas operacionais sao suportados?

Atualmente, o DataPyn suporta **Windows 10/11**. Versoes para macOS e Linux estao em desenvolvimento.

### O DataPyn e gratuito?

Sim, o DataPyn e **open-source e gratuito** para uso pessoal e comercial.

### Preciso instalar Python separadamente?

O executavel standalone ja inclui Python embarcado. Se voce executar a partir do codigo-fonte, precisa de Python 3.11+.

---

## Conexoes

### Quais bancos de dados sao suportados?

- SQL Server (2012+)
- MySQL (5.7+)
- PostgreSQL (10+)
- MariaDB (10+)
- SQLite

### Como me conecto ao SQL Server com autenticacao Windows?

1. Clique em **Nova Conexao**
2. Selecione **SQL Server**
3. Preencha servidor e banco
4. Marque **Autenticacao Windows**
5. Teste e salve

### Minhas senhas sao seguras?

Sim. Senhas salvas sao criptografadas com **AES-256**. A chave de criptografia e derivada do hardware da sua maquina, entao o arquivo de conexoes nao pode ser usado em outro computador.

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

Voce pode cancelar a execucao clicando no **X** que aparece.

### Como uso variaveis Python no SQL?

Use a sintaxe de f-string:

```python
ano = 2024
```

```sql
SELECT * FROM vendas WHERE YEAR(data) = {ano}
```

A variavel `ano` do Python sera substituida no SQL.

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

Ou use `Ctrl+Shift+X`.

### Por que a tabela mostra apenas 1000 linhas?

Por padrao, o DataPyn limita a exibicao a **1000 linhas** para performance. O DataFrame `df` contem todos os dados.

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
- `matplotlib` - Graficos
- `seaborn` - Visualizacoes estatisticas
- `datetime` - Datas e horas

### Como instalo bibliotecas adicionais?

Abra um terminal e instale via pip:

```bash
pip install nome_da_biblioteca
```

A biblioteca ficara disponivel em novas sessoes.

### Por que minha variavel sumiu?

Cada **aba/sessao** tem seu proprio namespace Python. Variaveis nao sao compartilhadas entre abas.

Se voce fechar uma aba, as variaveis sao perdidas (a menos que salve o workspace).

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

Use os atalhos:

- `Ctrl+R` - Painel de resultados
- `Ctrl+Shift+O` - Painel de output
- `Ctrl+Shift+V` - Painel de variaveis

---

## Workspace

### O que e um workspace?

Workspace e o estado completo da sua sessao de trabalho:

- Todas as abas abertas
- Codigo de cada aba
- Conexoes ativas
- Posicao da janela

### Onde os workspaces sao salvos?

Por padrao em:

```
%USERPROFILE%/Documents/DataPyn/
```

Arquivos `.dpw` (DataPyn Workspace).

### Como abro um workspace antigo?

**Arquivo > Abrir Workspace** ou `Ctrl+O`

Navegue ate o arquivo `.dpw`.

### Posso abrir multiplos workspaces?

Atualmente, apenas um workspace pode estar aberto por vez. Abrir outro substitui o atual.

---

## Problemas Comuns

### Erro: "Driver ODBC nao encontrado"

Instale o driver ODBC apropriado:

- **SQL Server**: [Microsoft ODBC Driver 17/18](https://docs.microsoft.com/sql/connect/odbc/download-odbc-driver-for-sql-server)
- **MySQL**: [MySQL Connector/ODBC](https://dev.mysql.com/downloads/connector/odbc/)
- **PostgreSQL**: [PostgreSQL ODBC](https://www.postgresql.org/ftp/odbc/versions/)

### Erro: "Conexao recusada"

Verifique:

1. Servidor esta acessivel (ping)
2. Porta esta correta
3. Firewall permite conexao
4. Servico do banco esta rodando

### A aplicacao travou. Perdi meu trabalho?

O DataPyn faz **auto-save** a cada 2 minutos. Ao reabrir, ele pergunta se deseja restaurar a sessao anterior.

O backup fica em:

```
%APPDATA%/DataPyn/autosave.dpw
```

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

## Mais Ajuda

### Onde reporto bugs?

[GitHub Issues](https://github.com/seu-usuario/datapyn/issues)

### Como contribuo?

Veja [CONTRIBUTING.md](https://github.com/seu-usuario/datapyn/blob/main/CONTRIBUTING.md)

### Tem comunidade?

- **Discord**: [link]
- **GitHub Discussions**: [link]

---

*Esta FAQ e atualizada regularmente. Se sua duvida nao esta aqui, abra uma issue no GitHub.*
