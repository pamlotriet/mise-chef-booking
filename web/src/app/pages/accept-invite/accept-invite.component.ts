import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { AuthService } from '@api/services/auth.service';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, TranslatePipe],
  template: `
    <section class="card">
      <h1>{{ "auth.acceptInvite" | translate }}</h1>

      <form [formGroup]="form" (ngSubmit)="submit()">
        <label>
          {{ "auth.newPassword" | translate }}
          <input type="password" formControlName="password" />
        </label>

        <button type="submit" [disabled]="form.invalid">{{ "auth.setPassword" | translate }}</button>
      </form>
    </section>
  `,
  styles: [`
    .card {
      max-width: 420px;
      margin: 0 auto;
      padding: 2rem;
      background: var(--color-surface);
      border-radius: 16px;
      box-shadow: 0 10px 30px var(--color-focus-ring);
    }

    form {
      display: grid;
      gap: 1rem;
    }

    input {
      padding: .75rem;
      border: 1px solid var(--color-border);
      border-radius: 10px;
    }

    button {
      padding: .85rem;
      border: none;
      border-radius: 10px;
      background: var(--color-primary);
      color: var(--color-primary-text);
      font-weight: 700;
    }
  `]
})
export class AcceptInviteComponent {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  protected readonly form = this.fb.nonNullable.group({
    password: ['', [Validators.required, Validators.minLength(8)]]
  });

  submit(): void {
    const token = this.route.snapshot.queryParamMap.get('token');

    if (!token || this.form.invalid) {
      return;
    }

    this.authService.apiAuthAcceptInvitePost({
      body: {
        token,
        password: this.form.controls.password.value
      }
    }).subscribe(() => {
      this.router.navigateByUrl('/login');
    });
  }
}
