# AGENTS.md — Projeto EAD Platform (Spring Boot + Angular)

---

# 1. Visão Geral do Projeto

## Sistema

Plataforma EAD (Educação a Distância) com:
- cursos modulares;
- progressão acadêmica;
- autenticação por perfil;
- gamificação;
- recompensas;
- upgrade automático de plano.

---

## Objetivo do Sistema

Permitir que:
- alunos realizem cursos online;
- professores publiquem conteúdos;
- administradores gerenciem a plataforma;
- a progressão acadêmica gere recompensas automáticas.

---

## Arquitetura Geral

Arquitetura baseada em:
- DDD (Domain-Driven Design);
- separação por camadas;
- frontend Angular desacoplado;
- backend REST stateless com JWT.

Estrutura principal:

```text
Frontend Angular
      ↓
REST API (Spring Boot)
      ↓
Application Layer (Use Cases)
      ↓
Domain Layer (DDD)
      ↓
Infrastructure Layer (JPA/Security)
      ↓
PostgreSQL
```

---

## Estado Atual do Projeto

### Backend
- parcialmente funcional;
- autenticação funcional;
- progressão modular funcional;
- eventos de domínio parcialmente implementados;
- sistema de recompensas incompleto.

### Frontend
- build funcional;
- integração parcialmente quebrada;
- inconsistências entre DTOs frontend/backend.

### Integração
Necessita alinhamento de:
- endpoints;
- payloads;
- modelos;
- nomenclatura;
- wrappers de resposta.

---

# 2. Arquitetura Conceitual

O sistema é dividido em 6 áreas principais:

| Área | Responsabilidade |
|---|---|
| Autenticação | Login, JWT, autorização |
| Catálogo Acadêmico | Cursos, módulos, aulas |
| Matrículas | Registro e progresso do aluno |
| Progressão Modular | Controle sequencial de módulos |
| Gamificação | Recompensas e moedas |
| Assinaturas | Upgrade de plano |

---

## Fluxo Principal do Sistema

```text
Usuário
  ↓
Autenticação
  ↓
Catálogo de Cursos
  ↓
Matrícula
  ↓
Conclusão de módulos
  ↓
Conclusão de curso
  ↓
CursoConcluidoEvent
  ↓
RecompensaService
  ↓
UpgradePlanoService
```

---

# 3. Stack Tecnológica

## Backend

| Categoria | Tecnologia | Versão |
|---|---|---|
| Framework | Spring Boot | 3.3.5 |
| Linguagem | Java | 17 |
| ORM | Hibernate | 6.5.3 |
| Persistência | Spring Data JPA | — |
| Segurança | Spring Security | — |
| JWT | jjwt | 0.11.5 |
| Banco | PostgreSQL 16 | — |
| Banco Dev | H2 | — |
| API Docs | SpringDoc OpenAPI | 2.5.0 |
| Build | Maven | 3.9.9 |
| Containerização | Docker | — |

---

## Frontend

| Categoria | Tecnologia | Versão |
|---|---|---|
| Framework | Angular | 19.2 |
| Linguagem | TypeScript | 5.7 |
| Estado | Angular Signals | — |
| HTTP | HttpClient + RxJS | 7.8 |
| Roteamento | Angular Router | 19 |
| Build | Angular CLI | 19.2.25 |
| Testes | Jasmine + Karma | — |

---

## Infraestrutura

- Docker Compose
- PostgreSQL
- pgAdmin
- Build integrado Angular + Spring Boot

---

# 4. Estrutura do Repositório

```text
projeto-spring-data-usuario-simples/
│
├── docs/
├── ead-platform/
├── src/
├── Dockerfile
├── docker-compose.yml
├── pom.xml
├── README.md
└── AGENTS.md
```

---

# 5. Estrutura Backend

```text
src/main/java/com/exemplo/usuariosimples/
│
├── domain/
├── application/
├── infrastructure/
└── interfaces/rest/
```

---

## Domain Layer

Responsável por:
- regras de negócio;
- entidades;
- value objects;
- eventos;
- interfaces de repositório.

### Bounded Contexts

| Contexto | Responsabilidade |
|---|---|
| academico | cursos, módulos, progresso |
| usuario | autenticação, alunos |
| financeiro | assinaturas |

---

## Application Layer

Responsável por:
- casos de uso;
- orquestração;
- transações.

