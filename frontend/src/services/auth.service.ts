import api from "../api/axios";

/*
|--------------------------------------------------------------------------
| Register Payload
|--------------------------------------------------------------------------
*/

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  organizationName: string;
}

/*
|--------------------------------------------------------------------------
| Login Payload
|--------------------------------------------------------------------------
*/

export interface LoginPayload {
  email: string;
  password: string;
}

/*
|--------------------------------------------------------------------------
| Auth Response
|--------------------------------------------------------------------------
*/

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

/*
|--------------------------------------------------------------------------
| Register User
|--------------------------------------------------------------------------
*/

export const registerUser = async (
  data: RegisterPayload
): Promise<AuthResponse> => {

  const response =
    await api.post<AuthResponse>(
      "/auth/register",
      data
    );

  return response.data;
};

/*
|--------------------------------------------------------------------------
| Login User
|--------------------------------------------------------------------------
*/

export const loginUser = async (
  data: LoginPayload
): Promise<AuthResponse> => {

  const response =
    await api.post<AuthResponse>(
      "/auth/login",
      data
    );

  return response.data;
};