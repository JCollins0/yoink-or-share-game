export interface Login {
  username: string;
  password: string;
}

export interface SignUp {
  username: string;
  password: string;
}

export interface User {
  userName: string;
  createdDate: string;
  updatedDate: string;
  userId: number;
  secret_token: string;
}
