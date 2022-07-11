import { JwtPayload } from "jsonwebtoken";

export interface User {
  id: number;
  username: string,
  role: string;
  email: string;
  password: string
}

export interface Team {
  id: number;
  team_name: string;
}

export interface MyError {
  error: boolean;
  code: number;
  message: string;
}

export interface roleResponse {
  role: string
}

export interface IUserService {
  login(email: string, password: string): Promise<string | MyError>
  validateAuth(authorization: string | undefined): JwtPayload | string
}

export interface IUserModel {
  findOne(email: string): Promise<User | null>
}

export interface ITeamService {
  findAll(): Promise<Team[]>
}

export interface ITeamModel {
  findAll(): Promise<Team[] | []>
}