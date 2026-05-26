# Plano de Arquitetura — Plataforma de Gamificação para Educação Continuada

> **Tecnologia base:** Java + Spring Boot + Spring Data JPA  
> **Paradigmas:** Domain-Driven Design (DDD) + SOLID  
> **Projeto:** `br.com.plataforma`

---

## 1. Visão Arquitetural

A arquitetura é organizada em **quatro camadas** seguindo o DDD Layered Architecture:

```
┌──────────────────────────────────────────────────┐
│           interfaces (Controllers / REST)         │
├──────────────────────────────────────────────────┤
│           application (Use Cases / Services)      │
├──────────────────────────────────────────────────┤
│              domain (Núcleo do negócio)           │
├──────────────────────────────────────────────────┤
│         infrastructure (JPA, Gateway, Email)      │
└──────────────────────────────────────────────────┘
```

Os **Bounded Contexts** (contextos delimitados) são:

| Bounded Context   | Responsabilidade Principal                        |
|---                |---                                                |
| `usuario`         | Gestão de pessoas: Aluno, Professor, Administrador|
| `academico`       | Cursos, Módulos, Matrículas, Avaliações           |
| `financeiro`      | Planos, Pagamentos, Assinaturas                   |
| `engajamento`     | Fórum, Recompensas, Ranking                       |
| `gamificacao`     | Moedas, Vouchers, Upgrade de Plano                |

---

## 2. Estrutura de Pacotes

```
br.com.plataforma
│
├── domain/
│   ├── usuario/
│   │   ├── entity/
│   │   ├── valueobject/
│   │   ├── repository/
│   │   └── service/
│   │
│   ├── academico/
│   │   ├── entity/
│   │   ├── valueobject/
│   │   ├── enums/
│   │   ├── repository/
│   │   └── service/
│   │
│   ├── financeiro/
│   │   ├── entity/
│   │   ├── valueobject/
│   │   ├── enums/
│   │   ├── repository/
│   │   └── service/
│   │
│   ├── engajamento/
│   │   ├── entity/
│   │   ├── repository/
│   │   └── service/
│   │
│   └── gamificacao/
│       ├── entity/
│       ├── valueobject/
│       ├── enums/
│       ├── repository/
│       └── service/
│
├── application/
│   ├── usuario/
│   ├── academico/
│   ├── financeiro/
│   ├── engajamento/
│   └── gamificacao/
│
├── infrastructure/
│   ├── persistence/
│   │   └── jpa/     (repositórios JPA por contexto)
│   ├── gateway/
│   │   └── payment/ (integração com gateway de pagamento)
│   ├── messaging/
│   │   └── email/   (notificações)
│   └── security/
│
└── interfaces/
    └── rest/
        ├── usuario/
        ├── academico/
        ├── financeiro/
        ├── engajamento/
        └── gamificacao/
```

---

## 3. Bounded Context: `usuario`

### 3.1 Domain — Entities

#### `Pessoa` (abstract entity — raiz de hierarquia)
**Pacote:** `domain.usuario.entity`  
**Função:** Abstração base para todos os tipos de usuário do sistema.

| Atributo | Tipo | Descrição |
|---|---|---|
| `id` | `UUID` | Identificador único |
| `nome` | `NomeCompleto` (VO) | Nome completo do usuário |
| `email` | `Email` (VO) | E-mail único e validado |
| `dataNascimento` | `LocalDate` | Data de nascimento |
| `dataCadastro` | `LocalDateTime` | Momento do registro |
| `ativo` | `boolean` | Indica se a conta está ativa |

---

#### `Aluno` (entity — Aggregate Root)
**Pacote:** `domain.usuario.entity`  
**Função:** Representa o aluno da plataforma. É o Aggregate Root do contexto de usuário pois agrega regras de progressão, gamificação e assinatura.

| Atributo | Tipo | Descrição |
|---|---|---|
| `totalCursosConcluidos` | `int` | Contador de cursos finalizados |
| `saldoCursosExtras` | `int` | Cursos extras desbloqueados por desempenho/bônus |
| `saldoMoedas` | `int` | Moedas virtuais acumuladas (apenas Premium) |
| `tipoPlano` | `TipoPlano` (enum) | BASICO ou PREMIUM |
| `visibilidadePerfil` | `VisibilidadePerfil` (enum) | PUBLICO ou PRIVADO (RF013) |
| `carteiraDigital` | `CarteiraDigital` (VO) | Endereço de cripto (RF046) |

**Métodos de Domínio:**
```java
void concluirCurso(Matricula matricula);           // dispara regras RN002, RN004
void receberCursosExtras(int quantidade);          // RF002
void receberBonusForum(int quantidade);            // RF004
void creditarMoedas(int quantidade);              // RF007
boolean isPremium();                              // verifica TipoPlano
void fazerUpgradePremium();                       // RN004 - 12 cursos
void alterarVisibilidadePerfil(VisibilidadePerfil v); // RF013
```