Exemplos:
- `MatricularAlunoUseCase`
- `ConcluirModuloUseCase`
- `AuthUseCase`

---

## Infrastructure Layer

Responsável por:
- JPA;
- segurança;
- configuração;
- seed;
- integrações técnicas.

---

## Interface Layer

Responsável por:
- controllers REST;
- DTOs;
- contratos HTTP.

---

# 6. Estrutura Frontend

```text
ead-platform/
└── src/app/
    ├── core/
    └── features/
```

---

## Core

Responsável por:
- services;
- interceptors;
- guards;
- autenticação;
- layout;
- models compartilhados.

---

## Features

| Módulo | Responsabilidade |
|---|---|
| auth | login e cadastro |
| dashboard | painel do aluno |
| learning | catálogo e player |
| enrollment | matrícula |
| instructor | gestão de cursos |
| projects | projetos finais |

---

# 7. Fluxo da Aplicação

---

## Fluxo de Login

```text
Frontend
  ↓
POST /auth/login
  ↓
AuthController
  ↓
AuthUseCase
  ↓
PessoaJpaRepository
  ↓
JwtTokenProvider
  ↓
JWT
```

O token:
- é salvo em `localStorage`;
- é injetado via interceptor Angular.

---

## Fluxo de Matrícula

```text
Aluno
  ↓
POST /matriculas
  ↓
MatricularAlunoUseCase
  ↓
Validações:
- aluno existe
- curso publicado
- matrícula não duplicada
```

---

## Fluxo de Progressão

```text
Aluno conclui módulo
  ↓
ConcluirModuloUseCase
  ↓
ProgressaoModularService
  ↓
Matricula.registrarModuloConcluido()
  ↓
CursoConcluidoEvent
```

---

## Fluxo de Upgrade

```text
CursoConcluidoEvent
  ↓
RecompensaService
  ↓
UpgradePlanoService
  ↓
Aluno.fazerUpgradePremium()
```

---

# 8. Dependências Críticas

## Progressão modular depende de:
- Matricula
- Curso
- Modulo
- ProgressaoModularService

---

## Upgrade de plano depende de:
- CursoConcluidoEvent
- RecompensaService
- UpgradePlanoService
- Aluno.totalCursosConcluidos

---

## Login depende de:
- JwtTokenProvider
- SecurityConfig
- AuthController
- auth.interceptor.ts

---

## Integração Angular depende de:
- proxy.conf.json
- endpoints REST
- DTOs alinhados

---

# 9. Pontos de Entrada Principais

## Backend

| Arquivo | Responsabilidade |
|---|---|
| UsuarioSimplesApplication.java | bootstrap Spring |
| SecurityConfig.java | autenticação/autorização |
| DataInitializer.java | seed inicial |

---

## Frontend

| Arquivo | Responsabilidade |
|---|---|
| main.ts | bootstrap Angular |
| app.routes.ts | rotas |
| app.config.ts | providers globais |

---

# 10. Aggregate Roots

| Aggregate | Responsabilidade |
|---|---|
| Aluno | progresso e plano |
| Curso | módulos e aulas |
| Matricula | progresso acadêmico |

---

# 11. Value Objects

| VO | Responsabilidade |
|---|---|
| Email | validação de email |
| NomeCompleto | nome estruturado |
| SenhaCriptografada | hash BCrypt |
| NivelCurso | dificuldade |

---

# 12. Domain Services

| Service | Responsabilidade |
|---|---|
| ProgressaoModularService | RN011/RN024 |
| UpgradePlanoService | upgrade automático |

---

# 13. Regras Arquiteturais

## Regras obrigatórias

- Domain NÃO depende de infrastructure.
- Controllers NÃO acessam JPA diretamente.
- Toda regra de negócio deve estar:
  - em entidades;
  - use cases;
  - domain services.
- Frontend consome APIs apenas via services.
- DTOs nunca devem expor entidades diretamente.

---

## Proibições

NUNCA:
- mover lógica para controllers;
- acessar banco diretamente no frontend;
- criar lógica de negócio em DTOs;
- acoplar Angular diretamente ao banco;
- alterar contratos REST sem alinhar frontend.

---

# 14. Problemas de Integração

| Severidade | Problema |
|---|---|
| ALTA | `/auth/registrar` vs `/auth/register` |
| ALTA | `/api/cursos` vs `/Curso` |
| ALTA | frontend espera `titulo`, backend envia `tituloCurso` |
| ALTA | frontend espera `ApiResponse<T>` |
| MÉDIA | UUID vs number |
| MÉDIA | payload de matrícula divergente |

