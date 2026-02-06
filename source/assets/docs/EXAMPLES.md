# Exemplos de Uso

Casos de uso reais e exemplos praticos do DataPyn.

---

## Exemplo 1: Analise de Vendas

### Cenario

Voce precisa analisar as vendas do ultimo trimestre, identificar os top produtos e criar um relatorio.

### Codigo

```sql
-- Bloco 1: Buscar dados de vendas
SELECT 
    p.nome AS produto,
    c.nome AS categoria,
    SUM(v.quantidade) AS total_vendido,
    SUM(v.valor_total) AS receita_total,
    AVG(v.valor_unitario) AS ticket_medio
FROM vendas v
INNER JOIN produtos p ON v.produto_id = p.id
INNER JOIN categorias c ON p.categoria_id = c.id
WHERE v.data_venda >= DATEADD(MONTH, -3, GETDATE())
GROUP BY p.nome, c.nome
ORDER BY receita_total DESC
```

```python
# Bloco 2: Analise com Python
import matplotlib.pyplot as plt

# Top 10 produtos por receita
top_10 = df.head(10)
print("=" * 50)
print("TOP 10 PRODUTOS - ULTIMO TRIMESTRE")
print("=" * 50)
print(top_10[['produto', 'receita_total']].to_string(index=False))

# Grafico de barras
fig, ax = plt.subplots(figsize=(12, 6))
ax.barh(top_10['produto'], top_10['receita_total'], color='steelblue')
ax.set_xlabel('Receita Total (R$)')
ax.set_title('Top 10 Produtos por Receita')
plt.tight_layout()
plt.show()

# Analise por categoria
print("\n" + "=" * 50)
print("RECEITA POR CATEGORIA")
print("=" * 50)
por_categoria = df.groupby('categoria')['receita_total'].sum().sort_values(ascending=False)
print(por_categoria.to_string())
```

### Resultado

- Tabela com dados de vendas
- Grafico de barras horizontal
- Resumo por categoria

---

## Exemplo 2: Limpeza de Dados

### Cenario

Voce tem uma tabela com dados de clientes que precisa ser limpa antes de uma migracao.

### Codigo

```sql
-- Bloco 1: Buscar dados brutos
SELECT 
    id,
    nome,
    email,
    telefone,
    data_cadastro
FROM clientes
WHERE data_cadastro >= '2024-01-01'
```

```python
# Bloco 2: Limpeza e validacao
import re

# Copia para nao alterar original
df_limpo = df.copy()

# 1. Remover espacos extras dos nomes
df_limpo['nome'] = df_limpo['nome'].str.strip().str.title()

# 2. Padronizar emails (lowercase)
df_limpo['email'] = df_limpo['email'].str.lower().str.strip()

# 3. Validar emails
def email_valido(email):
    if pd.isna(email):
        return False
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return bool(re.match(pattern, str(email)))

df_limpo['email_valido'] = df_limpo['email'].apply(email_valido)

# 4. Limpar telefones (so numeros)
df_limpo['telefone_limpo'] = df_limpo['telefone'].str.replace(r'\D', '', regex=True)

# 5. Relatorio
print("RELATORIO DE LIMPEZA")
print("-" * 40)
print(f"Total de registros: {len(df_limpo)}")
print(f"Emails validos: {df_limpo['email_valido'].sum()}")
print(f"Emails invalidos: {(~df_limpo['email_valido']).sum()}")

# 6. Mostrar problematicos
invalidos = df_limpo[~df_limpo['email_valido']]
if len(invalidos) > 0:
    print("\nRegistros com email invalido:")
    print(invalidos[['id', 'nome', 'email']].to_string(index=False))
```

---

## Exemplo 3: Comparacao Entre Ambientes

### Cenario

Comparar contagem de registros entre producao e homologacao.

### Codigo (Aba 1 - Producao)

