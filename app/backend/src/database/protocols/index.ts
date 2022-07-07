export interface User {
  id: number;
  username: string,
  role: string;
  email: string;
  password: string
}

export interface IUserService {
  login(email: string, password: string): Promise<string>
}

export interface IUserModel {
  findOne(email: string): Promise<User>
}