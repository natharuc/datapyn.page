# ================================================
# Exemplo 1: Analise de Vendas (parte Python)
# ================================================
# Execute apos o SQL de vendas para manipular
# os dados e criar visualizacoes
# ================================================

import matplotlib.pyplot as plt

# df ja contem os resultados da query SQL
print(f"Total de registros: {len(df)}")
print(f"Colunas: {list(df.columns)}")

# Resumo por categoria
por_categoria = df.groupby('categoria')['total'].agg(['sum', 'count', 'mean'])
por_categoria.columns = ['Total Vendido', 'Qtd Vendas', 'Ticket Medio']
print("\n--- Resumo por Categoria ---")
print(por_categoria.round(2))

# Top 10 produtos mais vendidos
top_produtos = df.groupby('produto')['quantidade'].sum().nlargest(10)
print("\n--- Top 10 Produtos ---")
print(top_produtos)

# Grafico de vendas por categoria
fig, axes = plt.subplots(1, 2, figsize=(14, 5))

# Grafico 1: Total por categoria
por_categoria['Total Vendido'].plot(kind='bar', ax=axes[0], color='steelblue')
axes[0].set_title('Vendas Totais por Categoria')
axes[0].set_xlabel('Categoria')
axes[0].set_ylabel('Valor (R$)')
axes[0].tick_params(axis='x', rotation=45)

# Grafico 2: Tendencia diaria
vendas_diarias = df.groupby('data_venda')['total'].sum()
vendas_diarias.plot(ax=axes[1], color='green', marker='o', markersize=4)
axes[1].set_title('Tendencia de Vendas Diarias')
axes[1].set_xlabel('Data')
axes[1].set_ylabel('Valor (R$)')

plt.tight_layout()
plt.show()

# Estatisticas gerais
print("\n--- Estatisticas Gerais ---")
print(f"Valor total vendido: R$ {df['total'].sum():,.2f}")
print(f"Ticket medio: R$ {df['total'].mean():,.2f}")
print(f"Maior venda: R$ {df['total'].max():,.2f}")
