import { computed, inject } from "@angular/core";
import { Router } from "@angular/router";
import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { catchError, finalize, tap, throwError } from "rxjs";
import { AuthService } from "../../../api/services/auth.service";
import { LoginRequest } from "../../../api/models/login-request";
import { UserResponse } from "../../../api/models/user-response";

type AuthState = {
  token: string | null;
  currentUser: UserResponse | null;
  loading: boolean;
  error: string | null;
};

const tokenKey = "portfolio_access_token";

const initialState: AuthState = {
  token: localStorage.getItem(tokenKey),
  currentUser: null,
  loading: false,
  error: null,
};

export const AuthStore = signalStore(
  { providedIn: "root" },
  withState(initialState),
  withComputed((store) => ({
    isAuthenticated: computed(() => !!store.token()),
  })),
  withMethods((store, authService = inject(AuthService), router = inject(Router)) => ({
    login(request: LoginRequest) {
      patchState(store, { loading: true, error: null });

      return authService.apiAuthLoginPost$Json({ body: request }).pipe(
        tap((response) => {
          if (!response.accessToken) {
            throw new Error("Login response did not include an access token.");
          }

          localStorage.setItem(tokenKey, response.accessToken);
          patchState(store, { token: response.accessToken });
        }),
        catchError((error: unknown) => {
          patchState(store, { error: "Login failed." });
          return throwError(() => error);
        }),
        finalize(() => patchState(store, { loading: false }))
      );
    },

    loadCurrentUser() {
      patchState(store, { loading: true, error: null });

      return authService.apiAuthMeGet$Json().pipe(
        tap((user) => patchState(store, { currentUser: user })),
        catchError((error: unknown) => {
          patchState(store, { error: "Unable to load your account." });
          return throwError(() => error);
        }),
        finalize(() => patchState(store, { loading: false }))
      );
    },

    getAccessToken(): string | null {
      return store.token();
    },

    hasRole(role: string): boolean {
      return store.currentUser()?.roles?.includes(role) ?? false;
    },

    logout(): void {
      localStorage.removeItem(tokenKey);
      patchState(store, { token: null, currentUser: null, error: null });
      router.navigateByUrl("/login");
    },
  }))
);
