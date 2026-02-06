# DataPyn - Documentacao Oficial

> **IDE moderna para consultas SQL com Python integrado**

DataPyn e uma ferramenta de produtividade para analistas de dados, desenvolvedores e DBAs que precisam executar queries SQL e manipular resultados com Python de forma integrada e eficiente.

---

## Indice da Documentacao

| Documento | Descricao |
|-----------|-----------|
| [README.md](README.md) | Este arquivo - visao geral |
| [FEATURES.md](FEATURES.md) | Lista completa de funcionalidades |
| [GETTING_STARTED.md](GETTING_STARTED.md) | Guia de inicio rapido |
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

---

## Bancos Suportados

| Banco | Driver | Autenticacao |
|-------|--------|--------------|
| SQL Server | ODBC Driver 17/18 | Windows Auth, SQL Auth |
| MySQL | mysql-connector | Usuario/Senha |
| MariaDB | mariadb-connector | Usuario/Senha |
| PostgreSQL | psycopg2 | Usuario/Senha |
| SQLite | sqlite3 (built-in) | Arquivo local |

---

## Requisitos do Sistema

- **Sistema Operacional**: Windows 10/11, Linux, macOS
- **Python**: 3.8 ou superior
- **RAM**: 4GB minimo, 8GB recomendado
- **Espaco em disco**: 500MB

---

## Licenca

MIT License - Uso livre para projetos pessoais e comerciais.

---

## Links Uteis

- [Repositorio GitHub](https://github.com/seu-usuario/datapyn)
- [Reportar Bug](https://github.com/seu-usuario/datapyn/issues)
- [Solicitar Feature](https://github.com/seu-usuario/datapyn/issues)

---

*DataPyn - Simplifique sua analise de dados*