---

#### `Professor` (entity)
**Pacote:** `domain.usuario.entity`  
**Função:** Representa o docente; pode propor cursos e receber métricas de desempenho.

| Atributo | Tipo | Descrição |
|---|---|---|
| `especialidade` | `String` | Área de conhecimento principal |
| `linkLattes` | `String` | Currículo Lattes (opcional) |
| `remuneracaoBase` | `BigDecimal` | Valor de remuneração fixa |

**Métodos:**
```java
BigDecimal calcularBonificacao(MetricasDesempenho metricas); // RN016, RF041
```

---

#### `Administrador` (entity)
**Pacote:** `domain.usuario.entity`  
**Função:** Usuário com privilégios de aprovação de cursos e gestão da plataforma.

| Atributo | Tipo | Descrição |
|---|---|---|
| `nivelAcesso` | `int` | Nível de permissão (1 = curador, 2 = diretor) |

---

### 3.2 Domain — Value Objects

#### `Email`
**Função:** Encapsula e valida o formato de e-mail.  
```java
record Email(String valor) {
    // valida regex no construtor
}
```

#### `NomeCompleto`
**Função:** Garante que nome não seja nulo/vazio.  
```java
record NomeCompleto(String nome) { }
```

#### `CarteiraDigital`
**Função:** Endereço de carteira de criptomoeda do aluno Premium (RF046).  
```java
record CarteiraDigital(String endereco, String rede) { }
```

---

### 3.3 Domain — Repository Interface

#### `AlunoRepository`
```java
interface AlunoRepository {
    Optional<Aluno> findById(UUID id);
    Optional<Aluno> findByEmail(Email email);
    Aluno save(Aluno aluno);
    List<Aluno> findAllPremium();
}
```

#### `ProfessorRepository`
```java
interface ProfessorRepository {
    Optional<Professor> findById(UUID id);
    Professor save(Professor professor);
}
```

---

### 3.4 Domain — Domain Service

#### `UpgradePlanoService`
**Função:** Centraliza a lógica de verificação e promoção de plano (RN004, RF005).  
```java
class UpgradePlanoService {
    void verificarEAplicarUpgrade(Aluno aluno); // Se cursos >= 12, chama fazerUpgradePremium()
}
```

---

### 3.5 Application — Use Cases

#### `MatricularAlunoUseCase`
**Função:** Orquestra a matrícula de um aluno num curso, verificando saldo de cursos extras.

#### `AtualizarPerfilUseCase`
**Função:** Atualiza visibilidade de perfil, carteira digital.

---

### 3.6 Interfaces — Controller

#### `AlunoController`
**Pacote:** `interfaces.rest.usuario`  
**Endpoints:**

| Método | Rota | Ação |
|---|---|---|
| `GET` | `/alunos/{id}` | Busca aluno por ID |
| `PUT` | `/alunos/{id}/perfil` | Atualiza visibilidade e carteira |
| `GET` | `/alunos/{id}/progresso` | Retorna progresso e saldo |

#### `ProfessorController`
| Método | Rota | Ação |
|---|---|---|
| `GET` | `/professores/{id}/metricas` | Retorna métricas de desempenho |

---

### 3.7 Application — DTOs

#### `AlunoResponseDTO`
```java
record AlunoResponseDTO(
    UUID id, String nome, String email,
    int totalCursosConcluidos, int saldoCursosExtras,
    int saldoMoedas, String tipoPlano, String visibilidade
) {}
```

#### `AtualizarPerfilRequestDTO`
```java
record AtualizarPerfilRequestDTO(
    String visibilidadePerfil, String enderecoCarteira, String redes
) {}
```

---

## 4. Bounded Context: `academico`

### 4.1 Domain — Enums

#### `StatusMatricula`
```java
enum StatusMatricula {
    EM_ANDAMENTO, CONCLUIDO, REPROVADO, TRANCADO
}
```

#### `TipoConteudo`
```java
enum TipoConteudo {
    VIDEO, PDF, LINK, AULA_SINCRONA_GRAVADA
}
```

#### `StatusCurso`
```java
enum StatusCurso {
    PROPOSTO, EM_AVALIACAO, EM_PRODUCAO, HOMOLOGADO, PUBLICADO // RF038
}
```

#### `ModalidadeCurso`
```java
enum ModalidadeCurso {
    ASSINCRONO, SINCRONO, HIBRIDO // RN018
}
```

---

### 4.2 Domain — Entities

