# Instalacao

Guia completo de instalacao do DataPyn.

---

## Requisitos

### Sistema Operacional

- Windows 10 (versao 1903 ou superior)
- Windows 11

### Drivers ODBC (necessarios para conexao com bancos)

| Banco | Driver | Download |
|-------|--------|----------|
| SQL Server | ODBC Driver 17/18 | [Microsoft](https://docs.microsoft.com/sql/connect/odbc/download-odbc-driver-for-sql-server) |
| MySQL | MySQL ODBC Connector | [MySQL](https://dev.mysql.com/downloads/connector/odbc/) |
| PostgreSQL | PostgreSQL ODBC | [PostgreSQL](https://www.postgresql.org/ftp/odbc/versions/) |

---

## Metodo 1: Executavel Standalone (Recomendado)

### Passo a Passo

1. **Baixe o instalador**
   - Acesse [github.com/seu-usuario/datapyn/releases](https://github.com/seu-usuario/datapyn/releases)
   - Baixe `DataPyn-Setup-1.x.x.exe`

2. **Execute o instalador**
   - Clique duplo no arquivo baixado
   - Siga o assistente de instalacao
   - Escolha a pasta de instalacao (padrao: `C:\Program Files\DataPyn`)

3. **Inicie o DataPyn**
   - Atalho criado no Menu Iniciar
   - Ou execute `DataPyn.exe` na pasta de instalacao

### Versao Portable

Se preferir, baixe `DataPyn-Portable-1.x.x.zip`:

1. Extraia para qualquer pasta
2. Execute `DataPyn.exe`
3. Nao requer instalacao

---

## Metodo 2: A partir do Codigo-Fonte

### Pre-requisitos

- Python 3.11 ou superior
- pip (gerenciador de pacotes)
- Git (opcional, para clonar)

### Instalacao

```bash
# Clone o repositorio
git clone https://github.com/seu-usuario/datapyn.git
cd datapyn

# Crie ambiente virtual (recomendado)
python -m venv venv
venv\Scripts\activate

# Instale dependencias
pip install -r requirements.txt

# Execute
python source/main.py
```

### Dependencias Principais

As dependencias sao instaladas automaticamente via requirements.txt:

```
PyQt6>=6.6.0
PyQt6-QScintilla>=2.14.0
SQLAlchemy>=2.0.0
pandas>=2.0.0
pyodbc>=5.0.0
matplotlib>=3.8.0
cryptography>=41.0.0
```

---

## Configuracao Inicial

### Primeira Execucao

1. O DataPyn cria pasta de configuracao em:
   ```
   %APPDATA%\DataPyn\
   ```

2. Arquivos criados:
   - `connections.json` - Conexoes salvas
   - `settings.json` - Configuracoes
   - `shortcuts.json` - Atalhos personalizados

### Primeira Conexao

1. Clique em **Nova Conexao** no painel lateral
2. Preencha os dados do servidor
3. Clique em **Testar Conexao**
4. Se sucesso, clique em **Salvar**

---

## Atualizacao

### Executavel

1. Baixe a nova versao
2. Execute o instalador
3. Ele atualizara a versao existente
4. Suas conexoes e configuracoes sao preservadas

### Codigo-Fonte

```bash
cd datapyn
git pull origin main
pip install -r requirements.txt --upgrade
```

---

## Desinstalacao

### Executavel

1. Painel de Controle > Programas e Recursos
2. Encontre DataPyn
3. Clique em Desinstalar

Para remover dados do usuario:
```
rd /s /q "%APPDATA%\DataPyn"
```

### Codigo-Fonte

```bash
# Remova a pasta do projeto
rd /s /q datapyn

# Remova dados do usuario (opcional)
rd /s /q "%APPDATA%\DataPyn"
```

---

## Solucao de Problemas

### "VCRUNTIME140.dll nao encontrado"

Instale o Visual C++ Redistributable:
[Download](https://aka.ms/vs/17/release/vc_redist.x64.exe)

### "Driver ODBC nao encontrado"

Instale o driver apropriado (veja tabela no inicio).

### Erro de SSL com MySQL/PostgreSQL

Adicione na string de conexao:
```
?ssl_disabled=true
```

### Interface com visual estranho

Verifique a escala de DPI do Windows:
1. Configuracoes > Sistema > Tela
2. Ajuste escala para 100% ou 125%

### Aplicacao nao inicia

Execute via terminal para ver erros:
```bash
cd "C:\Program Files\DataPyn"
DataPyn.exe
```

---

## Build do Executavel

Para gerar seu proprio executavel:

```bash
# Instale PyInstaller
pip install pyinstaller

# Gere o executavel
pyinstaller scripts/datapyn.spec

# Executavel em dist/datapyn/
```

---

## Suporte

- **Issues**: [GitHub Issues](https://github.com/seu-usuario/datapyn/issues)
- **Discussoes**: [GitHub Discussions](https://github.com/seu-usuario/datapyn/discussions)

---

*Problemas com a instalacao? Abra uma issue com detalhes do erro.*
