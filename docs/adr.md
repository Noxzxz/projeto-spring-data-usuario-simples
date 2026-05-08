# 📓 Diário de Bordo — Architecture Decision Records (ADR)

> **Projeto:** Plataforma de Gamificação para Educação Continuada  
> **Tecnologia base:** Java + Spring Boot + Spring Data JPA  
> **Repositório:** `br.com.plataforma`

---

## Como usar este documento

Este arquivo registra cada decisão arquitetural relevante tomada ao longo do projeto.  
Sempre que uma ferramenta, padrão ou convenção nova for introduzida, **adicione um novo registro** seguindo o modelo abaixo:

```markdown
## ADR-XXX — Título da Decisão
**Data:** AAAA-MM-DD | **Status:** Proposto | Aceito | Depreciado | Substituído por ADR-YYY

### Contexto
Por que essa necessidade surgiu? Qual problema estava sendo resolvido?

### Decisão
O que foi escolhido? Por que essa opção e não as alternativas?

### Consequências
O que mudou no código? Quais trade-offs foram aceitos?
```

---

## Índice

| # | Título | Status | Data |
|---|--------|--------|------|
| [ADR-001](#adr-001--arquitetura-em-camadas-com-ddd) | Arquitetura em Camadas com DDD | ✅ Aceito | 2026-04-30 |
| [ADR-002](#adr-002--divisão-em-bounded-contexts) | Divisão em Bounded Contexts | ✅ Aceito | 2026-04-30 |
| [ADR-003](#adr-003--uso-de-aggregate-roots-por-contexto) | Uso de Aggregate Roots por Contexto | ✅ Aceito | 2026-04-30 |
| [ADR-004](#adr-004--value-objects-para-conceitos-com-invariantes) | Value Objects para Conceitos com Invariantes | ✅ Aceito | 2026-04-30 |
| [ADR-005](#adr-005--repositórios-como-interfaces-no-domínio-adapter-pattern) | Repositórios como Interfaces no Domínio (Adapter Pattern) | ✅ Aceito | 2026-04-30 |
| [ADR-006](#adr-006--herança-para-tipos-de-pagamento) | Herança para Tipos de Pagamento | ✅ Aceito | 2026-04-30 |
| [ADR-007](#adr-007--port-e-adapter-para-gateway-de-pagamento-externo) | Port & Adapter para Gateway de Pagamento Externo | ✅ Aceito | 2026-04-30 |
| [ADR-008](#adr-008--domain-events-para-comunicação-entre-bounded-contexts) | Domain Events para Comunicação entre Bounded Contexts | ✅ Aceito | 2026-04-30 |
| [ADR-009](#adr-009--uso-de-java-records-para-dtos-e-value-objects) | Uso de Java Records para DTOs e Value Objects | ✅ Aceito | 2026-04-30 |
| [ADR-010](#adr-010--segurança-com-jwt-e-mfa) | Segurança com JWT e MFA | ✅ Aceito | 2026-04-30 |
| [ADR-011](#adr-011--encapsulamento-de-regras-de-negócio-em-domain-services) | Encapsulamento de Regras de Negócio em Domain Services | ✅ Aceito | 2026-04-30 |
| [ADR-012](#adr-012--entidade-transacaomoeda-imutável-por-design-para-auditoria) | Entidade `TransacaoMoeda` Imutável por Design (Auditoria) | ✅ Aceito | 2026-04-30 |
| [ADR-013](#adr-013--jobs-agendados-com-spring-scheduler) | Jobs Agendados com Spring Scheduler | ✅ Aceito | 2026-04-30 |
| [ADR-014](#adr-014--criptografia-de-dados-pessoais-com-jpa-converter-lgpd) | Criptografia de Dados Pessoais com JPA Converter (LGPD) | ✅ Aceito | 2026-04-30 |
| [ADR-015](#adr-015--entidade-submissao-para-upload-de-atividades-e-projeto-final) | Entidade `Submissao` para Upload de Atividades e Projeto Final | ✅ Aceito | 2026-05-05 |

---

## ADR-001 — Arquitetura em Camadas com DDD

**Data:** 2026-04-30 | **Status:** ✅ Aceito

### Contexto

O projeto precisava de uma estrutura que separasse claramente as regras de negócio da infraestrutura técnica (banco de dados, APIs externas, e-mail), garantindo que o domínio do negócio pudesse evoluir sem ser contaminado por detalhes tecnológicos. Um sistema com múltiplos atores (aluno, professor, administrador), regras de gamificação complexas e integrações externas (gateway de pagamento, cripto) exigia uma arquitetura com alta coesão interna e baixo acoplamento entre módulos.

### Decisão

Adoção da **DDD Layered Architecture** com quatro camadas verticais explícitas:

```
┌──────────────────────────────────────────────┐
│  interfaces  — Controllers / REST            │
├──────────────────────────────────────────────┤
│  application — Use Cases / Orquestração      │
├──────────────────────────────────────────────┤
│  domain      — Núcleo do negócio             │
├──────────────────────────────────────────────┤
│  infrastructure — JPA, Gateway, Email        │
└──────────────────────────────────────────────┘
```

A regra de dependência é unidirecional: camadas externas dependem de camadas internas, nunca o contrário.

### Consequências

- **`domain/`** não importa nenhuma classe do Spring, garantindo testabilidade pura em unitários.
- **`application/`** contém os Use Cases que orquestram múltiplos Domain Services e Repositories.
- **`infrastructure/`** implementa as interfaces definidas no domínio (Repositories, Gateways, Notificações).
- **`interfaces/`** contém Controllers REST e DTOs, sem lógica de negócio.
- Trade-off: maior número de classes e pacotes — justificado pelo ganho em manutenibilidade e testabilidade a longo prazo.

---

## ADR-002 — Divisão em Bounded Contexts

**Data:** 2026-04-30 | **Status:** ✅ Aceito

### Contexto

O sistema cobre múltiplos domínios de problema: gestão de usuários, fluxo acadêmico, pagamentos, engajamento em fórum e gamificação. Misturar todas essas responsabilidades em um único pacote resultaria em acoplamento alto, dificuldade de evolução e violação do SRP.

### Decisão

Organização do código em **cinco Bounded Contexts** independentes, cada um com sua própria camada de domínio (`entity`, `valueobject`, `repository`, `service`):

| Bounded Context | Responsabilidade Principal |
|---|---|
| `usuario` | Aluno, Professor, Administrador |
| `academico` | Cursos, Módulos, Matrículas, Avaliações |
| `financeiro` | Planos, Pagamentos, Assinaturas |
| `engajamento` | Fórum, Ranking, Moderação |
| `gamificacao` | Moedas, Vouchers, Upgrade de Plano |

### Consequências

- Cada contexto possui seus próprios Aggregate Roots, isolando a evolução interna.
- A comunicação entre contextos é feita via **Domain Events** (veja ADR-008), evitando dependências diretas.
- A estrutura de pacotes reflete diretamente os contextos: `br.com.plataforma.domain.academico.entity`, etc.

---

## ADR-003 — Uso de Aggregate Roots por Contexto

**Data:** 2026-04-30 | **Status:** ✅ Aceito

### Contexto

Em DDD, um Aggregate Root é o único ponto de entrada para modificar o estado de um grupo de entidades relacionadas. Sem esse padrão, qualquer objeto poderia modificar entidades internas, quebrando invariantes de negócio silenciosamente.

### Decisão

Cada Bounded Context possui um ou mais **Aggregate Roots** explícitos:

| Contexto | Aggregate Roots |
|---|---|
| `usuario` | `Aluno` |
| `academico` | `Curso`, `Matricula` |
| `financeiro` | `Assinatura` |
| `engajamento` | `Forum` |
| `gamificacao` | `Voucher`, `TransacaoMoeda` |

Toda modificação em entidades filhas (ex: `Modulo` dentro de `Curso`) deve passar pelo Aggregate Root.

### Consequências

- Invariantes de negócio são protegidas centralmente. Ex: só `Curso.adicionarModulo()` pode adicionar módulos, evitando estados inconsistentes.
- Os Repositories são criados **apenas para Aggregate Roots** — não existe `ModuloRepository`, apenas `CursoRepository`.
- Obriga que módulos/aulas só sejam persistidos via cascade pelo JPA, a partir da raiz.

---

## ADR-004 — Value Objects para Conceitos com Invariantes

**Data:** 2026-04-30 | **Status:** ✅ Aceito

### Contexto

Conceitos como e-mail, nome e valor monetário possuem regras de validação próprias e são imutáveis por natureza. Representá-los como `String` ou `BigDecimal` simples eliminaria essa semântica e espalharia validações por todo o código.

### Decisão

Uso de **Value Objects (VOs)** implementados como Java `record` para encapsular conceitos com invariantes:

```java
record Email(String valor) {
    // valida regex no construtor compacto
}

record NomeCompleto(String nome) { }

record CarteiraDigital(String endereco, String rede) { }

record Valor(BigDecimal quantia, String moeda) {
    // garante quantia >= 0
}
```

### Consequências

- Validação centralizada: o e-mail inválido **não pode existir** como objeto — é rejeitado no construtor.
- `record` garante imutabilidade e implementa `equals`/`hashCode` por estrutura automaticamente.
- JPA requer `@Embeddable` nos VOs que são persistidos como colunas da entidade pai — overhead mínimo de configuração.

---

## ADR-005 — Repositórios como Interfaces no Domínio (Adapter Pattern)

**Data:** 2026-04-30 | **Status:** ✅ Aceito

### Contexto

O Domain-Driven Design exige que o domínio defina **o contrato de persistência** sem depender de tecnologias específicas (JPA, JDBC, etc.). Isso garante que as regras de negócio possam ser testadas sem banco de dados.

### Decisão

Todas as interfaces de Repository são definidas no pacote `domain.*` e implementadas na camada `infrastructure.persistence.jpa`:

```java
// Definido no domínio:
interface AlunoRepository {
    Optional<Aluno> findById(UUID id);
    Aluno save(Aluno aluno);
}

// Implementado na infraestrutura:
@Repository
class AlunoRepositoryJpa implements AlunoRepository {
    private final AlunoJpaRepository springRepo;
    // ...
}
```

Este é o **padrão Adapter** alinhado ao **Princípio da Inversão de Dependência (DIP — SOLID)**.

### Consequências

- Domain Services e Use Cases dependem apenas da interface — podem ser testados com `Mockito` sem banco real.
- Trocar JPA por outra tecnologia de persistência exige apenas criar uma nova implementação de `AlunoRepository`, sem tocar no domínio.
- Gera duplicidade de interfaces (`AlunoRepository` do domínio + `AlunoJpaRepository` do Spring Data), mas o isolamento compensa o trade-off.

---

## ADR-006 — Herança para Tipos de Pagamento

**Data:** 2026-04-30 | **Status:** ✅ Aceito

### Contexto

O sistema suporta três modalidades de pagamento (PIX, Boleto, Cartão Recorrente — RF009), cada uma com atributos específicos (chave PIX, código de barras, últimos 4 dígitos). Tratá-las em uma única tabela com colunas nullable seria um anti-pattern.

### Decisão

Criação de uma hierarquia de herança com `Pagamento` como entidade abstrata e especializações para cada modalidade:

```java
abstract class Pagamento { /* id, valor, status, modalidade */ }
class PagamentoPix extends Pagamento { String chavePixOrigem; }
class PagamentoBoleto extends Pagamento { String codigoBarras; LocalDate dataVencimento; }
class PagamentoCartao extends Pagamento { String ultimos4Digitos; boolean recorrente; }
```

Alinhado ao **Princípio Open/Closed (OCP — SOLID)**: novas modalidades são adicionadas via subclasse, sem modificar `Pagamento`.

### Consequências

- JPA precisará de uma estratégia de mapeamento: `@Inheritance(strategy = InheritanceType.JOINED)` é recomendada para evitar colunas nulas excessivas.
- Facilita a adição de novas modalidades de pagamento no futuro sem refatorações no código existente.
- Consultas polimórficas (ex: "todos os pagamentos de um aluno") funcionam nativamente via JPQL na classe base.

---

## ADR-007 — Port & Adapter para Gateway de Pagamento Externo

**Data:** 2026-04-30 | **Status:** ✅ Aceito

### Contexto

A integração com provedores de pagamento externos (Stripe, PagSeguro, etc.) é uma dependência volátil — o provedor pode mudar, a API pode ser atualizada, e o sistema não deve ficar acoplado a um fornecedor específico.

### Decisão

Definição de uma interface `PagamentoGateway` no **domínio** (Port) e implementação concreta (`PagamentoGatewayImpl`) na **infraestrutura** (Adapter):

```java
// Port — definido no domínio:
interface PagamentoGateway {
    ResultadoPagamento processar(Pagamento pagamento);
    boolean cancelar(String idTransacaoExterna);
}

// Adapter — implementado na infraestrutura:
@Component
class PagamentoGatewayImpl implements PagamentoGateway {
    // Integração com Stripe, PagSeguro ou similar
}
```

### Consequências

- O domínio nunca importa SDKs externos de pagamento — nenhuma dependência do tipo `stripe-java` entrará no pacote `domain`.
- Trocar de provedor de pagamento é uma mudança restrita a `infrastructure.gateway.payment`, sem impacto no domínio ou nos Use Cases.
- O mesmo padrão é aplicado ao `NotificacaoService` para envio de e-mails/push notifications.

---

## ADR-008 — Domain Events para Comunicação entre Bounded Contexts

**Data:** 2026-04-30 | **Status:** ✅ Aceito

### Contexto

Após a conclusão de um curso (`academico`), múltiplos outros contextos precisam reagir: o contexto `gamificacao` deve processar recompensas, e o contexto `usuario` deve atualizar contadores. Fazer chamadas diretas entre contextos criaria acoplamento indesejado.

### Consequências

Adoção de **Domain Events** como mecanismo de comunicação assíncrona entre Bounded Contexts:

```
CursoConcluidoEvent  ──→  RecompensaService (gamificacao)
                    └──→  UpgradePlanoService (usuario)
```

O evento `CursoConcluidoEvent` é publicado pelo contexto `academico` e consumido por outros contextos sem que eles conheçam a origem.

### Consequências

- Baixo acoplamento: `academico` não importa classes de `gamificacao` ou `usuario`.
- Pode ser implementado inicialmente com Spring Events (`ApplicationEventPublisher`) e evoluído para filas (RabbitMQ, Kafka) sem mudança nos produtores/consumidores.
- Rastreabilidade: cada evento pode ser logado para auditoria do fluxo de negócio.

---

## ADR-009 — Uso de Java Records para DTOs e Value Objects

**Data:** 2026-04-30 | **Status:** ✅ Aceito

### Contexto

DTOs (Data Transfer Objects) são objetos simples de transporte de dados que não possuem comportamento. Criar classes completas com getters, setters, `equals` e `hashCode` manuais é verboso e propenso a erros.

### Decisão

Uso de **Java Records** (Java 16+) para todos os DTOs e Value Objects:

```java
record AlunoResponseDTO(
    UUID id, String nome, String email,
    int totalCursosConcluidos, String tipoPlano
) {}

record Email(String valor) {
    Email { /* validação no construtor compacto */ }
}
```

### Consequências

- Código significativamente mais conciso — redução de ~70% de boilerplate nos DTOs.
- Imutabilidade garantida por padrão — evita mutações acidentais de dados de resposta.
- Compatível com Jackson (serialização JSON) e com JPA `@Embeddable` para os VOs.
- Requer Java 16+ no projeto (ou Java 14+ com `--enable-preview`).

---

## ADR-010 — Segurança com JWT e MFA

**Data:** 2026-04-30 | **Status:** ✅ Aceito

### Contexto

O sistema possui diferentes perfis de acesso (ALUNO, PROFESSOR, ADMIN) e operações sensíveis (pagamento, resgate de criptomoedas) que exigem autenticação robusta, conforme RNF001 e RNF002.

### Decisão

Implementação de segurança em duas camadas no pacote `infrastructure.security`:

1. **JWT (JSON Web Token):** autenticação stateless para todas as requisições REST via `JwtAuthFilter`.
2. **MFA (Multi-Factor Authentication):** segundo fator obrigatório para operações financeiras e acesso a dados sensíveis, implementado via `MfaService`.

Controle de acesso por papel via `SecurityConfig` com Spring Security:
- `ROLE_ALUNO` — acesso a cursos, fórum, gamificação.
- `ROLE_PROFESSOR` — gestão de cursos e métricas.
- `ROLE_ADMIN` — aprovação de cursos e gestão da plataforma.

### Consequências

- Toda a lógica de segurança fica restrita à camada `infrastructure.security`, não contaminando o domínio.
- Os Controllers recebem o principal autenticado via `@AuthenticationPrincipal`, sem lógica de verificação manual.
- MFA adiciona uma etapa extra no fluxo de pagamento, impactando a UX — decisão aceita pelo stakeholder por razões de conformidade.

---

## ADR-011 — Encapsulamento de Regras de Negócio em Domain Services

**Data:** 2026-04-30 | **Status:** ✅ Aceito

### Contexto

Algumas regras de negócio envolvem múltiplas entidades e não pertencem naturalmente a nenhuma delas isoladamente. Colocá-las nos Use Cases da camada de aplicação violaria o DDD (regras de negócio no domínio) e o SRP (Use Cases teriam duas responsabilidades).

### Decisão

Criação de **Domain Services** especializados para cada conjunto de regras:

| Domain Service | Responsabilidade |
|---|---|
| `UpgradePlanoService` | Verifica e aplica upgrade para Premium (RN004) |
| `ProgressaoModularService` | Controla o avanço entre módulos (RN011, RN024) |
| `QuorumCursoSincronoService` | Valida quórum para cursos síncronos (RN008, RN009) |
| `AprovacaoCursoService` | Pipeline de aprovação de cursos (RF038) |
| `RankingForumService` | Ranking mensal e concessão de bônus (RN003) |
| `ModeracaoForumService` | Moderação automática de conteúdo (RF015) |
| `RecompensaService` | Orquestrador central de gamificação (RF002, RF004, RF005) |
| `ConversaoMoedaService` | Processamento de conversão de moedas (RF008, RN006) |

### Consequências

- Use Cases ficam enxutos, apenas orquestrando o fluxo (carregar → chamar domain service → salvar → notificar).
- Regras de negócio são testáveis em unitários puros, sem Spring context.
- O `RecompensaService` age como **orquestrador central** da gamificação, consolidando RF002, RF004, RF005, RF006 e RF007 em um único ponto de controle.

---

## ADR-012 — Entidade `TransacaoMoeda` Imutável por Design (Auditoria)

**Data:** 2026-04-30 | **Status:** ✅ Aceito

### Contexto

Toda operação com moedas virtuais precisa ser auditável e protegida contra fraudes (RNF008). Um log que pode ser modificado não é uma fonte confiável de verdade.

### Decisão

A entidade `TransacaoMoeda` é desenhada para ser **imutável por design**:

- Não possui métodos setters.
- Não possui métodos de atualização — apenas criação via construtor.
- O `TransacaoMoedaRepository` expõe apenas `save()` e `findBy*()`, nunca `update()`.

```java
class TransacaoMoeda {
    // Todos os atributos são final
    private final UUID id;
    private final Aluno aluno;
    private final int quantidade;
    private final TipoConversaoMoeda tipo;
    private final LocalDateTime dataHora;
    private final String descricao;
}
```

### Consequências

- Garante auditoria imutável para todas as movimentações de moedas.
- A tabela `transacao_moeda` no banco nunca recebe `UPDATE` — apenas `INSERT` e `SELECT`.
- Facilita eventual replicação desse log para um sistema de auditoria externo ou blockchain.

---

## ADR-013 — Jobs Agendados com Spring Scheduler

**Data:** 2026-04-30 | **Status:** ✅ Aceito

### Contexto

O sistema possui processos que precisam ser executados periodicamente de forma automática:
- Ranking mensal do fórum (RN003)
- Verificação de quórum de cursos síncronos (RN008)
- Renovação/suspensão de assinaturas (RN001)

### Decisão

Implementação de **Jobs agendados** usando `@Scheduled` do Spring Framework, organizados no pacote `infrastructure`:

| Job | Frequência | Responsabilidade |
|---|---|---|
| `ProcessarRankingMensalJob` | Todo dia 1 do mês | Identifica vencedor do fórum e concede bônus |
| `VerificarQuorumCursoSincronoJob` | 48h antes da data do curso | Verifica quórum e reagenda se necessário |
| `VerificarRenovacaoAssinaturaJob` | Diário | Suspende assinaturas inadimplentes |

### Consequências

- Implementação simples usando apenas `@Scheduled` — sem dependências externas.
- Para alta escala ou execução distribuída (múltiplas instâncias), deverá ser substituído por soluções como Quartz Scheduler ou um message broker (evolução futura).
- Os jobs chamam Use Cases da camada de aplicação — não contêm lógica de negócio diretamente.

---

## ADR-014 — Criptografia de Dados Pessoais com JPA Converter (LGPD)

**Data:** 2026-04-30 | **Status:** ✅ Aceito

### Contexto

A LGPD (Lei Geral de Proteção de Dados — RNF006) exige que dados pessoais e sensíveis sejam criptografados em repouso. Os campos críticos são: `Email`, `CarteiraDigital` e `dataNascimento`.

### Decisão

Uso de **JPA `AttributeConverter`** para criptografar/descriptografar automaticamente os campos sensíveis no momento da persistência:

```java
@Converter
class EmailEncryptor implements AttributeConverter<Email, String> {
    public String convertToDatabaseColumn(Email email) { /* criptografa */ }
    public Email convertToEntityAttribute(String dbValue) { /* descriptografa */ }
}
```

### Consequências

- A criptografia é transparente para o domínio — as entidades trabalham sempre com valores descriptografados.
- O banco de dados armazena apenas dados criptografados, protegendo contra vazamento de dados em backups.
- A chave de criptografia deve ser gerenciada externamente (ex: AWS KMS ou variável de ambiente segura) — não embutida no código.
- Trade-off: buscas diretas por `email` no banco (`WHERE email = ?`) não são possíveis — requer adaptação nas queries.

---

## ADR-015 — Entidade `Submissao` para Upload de Atividades e Projeto Final

**Data:** 2026-05-05 | **Status:** ✅ Aceito

### Contexto

O RF043 define que alunos devem poder fazer upload de arquivos para aulas do tipo `ATIVIDADE` ou `PROVA_FINAL`. Cada submissão deve ser vinculada à matrícula do aluno para compor a nota final do curso. A entidade `ProjetoFinal` existente não cobria o caso genérico de atividades por módulo.

### Decisão

Introdução da entidade `Submissao` no pacote `domain.academico.entity`, com os seguintes atributos:

```java
class Submissao {
    UUID id;
    String urlArquivo;
    double nota;
    LocalDateTime dataEnvio;
    String feedback;
    boolean corrigido;
    Aula aula;        // aula de tipo ATIVIDADE ou PROVA_FINAL
    Matricula matricula; // vincula a nota à matrícula
}
```

Relacionamentos no diagrama de classes atualizado:
- `Aluno 1 — 0..* Submissao`
- `Aula 1 — 0..* Submissao` (apenas para tipos ATIVIDADE/PROVA_FINAL)
- `Submissao 0..* — 1 Matricula` (compõe nota)

### Consequências

- A aula do tipo `ATIVIDADE` ou `PROVA_FINAL` habilita a interface de upload — aulas `TEORICA` não aceitam submissão.
- A nota da submissão é registrada no `feedback` pelo professor/tutor e considerada no cálculo da `notaFinal` da `Matricula`.
- A entidade `ProjetoFinal` continua existindo para o caso específico do projeto final com tutoria (RF044), com fluxo próprio de suporte.
- O diagrama de classes em `visaoGeral.md` foi atualizado para refletir essa decisão.

---

*Última atualização: 2026-05-08*