#### `Curso` (entity — Aggregate Root)
**Pacote:** `domain.academico.entity`  
**Função:** Representa um curso da plataforma. Agrega módulos e controla o fluxo de aprovação.

| Atributo | Tipo | Descrição |
|---|---|---|
| `id` | `UUID` | Identificador |
| `titulo` | `String` | Título do curso |
| `descricao` | `String` | Descrição detalhada |
| `cargaHoraria` | `int` | Horas totais |
| `nivel` | `NivelCurso` (VO) | Nível de dificuldade |
| `publicoAlvo` | `String` | Descrição do público (RF034, RN015) |
| `conhecimentosPrevios` | `List<String>` | Pré-requisitos consultivos (RN007) |
| `status` | `StatusCurso` | Pipeline de aprovação (RF038) |
| `modalidade` | `ModalidadeCurso` | Síncrono, assíncrono ou híbrido |
| `maxAlunos` | `Integer` | Limite por turma (RF035, RN025) |
| `minAlunos` | `Integer` | Quórum mínimo para síncrono (RN008) |
| `professor` | `Professor` | Docente responsável |
| `modulos` | `List<Modulo>` | Módulos do curso |

**Métodos:**
```java
void avancarStatus(StatusCurso novoStatus, Administrador responsavel); // RF038
boolean atingiuQuorum(int preInscritos); // RN008
boolean aceitaNovasMatriculas();        // RF035
Modulo adicionarModulo(Modulo modulo);
```

---

#### `Modulo` (entity — parte do Aggregate Curso)
**Função:** Agrupa aulas e avaliação de um bloco de conteúdo. Aplica a trava de sequencialidade (RN011, RN024).

| Atributo | Tipo | Descrição |
|---|---|---|
| `id` | `UUID` | Identificador |
| `titulo` | `String` | Título do módulo |
| `ordem` | `int` | Posição na sequência |
| `aulas` | `List<Aula>` | Conteúdos do módulo |
| `avaliacao` | `Avaliacao` | Avaliação do módulo |

**Métodos:**
```java
boolean isDesbloqueadoPara(ProgressoAluno progresso); // RN011
```

---

#### `Aula` (entity)
**Função:** Representa uma unidade de conteúdo dentro de um módulo.

| Atributo | Tipo | Descrição |
|---|---|---|
| `id` | `UUID` | Identificador |
| `titulo` | `String` | Título |
| `urlConteudo` | `String` | URL do material |
| `tipoConteudo` | `TipoConteudo` | Tipo do conteúdo |
| `duracaoMinutos` | `int` | Duração estimada |
| `ordem` | `int` | Posição no módulo |
| `ehSincrona` | `boolean` | Se é aula ao vivo |
| `urlGravacao` | `String` | Gravação pós-aula (RF039, RN010) |

---

#### `Matricula` (entity — Aggregate Root)
**Função:** Representa o vínculo entre Aluno e Curso. Controla progressão e nota final.

| Atributo | Tipo | Descrição |
|---|---|---|
| `id` | `UUID` | Identificador |
| `aluno` | `Aluno` | Referência ao aluno |
| `curso` | `Curso` | Referência ao curso |
| `dataInicio` | `LocalDateTime` | Início da matrícula |
| `dataConclusao` | `LocalDateTime` | Data de conclusão |
| `notaFinal` | `Double` | Nota calculada |
| `status` | `StatusMatricula` | Estado da matrícula |
| `modulo atual` | `int` | Índice do módulo em progresso |

**Métodos:**
```java
boolean verificarAprovacao();           // nota > 7.0 (RN002)
void registrarConclusaoModulo(int ordemModulo);
boolean podeAvancarModulo(int ordemModulo); // RN011, RN024
void concluir(double notaFinal);        // muda status para CONCLUIDO
```

---

#### `Avaliacao` (entity)
**Função:** Avaliação objetiva ao final de cada módulo com gabarito cadastrado.

| Atributo | Tipo | Descrição |
|---|---|---|
| `id` | `UUID` | Identificador |
| `gabarito` | `List<RespostaCorreta>` (VO) | Respostas corretas (RF029) |
| `questoes` | `List<Questao>` | Questões da avaliação |

**Métodos:**
```java
double corrigir(List<RespostaAluno> respostas); // RF030
```

---

#### `PreInscricao` (entity)
**Função:** Registro de pré-inscrição em curso síncrono. Usada para validar quórum (RF023, RF037, RN008).

| Atributo | Tipo | Descrição |
|---|---|---|
| `id` | `UUID` | Identificador |
| `aluno` | `Aluno` | Aluno pré-inscrito |
| `curso` | `Curso` | Curso síncrono alvo |
| `dataPreInscricao` | `LocalDateTime` | Momento do registro |

---

#### `ProjetoFinal` (entity)
**Função:** Submissão de projeto prático para certificação (RF043, RF044, RN023).

