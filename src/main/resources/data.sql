-- ============================================================
-- SEED: Dados iniciais para o banco H2 (EaD Platform)
-- Roda automaticamente ao subir o Spring Boot (embedded DB)
-- ============================================================

-- Usuários: 1 instrutor + 1 aluno
INSERT INTO usuarios (nome, email, senha, ativo, perfil)
VALUES ('Prof. João Silva', 'instrutor@demo.com', '123456', true, 'INSTRUTOR');

INSERT INTO usuarios (nome, email, senha, ativo, perfil)
VALUES ('Maria Aluno', 'aluno@demo.com', '123456', true, 'ALUNO');

-- Cursos (Prof. João Silva id=1)
INSERT INTO curso (titulo, descricao, cap_url, categoria, nivel, status, total_alunos, avaliacao, duracao_total, preco, tipo_acesso, certificacao_digital, instrutor_id)
VALUES (
    'Angular 19 Avançado',
    'Aprenda Angular 19 do zero ao avançado com projetos reais e SSR.',
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
    'Frontend', 'AVANCADO', 'PUBLICADO', 324, 4.8, '42h', 199.90, 'VITALICIO', true, 1
);

INSERT INTO curso (titulo, descricao, cap_url, categoria, nivel, status, total_alunos, avaliacao, duracao_total, preco, tipo_acesso, certificacao_digital, instrutor_id)
VALUES (
    'Spring Boot API REST',
    'Crie APIs REST profissionais com Spring Boot 3, JPA e boas práticas.',
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80',
    'Backend', 'INTERMEDIARIO', 'PUBLICADO', 218, 4.7, '38h', 179.90, 'VITALICIO', true, 1
);

INSERT INTO curso (titulo, descricao, cap_url, categoria, nivel, status, total_alunos, avaliacao, duracao_total, preco, tipo_acesso, certificacao_digital, instrutor_id)
VALUES (
    'UI/UX Design Masterclass',
    'Design de interfaces modernas com Figma, tipografia e princípios de UX.',
    'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80',
    'Design', 'INICIANTE', 'PUBLICADO', 156, 4.9, '28h', 149.90, 'VITALICIO', false, 1
);

-- Matrícula: aluno (id=2) matriculado no curso Angular (id=1)
INSERT INTO matriculas (aluno_id, curso_id, data_matricula, status)
VALUES (2, 1, '2026-01-15', 'ATIVA');