```sql
-- Conectado em PRODUCAO
SELECT 
    'PRODUCAO' AS ambiente,
    (SELECT COUNT(*) FROM clientes) AS clientes,
    (SELECT COUNT(*) FROM pedidos) AS pedidos,
    (SELECT COUNT(*) FROM produtos) AS produtos
```

### Codigo (Aba 2 - Homologacao)

```sql
-- Conectado em HOMOLOGACAO  
SELECT 
    'HOMOLOGACAO' AS ambiente,
    (SELECT COUNT(*) FROM clientes) AS clientes,
    (SELECT COUNT(*) FROM pedidos) AS pedidos,
    (SELECT COUNT(*) FROM produtos) AS produtos
```

### Resultado

Compare os resultados lado a lado em abas diferentes, cada uma conectada ao seu respectivo ambiente.

---

## Exemplo 4: Importar CSV e Fazer Join

### Cenario

Voce recebeu um CSV com metas por vendedor e precisa comparar com as vendas reais.

### Codigo

```python
# Bloco 1: Importar CSV de metas (arraste o arquivo ou use o codigo)
metas = pd.read_csv(r"C:\dados\metas_vendedores_2024.csv")
metas.head()
```

```sql
-- Bloco 2: Buscar vendas realizadas
SELECT 
    v.vendedor_id,
    e.nome AS vendedor,
    SUM(p.valor_total) AS total_vendas
FROM pedidos p
INNER JOIN vendedores e ON p.vendedor_id = e.id
WHERE YEAR(p.data_pedido) = 2024
GROUP BY v.vendedor_id, e.nome
```

```python
# Bloco 3: Comparar metas vs realizado
# df contem as vendas, metas contem as metas

# Merge dos dados
comparativo = df.merge(
    metas, 
    left_on='vendedor_id', 
    right_on='id_vendedor',
    how='outer'
)

# Calcular atingimento
comparativo['atingimento'] = (comparativo['total_vendas'] / comparativo['meta'] * 100).round(1)
comparativo['status'] = comparativo['atingimento'].apply(
    lambda x: 'Meta Batida!' if x >= 100 else 'Abaixo da Meta'
)

# Ordenar por atingimento
comparativo = comparativo.sort_values('atingimento', ascending=False)

# Exibir resultado
print("ATINGIMENTO DE METAS 2024")
print("=" * 60)
print(comparativo[['vendedor', 'meta', 'total_vendas', 'atingimento', 'status']].to_string(index=False))

# Resumo
bateram = (comparativo['atingimento'] >= 100).sum()
total = len(comparativo)
print(f"\n{bateram} de {total} vendedores bateram a meta ({bateram/total*100:.1f}%)")
```

---

## Exemplo 5: Monitoramento de Performance

### Cenario

Monitorar queries lentas no SQL Server.

### Codigo

```sql
-- Queries mais lentas nas ultimas 2 horas
SELECT TOP 20
    qs.total_elapsed_time / qs.execution_count / 1000.0 AS avg_ms,
    qs.execution_count,
    qs.total_elapsed_time / 1000.0 AS total_ms,
    SUBSTRING(qt.text, 1, 200) AS query_text
FROM sys.dm_exec_query_stats qs
CROSS APPLY sys.dm_exec_sql_text(qs.sql_handle) qt
WHERE qs.last_execution_time > DATEADD(HOUR, -2, GETDATE())
ORDER BY avg_ms DESC
```

```python
# Analise das queries lentas
print("ANALISE DE QUERIES LENTAS")
print("=" * 60)

# Estatisticas
print(f"Total de queries analisadas: {len(df)}")
print(f"Tempo medio (ms): {df['avg_ms'].mean():.2f}")
print(f"Query mais lenta (ms): {df['avg_ms'].max():.2f}")

# Queries criticas (> 1 segundo)
criticas = df[df['avg_ms'] > 1000]
if len(criticas) > 0:
    print(f"\n ATENCAO: {len(criticas)} queries com media > 1 segundo!")
    print(criticas[['avg_ms', 'execution_count', 'query_text']].to_string(index=False))
```

