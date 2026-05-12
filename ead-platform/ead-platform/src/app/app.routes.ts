import { Routes } from '@angular/router';
import { authGuard, instrutorGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },

  // ── Auth ─────────────────────────────────────────────────
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./features/auth/login/login.component').then(m => m.LoginComponent),
      },
      {
        path: 'cadastro',
        loadComponent: () =>
          import('./features/auth/register/register.component').then(
            m => m.RegisterComponent,
          ),
      },
    ],
  },

  // ── Área do Aluno ─────────────────────────────────────────
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/dashboard/dashboard.component').then(
        m => m.DashboardComponent,
      ),
  },
  {
    path: 'catalogo',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/learning/catalogo/catalogo.component').then(
        m => m.CatalogoComponent,
      ),
  },
  {
    path: 'curso/:id',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/learning/curso-detalhe/curso-detalhe.component').then(
        m => m.CourseDetailComponent,
      ),
  },
  {
    path: 'aula/:id',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/learning/course-player/course-player.component').then(
        m => m.CoursePlayerComponent,
      ),
  },
  {
    path: 'projetos',
    canActivate: [authGuard],
    children: [
      {
        path: 'enviar',
        loadComponent: () =>
          import('./features/projects/enviar-projeto/enviar-projeto.component').then(
            m => m.EnviarProjetoComponent,
          ),
      },
    ],
  },

  // ── Fluxo de Matrícula ────────────────────────────────────
  {
    path: 'matricula',
    children: [
      {
        path: 'planos',
        loadComponent: () => import('./features/enrollment/select-plan/select-plan.component').then(m => m.SelectPlanComponent)
      },
      {
        path: 'dados',
        loadComponent: () => import('./features/enrollment/personal-data/personal-data.component').then(m => m.PersonalDataComponent)
      },
      {
        path: 'pagamento',
        loadComponent: () => import('./features/enrollment/payment/payment.component').then(m => m.PaymentComponent)
      },
      {
        path: 'sucesso',
        loadComponent: () => import('./features/enrollment/success/success.component').then(m => m.SuccessComponent)
      }
    ]
  },

  // ── Área do Instrutor ─────────────────────────────────────
  {
    path: 'instrutor',
    canActivate: [authGuard, instrutorGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/instructor/dashboard/instructor-dashboard.component').then(
            m => m.InstructorDashboardComponent,
          ),
      },
      {
        path: 'cursos/novo',
        loadComponent: () =>
          import('./features/instructor/criar-curso/criar-curso.component').then(
            m => m.CriarCursoComponent,
          ),
      },
      {
        path: 'cursos/:id/editar',
        loadComponent: () =>
          import('./features/instructor/editar-curso/editar-curso.component').then(
            m => m.EditarCursoComponent,
          ),
      },
    ],
  },

  { path: '**', redirectTo: 'auth/login' },
];
