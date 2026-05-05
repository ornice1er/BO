import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-root',
    imports: [CommonModule,
        RouterOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
  isReady = false;

  constructor(private authService: AuthService) {
    this.authService.isReady.subscribe(ready => {
      this.isReady = ready;
    });
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (target.classList.contains('custom-radio')) {
      const tr = target.closest('tr');
      if (tr) {
        const rect = tr.getBoundingClientRect();
        const mid = rect.top + rect.height / 2;
        document.documentElement.style.setProperty('--panel-row-top', `${mid}px`);
      }
    }
  }
}
