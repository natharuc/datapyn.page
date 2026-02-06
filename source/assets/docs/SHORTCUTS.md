# Atalhos de Teclado

Referencia completa de atalhos do DataPyn.

---

## Execucao

| Atalho | Acao | Contexto |
|--------|------|----------|
| `Ctrl+Enter` | Executar bloco atual | Executa o bloco SQL/Python onde o cursor esta |
| `F5` | Executar bloco atual | Alternativa ao Ctrl+Enter |
| `Shift+F5` | Executar como Python | Forca execucao Python independente do tipo de bloco |
| `Ctrl+Shift+Enter` | Executar todos os blocos | Executa todos os blocos da aba em sequencia |

---

## Edicao

| Atalho | Acao | Descricao |
|--------|------|-----------|
| `Ctrl+C` | Copiar | Copia texto selecionado |
| `Ctrl+V` | Colar | Cola texto |
| `Ctrl+X` | Recortar | Recorta texto selecionado |
| `Ctrl+Z` | Desfazer | Desfaz ultima acao |
| `Ctrl+Y` | Refazer | Refaz acao desfeita |
| `Ctrl+A` | Selecionar tudo | Seleciona todo texto do bloco |
| `Ctrl+D` | Duplicar linha | Duplica linha atual |
| `Ctrl+/` | Comentar linha | Alterna comentario na linha |
| `Tab` | Indentar | Adiciona indentacao |
| `Shift+Tab` | Desindentar | Remove indentacao |

---

## Busca

| Atalho | Acao | Descricao |
|--------|------|-----------|
| `Ctrl+F` | Buscar | Abre dialogo de busca |
| `Ctrl+H` | Substituir | Abre dialogo de substituir |
| `F3` | Proxima ocorrencia | Vai para proxima ocorrencia |
| `Shift+F3` | Ocorrencia anterior | Vai para ocorrencia anterior |
| `Ctrl+G` | Ir para linha | Abre dialogo para ir a linha especifica |

---

## Abas e Sessoes

| Atalho | Acao | Descricao |
|--------|------|-----------|
| `Ctrl+T` | Nova aba | Cria nova sessao/aba |
| `Ctrl+W` | Fechar aba | Fecha aba atual |
| `Ctrl+Tab` | Proxima aba | Alterna para proxima aba |
| `Ctrl+Shift+Tab` | Aba anterior | Alterna para aba anterior |
| `Ctrl+1..9` | Ir para aba N | Vai direto para aba numerada |
| `Ctrl+Shift+T` | Reabrir aba | Reabre ultima aba fechada |

---

## Arquivo

| Atalho | Acao | Descricao |
|--------|------|-----------|
| `Ctrl+S` | Salvar | Salva workspace atual |
| `Ctrl+Shift+S` | Salvar como | Salva workspace com novo nome |
| `Ctrl+O` | Abrir | Abre arquivo ou workspace |
| `Ctrl+N` | Novo | Cria novo workspace |

---

## Blocos de Codigo

| Atalho | Acao | Descricao |
|--------|------|-----------|
| `Ctrl+Shift+A` | Adicionar bloco | Adiciona novo bloco apos o atual |
| `Ctrl+Shift+D` | Duplicar bloco | Duplica bloco atual |
| `Alt+Up` | Mover bloco acima | Move bloco para cima |
| `Alt+Down` | Mover bloco abaixo | Move bloco para baixo |
| `Ctrl+Shift+Delete` | Remover bloco | Remove bloco atual |

---

## Paineis

| Atalho | Acao | Descricao |
|--------|------|-----------|
| `Ctrl+R` | Resultados | Mostra/oculta painel de resultados |
| `Ctrl+Shift+O` | Output | Mostra/oculta painel de output |
| `Ctrl+Shift+V` | Variaveis | Mostra/oculta painel de variaveis |
| `Ctrl+B` | Conexoes | Mostra/oculta painel de conexoes |
| `F11` | Tela cheia | Alterna modo tela cheia |

---

## Conexao

| Atalho | Acao | Descricao |
|--------|------|-----------|
| `Ctrl+Shift+C` | Nova conexao | Abre dialogo de nova conexao |
| `Ctrl+Shift+N` | Trocar conexao | Abre seletor de conexao |

---

## Resultados

| Atalho | Acao | Contexto |
|--------|------|----------|
| `Ctrl+Shift+E` | Exportar CSV | Exporta resultado para CSV |
| `Ctrl+Shift+X` | Exportar Excel | Exporta resultado para Excel |
| `Ctrl+C` | Copiar celulas | Copia celulas selecionadas na tabela |

---

## Outros

| Atalho | Acao | Descricao |
|--------|------|-----------|
| `Ctrl+,` | Configuracoes | Abre dialogo de configuracoes |
| `Ctrl+Shift+P` | Paleta de comandos | Abre paleta de comandos |
| `F1` | Ajuda | Abre documentacao |
| `Ctrl+Q` | Sair | Fecha aplicacao |

---

## Personalizacao

Os atalhos podem ser personalizados em **Configuracoes > Atalhos**.

### Arquivo de Configuracao

Os atalhos customizados sao salvos em:

```
%APPDATA%/DataPyn/shortcuts.json
```

### Formato

```json
{
    "execute_block": "Ctrl+Return",
    "new_tab": "Ctrl+T",
    "save_workspace": "Ctrl+S"
}
```

---

## Dicas

1. **Execucao rapida**: Use `Ctrl+Enter` para executar apenas o bloco onde o cursor esta - nao precisa selecionar nada.

2. **Navegacao entre abas**: `Ctrl+1`, `Ctrl+2`, etc. permite ir direto para abas especificas.

3. **Comentarios SQL**: `Ctrl+/` adiciona `--` em SQL e `#` em Python automaticamente.

4. **Copiar resultados**: Selecione celulas na tabela de resultados e use `Ctrl+C` para copiar formatado para Excel.
