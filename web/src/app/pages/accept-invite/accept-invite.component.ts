import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../api/services/auth.service';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <section class="card">
      <h1>Accept Invite</h1>

      <form [formGroup]="form" (ngSubmit)="submit()">
        <label>
          New Password
          <input type="password" formControlName="password" />
        </label>

        <button type="submit" [disabled]="form.invalid">Set Password</button>
      </form>
    </section>
  `,
  styles: [`
    .card {
      max-width: 420px;
      margin: 0 auto;
      padding: 2rem;
      background: white;
      border-radius: 16px;
      box-shadow: 0 10px 30px rgba(0,0,0,.08);
    }

    form {
      display: grid;
      gap: 1rem;
    }

    input {
      padding: .75rem;
      border: 1px solid #d1d5db;
      border-radius: 10px;
    }

    button {
      padding: .85rem;
      border: none;
      border-radius: 10px;
      background: #2563eb;
      color: white;
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
