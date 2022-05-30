export interface Login {
  username: string;
  password: string;
}

export interface SignUp {
  username: string;
  password: string;
}

export interface User {
  userId: number;
  userName: string;
  password: string;
  secret_token: string;
}
