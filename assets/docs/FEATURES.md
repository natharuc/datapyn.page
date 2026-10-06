# Funcionalidades do DataPyn

Recursos do aplicativo DataPyn Tauri: interface React/TypeScript, host Rust, Monaco e kernels Python isolados por sessão.

---

## Editor de Codigo

### Blocos de Codigo Mistos

O DataPyn permite criar documentos com blocos de codigo SQL e Python intercalados:

- **Adicionar bloco SQL/Python**: use a barra de ferramentas ou `Ctrl+Shift+B`, e escolha a linguagem no bloco
- **Alternar linguagem**: Clique no seletor de linguagem do bloco
- **Mover blocos**: Arraste para reordenar
- **Deletar bloco**: use a ação de remover no bloco

### Syntax Highlighting

- SQL com palavras-chave coloridas (SELECT, FROM, WHERE, etc.)
- Python com destaque para funcoes, strings, numeros
- Temas claro e escuro

### Autocompletar

- Palavras-chave SQL (funciona offline)
- Funcoes Python/Pandas
- Tabelas e colunas do schema da conexao ativa
- Referencias cross-database (`outro_banco..tabela`) quando o servidor expoe outros catalogs
- Ghost text opcional da Pynia via agente ACP (Configurações → Editor → Sugestões inline da Pynia)

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
| **SQL Server** | Windows Auth, SQL Auth, Microsoft Entra, contexto de database por bloco |
| **MySQL** | Multiplos bancos, charset configuravel |
| **MariaDB** | Compativel com MySQL |
| **PostgreSQL** | Schemas, tipos customizados |
| **SQLite** | Arquivo local, sem servidor |
| **Databricks** | SQL Warehouse, Unity Catalog |

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
| `F5` | Executar seleção ou, sem seleção, o bloco atual |
| `Ctrl+F5` | Executar todos os blocos em sequencia |
| `Shift+Enter` | Executar bloco atual e avancar para o proximo |
| `Ctrl+Enter` | Executar seleção ou bloco atual |

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
- **Exportar**: Excel, CSV, JSON, SQL e Parquet
- **Download direto de consulta**: CSV/Parquet, com progresso e cancelamento

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

O perfil Tauri salva rascunhos após alterações e restaura as sessões ao iniciar, sem executar código automaticamente. Arquivos `.dpw` são salvos por `Ctrl+S`. Snapshots Parquet para restaurar DataFrames são opcionais e separados do documento.

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
| Parquet | `.parquet` | Dados colunares |

### Como Exportar

1. Execute uma query com resultados
2. Clique direito na tabela de resultados
3. Selecione "Exportar como..."
4. Escolha formato e local

---

## Seguranca

### Credenciais

- Credenciais salvas no cofre do sistema sob `DataPyn.Tauri.Connections`
- Opcao de nao salvar senha (pede a cada conexao)
- Windows Authentication quando disponivel

### Dados Locais

- Consultas usam os servidores de banco configurados; agentes Pynia recebem o contexto fornecido na conversa
- Historico salvo localmente
- Workspaces em formato JSON legivel

---

## Performance

### Otimizacoes

- Conexoes via pool (reutilizadas)
- Carregamento lazy de resultados grandes
- Kernels Python separados por sessão, mantendo a UI responsiva
- Cache de metadados de tabelas

### Resultados grandes

A grade virtual busca páginas do resultado e aplica filtros e ordenação no runtime. O uso de memória depende dos DataFrames, dos kernels abertos e do volume retornado; limite a consulta ou use o download direto CSV/Parquet para grandes exportações.

---

## Pynia (IA integrada)

A **Pynia** é o chat e o conjunto de ferramentas de IA dentro do DataPyn. Conecta agentes externos via ACP, com conversa e histórico isolados por aba.

### Agentes

| Agente | Configuração |
|----------|----------------|
| **Claude** | Instalação e autenticação do agente Claude |
| **Cursor** | Instalação e autenticação do agente Cursor |
| **GitHub Copilot** | Instalação do agente e login GitHub |
| **Codex** | Instalação e autenticação do agente Codex |

Abra **Agentes e configuração** pela engrenagem do painel Pynia. O gerenciador oferece instalação/atualização, instruções de login e verificação das instalações. Modelos e opções de raciocínio dependem do agente; conta e plano são próprios. Após o primeiro envio, o agente permanece associado à conversa da aba; **Novo chat** permite escolher outro.

### Chat

- Painel Pynia pela barra de ferramentas ou menu **Exibir**
- Referências `@` a blocos, variáveis, seleção e schema
- Imagens quando o modelo suporta visao
- Ferramentas consolidadas (`datapyn_snapshot`, `datapyn_run`, `datapyn_edit`, etc.)
- Solicitações de permissão e perguntas respondidas no chat

### Autocomplete inline

Sugestões em ghost text enquanto digita em blocos SQL/Python. Ative em **Configurações → Editor → Sugestões inline da Pynia**; exige um agente ACP instalado e autenticado. `Ctrl+.` solicita sugestão e `Tab` aceita. A sessão de autocomplete é separada da conversa.

---

*Consulte [SHORTCUTS.md](SHORTCUTS.md) para lista completa de atalhos de teclado.*
*Documentacao web atualizada: [datapyn.page/docs.html](https://datapyn.page/docs.html)*
