# Changelog

Historico de versoes e mudancas do DataPyn.

---

## [1.5.0] - 2025-01-XX

### Adicionado

- **Heranca de conexao**: Novas abas herdam automaticamente a conexao da aba ativa
- **Servicos SOLID**: Refatoracao com SessionLifecycleService, PanelManager e FileImportService
- **79 novos testes** cobrindo servicos e funcionalidades
- **Duplicar sessao** herda conexao da sessao original

### Corrigido

- **Paineis por sessao**: Cada aba agora mantem seus proprios paineis de resultados, output e variaveis
- **Troca de abas**: Paineis atualizam corretamente ao trocar de aba
- **USE database**: Comando USE agora persiste corretamente em todas as execucoes (fix do pool de conexoes)
- **Drag-drop** de arquivos cria paineis corretamente
- **Fechar todas abas** agora oculta paineis corretamente

### Melhorado

- Performance na troca de sessoes
- Estabilidade geral da aplicacao
- Cobertura de testes aumentada para 517 testes

---

## [1.4.0] - 2024-12-XX

### Adicionado

- **Blocos mistos** (SQL + Python no mesmo documento)
- **Importacao de arquivos** (.sql, .py, .dmp) via drag-drop
- **Auto-deteccao de sintaxe** ao importar
- **Menu de contexto melhorado** no editor

### Corrigido

- Encoding UTF-8 na importacao de arquivos
- Parser de blocos para sintaxe mista

---

## [1.3.0] - 2024-11-XX

### Adicionado

- **Workspace save/restore**: Salvar e restaurar estado completo da sessao
- **Auto-save** a cada 2 minutos
- **Restauracao de sessao** apos crash
- Arquivos `.dpw` (DataPyn Workspace)

### Corrigido

- Vazamento de memoria em sessoes longas
- Restauracao de geometria da janela

---

## [1.2.0] - 2024-10-XX

### Adicionado

- **Suporte a MariaDB**
- **Cores personalizadas** para conexoes
- **Painel de variaveis** mostrando namespace Python
- **Atalhos personalizaveis**

### Melhorado

- Performance do syntax highlighting
- Responsividade da UI durante queries longas

---

## [1.1.0] - 2024-09-XX

### Adicionado

- **Suporte a PostgreSQL**
- **Modo escuro** completo
- **Exportacao para Excel** (.xlsx)
- **Graficos inline** com matplotlib

### Corrigido

- Problemas com encoding em SQL Server
- Scroll infinito na tabela de resultados

---

## [1.0.0] - 2024-08-XX

### Lancamento Inicial

- Editor SQL com syntax highlighting
- Execucao Python integrada
- Conexao com SQL Server e MySQL
- Multiplas abas/sessoes
- Painel de resultados interativo
- Exportacao CSV
- Autenticacao Windows para SQL Server
- Sistema de temas (claro/escuro)

---

## Versionamento

O DataPyn segue [Semantic Versioning](https://semver.org/):

- **MAJOR** (1.x.x): Mudancas incompativeis de API
- **MINOR** (x.1.x): Novas funcionalidades compativeis
- **PATCH** (x.x.1): Correcoes de bugs

---

## Contribuidores

Agradecimentos a todos que contribuiram para o projeto.

---

*Para ver commits detalhados, visite o [repositorio no GitHub](https://github.com/seu-usuario/datapyn/commits).*
