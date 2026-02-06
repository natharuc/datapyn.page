-- ================================================
-- Exemplo 1: Analise de Vendas
-- ================================================
-- Este exemplo demonstra consulta SQL seguida de
-- manipulacao Python com pandas e visualizacao
-- ================================================

-- Bloco SQL: Buscar dados de vendas
SELECT 
    p.nome AS produto,
    c.nome AS categoria,
    v.quantidade,
    v.preco_unitario,
    v.quantidade * v.preco_unitario AS total,
    v.data_venda
FROM vendas v
INNER JOIN produtos p ON v.produto_id = p.id
INNER JOIN categorias c ON p.categoria_id = c.id
WHERE v.data_venda >= DATEADD(month, -3, GETDATE())
ORDER BY v.data_venda DESC;
