# Funcionalidades do DataPyn

Lista completa de todas as funcionalidades disponiveis no DataPyn.

---

## Editor de Codigo

### Blocos de Codigo Mistos

O DataPyn permite criar documentos com blocos de codigo SQL e Python intercalados:

- **Adicionar bloco SQL**: Clique no botao `+ SQL` ou use `Ctrl+Shift+S`
- **Adicionar bloco Python**: Clique no botao `+ Python` ou use `Ctrl+Shift+P`
- **Alternar linguagem**: Clique no seletor de linguagem do bloco
- **Mover blocos**: Arraste para reordenar
- **Deletar bloco**: Botao X ou `Ctrl+Shift+D`

### Syntax Highlighting

- SQL com palavras-chave coloridas (SELECT, FROM, WHERE, etc.)
- Python com destaque para funcoes, strings, numeros
- Temas claro e escuro

### Autocompletar

- Palavras-chave SQL
- Funcoes Python/Pandas
- Nomes de tabelas e colunas (apos conectar)

### Numeracao de Linhas

- Linhas numeradas por bloco
- Indicador de linha atual
- Clique para selecionar linha inteira

---

## Conexoes de Banco de Dados

### Gerenciador de Conexoes

Painel lateral com todas as conexoes salvas:

- **Criar conexao**: Formulario completo com teste de conexao
- **Editar conexao**: Alterar parametros a qualquer momento
- **Cor da conexao**: Identifique visualmente cada ambiente
- **Favoritos**: Marque conexoes mais usadas

### Tipos de Conexao

| Banco | Recursos |
|-------|----------|
| **SQL Server** | Windows Auth, SQL Auth, USE database dinamico |
| **MySQL** | Multiplos bancos, charset configuravel |
| **MariaDB** | Compativel com MySQL |
| **PostgreSQL** | Schemas, tipos customizados |
| **SQLite** | Arquivo local, sem servidor |

### Conexao por Sessao

Cada aba pode conectar a um banco diferente:

- Conexao independente por aba
- Indicador visual de conexao ativa
- Cor da aba reflete a conexao

---

## Execucao de Codigo

### Modos de Execucao

| Atalho | Acao |
|--------|------|
| `F5` | Executar bloco SQL atual |
| `Shift+F5` | Executar bloco Python atual |
| `Ctrl+Enter` | Executar bloco atual (auto-detecta linguagem) |
| `Ctrl+Shift+Enter` | Executar todos os blocos |

### Execucao SQL

- Suporte a multiplos comandos (separados por `;` ou `GO`)
- Resultado em tabela interativa
- Mensagens de erro detalhadas
- Contagem de linhas afetadas

### Execucao Python

- Namespace persistente entre execucoes
- Acesso automatico ao ultimo resultado SQL (`df`)
- Output capturado no painel Output
- Variaveis visiveis no painel Variables

### Execucao Cross-Syntax

Python pode referenciar resultados SQL:

```sql
-- Bloco 1: SQL
SELECT * FROM vendas WHERE ano = 2024
```

```python
# Bloco 2: Python - df contem o resultado do SQL
total = df['valor'].sum()
print(f"Total de vendas: R$ {total:,.2f}")
```

---

## Paineis de Resultados

### Results (Resultados)

Tabela interativa com os dados retornados:

- **Colunas redimensionaveis**: Arraste bordas
- **Ordenacao**: Clique no cabecalho
- **Selecao**: Clique para selecionar celulas
- **Copiar**: `Ctrl+C` copia selecao
- **Exportar**: Excel, CSV, JSON

### Output (Saida)

Console com output do Python e mensagens do sistema:

- `print()` aparece aqui
- Erros de execucao
- Logs de conexao
- Timestamps

### Variables (Variaveis)

Visualizador de variaveis do namespace Python:

- Nome, tipo e valor
- Expandir objetos complexos
- Atualiza automaticamente apos execucao

---

## Gerenciamento de Abas

### Multiplas Sessoes

- **Nova aba**: `Ctrl+N` ou botao `+`
- **Fechar aba**: `Ctrl+W` ou botao X
- **Duplicar aba**: Menu de contexto → Duplicar
- **Renomear aba**: Duplo-clique no titulo

### Heranca de Conexao

Nova aba herda conexao da aba ativa:

1. Conecte na aba atual
2. Crie nova aba com `Ctrl+N`
3. Nova aba ja esta conectada ao mesmo banco

### Indicadores Visuais

- **Cor da aba**: Indica conexao ativa
- **Asterisco (*)**: Conteudo modificado
- **Icone de execucao**: Aba executando

---

## Importacao de Arquivos

### Drag and Drop

Arraste arquivos diretamente para o editor:

| Extensao | Acao |
|----------|------|
| `.csv` | Gera `pd.read_csv(...)` |
| `.json` | Gera `pd.read_json(...)` |
| `.xlsx` / `.xls` | Gera `pd.read_excel(...)` |
| `.sql` | Abre em nova aba como SQL |
| `.py` | Abre em nova aba como Python |
| `.dpw` | Abre workspace completo |

### Importacao Inteligente

O codigo gerado inclui:

```python
# Nome de variavel baseado no arquivo
vendas_2024 = pd.read_csv(r"C:\dados\vendas_2024.csv")
vendas_2024  # Mostra preview automatico
```

---

## Workspaces

### Salvar Workspace

`Ctrl+S` ou menu Arquivo → Salvar:

- Salva todas as abas abertas
- Preserva conexoes ativas
- Mantem posicao dos paineis
- Formato `.dpw` (JSON)

### Restaurar Workspace

`Ctrl+O` ou menu Arquivo → Abrir:

- Restaura todas as sessoes
- Reconecta aos bancos (se credenciais salvas)
- Restaura layout da janela

### Auto-Save

Workspace salvo automaticamente:

- A cada 5 minutos
- Ao fechar aplicacao
- Restaurado ao iniciar

---

## Configuracoes

### Acessar Configuracoes

`Ctrl+,` ou menu Ferramentas → Configuracoes

### Opcoes Disponiveis

**Aparencia**
- Tema (Claro/Escuro)
- Tamanho da fonte
- Familia da fonte

**Editor**
- Tab size
- Mostrar espacos em branco
- Word wrap

**Conexoes**
- Timeout de conexao
- Salvar senhas (criptografadas)

**Atalhos**
- Personalizar atalhos de teclado

---

## Exportacao de Dados

### Formatos Suportados

| Formato | Extensao | Descricao |
|---------|----------|-----------|
| Excel | `.xlsx` | Planilha formatada |
| CSV | `.csv` | Valores separados por virgula |
| JSON | `.json` | Estrutura de dados |
| SQL | `.sql` | INSERT statements |

### Como Exportar

1. Execute uma query com resultados
2. Clique direito na tabela de resultados
3. Selecione "Exportar como..."
4. Escolha formato e local

---

## Seguranca

### Credenciais

- Senhas armazenadas com criptografia AES-256
- Opcao de nao salvar senha (pede a cada conexao)
- Windows Authentication quando disponivel

### Dados Locais

- Nenhum dado enviado para servidores externos
- Historico salvo localmente
- Workspaces em formato JSON legivel

---

## Performance

### Otimizacoes

- Conexoes via pool (reutilizadas)
- Carregamento lazy de resultados grandes
- Threads separadas para execucao (UI responsiva)
- Cache de metadados de tabelas

### Limites Recomendados

- Ate 1 milhao de linhas por resultado
- Ate 50 abas simultaneas
- Ate 10 conexoes ativas

---

*Consulte [SHORTCUTS.md](SHORTCUTS.md) para lista completa de atalhos de teclado.*
