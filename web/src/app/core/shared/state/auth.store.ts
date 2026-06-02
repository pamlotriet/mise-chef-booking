import { computed, inject } from "@angular/core";
import { Router } from "@angular/router";
import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { catchError, finalize, tap, throwError } from "rxjs";
import { AuthApi } from "../../auth/auth.api";
import { CurrentUser, LoginRequest } from "../../auth/auth.models";

type AuthState = {
  token: string | null;
  currentUser: CurrentUser | null;
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
  withMethods((store, api = inject(AuthApi), router = inject(Router)) => ({
    login(request: LoginRequest) {
      patchState(store, { loading: true, error: null });

      return api.login(request).pipe(
        tap((response) => {
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
      return api.me().pipe(
        tap((user) => patchState(store, { currentUser: user }))
      );
    },

    getAccessToken(): string | null {
      return store.token();
    },

    hasRole(role: string): boolean {
      return store.currentUser()?.roles.includes(role) ?? false;
    },

    logout(): void {
      localStorage.removeItem(tokenKey);
      patchState(store, { token: null, currentUser: null, error: null });
      router.navigateByUrl("/login");
    },
  }))
);
