# ADR 001: Implementação de Segurança com JWT Claims e Proactive Guarding

**Data**: 2026-05-10
**Status**: Aceito

## Contexto
A plataforma EAD precisava de uma forma robusta de proteger rotas e injetar tokens de autenticação. Anteriormente, o `AuthGuard` apenas verificava a presença de um token no `localStorage`, sem validar se ele ainda era válido temporalmente ou se as claims (como perfil de usuário) correspondiam aos requisitos da rota. Além disso, as requisições HTTP precisavam de um mecanismo centralizado para injeção do header `Authorization`.

## Decisão
Implementamos as seguintes mudanças arquiteturais:

1.  **Decodificação Nativa de JWT**: Implementamos um decodificador JWT no `AuthService` usando `atob` e `JSON.parse`. Isso evita a necessidade de uma biblioteca externa (`jwt-decode`), mantendo o bundle leve.
2.  **Verificação de Expiração no Guard**: O `authGuard` agora valida o claim `exp` (expiration) do token de forma proativa. Se o token estiver expirado, a navegação é cancelada e o usuário é redirecionado ao login, evitando falhas de API inesperadas.
3.  **Autorização baseada em Claims**: O `instrutorGuard` foi refatorado para extrair o perfil (`perfil`/`role`) diretamente do token assinado, garantindo que a autorização use informações confiáveis do backend.
4.  **Interceptor HTTP Funcional**: Utilizamos `HttpInterceptorFn` para injetar o header `Bearer` globalmente e um interceptor de erro para tratar respostas `401 Unauthorized`, limpando a sessão local automaticamente.

## Consequência
- **Positiva**: Segurança centralizada e robusta; redução de requisições que resultariam em erro 401; autorização mais confiável baseada em claims assinadas.
- **Positiva**: Melhora na UX com redirecionamento automático imediato em caso de expiração.
- **Neutra**: A decodificação manual via `atob` assume que o token é um JWT padrão bem formatado.
