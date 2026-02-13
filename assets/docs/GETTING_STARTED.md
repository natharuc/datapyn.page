# Guia de Inicio Rapido

Comece a usar o DataPyn em menos de 5 minutos!

---

## 1. Instalacao

### Windows (Recomendado)

```powershell
# Clone o repositorio
git clone https://github.com/seu-usuario/datapyn.git
cd datapyn

# Execute o instalador automatico
.\scripts\install.bat

# Inicie o DataPyn
.\scripts\run.bat
```

### Instalacao Manual

```bash
# Crie ambiente virtual
python -m venv .venv

# Ative o ambiente
# Windows:
.venv\Scripts\activate
# Linux/Mac:
source .venv/bin/activate

# Instale dependencias
pip install -r requirements.txt

# Execute
python source/main.py
```

---

## 2. Primeira Conexao

### Passo 1: Abrir Gerenciador de Conexoes

Clique no icone de banco de dados no painel lateral esquerdo, ou pressione `Ctrl+Shift+C`.

### Passo 2: Criar Nova Conexao

Clique em **"+ Nova Conexao"** e preencha:

| Campo | Exemplo |
|-------|---------|
| Nome | Producao SQL Server |
| Tipo | SQL Server |
| Host | servidor.empresa.com |
| Porta | 1433 |
| Banco | MeuBanco |
| Usuario | admin |
| Senha | ******** |

### Passo 3: Testar Conexao

Clique em **"Testar Conexao"** para verificar se os dados estao corretos.

### Passo 4: Salvar e Conectar

Clique em **"Salvar"** e depois **duplo-clique** na conexao para conectar.

---

## 3. Primeira Query SQL

### Passo 1: Criar Bloco SQL

Com a conexao ativa, voce ja tem um bloco SQL pronto. Digite sua query:

```sql
SELECT TOP 10 * FROM Clientes
```

### Passo 2: Executar

Pressione **F5** ou clique no botao **Executar**.

### Passo 3: Ver Resultados

Os resultados aparecem no painel **Results** na parte inferior.

---

## 4. Manipular com Python

### Passo 1: Adicionar Bloco Python

Clique no botao **"+"** no final do ultimo bloco e escolha **"Python"**, ou clique no seletor de linguagem do bloco para trocar.

### Passo 2: Usar o Resultado SQL

O resultado da query SQL esta automaticamente disponivel como `df`:

```python
# Ver estatisticas
print(df.describe())

# Filtrar dados
clientes_sp = df[df['Estado'] == 'SP']
print(f"Clientes em SP: {len(clientes_sp)}")

# Criar grafico
df['Estado'].value_counts().plot(kind='bar')
```

### Passo 3: Executar Python

Pressione **F5** ou clique em **Executar**. O sistema detecta automaticamente a linguagem do bloco.

---

## 5. Fluxo de Trabalho Tipico

```
1. Conectar ao banco
        |
        v
2. Escrever query SQL no bloco
        |
        v
3. Executar (F5)
        |
        v
4. Analisar resultado
        |
        v
5. Adicionar novo bloco Python (botao +)
        |
        v
6. Executar Python (F5)
        |
        v
7. Exportar ou continuar analise
```

---

## 6. Dicas Importantes

### Atalhos Essenciais

| Acao | Atalho |
|------|--------|
| Executar bloco atual | `F5` |
| Executar todos os blocos | `Ctrl+F5` |
| Executar e avancar | `Shift+Enter` |
| Nova aba | `Ctrl+T` |
| Salvar | `Ctrl+S` |
| Configuracoes | `Ctrl+,` |

### Variavel `df`

Apos executar SQL, o resultado fica disponivel em Python como `df`:

```python
# df e um pandas.DataFrame com o resultado da ultima query
df.head()        # Primeiras 5 linhas
df.columns       # Nomes das colunas
df.shape         # (linhas, colunas)
df.dtypes        # Tipos de dados
```

### Importar Arquivos

Arraste arquivos CSV, JSON ou Excel diretamente para o editor!

### Multiplas Conexoes

Cada aba pode ter sua propria conexao. Use isso para comparar dados entre ambientes (desenvolvimento, homologacao, producao).

---

## 7. Proximos Passos

- [FEATURES.md](FEATURES.md) - Lista completa de funcionalidades
- [EXAMPLES.md](EXAMPLES.md) - Exemplos praticos detalhados
- [SHORTCUTS.md](SHORTCUTS.md) - Todos os atalhos de teclado
- [FAQ.md](FAQ.md) - Perguntas frequentes

---

## Problemas Comuns

### "Nao consigo conectar ao SQL Server"

1. Verifique se o ODBC Driver 17 esta instalado
2. Confirme que o servico SQL Server esta rodando
3. Teste a conectividade: `telnet servidor 1433`

### "Erro: modulo nao encontrado"

Execute novamente a instalacao de dependencias:

```bash
pip install -r requirements.txt
```

### "Interface nao abre"

Verifique se o PyQt6 esta instalado corretamente:

```bash
pip install PyQt6 PyQt6-QScintilla
```

---

*Precisa de ajuda? Abra uma issue no [GitHub](https://github.com/seu-usuario/datapyn/issues).*
