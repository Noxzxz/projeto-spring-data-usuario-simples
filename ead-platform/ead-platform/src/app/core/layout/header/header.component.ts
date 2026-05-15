import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="header glass-panel">
      <div class="header-container">
        <a routerLink="/dashboard" class="logo">
          <i class="ph ph-graduation-cap"></i>
          <span>EaD Platform</span>
        </a>
        
        <div class="header-actions">
          <button class="icon-btn">
            <i class="ph ph-bell"></i>
          </button>
          
          <div class="user-profile">
            <img src="https://i.pravatar.cc/150?img=68" alt="User Profile" class="avatar">
            <div class="user-info">
              <span class="user-name">Evelyn</span>
              <span class="user-role">Aluno</span>
            </div>
            <i class="ph ph-caret-down"></i>
          </div>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .header {
      position: sticky;
      top: 0;
      z-index: 50;
      border-radius: 0;
      border-top: none;
      border-left: none;
      border-right: none;
      padding: 0 1.5rem;
      height: 70px;
      display: flex;
      align-items: center;
    }

    .header-container {
      width: 100%;
      max-width: 1400px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .logo {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--text-main);
    }

    .logo i {
      font-size: 1.75rem;
      color: var(--primary-color);
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: 1.5rem;
    }

    .icon-btn {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid var(--border-color);
      color: var(--text-muted);
      width: 40px;
      height: 40px;
      border-radius: var(--radius-full);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all var(--transition-fast);
    }

    .icon-btn:hover {
      color: var(--text-main);
      background: rgba(255, 255, 255, 0.1);
      box-shadow: var(--shadow-glow);
    }

    .icon-btn i {
      font-size: 1.25rem;
    }

    .user-profile {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      cursor: pointer;
      padding: 0.25rem;
      border-radius: var(--radius-full);
      transition: background var(--transition-fast);
    }

    .user-profile:hover {
      background: rgba(255, 255, 255, 0.05);
    }

    .avatar {
      width: 40px;
      height: 40px;
      border-radius: var(--radius-full);
      object-fit: cover;
      border: 2px solid var(--primary-color);
    }

    .user-info {
      display: flex;
      flex-direction: column;
    }

    .user-name {
      font-weight: 600;
      font-size: 0.9rem;
    }

    .user-role {
      font-size: 0.75rem;
      color: var(--primary-color);
    }
  `]
})
export class HeaderComponent {}
