import { Component, inject, OnDestroy } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from 'auth';
import { finalize, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnDestroy {
  private readonly _authService = inject(AuthService);
  private destroy$ = new Subject<void>();

  onLogout(): void {
    this._authService.logout().pipe(
        takeUntil(this.destroy$),
        finalize(() => this._authService.clearSession())
      ).subscribe({
        next: (res) => {
        },
        error: (err) => {
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