---

# 15. Problemas Técnicos Conhecidos

## Backend

- ausência de testes;
- `ddl-auto=update` em produção;
- inconsistência UUID/Long;
- `FetchType.EAGER`;
- logs DEBUG ativos.

---

## Frontend

- integração incompleta;
- DTOs inconsistentes;
- endpoints inexistentes;
- wrappers incompatíveis.

---

# 16. Arquivos Sensíveis

| Arquivo | Risco |
|---|---|
| SecurityConfig.java | quebra autenticação |
| Matricula.java | quebra progressão |
| proxy.conf.json | quebra integração |
| JwtTokenProvider.java | quebra login |
| DataInitializer.java | quebra seed |

---

# 17. Como Rodar o Projeto

---

## Docker

```bash
docker compose up -d --build
```

---

## Frontend

```bash
cd ead-platform/ead-platform

npm install
npx ng serve
```

---

## Backend

```bash
mvn spring-boot:run -Dspring-boot.run.profiles=h2
```

---

# 18. Usuários Demo

| Perfil | Email | Senha |
|---|---|---|
| ALUNO | aluno@teste.com | 123456 |
| PROFESSOR | prof@teste.com | 123456 |
| ADMIN | admin@teste.com | 123456 |

---

# 19. Fluxo Recomendado para Alterações

## Sempre seguir:

```text
1. Identificar aggregate root afetado
2. Alterar domínio
3. Atualizar use cases
4. Atualizar repositories
5. Atualizar controllers
6. Atualizar frontend
7. Validar integração
8. Rodar build Docker
```

---

# 20. Checklist Antes de Commit

- Backend sobe?
- Frontend builda?
- Docker sobe?
- JWT funciona?
- DTOs continuam compatíveis?
- Endpoints continuam alinhados?
- Progressão modular continua funcional?
- Não houve quebra de DDD?

---

# 21. Estratégia Atual do Projeto

## Prioridade Máxima

- integração frontend/backend;
- estabilidade funcional;
- conclusão do fluxo acadêmico principal.

---

## Prioridade Média

- gamificação;
- dashboard;
- métricas.

---

## Baixa Prioridade

- otimizações;
- refatorações profundas;
- abstrações extras.

---

# 22. Funcionalidades Pendentes

| Funcionalidade | Status |
|---|---|
| RecompensaService | pendente |
| TransacaoMoeda | pendente |
| ProjetoFinal | pendente |
| Avaliação | pendente |
| Dashboard aluno | parcial |

---

# 23. Recomendações para Futuros Agentes

## Sempre

- priorizar estabilidade;
- preservar arquitetura DDD;
- validar integração frontend/backend;
- preferir alterações pequenas;
- manter rastreabilidade.

---

## Nunca

- criar nova arquitetura paralela;
- duplicar lógica;
- mover regras para controllers;
- alterar contratos REST sem alinhar Angular.

---

# 24. Riscos do Projeto

| Risco | Impacto |
|---|---|
| Sem testes automatizados | regressões silenciosas |
| Build Docker lento | produtividade |
| Integração quebrada | frontend inutilizável |
| Divergência DTOs | erros de runtime |
| UUID vs Long | inconsistência de tipos |

---

# 25. Estratégia Recomendada

## Curto Prazo

1. corrigir integração frontend/backend;
2. implementar RecompensaService;
3. finalizar upgrade Premium;
4. criar seed demo.

---

## Médio Prazo

1. implementar dashboard;
2. adicionar testes;
3. padronizar DTOs;
4. revisar endpoints REST.

---

## Longo Prazo

1. remover EAGER loading;
2. melhorar modularização;
3. adicionar observabilidade;
4. melhorar cobertura de testes.

---

# 26. Filosofia do Projeto

O projeto deve priorizar:
- clareza;
- estabilidade;
- separação de responsabilidades;
- simplicidade;
- rastreabilidade.

Evitar:
- overengineering;
- lógica espalhada;
- abstrações desnecessárias;
- acoplamento excessivo.

---

# 27. Objetivo do AGENTS.md

Este arquivo existe para:
- acelerar onboarding;
- orientar agentes de IA;
- reduzir exploração manual do repositório;
- documentar arquitetura;
- registrar riscos;
- padronizar desenvolvimento.