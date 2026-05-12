# ADR 002: Adoção de Formulários Reativos (Reactive Forms) para Autenticação

**Data**: 2026-05-10
**Status**: Aceito

## Contexto
As páginas de Login e Cadastro utilizavam `FormsModule` (Template-driven), o que dificultava a implementação de validações complexas, feedback inline dinâmico e o controle fino sobre o estado do formulário (ex: desabilitar botão de submit baseado na validade). Além disso, a US-A01 exigia validações específicas de formato e obrigatoriedade.

## Decisão
1.  **Transição para ReactiveFormsModule**: Substituímos o uso de `ngModel` por `FormControl` e `FormGroup`. Isso permite definir a lógica de validação no componente TypeScript, facilitando testes e manutenções.
2.  **Validações Integradas**: Utilizamos `Validators.required`, `Validators.email` e `Validators.minLength(6)` para atender aos critérios da US-A01.
3.  **Validação Customizada Cross-Field**: Implementamos o `passwordMatchValidator` no formulário de cadastro para garantir a integridade da confirmação de senha antes do envio à API.
4.  **Feedback Visual Dinâmico**: Adicionamos classes CSS utilitárias (`.is-invalid`, `.invalid-feedback`) para destacar campos com erro apenas após a interação do usuário (`touched` ou `dirty`).

## Consequência
- **Positiva**: Código mais limpo e testável no componente.
- **Positiva**: Melhoria significativa na UX com erros claros e imediatos.
- **Positiva**: Prevenção de chamadas de API inválidas através do bloqueio do submit.
- **Neutra**: Aumento leve na complexidade do código do componente TypeScript em comparação ao template-driven simples.
