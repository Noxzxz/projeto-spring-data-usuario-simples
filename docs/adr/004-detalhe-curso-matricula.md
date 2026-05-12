# ADR 004: Detalhes do Curso e Lógica de Matrícula

**Data**: 2026-05-10
**Status**: Aceito

## Contexto
Após implementar o catálogo, era necessário permitir que os alunos visualizassem detalhes técnicos dos cursos e realizassem a matrícula. O requisito RF045 exigia a exibição de info-cards com dados como nível, carga horária e conhecimentos prévios.

## Decisão
1.  **Enriquecimento do Modelo**: Adicionamos o campo `conhecimentosPrevios` à entidade `Curso` (Java) e sincronizamos com o frontend.
2.  **Página de Detalhes (CourseDetailComponent)**:
    *   Implementamos uma visualização em duas colunas: conteúdo/info à esquerda e ações/preço à direita.
    *   Utilizamos info-cards para destacar metadados técnicos (Nível, Duração, Público-Alvo, Requisitos).
3.  **Fluxo de Matrícula**:
    *   O botão de ação é contextual: "Matricular-se Agora" para novos alunos e "Continuar Curso" para alunos já matriculados.
    *   A matrícula dispara um `POST /matriculas` enviando o ID do aluno (do `AuthService`) e o ID do curso.
4.  **Gestão de Rotas**:
    *   `curso/:id`: Página de detalhes (venda/info).
    *   `aula/:id`: Player de aulas (consumo de conteúdo).

## Consequência
- **Positiva**: Experiência de matrícula fluida e informativa.
- **Positiva**: Separação clara entre a visualização do produto (Curso) e o consumo do conteúdo (Aula).
- **Negativa**: O processo de verificação de matrícula no frontend é atualmente simplificado (busca todas as matrículas); no futuro, um endpoint dedicado de status seria mais performático.
