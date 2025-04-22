import axiosUser from '../utils/axiosUser';

interface LoginCredentials {
  email: string;
  password: string;
}

interface User {
  id: string;
  name: string;
  email: string;
}

interface LoginResponse {
  message: string;
  token: string;
  user: User;
}

export async function login(credentials: LoginCredentials): Promise<LoginResponse> {
  const response = await axiosUser.post<LoginResponse>('/login', credentials);
  return response.data;
}
