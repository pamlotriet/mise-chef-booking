import { CanActivateFn, Router } from "@angular/router";
import { inject } from "@angular/core";
import { AuthStore } from "../shared/store/authStore/auth.store";

export const roleGuard = (roles: string[]): CanActivateFn => {
  return () => {
    const authStore = inject(AuthStore);
    const router = inject(Router);

    const allowed = roles.some((role) => authStore.hasRole(role));

    return allowed ? true : router.createUrlTree(["/dashboard"]);
  };
};
