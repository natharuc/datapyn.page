# Quick Reference / Cheat Sheet

Referencia rapida do DataPyn.

---

## Atalhos Essenciais

| Acao | Atalho |
|------|--------|
| Executar bloco | `Ctrl+Enter` ou `F5` |
| Nova aba | `Ctrl+T` |
| Fechar aba | `Ctrl+W` |
| Salvar | `Ctrl+S` |
| Abrir | `Ctrl+O` |
| Buscar | `Ctrl+F` |
| Configuracoes | `Ctrl+,` |

---

## Variaveis Especiais

| Variavel | Descricao |
|----------|-----------|
| `df` | DataFrame com ultimo resultado SQL |
| `conn` | Conexao ativa (SQLAlchemy) |
| `cursor` | Cursor da conexao |

---

## Funcoes Uteis

```python
# Ver todas as tabelas
df = pd.read_sql("SELECT * FROM INFORMATION_SCHEMA.TABLES", conn)

# Exportar para CSV
df.to_csv('resultado.csv', index=False)

# Exportar para Excel
df.to_excel('resultado.xlsx', index=False)

# Grafico rapido
df.plot(kind='bar', x='coluna_x', y='coluna_y')
plt.show()
```

---

## Strings de Conexao

### SQL Server (Windows Auth)
```
mssql+pyodbc://servidor/banco?driver=ODBC+Driver+17+for+SQL+Server&trusted_connection=yes
```

### SQL Server (SQL Auth)
```
mssql+pyodbc://usuario:senha@servidor/banco?driver=ODBC+Driver+17+for+SQL+Server
```

### MySQL
```
mysql+pymysql://usuario:senha@servidor:3306/banco
```

### PostgreSQL
```
postgresql://usuario:senha@servidor:5432/banco
```

### SQLite
```
sqlite:///caminho/para/banco.db
```

---

## Comandos SQL Comuns

```sql
-- Listar tabelas (SQL Server)
SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE'

-- Listar tabelas (MySQL)
SHOW TABLES

-- Listar tabelas (PostgreSQL)
SELECT tablename FROM pg_tables WHERE schemaname = 'public'

-- Estrutura da tabela (SQL Server)
EXEC sp_columns 'nome_tabela'

-- Estrutura da tabela (MySQL)
DESCRIBE nome_tabela

-- Mudar banco (SQL Server)
USE nome_banco
```

---

## Pandas Rapido

```python
# Primeiras linhas
df.head(10)

# Info geral
df.info()

# Estatisticas
df.describe()

# Filtrar
df[df['coluna'] > 100]

# Agrupar
df.groupby('coluna')['valor'].sum()

# Ordenar
df.sort_values('coluna', ascending=False)

# Remover duplicatas
df.drop_duplicates()

# Preencher nulos
df.fillna(0)
```

---

## Matplotlib Rapido

```python
import matplotlib.pyplot as plt

# Linha
df.plot(x='data', y='valor')

# Barras
df.plot(kind='bar', x='categoria', y='total')

# Pizza
df['categoria'].value_counts().plot(kind='pie')

# Histograma
df['valor'].hist(bins=20)

# Scatter
df.plot(kind='scatter', x='x', y='y')

# Mostrar
plt.show()
```

---

## Dicas

1. **Ctrl+Enter** executa apenas o bloco atual - nao precisa selecionar
2. Variaveis sao compartilhadas entre blocos da mesma aba
3. Use `print()` para ver output no painel de output
4. `df` sempre contem o ultimo resultado SQL
5. Graficos aparecem automaticamente apos `plt.show()`

---

*Keep this handy!*