| Atributo | Tipo | Descrição |
|---|---|---|
| `id` | `UUID` | Identificador |
| `matricula` | `Matricula` | Vínculo com matrícula |
| `urlArquivo` | `String` | Link ou arquivo enviado |
| `tutor` | `Professor` | Tutor vinculado |
| `status` | `StatusProjeto` (enum) | AGUARDANDO, REVISAO, APROVADO |

---

### 4.3 Domain — Value Objects

#### `NivelCurso`
```java
record NivelCurso(String descricao) {
    // Iniciante, Intermediário, Avançado
}
```

#### `RespostaCorreta`
```java
record RespostaCorreta(int numeroQuestao, String alternativa) { }
```

#### `MetricasDesempenho`
**Função:** VO imutável com dados agregados de performance do professor.  
```java
record MetricasDesempenho(
    int totalAlunosAtendidos,
    double mediaNotasTurma,
    double taxaConclusao,
    int respostasForum
) {}
```

---

### 4.4 Domain — Repository Interfaces

#### `CursoRepository`
```java
interface CursoRepository {
    Optional<Curso> findById(UUID id);
    List<Curso> findByStatus(StatusCurso status);
    List<Curso> findByProfessor(UUID professorId);
    Curso save(Curso curso);
}
```

#### `MatriculaRepository`
```java
interface MatriculaRepository {
    Optional<Matricula> findById(UUID id);
    List<Matricula> findByAluno(UUID alunoId);
    List<Matricula> findByCurso(UUID cursoId);
    long countConcluidosByAluno(UUID alunoId);
    Matricula save(Matricula matricula);
}
```

#### `PreInscricaoRepository`
```java
interface PreInscricaoRepository {
    List<PreInscricao> findByCurso(UUID cursoId);
    long countByCurso(UUID cursoId);
    PreInscricao save(PreInscricao preInscricao);
}
```

---

### 4.5 Domain — Domain Services

#### `ProgressoAcademicoService`
**Função:** Gerencia regras de progressão modular.  
```java
class ProgressaoModularService {
    boolean podeAvancarParaModulo(Matricula matricula, int ordemModulo);
    void registrarConclusaoAvaliacao(Matricula matricula, double nota);
}
```

#### `QuorumCursoSincronoService`
**Função:** Verifica e decide sobre realização/reagendamento de curso síncrono (RN008, RN009, RN019).  
```java
class QuorumCursoSincronoService {
    boolean quorumAtingido(Curso curso, long qtdePreInscritos);
    void reagendarCurso(Curso curso);           // RN009
}
```

#### `AprovacaoCursoService`
**Função:** Gerencia o pipeline de estados de aprovação de um curso (RF038, RN014, RN020).  
```java
class AprovacaoCursoService {
    void submeterParaAvaliacao(Curso curso);
    void aprovar(Curso curso, Administrador admin);
    void rejeitar(Curso curso, Administrador admin, String motivo);
    void publicar(Curso curso);
}
```

---

### 4.6 Application — Use Cases

#### `ConcluirModuloUseCase`
Orquestra conclusão de módulo, chama `ProgressaoModularService`, dispara notificação.

#### `SubmeterPropostaCursoUseCase`
Cria a proposta do curso no estado `PROPOSTO` e notifica o comitê.

#### `AprovarCursoUseCase`
Administrador aprova proposta, muda status e notifica professor.

#### `RegistrarPreInscricaoUseCase`
Registra pré-inscrição, verifica quórum, agenda verificação de reagendamento.

---

### 4.7 Interfaces — Controllers

#### `CursoController`
| Método | Rota | Ação |
|---|---|---|
| `GET` | `/cursos` | Lista cursos publicados (com filtros) |
| `GET` | `/cursos/{id}` | Detalhe do curso (RF045 - info-cards) |
| `POST` | `/cursos` | Professor submete proposta (RF031) |
| `PATCH` | `/cursos/{id}/status` | Admin altera status (RF032, RF038) |

#### `MatriculaController`
| Método | Rota | Ação |
|---|---|---|
| `POST` | `/matriculas` | Matricular aluno em curso |
| `GET` | `/matriculas/{id}/progresso` | Ver progresso e módulos |
| `POST` | `/matriculas/{id}/modulos/{ordem}/concluir` | Concluir módulo |

#### `ProjetoFinalController`
| Método | Rota | Ação |
|---|---|---|
| `POST` | `/projetos` | Upload de projeto prático (RF043) |
| `POST` | `/projetos/{id}/suporte` | Abrir chamado de tutoria (RF044) |

---

### 4.8 DTOs

