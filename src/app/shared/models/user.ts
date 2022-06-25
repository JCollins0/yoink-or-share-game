export interface Login {
  username: string;
  password: string;
}

export interface SignUp {
  username: string;
  password: string;
}

export interface PartialUser {
  userId: number;
  secret_token: string;
}

export interface User extends PartialUser {
  userName: string;
  password: string;
  createTs: string;
  chgTs: string;
}
