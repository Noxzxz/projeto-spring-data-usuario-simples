// ─────────────────────────────────────────────────────────
// AUTH
// ─────────────────────────────────────────────────────────

export interface LoginRequest {
  email: string;
  senha: string;
}

export interface RegisterRequest {
  nomeCompleto: string;
  email: string;
  senha: string;
  confirmarSenha: string;
}

export interface AuthResponse {
  token: string;
  tokenType: string;
  expiresIn: number;
  usuario: UsuarioSummary;
}

export interface UsuarioSummary {
  id: number;
  nomeCompleto: string;
  email: string;
  avatarUrl: string | null;
  perfil: 'ALUNO' | 'INSTRUTOR' | 'ADMIN';
}

// ─────────────────────────────────────────────────────────
// USUÁRIO / PERFIL
// ─────────────────────────────────────────────────────────

export interface UsuarioPerfil {
  id: number;
  nomeCompleto: string;
  email: string;
  telefone: string | null;
  avatarUrl: string | null;
  perfil: 'ALUNO' | 'INSTRUTOR' | 'ADMIN';
  plano: 'BASICO' | 'PREMIUM';
  criadoEm: string; // ISO-8601
}

// ─────────────────────────────────────────────────────────
// PLANOS / PAGAMENTO
// ─────────────────────────────────────────────────────────

export type PlanoTipo = 'BASICO' | 'PREMIUM';
export type MetodoPagamento = 'CARTAO_CREDITO' | 'CARTEIRA_DIGITAL';

export interface Plano {
  id: number;
  tipo: PlanoTipo;
  nome: string;
  preco: number;
  intervalo: 'MENSAL' | 'ANUAL';
  beneficios: string[];
  destaque: boolean;
}

export interface AssinaturaRequest {
  planoId: number;
  metodoPagamento: MetodoPagamento;
  dadosCartao?: DadosCartao;
}

export interface DadosCartao {
  nomeTitular: string;
  numeroCartao: string;
  dataExpiracao: string;
  cvv: string;
}

export interface AssinaturaResponse {
  id: number;
  status: 'ATIVA' | 'PENDENTE' | 'CANCELADA';
  plano: Plano;
  proximaCobranca: string;
  criadaEm: string;
}

export interface ResumoMatricula {
  curso: CursoSummary;
  tuitionBase: number;
  taxaAcesso: number;
  desconto: number;
  total: number;
}

// ─────────────────────────────────────────────────────────
// CURSOS
// ─────────────────────────────────────────────────────────

export type NivelCurso = 'INICIANTE' | 'INTERMEDIARIO' | 'AVANCADO';
export type StatusCurso = 'RASCUNHO' | 'EM_PRODUCAO' | 'PUBLICADO' | 'EM_ANALISE' | 'ARQUIVADO';

export interface CursoSummary {
  id: number;
  titulo: string;
  descricao: string;
  capUrl: string | null;
  categoria: string;
  nivel: NivelCurso;
  status: StatusCurso;
  totalAlunos: number;
  avaliacao: number | null;
  duracaoTotal: string;
  preco: number;
  tipoAcesso: 'VITALICIO' | 'POR_PERIODO';
  certificacaoDigital: boolean;
  publicoAlvo: string;
  conhecimentosPrevios: string;
}

export interface CursoDetalhe extends CursoSummary {
  instrutor: UsuarioSummary;
  modulos: Modulo[];
  publicoAlvo: string;
  conhecimentosPrevios: string;
  prerequisitos: string[];
  criadoEm: string;
  atualizadoEm: string;
}

export interface Modulo {
  id: number;
  titulo: string;
  ordem: number;
  totalAulas: number;
  duracaoTotal: string;
  aulas: Aula[];
  expandido?: boolean;
}

export interface Aula {
  id: number;
  titulo: string;
  tipo: 'VIDEO' | 'DOCUMENTO' | 'QUIZ';
  duracao: string;
  ordem: number;
}

export interface CursoCreateRequest {
  titulo: string;
  descricao: string;
  categoria: string;
  nivel: NivelCurso;
  publicoAlvo: string;
  prerequisitos: string[];
  preco: number;
  tipoAcesso: 'VITALICIO' | 'POR_PERIODO';
  certificacaoDigital: boolean;
  solicitarSeloPremium: boolean;
}

export interface CursoUpdateRequest extends Partial<CursoCreateRequest> {}

export interface DashboardInstrutor {
  totalAlunos: number;
  variacaoAlunos: number;
  cursosAtivos: number;
  cursosEmProducao: number;
  alcancePaises: number;
  cursos: CursoSummary[];
}