#### `CursoResponseDTO`
```java
record CursoResponseDTO(
    UUID id, String titulo, String descricao, int cargaHoraria,
    String nivel, String publicoAlvo, List<String> conhecimentosPrevios,
    String status, String modalidade, String nomeProfessor
) {}
```

#### `MatriculaResponseDTO`
```java
record MatriculaResponseDTO(
    UUID id, String tituloCurso, String status,
    double notaFinal, int moduloAtual, int totalModulos
) {}
```

#### `SubmeterCursoRequestDTO`
```java
record SubmeterCursoRequestDTO(
    String titulo, String descricao, int cargaHoraria,
    String nivel, String publicoAlvo, List<String> conhecimentosPrevios,
    String modalidade, Integer maxAlunos, Integer minAlunos
) {}
```

---

## 5. Bounded Context: `financeiro`

### 5.1 Domain — Enums

#### `TipoPlano`
```java
enum TipoPlano {
    BASICO, PREMIUM
}
```

#### `StatusPagamento`
```java
enum StatusPagamento {
    PENDENTE, APROVADO, RECUSADO, CANCELADO
}
```

#### `ModalidadePagamento`
```java
enum ModalidadePagamento {
    BOLETO, PIX, CARTAO_RECORRENTE // RF009
}
```

---

### 5.2 Domain — Entities

#### `Assinatura` (entity — Aggregate Root)
**Função:** Representa o contrato de assinatura do aluno com a plataforma. Controla acesso ao catálogo (RN001).

| Atributo | Tipo | Descrição |
|---|---|---|
| `id` | `UUID` | Identificador |
| `aluno` | `Aluno` | Referência ao aluno |
| `tipoPlano` | `TipoPlano` | Plano atual |
| `dataInicio` | `LocalDate` | Início da assinatura |
| `dataRenovacao` | `LocalDate` | Próximo vencimento |
| `ativa` | `boolean` | Se o aluno tem acesso (RN001) |

**Métodos:**
```java
void renovar();
void suspender();                    // inadimplência (RN001)
void fazerUpgradePremium();          // RN004
boolean isAtiva();
```

---

#### `Pagamento` (abstract entity)
**Função:** Representa um registro financeiro de pagamento.

| Atributo | Tipo | Descrição |
|---|---|---|
| `id` | `UUID` | Identificador |
| `valor` | `Valor` (VO) | Valor monetário |
| `dataPagamento` | `LocalDateTime` | Data/hora |
| `status` | `StatusPagamento` | Estado do pagamento |
| `idTransacaoExterna` | `String` | Referência no gateway |
| `modalidade` | `ModalidadePagamento` | Forma de pagamento |

---

#### `PagamentoPix` / `PagamentoBoleto` / `PagamentoCartao` (entities)
**Função:** Especializações de Pagamento com atributos específicos de cada modalidade.

```java
class PagamentoPix extends Pagamento {
    String chavePixOrigem;
}
class PagamentoBoleto extends Pagamento {
    String codigoBarras;
    LocalDate dataVencimento;
}
class PagamentoCartao extends Pagamento {
    String ultimos4Digitos;
    boolean recorrente;
}
```

---

### 5.3 Domain — Value Objects

#### `Valor`
**Função:** Encapsula valor monetário garantindo não-negatividade.  
```java
record Valor(BigDecimal quantia, String moeda) {
    // valida quantia >= 0
}
```

---

### 5.4 Domain — Repository Interfaces

#### `AssinaturaRepository`
```java
interface AssinaturaRepository {
    Optional<Assinatura> findByAluno(UUID alunoId);
    List<Assinatura> findAllVencendoEm(LocalDate data);
    Assinatura save(Assinatura assinatura);
}
```

#### `PagamentoRepository`
```java
interface PagamentoRepository {
    Optional<Pagamento> findById(UUID id);
    List<Pagamento> findByAluno(UUID alunoId);
    Pagamento save(Pagamento pagamento);
}
```

---

### 5.5 Domain — Domain Services / Interfaces

#### `PagamentoGateway` (interface — anti-corrupção)
**Função:** Port (interface do domínio) para isolar a dependência do provedor de pagamento externo. Implementação fica na camada de infraestrutura.

```java
interface PagamentoGateway {
    ResultadoPagamento processar(Pagamento pagamento);
    boolean cancelar(String idTransacaoExterna);
}
```

#### `AssinaturaService`
**Função:** Regras de controle de acesso baseado na assinatura.  
```java
class AssinaturaService {
    boolean alunoTemAcesso(UUID alunoId);  // RN001
    void verificarRenovacoes();            // job diário
}
```

---

### 5.6 Application — Use Cases

#### `ProcessarPagamentoUseCase`
Orquestra criação do pagamento, chamada ao gateway, atualização da assinatura e geração do log de auditoria (RNF008).

