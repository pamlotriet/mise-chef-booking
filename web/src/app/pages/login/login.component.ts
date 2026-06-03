import { Component, inject } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { TranslatePipe } from "@ngx-translate/core";
import { AuthStore } from "@store/authStore/auth.store";

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, TranslatePipe],
  templateUrl: "./login.component.html",
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  protected readonly authStore = inject(AuthStore);
  protected readonly loading = this.authStore.loading;
  protected readonly error = this.authStore.error;

  protected readonly form = this.fb.nonNullable.group({
    email: ["admin@portfolio.local", [Validators.required, Validators.email]],
    password: ["ChangeMe123!", Validators.required],
  });

  submit(): void {
    if (this.form.invalid) {
      return;
    }

    this.authStore.login(this.form.getRawValue()).subscribe({
      next: () => {
        this.authStore.loadCurrentUser().subscribe(() => {
          this.router.navigateByUrl("/dashboard");
        });
      },
    });
  }
}
