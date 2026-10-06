# Atalhos de Teclado

Referência dos atalhos padrão do DataPyn Tauri. Altere as combinações em **Configurações → Atalhos**. No macOS, Cmd corresponde ao modificador Ctrl nos comandos do aplicativo.

## Execução

| Atalho | Ação |
|--------|------|
| `F5` / `Ctrl+Enter` | Executar a seleção ou, sem seleção, o bloco atual |
| `Ctrl+F5` | Executar blocos ativos em sequência |
| `Shift+Enter` | Executar seleção/bloco e avançar |
| `Escape` | Cancelar execução |

## Documentos e sessões

| Atalho | Ação |
|--------|------|
| `Ctrl+N` | Nova sessão |
| `Ctrl+T` | Nova aba |
| `Ctrl+W` | Fechar aba |
| `Ctrl+S` | Salvar `.dpw` |
| `Ctrl+Shift+S` | Salvar como |
| `Ctrl+O` | Abrir arquivo |
| `Ctrl+Shift+E` | Exportar análise como script Python |
| `Ctrl+Q` | Sair |

## Editor

| Atalho | Ação |
|--------|------|
| `Ctrl+Shift+B` | Novo bloco |
| `Ctrl+F` | Localizar |
| `Ctrl+H` | Substituir |
| `Ctrl+Shift+F` | Formatar código |
| `Ctrl+D` | Duplicar linha |
| `Ctrl+L` | Recortar linha |
| `Ctrl+Shift+K` | Excluir linha |
| `Ctrl+U` | Converter para minúsculas |
| `Ctrl+Shift+U` | Converter para maiúsculas |
| `Alt+F1` | Informações da entidade |
| `Ctrl+.` | Forçar autocomplete; sugestão Pynia quando habilitada |
| `Tab` | Aceitar sugestão inline visível |

Monaco também oferece comandos comuns como copiar, colar, desfazer e comentar (`Ctrl+/`).

## Conexões e resultados

| Atalho | Ação |
|--------|------|
| `Ctrl+Shift+M` | Gerenciar conexões |
| `Ctrl+Shift+D` | Nova conexão |
| `Ctrl+Shift+T` | Atualizar schema |
| `Ctrl+Shift+C` | Copiar com cabeçalhos |
| `Ctrl+Shift+L` | Limpar resultados |

## Configurações e layout

| Atalho | Ação |
|--------|------|
| `Ctrl+,` | Configurações |
| `Ctrl+Shift+R` | Restaurar visualização |
| `Ctrl+Shift+Alt+R` | Restaurar disposição |

Painéis como Pynia, resultados, output e variáveis podem ser exibidos pelo menu **Exibir**.

## Personalização

As configurações de atalhos pertencem ao perfil Tauri (`app.datapyn.tauri`) e ao workspace selecionado. Use a tela de atalhos para editar e identificar conflitos; não reutilize caminhos de configuração do app PyQt6 histórico.

Referência técnica: [shortcuts.ts](https://github.com/natharuc/datapyn/blob/main/desktop/src/shortcuts.ts).
