# 🎮 Gamification API — Engajamento de Educação Continuada

API REST desenvolvida com **Spring Boot** como projeto em grupo da disciplina de **Programação Orientada a Objetos (POO)** e **Engenharia de Software**, aplicando os princípios de Clean Architecture, baixo acoplamento e alta coesão.

---

## 📚 Contexto do Projeto

A aplicação modela uma plataforma de cursos online por assinatura com mecânicas de gamificação:

- Alunos com assinatura básica acessam um conjunto de cursos mensalmente.
- A cada curso concluído com média **acima de 7,0**, o aluno tem direito a realizar mais **3 cursos**.
- O aluno mais ativo no fórum (mais tópicos e comentários) **ganha 1 curso** ao fim do mês.
- Ao concluir **12 cursos**, o plano é promovido para **Premium**, desbloqueando:
    - Participação em projetos reais durante os cursos.
    - Recebimento de **3 moedas** por curso, que podem ser convertidas em novos cursos, acumuladas ou trocadas por criptomoeda.

---

## 🛠️ Tecnologias e Ferramentas

| Tecnologia | Versão / Uso |
|---|---|
| Java | JDK 17+ |
| Spring Boot | Framework principal |
| Spring Web | Camada REST / Controller |
| Spring Data JPA | Persistência de dados |
| H2 Database | Banco de dados em memória (dev/teste) |
| PostgreSQL | Banco de dados relacional (produção) |
| Swagger / OpenAPI | Documentação e teste da API |
| Maven | Gestão de build e dependências |
| IntelliJ IDEA Ultimate | IDE de desenvolvimento |

---

## 🏗️ Arquitetura do Projeto

O projeto segue os princípios de **Clean Architecture**, organizado nas seguintes camadas:

```
src/
└── main/
    └── java/
        └── com/grupo/gamification/
            ├── domain/          # Entidades JPA (domínio)
            ├── repository/      # Interfaces JpaRepository
            ├── service/         # Regras de negócio
            ├── controller/      # Endpoints REST
            └── dto/             # Data Transfer Objects
```

### Descrição das Camadas

- **Domain** — Representa os objetos do domínio mapeados para o banco de dados.
- **Repository** — Interface que estende `JpaRepository`, responsável pela persistência.
- **Service** — Centraliza as regras de negócio (criar, listar, buscar, atualizar, deletar).
- **DTO** — Objetos de transferência de dados entre as camadas.
- **Controller** — Exposição dos endpoints REST seguindo o padrão RESTful.

---

## 🚀 Como Executar o Projeto

### Pré-requisitos

- Java 17 ou superior instalado
- Maven instalado
- Docker instalado (opcional, para containerização)
- IntelliJ IDEA Ultimate (recomendado)

### 1. Clonar o repositório

```bash
git clone https://github.com/Noxzxz/projeto-spring-data-usuario-simples
cd projeto-spring-data-usuario-simples
```

### 2. Build do projeto

```bash
mvn clean install
```

### 3. Executar a aplicação

```bash
mvn spring-boot:run
```

A aplicação será iniciada na porta **8081**.

---

## 🔗 Endpoints da API

A API expõe os seguintes endpoints base (cada integrante é responsável por um endpoint específico):

> Endpoints serão documentados conforme evolução do projeto.

## 📝 Observações

- Projeto desenvolvido para as disciplinas de POO e Engenharia de Software — Profa. Andréia D. de Leles.