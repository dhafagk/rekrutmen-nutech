export interface UserData {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface AccessTokenResponse {
  status: boolean;
  message: string;
  errors: null;
  data: {
    access_token: string;
    token_type: string;
    expires_in: number;
    user: UserData;
  };
}

export interface LoginVariable {
  email: string;
  password: string;
}

export interface RegisterVariable {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}
