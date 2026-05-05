import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../../core/layout/header/header.component';
import { SidebarComponent } from '../../../core/layout/sidebar/sidebar.component';

@Component({
  selector: 'app-course-player',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, SidebarComponent],
  template: `
    <div class="layout-wrapper">
      <app-header></app-header>
      
      <div class="main-content">
        <app-sidebar></app-sidebar>
        
        <main class="content-area">
          <div class="player-container animate-fade-in">
            <div class="video-section">
              <div class="video-wrapper glass-panel">
                <div class="video-placeholder">
                  <i class="ph ph-play-circle play-icon"></i>
                  <span>Reproduzir Aula</span>
                </div>
              </div>
              
              <div class="lesson-info">
                <h1 class="lesson-title">1. Introdução ao Componente Autônomo (Standalone)</h1>
                <p class="course-title">Curso: Angular 19 Avançado</p>
                
                <div class="lesson-actions">
                  <button class="btn btn-secondary">
                    <i class="ph ph-arrow-left"></i> Anterior
                  </button>
                  <button class="btn btn-primary">
                    Próxima <i class="ph ph-arrow-right"></i>
                  </button>
                </div>
              </div>

              <div class="lesson-tabs">
                <div class="tab active">Visão Geral</div>
                <div class="tab">Materiais (2)</div>
                <div class="tab">Anotações</div>
              </div>

              <div class="lesson-description glass-panel">
                <h3>Sobre esta aula</h3>
                <p>Nesta aula, exploraremos os fundamentos dos componentes autônomos introduzidos no Angular 14 e que se tornaram o padrão no Angular 19. Você aprenderá como criar, configurar e usar esses componentes sem precisar declará-los em um NgModule.</p>
                <a routerLink="/projetos/enviar" class="btn btn-secondary mt-3">
                  <i class="ph ph-upload-simple"></i> Enviar Atividade Desta Aula
                </a>
              </div>
            </div>

            <div class="modules-sidebar glass-panel">
              <div class="sidebar-header">
                <h3>Conteúdo do Curso</h3>
                <span class="progress-text">45% concluído</span>
              </div>
              
              <div class="module-list">
                <!-- Module 1 -->
                <div class="module expanded">
                  <div class="module-title">
                    <div>
                      <h4>Módulo 1: Fundamentos</h4>
                      <span class="module-meta">3 aulas • 45 min</span>
                    </div>
                    <i class="ph ph-caret-up"></i>
                  </div>
                  <div class="lesson-list">
                    <div class="lesson-item active">
                      <div class="lesson-status completed">
                        <i class="ph ph-check-circle"></i>
                      </div>
                      <div class="lesson-details">
                        <span class="lesson-name">1. Introdução ao Componente Autônomo</span>
                        <span class="lesson-time">15:00</span>
                      </div>
                    </div>
                    <div class="lesson-item">
                      <div class="lesson-status">
                        <i class="ph ph-circle"></i>
                      </div>
                      <div class="lesson-details">
                        <span class="lesson-name">2. Roteamento com Standalone</span>
                        <span class="lesson-time">20:30</span>
                      </div>
                    </div>
                    <div class="lesson-item">
                      <div class="lesson-status">
                        <i class="ph ph-circle"></i>
                      </div>
                      <div class="lesson-details">
                        <span class="lesson-name">3. Injeção de Dependência</span>
                        <span class="lesson-time">10:45</span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Module 2 -->
                <div class="module">
                  <div class="module-title">
                    <div>
                      <h4>Módulo 2: Sinais (Signals)</h4>
                      <span class="module-meta">4 aulas • 1h 20m</span>
                    </div>
                    <i class="ph ph-caret-down"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  `,
  styles: [`
    .layout-wrapper {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }

    .main-content {
      display: flex;
      flex: 1;
    }

    .content-area {
      flex: 1;
      padding: var(--spacing-xl);
      padding-top: 2rem;
    }

    .player-container {
      display: grid;
      grid-template-columns: 1fr 350px;
      gap: 2rem;
      max-width: 1600px;
      margin: 0 auto;
    }

    /* Video Section */
    .video-wrapper {
      width: 100%;
      aspect-ratio: 16 / 9;
      background: #000;
      border-radius: var(--radius-lg);
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      margin-bottom: 1.5rem;
    }

    .video-placeholder {
      display: flex;
      flex-direction: column;
      align-items: center;
      color: rgba(255, 255, 255, 0.5);
      cursor: pointer;
      transition: all var(--transition-fast);
    }

    .video-placeholder:hover {
      color: var(--primary-color);
      transform: scale(1.05);
    }

    .play-icon {
      font-size: 5rem;
      margin-bottom: 0.5rem;
    }

    .lesson-info {
      margin-bottom: 2rem;
    }

    .lesson-title {
      font-size: 1.75rem;
      margin-bottom: 0.25rem;
    }

    .course-title {
      color: var(--text-muted);
      font-size: 1rem;
      margin-bottom: 1.5rem;
    }

    .lesson-actions {
      display: flex;
      justify-content: space-between;
      border-top: 1px solid var(--border-color);
      padding-top: 1.5rem;
    }

    .lesson-tabs {
      display: flex;
      gap: 2rem;
      border-bottom: 1px solid var(--border-color);
      margin-bottom: 1.5rem;
    }

    .tab {
      padding: 0.75rem 0;
      font-weight: 500;
      color: var(--text-muted);
      cursor: pointer;
      border-bottom: 2px solid transparent;
      transition: all var(--transition-fast);
    }

    .tab:hover {
      color: var(--text-main);
    }

    .tab.active {
      color: var(--primary-color);
      border-bottom-color: var(--primary-color);
    }

    .lesson-description {
      padding: 1.5rem;
    }

    .lesson-description h3 {
      margin-bottom: 1rem;
      font-size: 1.2rem;
    }

    .lesson-description p {
      color: var(--text-muted);
      line-height: 1.6;
    }

    .mt-3 {
      margin-top: 1.5rem;
    }

    /* Modules Sidebar */
    .modules-sidebar {
      padding: 1.5rem;
      height: fit-content;
      max-height: calc(100vh - 120px);
      overflow-y: auto;
      position: sticky;
      top: 90px;
    }

    .sidebar-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid var(--border-color);
    }

    .sidebar-header h3 {
      font-size: 1.2rem;
    }

    .module {
      margin-bottom: 1rem;
    }

    .module-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      padding: 0.75rem;
      background: rgba(255, 255, 255, 0.03);
      border-radius: var(--radius-md);
      transition: background var(--transition-fast);
    }

    .module-title:hover {
      background: rgba(255, 255, 255, 0.08);
    }

    .module-title h4 {
      font-size: 0.95rem;
      margin-bottom: 0.2rem;
    }

    .module-meta {
      font-size: 0.75rem;
      color: var(--text-muted);
    }

    .lesson-list {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      padding: 0.5rem 0 0.5rem 1rem;
    }

    .lesson-item {
      display: flex;
      gap: 0.75rem;
      padding: 0.75rem;
      border-radius: var(--radius-md);
      cursor: pointer;
      transition: all var(--transition-fast);
    }

    .lesson-item:hover {
      background: rgba(255, 255, 255, 0.05);
    }

    .lesson-item.active {
      background: rgba(139, 92, 246, 0.1);
      border-left: 2px solid var(--primary-color);
    }

    .lesson-status {
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--text-muted);
      font-size: 1.2rem;
    }

    .lesson-status.completed {
      color: var(--secondary-color);
    }

    .lesson-details {
      display: flex;
      flex-direction: column;
    }

    .lesson-name {
      font-size: 0.9rem;
      font-weight: 500;
    }

    .lesson-item.active .lesson-name {
      color: var(--primary-color);
    }

    .lesson-time {
      font-size: 0.75rem;
      color: var(--text-muted);
    }

    @media (max-width: 1024px) {
      .player-container {
        grid-template-columns: 1fr;
      }
      .modules-sidebar {
        position: static;
        max-height: none;
      }
    }
  `]
})
export class CoursePlayerComponent {}
