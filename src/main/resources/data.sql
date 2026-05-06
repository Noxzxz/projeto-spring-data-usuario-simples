-- Usuários: 1 instrutor + 1 aluno (Usando MERGE para não dar erro se já existirem)
MERGE INTO usuarios (nome, email, senha, ativo, perfil)
    KEY(email)
    VALUES ('Prof. João Silva', 'instrutor@demo.com', '123456', true, 'INSTRUTOR');

MERGE INTO usuarios (nome, email, senha, ativo, perfil)
    KEY(email)
    VALUES ('Maria Aluno', 'aluno@demo.com', '123456', true, 'ALUNO');