---

## Exemplo 6: Geracao de Relatorio HTML

### Cenario

Gerar relatorio HTML formatado a partir dos dados.

### Codigo

```sql
-- Buscar dados para relatorio
SELECT 
    departamento,
    COUNT(*) AS total_funcionarios,
    AVG(salario) AS salario_medio,
    MIN(salario) AS menor_salario,
    MAX(salario) AS maior_salario
FROM funcionarios
GROUP BY departamento
ORDER BY total_funcionarios DESC
```

```python
# Gerar relatorio HTML
from datetime import datetime

html = f"""
<!DOCTYPE html>
<html>
<head>
    <title>Relatorio de Funcionarios</title>
    <style>
        body {{ font-family: Arial, sans-serif; margin: 20px; }}
        h1 {{ color: #333; }}
        table {{ border-collapse: collapse; width: 100%; }}
        th, td {{ border: 1px solid #ddd; padding: 8px; text-align: left; }}
        th {{ background-color: #4CAF50; color: white; }}
        tr:nth-child(even) {{ background-color: #f2f2f2; }}
        .footer {{ margin-top: 20px; color: #666; font-size: 12px; }}
    </style>
</head>
<body>
    <h1>Relatorio de Funcionarios por Departamento</h1>
    <p>Gerado em: {datetime.now().strftime('%d/%m/%Y %H:%M')}</p>
    
    {df.to_html(index=False, float_format='R$ {:,.2f}'.format)}
    
    <div class="footer">
        <p>Total de departamentos: {len(df)}</p>
        <p>Total de funcionarios: {df['total_funcionarios'].sum()}</p>
    </div>
</body>
</html>
"""

# Salvar arquivo
with open(r"C:\relatorios\funcionarios.html", "w", encoding="utf-8") as f:
    f.write(html)

print("Relatorio salvo em C:\\relatorios\\funcionarios.html")
```

---

## Exemplo 7: Automacao com Loops

### Cenario

Executar a mesma analise para multiplas tabelas.

### Codigo

```python
# Lista de tabelas para analisar
tabelas = ['clientes', 'produtos', 'pedidos', 'fornecedores']

# Funcao para obter info da tabela (usando SQL dinamico)
def analisar_tabela(nome_tabela):
    # Aqui voce executaria uma query, mas como exemplo:
    return {
        'tabela': nome_tabela,
        'registros': 0,  # Seria preenchido com query real
        'colunas': 0
    }

# Ou, para cada tabela, voce pode usar blocos SQL separados
# e consolidar os resultados em Python

print("INVENTARIO DE TABELAS")
print("=" * 40)
for tabela in tabelas:
    print(f"- {tabela}")
```

```sql
-- Para cada tabela, execute queries como:
SELECT 'clientes' AS tabela, COUNT(*) AS registros FROM clientes
UNION ALL
SELECT 'produtos', COUNT(*) FROM produtos
UNION ALL
SELECT 'pedidos', COUNT(*) FROM pedidos
UNION ALL
SELECT 'fornecedores', COUNT(*) FROM fornecedores
```

```python
# Consolidar resultados
df_inventario = df.copy()
df_inventario['percentual'] = (df_inventario['registros'] / df_inventario['registros'].sum() * 100).round(1)
print(df_inventario.to_string(index=False))
```

---

## Mais Exemplos

Veja a pasta `docs/examples/` para scripts completos:

- `analise_financeira.py` - Analise de indicadores financeiros
- `etl_basico.sql` - Pipeline ETL simples
- `dashboard_dados.py` - Geracao de dashboard com matplotlib
- `validacao_dados.py` - Validacao de qualidade de dados

---

*Tem um caso de uso interessante? Compartilhe conosco no [GitHub](https://github.com/seu-usuario/datapyn/discussions)!*