#### `UpgradeParaPremiumUseCase`
Chamado após atingir 12 cursos; atualiza assinatura e habilita benefícios.

---

### 5.7 Interfaces — Controllers

#### `AssinaturaController`
| Método | Rota | Ação |
|---|---|---|
| `GET` | `/assinaturas/minha` | Detalhes da assinatura do aluno |
| `POST` | `/assinaturas/renovar` | Renovar assinatura |

#### `PagamentoController`
| Método | Rota | Ação |
|---|---|---|
| `POST` | `/pagamentos` | Efetuar pagamento (RF009) |
| `GET` | `/pagamentos/historico` | Histórico de pagamentos |

---

### 5.8 DTOs

#### `PagamentoRequestDTO`
```java
record PagamentoRequestDTO(
    String modalidade, BigDecimal valor,
    String chavePix, String codigoBarras,
    String ultimos4Digitos, boolean recorrente
) {}
```

#### `AssinaturaResponseDTO`
```java
record AssinaturaResponseDTO(
    UUID id, String tipoPlano, boolean ativa,
    LocalDate dataRenovacao
) {}
```

---

## 6. Bounded Context: `engajamento`

### 6.1 Domain — Entities

#### `Forum` (entity — Aggregate Root)
**Função:** Representa o fórum de discussão de um curso.

| Atributo | Tipo | Descrição |
|---|---|---|
| `id` | `UUID` | Identificador |
| `curso` | `Curso` | Curso ao qual pertence |
| `topicos` | `List<Topico>` | Tópicos do fórum |

---

#### `Topico` (entity)
**Função:** Tópico de discussão postado por um aluno/professor no fórum.

| Atributo | Tipo | Descrição |
|---|---|---|
| `id` | `UUID` | Identificador |
| `titulo` | `String` | Título |
| `conteudo` | `String` | Texto do tópico |
| `autor` | `Pessoa` | Quem criou |
| `dataCriacao` | `LocalDateTime` | Momento da criação |
| `views` | `int` | Visualizações |
| `categoria` | `String` | Categoria/tag (RF014) |
| `denunciado` | `boolean` | Flag de denúncia (RF016) |
| `bloqueado` | `boolean` | Bloqueado por moderação (RF015) |

**Métodos:**
```java
void denunciar();                    // RF016
void bloquear();                     // RF015
```

---

#### `Comentario` (entity)
**Função:** Resposta/comentário em um tópico do fórum.

| Atributo | Tipo | Descrição |
|---|---|---|
| `id` | `UUID` | Identificador |
| `conteudo` | `String` | Texto do comentário |
| `autor` | `Pessoa` | Quem comentou |
| `dataCriacao` | `LocalDateTime` | Momento |
| `ehAjudaUtil` | `boolean` | Marcado como útil pela comunidade |

---

#### `EngajamentoAluno` (entity)
**Função:** Registro agregado de interações de um aluno no fórum para fins de ranking e premiação (RF003, RF017, RN003).

| Atributo | Tipo | Descrição |
|---|---|---|
| `id` | `UUID` | Identificador |
| `aluno` | `Aluno` | Referência ao aluno |
| `mesReferencia` | `YearMonth` | Mês do cômputo |
| `totalTopicosAbertos` | `int` | Tópicos criados no mês |
| `totalRespostas` | `int` | Comentários de suporte |
| `pontuacaoTotal` | `int` | totalTopicos + totalRespostas |

**Métodos:**
```java
void incrementarTopico();
void incrementarResposta();
int calcularPontuacao();
```

---

### 6.2 Domain — Repository Interfaces

#### `ForumRepository`
```java
interface ForumRepository {
    Optional<Forum> findByCurso(UUID cursoId);
    Forum save(Forum forum);
}
```

#### `EngajamentoAlunoRepository`
```java
interface EngajamentoAlunoRepository {
    Optional<EngajamentoAluno> findByAlunoAndMes(UUID alunoId, YearMonth mes);
    List<EngajamentoAluno> findByMesOrderByPontuacaoDesc(YearMonth mes);
    EngajamentoAluno save(EngajamentoAluno eng);
}
```

---

### 6.3 Domain — Domain Services

#### `RankingForumService`
**Função:** Identifica o aluno mais ativo no mês e concede bônus de 1 curso (RF004, RN003).  
```java
class RankingForumService {
    Aluno identificarVencedorMensal(YearMonth mes);
    void concederBonusCurso(Aluno aluno);   // chama Aluno.receberBonusForum(1)
}
```

#### `ModeracaoForumService`
**Função:** Aplica moderação automática de conteúdo ofensivo (RF015).  
```java
class ModeracaoForumService {
    boolean contemPalavraRestrita(String conteudo);
    void bloquearConteudo(Topico topico);
    void bloquearConteudo(Comentario comentario);
}
```