// ─────────────────────────────────────────────────────────
// PROJETOS (ALUNO)
// ─────────────────────────────────────────────────────────

export type StatusProjeto =
  | 'EM_ANDAMENTO'
  | 'AGUARDANDO_ENVIO'
  | 'ENVIADO'
  | 'EM_REVISAO'
  | 'APROVADO'
  | 'REPROVADO';

export interface ProjetoSummary {
  id: number;
  nome: string;
  descricao: string;
  turma: string;
  capUrl: string | null;
  status: StatusProjeto;
  progresso: number; // 0-100
  prazoEntrega: string; // ISO-8601
  orientador: UsuarioSummary;
}

export interface ProjetoDetalhe extends ProjetoSummary {
  arquivos: ArquivoProjeto[];
  feedbacks: FeedbackProjeto[];
  criadoEm: string;
}

export interface ArquivoProjeto {
  id: number;
  nome: string;
  tamanho: number;
  tipoMime: string;
  url: string;
  status: 'COMPLETO' | 'PROCESSANDO' | 'ERRO';
  carregadoEm: string;
}

export interface FeedbackProjeto {
  id: number;
  autor: UsuarioSummary;
  mensagem: string;
  criadoEm: string;
}

export interface ProjetoSubmitRequest {
  nome: string;
  descricao: string;
  turmaId: number;
}

export interface UploadProgressEvent {
  percentual: number;
  status: 'uploading' | 'validating' | 'complete' | 'error';
  mensagem?: string;
}

// ─────────────────────────────────────────────────────────
// PROGRESSO / ALUNO
// ─────────────────────────────────────────────────────────

export interface AlunoProgresso {
  id: string;
  nome: string;
  email: string;
  totalCursosConcluidos: number;
  saldoCursosExtras: number;
  saldoMoedas: number;
  tipoPlano: 'BASICO' | 'PREMIUM';
  visibilidadePerfil: string;
}

export interface ProgressoModulo {
  moduloId: number;
  titulo: string;
  ordem: number;
  status: 'BLOQUEADO' | 'EM_ANDAMENTO' | 'CONCLUIDO';
  percentualConcluido: number;
}

export interface MatriculaProgresso {
  id: number;
  cursoId: number;
  status: string;
  dataMatricula: string;
  dataConclusao: string | null;
  notaFinal: number | null;
  totalModulos: number;
  modulosConcluidos: number;
  percentualConcluido: number;
}

export interface ConcluirModuloResponse {
  modulosConcluidos: number;
  totalModulos: number;
  percentualConcluido: number;
  proximoModulo: number;
  cursoConcluido: boolean;
}

export interface SaldoMoedasResponse {
  saldo: number;
  historico: TransacaoMoedaItem[];
}

export interface TransacaoMoedaItem {
  id: number;
  quantidade: number;
  tipo: string;
  descricao: string;
  dataHora: string;
}

export interface ProjetoFinalResponse {
  id: number;
  matriculaId: number;
  aulaId: number;
  urlArquivo: string;
  comentario: string | null;
  status: 'AGUARDANDO' | 'REVISAO' | 'APROVADO';
  nota: number | null;
  feedback: string | null;
  dataEnvio: string;
  dataAvaliacao: string | null;
}

// ─────────────────────────────────────────────────────────
// DASHBOARD ALUNO
// ─────────────────────────────────────────────────────────

export interface DashboardAluno {
  matriculaAtiva: MatriculaAtiva | null;
  bibliotecaStatus: 'CONCEDIDO' | 'NEGADO' | 'PENDENTE';
  loungeParticipantes: number;
}

export interface MatriculaAtiva {
  curso: CursoSummary;
  orientador: UsuarioSummary;
  duracao: string;
  creditos: number;
  primeiroModulo: string;
}

// ─────────────────────────────────────────────────────────
// RESPOSTAS GENÉRICAS DA API
// ─────────────────────────────────────────────────────────

export interface ApiResponse<T> {
  data: T;
  mensagem: string;
  timestamp: string;
}

export interface PagedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  pagina: number;
  tamanhoPagina: number;
}

export interface ApiError {
  status: number;
  erro: string;
  mensagem: string;
  timestamp: string;
  path: string;
}

// ─────────────────────────────────────────────────────────
// FILTROS
// ─────────────────────────────────────────────────────────

export interface ProjetoFiltros {
  status?: StatusProjeto | 'TODOS';
  pagina?: number;
  tamanho?: number;
}

export interface CursoFiltros {
  status?: StatusCurso;
  busca?: string;
  pagina?: number;
  tamanho?: number;
}
