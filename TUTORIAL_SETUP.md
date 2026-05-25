# Tutorial: Como Rodar o Projeto em Outra Maquina

Este guia explica como configurar e rodar o projeto **Gamification API** do zero em qualquer computador.

---

## Pre-requisitos (instalar antes de comecar)

| Ferramenta | Versao | Link para download |
|---|---|---|
| **Java JDK** | 17 ou superior | https://adoptium.net |
| **Maven** | 3.6+ | https://maven.apache.org/download.cgi |
| **Git** | qualquer | https://git-scm.com |
| **Docker Desktop** | qualquer | https://www.docker.com/products/docker-desktop |
| **Node.js** (com npm) | 18+ (LTS) | https://nodejs.org |

> **Verifique as instalacoes:**
> ```
> java -version
> mvn -version
> git --version
> docker --version
> node --version
> npm --version
> ```

---

## Passo 1: Clonar o repositorio

```bash
git clone https://github.com/Noxzxz/projeto-spring-data-usuario-simples.git
cd projeto-spring-data-usuario-simples
```

---

## Passo 2: Escolher o modo de execucao

Existem **dois modos** para rodar o backend. Escolha um:

### Opcao A: Modo Simples (H2 em memoria) -- Ideal para desenvolvimento rapido

Nao precisa de Docker. O banco de dados fica em memoria (os dados somem ao parar a aplicacao).

```bash
mvn spring-boot:run
```

A API estara em: **http://localhost:8080**
Console H2: **http://localhost:8080/h2-console** (JDBC URL: `jdbc:h2:mem:usuariodb`, usuario: `sa`, senha: vazio)

### Opcao B: Modo Completo (Docker + PostgreSQL) -- Ideal para producao

Usa PostgreSQL real com dados persistentes.

```bash
docker compose up -d
```

Isso sobe:
- PostgreSQL (porta 5432)
- pgAdmin (porta 5050) -- email: `admin@admin.com` / senha: `admin`
- API Spring Boot (porta 8080)

Para parar: `docker compose down`

---

## Passo 3: Rodar o frontend Angular (opcional)

Se quiser a interface grafica:

```bash
cd ead-platform\ead-platform
npm install
npx ng serve
```

Frontend em: **http://localhost:4200**

---

## Passo 4: Testar a API

Acesse o Swagger para ver e testar todos os endpoints:

**http://localhost:8080/swagger-ui.html**

### Usuarios de teste (ja criados automaticamente)

| Email | Senha | Perfil |
|---|---|---|
| `aluno@teste.com` | `123456` | ALUNO |
| `prof@teste.com` | `123456` | PROFESSOR |
| `admin@teste.com` | `123456` | ADMINISTRADOR |

### Exemplo de chamada com curl (registro)

```bash
curl -X POST http://localhost:8080/auth/register ^
  -H "Content-Type: application/json" ^
  -d "{\"nomeCompleto\":\"Fulano de Tal\",\"email\":\"fulano@teste.com\",\"senha\":\"123456\",\"confirmarSenha\":\"123456\"}"
```

### Exemplo de chamada com curl (login)

```bash
curl -X POST http://localhost:8080/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"aluno@teste.com\",\"senha\":\"123456\"}"
```

---

## Resumo dos endpoints

| Endpoint | Metodo | Descricao |
|---|---|---|
| `/auth/register` | POST | Registrar novo usuario |
| `/auth/login` | POST | Login (retorna token JWT) |
| `/Curso` | GET/POST | Listar/criar cursos |
| `/Curso/{id}` | PUT/DELETE | Atualizar/deletar curso |
| `/matriculas` | GET/POST | Listar/criar matriculas |
| `/matriculas/{id}` | GET | Consultar matricula |
| `/matriculas/{id}/progresso` | GET | Progresso da matricula |
| `/assinaturas` | GET/POST | Listar/criar assinaturas |
| `/assinaturas/{id}` | PUT/DELETE | Atualizar/deletar assinatura |

---

## Solucao de problemas comuns

### "Porta 8080 ja esta em uso"
```
netstat -ano | findstr :8080
Stop-Process -Id <PID> -Force
```

### "Cannot load driver class: org.postgresql.Driver"
O PostgreSQL do Docker nao esta rodando. Execute:
```
docker compose up -d
```

### "npm nao e reconhecido"
Instale o Node.js: https://nodejs.org

### "mvn nao e reconhecido"
O Maven nao esta no PATH. Adicione a pasta `bin` do Maven ao PATH do sistema.

### Docker nao inicia
Certifique-se de que o Docker Desktop esta aberto e rodando (bandeja do sistema).

---

## Comandos uteis do Docker

| Comando | Descricao |
|---|---|
| `docker ps` | Ver containers rodando |
| `docker compose logs app` | Ver logs da API |
| `docker compose down` | Parar todos os containers |
| `docker compose build` | Reconstruir imagem da API |
| `docker compose up -d --build` | Reconstruir e subir |

---

## Resumo rapido (colinha)

```
# Backend simples (modo H2)
mvn spring-boot:run

# OU backend completo (Docker)
docker compose up -d

# Frontend Angular
cd ead-platform\ead-platform
npm install
npx ng serve
```