---

### 6.4 Application — Use Cases

#### `PostarTopicoUseCase`
Cria tópico, aplica moderação automática, atualiza `EngajamentoAluno`.

#### `ResponderTopicoUseCase`
Cria comentário, aplica moderação, atualiza contagem do engajamento.

#### `ProcessarRankingMensalUseCase`
Job mensal que calcula ranking, chama `RankingForumService.concederBonusCurso()` e notifica vencedor.

---

### 6.5 Interfaces — Controllers

#### `ForumController`
| Método | Rota | Ação |
|---|---|---|
| `GET` | `/cursos/{id}/forum/topicos` | Lista tópicos (com filtro RF014) |
| `POST` | `/cursos/{id}/forum/topicos` | Criar tópico |
| `POST` | `/forum/topicos/{id}/comentarios` | Comentar em tópico |
| `POST` | `/forum/topicos/{id}/denunciar` | Denunciar tópico (RF016) |

---

## 7. Bounded Context: `gamificacao`

### 7.1 Domain — Enums

#### `TipoConversaoMoeda`
```java
enum TipoConversaoMoeda {
    NOVO_CURSO, ACUMULO_SALDO, RESGATE_CRIPTO // RN006, RF008
}
```

#### `StatusVoucher`
```java
enum StatusVoucher {
    ATIVO, UTILIZADO, EXPIRADO
}
```

---

### 7.2 Domain — Entities

#### `Voucher` (entity)
**Função:** Voucher gerado para alunos Premium para participação em projetos reais (RF006, RN005).

| Atributo | Tipo | Descrição |
|---|---|---|
| `id` | `UUID` | Identificador |
| `codigo` | `String` | Código único do voucher |
| `projetoAlvo` | `String` | Projeto/estágio de destino |
| `aluno` | `Aluno` | Beneficiário |
| `dataEmissao` | `LocalDate` | Data de emissão |
| `dataValidade` | `LocalDate` | Data de expiração |
| `status` | `StatusVoucher` | Estado atual |

**Métodos:**
```java
boolean isValido();
void utilizar();
```

---

#### `TransacaoMoeda` (entity)
**Função:** Log imutável de cada operação com moedas virtuais (RNF008 — auditoria).

| Atributo | Tipo | Descrição |
|---|---|---|
| `id` | `UUID` | Identificador |
| `aluno` | `Aluno` | Dono das moedas |
| `quantidade` | `int` | Moedas movimentadas (+/-) |
| `tipo` | `TipoConversaoMoeda` | Tipo da operação |
| `dataHora` | `LocalDateTime` | Momento da transação |
| `descricao` | `String` | Motivo (ex: "Conversão em curso X") |

---

### 7.3 Domain — Repository Interfaces

#### `VoucherRepository`
```java
interface VoucherRepository {
    List<Voucher> findByAluno(UUID alunoId);
    Optional<Voucher> findByCodigo(String codigo);
    Voucher save(Voucher voucher);
}
```

#### `TransacaoMoedaRepository`
```java
interface TransacaoMoedaRepository {
    List<TransacaoMoeda> findByAluno(UUID alunoId);
    TransacaoMoeda save(TransacaoMoeda transacao);
}
```

---

### 7.4 Domain — Domain Services

#### `RecompensaService`
**Função:** Centraliza todas as regras de recompensa do sistema (RF002, RF004, RF005, RF006, RF007). **Orquestrador central de gamificação.**

```java
class RecompensaService {
    void processarFimDeCurso(Aluno aluno, Matricula matricula);
    // Internamente:
    //   - se nota > 7 → receberCursosExtras(3) (RN002)
    //   - se totalCursos >= 12 → UpgradePlanoService.verificarEAplicarUpgrade() (RN004)
    //   - se Premium → creditarMoedas(3) (RN005)

    void emitirVoucherPremium(Aluno aluno); // RF006
}
```

#### `ConversaoMoedaService`
**Função:** Processa a conversão de moedas conforme as regras (RF008, RN006).  
```java
class ConversaoMoedaService {
    void converterEmCurso(Aluno aluno, Curso curso);
    void acumularSaldo(Aluno aluno, int quantidade);
    void resgataParaCripto(Aluno aluno, int quantidade, CarteiraDigital carteira);
}
```

---

### 7.5 Application — Use Cases

#### `ConverterMoedasUseCase`
Valida saldo, chama `ConversaoMoedaService`, registra `TransacaoMoeda`.

#### `EmitirVoucherUseCase`
Verifica que o aluno é Premium, gera voucher, salva e notifica.

---

### 7.6 Interfaces — Controllers

