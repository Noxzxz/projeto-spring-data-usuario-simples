package com.exemplo.usuariosimples.infrastructure.config;

import com.exemplo.usuariosimples.domain.academico.entity.Aula;
import com.exemplo.usuariosimples.domain.academico.entity.Curso;
import com.exemplo.usuariosimples.domain.academico.entity.Modulo;
import com.exemplo.usuariosimples.domain.academico.enums.ModalidadeCurso;
import com.exemplo.usuariosimples.domain.academico.enums.StatusCurso;
import com.exemplo.usuariosimples.domain.academico.enums.TipoConteudo;
import com.exemplo.usuariosimples.domain.academico.valueobject.NivelCurso;
import com.exemplo.usuariosimples.domain.usuario.entity.Administrador;
import com.exemplo.usuariosimples.domain.usuario.entity.Aluno;
import com.exemplo.usuariosimples.domain.usuario.entity.Professor;
import com.exemplo.usuariosimples.domain.usuario.repository.AlunoRepository;
import com.exemplo.usuariosimples.domain.usuario.repository.ProfessorRepository;
import com.exemplo.usuariosimples.domain.usuario.valueobject.Email;
import com.exemplo.usuariosimples.domain.usuario.valueobject.NomeCompleto;
import com.exemplo.usuariosimples.domain.usuario.valueobject.SenhaCriptografada;
import com.exemplo.usuariosimples.infrastructure.persistence.jpa.CursoJpaRepository;
import com.exemplo.usuariosimples.infrastructure.persistence.jpa.PessoaJpaRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
public class DataInitializer implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(DataInitializer.class);

    private final AlunoRepository alunoRepository;
    private final ProfessorRepository professorRepository;
    private final PessoaJpaRepository pessoaRepository;
    private final CursoJpaRepository cursoRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(AlunoRepository alunoRepository,
                           ProfessorRepository professorRepository,
                           PessoaJpaRepository pessoaRepository,
                           CursoJpaRepository cursoRepository,
                           PasswordEncoder passwordEncoder) {
        this.alunoRepository = alunoRepository;
        this.professorRepository = professorRepository;
        this.pessoaRepository = pessoaRepository;
        this.cursoRepository = cursoRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional
    public void run(String... args) {
        if (pessoaRepository.count() > 0) {
            log.info("Banco ja possui dados - seed ignorado");
            return;
        }

        log.info("Iniciando seed de dados...");

        var emailAluno = new Email("aluno@teste.com");
        var emailProf = new Email("prof@teste.com");
        var emailAdmin = new Email("admin@teste.com");

        if (alunoRepository.findByEmail(emailAluno).isPresent()) {
            return;
        }

        var senha = new SenhaCriptografada(passwordEncoder.encode("123456"));

        Aluno aluno = new Aluno(
                new NomeCompleto("Aluno Demo"),
                emailAluno, senha, true, null);
        aluno.setTotalCursosConcluidos(11);
        aluno.setSaldoCursosExtras(33);
        alunoRepository.save(aluno);

        var emailDemoPremium = new Email("demo@teste.com");
        Aluno demoAluno = new Aluno(
                new NomeCompleto("Demo Premium"),
                emailDemoPremium, senha, true, null);
        demoAluno.setTotalCursosConcluidos(11);
        demoAluno.setSaldoCursosExtras(33);
        alunoRepository.save(demoAluno);

        Professor professor = new Professor(
                new NomeCompleto("Professor Demo"),
                emailProf, senha, true, null, "Desenvolvimento");
        professorRepository.save(professor);

        Administrador admin = new Administrador(
                new NomeCompleto("Admin Demo"),
                emailAdmin, senha, true, null, 1);
        pessoaRepository.save(admin);

        cursoRepository.save(criarCursoJava());
        cursoRepository.save(criarCursoSpring());
        cursoRepository.save(criarCursoEngSoftware());

        log.info("Seed concluido: 4 usuarios demo + 3 cursos");
    }

    private Curso criarCursoJava() {
        Curso curso = new Curso();
        curso.setTituloCurso("Java para Iniciantes");
        curso.setDescCurso("Aprenda Java do zero com exemplos praticos");
        curso.setStatus(StatusCurso.PUBLICADO);
        curso.setModalidade(ModalidadeCurso.EAD);
        curso.setNivel(new NivelCurso("Iniciante"));
        curso.setPublicoAlvo("Profissionais de TI que desejam aprender Java");
        curso.setConhecimentosPrevios("Logica de programacao basica");

        Modulo m1 = new Modulo();
        m1.setTitulo("Fundamentos");
        m1.setDescricao("Introducao a linguagem Java");
        m1.setOrdem(1);
        m1.addAula(criarAula("O que e Java", "Historia e características", TipoConteudo.VIDEO,
                "https://www.youtube.com/watch?v=sTX0UEplF54", 15, 1));
        m1.addAula(criarAula("Configuracao do Ambiente", "Instalacao JDK e IDE", TipoConteudo.PDF,
                "https://docs.oracle.com/en/java/", 10, 2));

        Modulo m2 = new Modulo();
        m2.setTitulo("Orientacao a Objetos");
        m2.setDescricao("Classes, objetos e heranca");
        m2.setOrdem(2);
        m2.addAula(criarAula("Classes e Objetos", "Primeira classe em Java", TipoConteudo.VIDEO,
                "https://www.youtube.com/watch?v=KlIL63MeyMY", 20, 1));
        m2.addAula(criarAula("Heranca", "Heranca e polimorfismo", TipoConteudo.LINK,
                "https://docs.oracle.com/javase/tutorial/java/IandI/", 0, 2));

        curso.addModulo(m1);
        curso.addModulo(m2);

        return curso;
    }

    private Curso criarCursoSpring() {
        Curso curso = new Curso();
        curso.setTituloCurso("Spring Boot Avancado");
        curso.setDescCurso("Desenvolvimento web com Spring Boot, JPA e Security");
        curso.setStatus(StatusCurso.PUBLICADO);
        curso.setModalidade(ModalidadeCurso.EAD);
        curso.setNivel(new NivelCurso("Avancado"));
        curso.setPublicoAlvo("Desenvolvedores Java com experiencia");
        curso.setConhecimentosPrevios("Java, SQL, conceitos de web");

        Modulo m1 = new Modulo();
        m1.setTitulo("Introducao ao Spring");
        m1.setDescricao("Fundamentos do ecossistema Spring");
        m1.setOrdem(1);
        m1.addAula(criarAula("Spring Framework", "Visao geral do Spring", TipoConteudo.VIDEO,
                "https://www.youtube.com/watch?v=OHn1jQl-e6M", 18, 1));
        m1.addAula(criarAula("Injecao de Dependencia", "IoC e DI no Spring", TipoConteudo.VIDEO,
                "https://www.youtube.com/watch?v=GB8k2-Egfv0", 25, 2));

        Modulo m2 = new Modulo();
        m2.setTitulo("Spring Data JPA");
        m2.setDescricao("Persistencia com JPA e Hibernate");
        m2.setOrdem(2);
        m2.addAula(criarAula("Mapeamento ORM", "Entidades e relacionamentos", TipoConteudo.VIDEO,
                "https://www.youtube.com/watch?v=5vOfnOzh2YU", 22, 1));
        m2.addAula(criarAula("Repositories", "Spring Data JPA repositories", TipoConteudo.PDF,
                "https://docs.spring.io/spring-data/jpa/docs/current/reference/html/", 0, 2));

        Modulo m3 = new Modulo();
        m3.setTitulo("Spring Security");
        m3.setDescricao("Autenticacao e autorizacao com JWT");
        m3.setOrdem(3);
        m3.addAula(criarAula("Autenticacao JWT", "Tokens e filtros de seguranca", TipoConteudo.VIDEO,
                "https://www.youtube.com/watch?v=5j5G2x7g3qA", 30, 1));

        curso.addModulo(m1);
        curso.addModulo(m2);
        curso.addModulo(m3);

        return curso;
    }

    private Curso criarCursoEngSoftware() {
        Curso curso = new Curso();
        curso.setTituloCurso("Engenharia de Software");
        curso.setDescCurso("Metodologias, DDD e arquitetura em camadas");
        curso.setStatus(StatusCurso.PUBLICADO);
        curso.setModalidade(ModalidadeCurso.HIBRIDO);
        curso.setNivel(new NivelCurso("Intermediario"));
        curso.setPublicoAlvo("Estudantes e profissionais de TI");
        curso.setConhecimentosPrevios("Conceitos basicos de programacao");

        Modulo m1 = new Modulo();
        m1.setTitulo("Metodologias Ageis");
        m1.setDescricao("Scrum, Kanban e processos ageis");
        m1.setOrdem(1);
        m1.addAula(criarAula("Scrum", "Framework agil para gestao de projetos", TipoConteudo.VIDEO,
                "https://www.youtube.com/watch?v=3c6f7cHm2dQ", 20, 1));

        Modulo m2 = new Modulo();
        m2.setTitulo("Domain-Driven Design");
        m2.setDescricao("DDD: bounded contexts, aggregates e value objects");
        m2.setOrdem(2);
        m2.addAula(criarAula("Introducao ao DDD", "Conceitos fundamentais", TipoConteudo.VIDEO,
                "https://www.youtube.com/watch?v=QjAV3L9HV6U", 25, 1));
        m2.addAula(criarAula("Value Objects", "Imutabilidade e identidade", TipoConteudo.PDF,
                "https://martinfowler.com/bliki/ValueObject.html", 0, 2));
        m2.addAula(criarAula("Aggregates", "Transacoes e consistencia", TipoConteudo.LINK,
                "https://martinfowler.com/bliki/DDD_Aggregate.html", 0, 3));

        Modulo m3 = new Modulo();
        m3.setTitulo("Arquitetura Hexagonal");
        m3.setDescricao("Ports and adapters, clean architecture");
        m3.setOrdem(3);
        m3.addAula(criarAula("Arquitetura em Camadas", "Separacao de responsabilidades", TipoConteudo.VIDEO,
                "https://www.youtube.com/watch?v=Hm3LUSBs2Q8", 20, 1));

        curso.addModulo(m1);
        curso.addModulo(m2);
        curso.addModulo(m3);

        return curso;
    }

    private Aula criarAula(String titulo, String descricao, TipoConteudo tipo,
                           String url, int duracao, int ordem) {
        Aula aula = new Aula();
        aula.setTitulo(titulo);
        aula.setDescricao(descricao);
        aula.setTipoConteudo(tipo);
        aula.setUrl(url);
        aula.setDuracaoMinutos(duracao);
        aula.setOrdem(ordem);
        return aula;
    }
}
