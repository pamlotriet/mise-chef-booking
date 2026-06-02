import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import {
  AcceptInviteRequest,
  CurrentUser,
  LoginRequest,
  LoginResponse,
} from "./auth.models";

@Injectable({ providedIn: "root" })
export class AuthApi {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = "https://localhost:62833/api";

  login(request: LoginRequest) {
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, request);
  }

  acceptInvite(request: AcceptInviteRequest) {
    return this.http.post<void>(`${this.apiUrl}/auth/accept-invite`, request);
  }

  me() {
    return this.http.get<CurrentUser>(`${this.apiUrl}/auth/me`);
  }
}