#### `GamificacaoController`
| Método | Rota | Ação |
|---|---|---|
| `GET` | `/gamificacao/moedas` | Saldo e histórico de moedas |
| `POST` | `/gamificacao/moedas/converter` | Converter moedas (RF008) |
| `GET` | `/gamificacao/vouchers` | Listar vouchers do aluno |

---

### 7.7 DTOs

#### `SaldoMoedasResponseDTO`
```java
record SaldoMoedasResponseDTO(
    int saldo, List<TransacaoMoedaDTO> historico
) {}
```

#### `ConverterMoedasRequestDTO`
```java
record ConverterMoedasRequestDTO(
    String tipo, // NOVO_CURSO | ACUMULO_SALDO | RESGATE_CRIPTO
    UUID cursoId, // se tipo = NOVO_CURSO
    String enderecoCarteira // se tipo = RESGATE_CRIPTO
) {}
```

---

## 8. Camada de Infraestrutura

### 8.1 `infrastructure.persistence.jpa`
Implementações concretas de todos os `Repository` interfaces do domínio usando Spring Data JPA.

```java
// Exemplo:
@Repository
class AlunoRepositoryJpa implements AlunoRepository {
    private final AlunoJpaRepository springRepo; // interface JpaRepository<AlunoEntity, UUID>
    // ...
}
```

> Aqui aplica-se o padrão **Adapter** (SOLID — DIP): o domínio depende da interface, a infra implementa.

### 8.2 `infrastructure.gateway.payment`
```java
@Component
class PagamentoGatewayImpl implements PagamentoGateway {
    // Integração com Stripe, PagSeguro ou similar
}
```

### 8.3 `infrastructure.messaging.email`
```java
interface NotificacaoService {
    void notificar(UUID alunoId, String assunto, String mensagem);
}
```

### 8.4 `infrastructure.security`
- `JwtAuthFilter` — Filtro de autenticação com JWT
- `SecurityConfig` — Regras de acesso por role (`ALUNO`, `PROFESSOR`, `ADMIN`)
- `MfaService` — Verificação de dois fatores para pagamentos (RNF001)

---

## 9. Princípios SOLID Aplicados

| Princípio | Onde se aplica |
|---|---|
| **S** — Single Responsibility | Cada Service e UseCase tem uma única responsabilidade. Ex: `RankingForumService` só calcula ranking. |
| **O** — Open/Closed | `Pagamento` é abstrata. Novos métodos de pagamento são adicionados via subclasse, sem alterar a existente. |
| **L** — Liskov Substitution | `Aluno`, `Professor` e `Administrador` podem substituir `Pessoa` em qualquer contexto de listagem. |
| **I** — Interface Segregation | `PagamentoGateway` e `NotificacaoService` são interfaces focadas. Nenhuma entidade implementa interface "gordas". |
| **D** — Dependency Inversion | Domain services dependem de interfaces de Repository. A implementação JPA fica na infraestrutura. |

---

## 10. Resumo Visual — Diagrama de Pacotes

```
br.com.plataforma
├── domain
│   ├── usuario     → Aluno*, Professor, Administrador, Email(VO), NomeCompleto(VO)
│   ├── academico   → Curso*, Modulo, Aula, Matricula*, Avaliacao, PreInscricao
│   ├── financeiro  → Assinatura*, Pagamento, PagamentoPix/Boleto/Cartao, Valor(VO)
│   ├── engajamento → Forum*, Topico, Comentario, EngajamentoAluno
│   └── gamificacao → Voucher, TransacaoMoeda, TipoConversaoMoeda(enum)
│
├── application
│   └── [UseCases por contexto — orquestram domain services e repos]
│
├── infrastructure
│   ├── persistence → Implementações JPA dos Repository
│   ├── gateway     → PagamentoGatewayImpl
│   ├── messaging   → NotificacaoServiceImpl (email/push)
│   └── security    → JWT, MFA
│
└── interfaces
    └── rest        → Controllers + DTOs por contexto
```
> `*` = Aggregate Root do contexto

---

## 11. Considerações Finais

- **Transações distribuídas entre contextos:** Comunicação via Domain Events (ex: `CursoConcluídoEvent`) para garantir baixo acoplamento entre `academico` e `gamificacao`.
- **Jobs agendados (Spring Scheduler):**
  - `ProcessarRankingMensalJob` — executa todo dia 1 do mês.
  - `VerificarQuorumCursoSincronoJob` — verifica quórum 48h antes da data do curso.
  - `VerificarRenovacaoAssinaturaJob` — diário, suspende inadimplentes.
- **LGPD (RNF006):** Dados pessoais (`Email`, `CarteiraDigital`, `dataNascimento`) devem ser criptografados em repouso com `@Convert` JPA.
- **Auditoria (RNF008):** `TransacaoMoeda` é imutável por design — nunca tem método de update.
