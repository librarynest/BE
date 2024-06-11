export interface LoginRequest {
  Email: string;
  Password: string;
}

export interface LoginResponse {
  FirstName: string;
  accessToken: string;
  refreshToken: string;
  isStaff: boolean;
}
