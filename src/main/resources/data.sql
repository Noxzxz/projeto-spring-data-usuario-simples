-- Usuários: 1 instrutor + 1 aluno (Usando MERGE para não dar erro se já existirem)
MERGE INTO usuarios (nome, email, senha, ativo, perfil)
    KEY(email)
    VALUES ('Prof. João Silva', 'instrutor@demo.com', '123456', true, 'INSTRUTOR');

MERGE INTO usuarios (nome, email, senha, ativo, perfil)
    KEY(email)
    VALUES ('Maria Aluno', 'aluno@demo.com', '123456', true, 'ALUNO');

-- Cursos de Exemplo
MERGE INTO curso (titulo, descricao, categoria, nivel, status, total_alunos, avaliacao, duracao_total, preco, tipo_acesso, certificacao_digital, publico_alvo)
    KEY(titulo)
    VALUES ('Angular Pro: Masterizando Framework', 'Domine o Angular 19 do zero ao avançado com as melhores práticas.', 'Desenvolvimento', 'AVANCADO', 'PUBLICADO', 1250, 4.8, '40h', 297.00, 'VITALICIO', true, 'Desenvolvedores Frontend');

MERGE INTO curso (titulo, descricao, categoria, nivel, status, total_alunos, avaliacao, duracao_total, preco, tipo_acesso, certificacao_digital, publico_alvo)
    KEY(titulo)
    VALUES ('Java Spring Boot: Microserviços', 'Aprenda a construir APIs robustas e escaláveis com Spring Boot 3.', 'Backend', 'INTERMEDIARIO', 'PUBLICADO', 850, 4.7, '35h', 197.00, 'POR_PERIODO', true, 'Estudantes de Java');

MERGE INTO curso (titulo, descricao, categoria, nivel, status, total_alunos, avaliacao, duracao_total, preco, tipo_acesso, certificacao_digital, publico_alvo)
    KEY(titulo)
    VALUES ('Design System com Figma', 'Crie interfaces modernas e componentes reutilizáveis.', 'Design', 'INICIANTE', 'PUBLICADO', 450, 4.9, '20h', 147.00, 'VITALICIO', false, 'UI/UX Designers');