export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  email: string;
  roles: string[];
}

export interface CurrentUser {
  id: string;
  email: string;
  fullName: string;
  roles: string[];
}

export interface AcceptInviteRequest {
  token: string;
  password: string;
}
