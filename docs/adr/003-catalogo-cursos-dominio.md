# ADR 003: Implementação do Catálogo de Cursos e Extensão de Domínio

**Data**: 2026-05-10
**Status**: Aceito

## Contexto
O sistema precisava de uma página de catálogo para exibir os cursos disponíveis aos alunos. Além disso, os requisitos de interface exigiam a exibição do campo `publicoAlvo` (Público-Alvo), que não estava presente no modelo de dados original da entidade `Curso` nem nos DTOs de resposta.

## Decisão
1.  **Extensão do Domínio (Java)**: Adicionamos o campo `publicoAlvo` na entidade `Curso` e sincronizamos os DTOs `CursoRequestDTO` e `CursoResponseDTO`. Isso permite que a informação seja persistida e trafegada via API.
2.  **Mapeamento Fullstack**: Atualizamos o `CursoService` (Java) para realizar o mapeamento De/Para e a interface `CursoSummary` (TypeScript) para refletir a nova estrutura da API.
3.  **Catálogo Dinâmico**: Criamos o `CatalogoComponent` utilizando o `CursosService` para buscar dados reais do backend.
4.  **Tratamento de Erros e UX**:
    *   Implementamos um estado de erro visual para falhas de rede.
    *   Utilizamos *Skeleton Loading* (simulado) para melhorar a percepção de performance.
    *   Adicionamos badges de nível (Iniciante/Intermediário/Avançado) baseados nos dados do backend.

## Consequência
- **Positiva**: Alinhamento completo entre o contrato da API e o que é exibido no frontend.
- **Positiva**: Interface do catálogo preparada para escala, com tratamento de erros e carregamento dinâmico.
- **Neutra**: Necessidade de atualização de scripts de seed (`data.sql`) para incluir o novo campo obrigatório para uma visualização completa.
