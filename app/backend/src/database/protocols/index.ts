import { JwtPayload } from 'jsonwebtoken';

export interface User {
  id: number;
  username: string,
  role: string;
  email: string;
  password: string;
}

export interface Team {
  id: number;
  team_name: string;
}

export interface Match {
  id: number;
  home_team: number;
  home_team_goals: number;
  away_team: number;
  away_team_goals: number;
  in_progress: number;
  error?: boolean;
  code?: number;
  message?: string;
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
  findByPk(id: string | number): Promise<Team>
}

export interface ITeamModel {
  findAll(): Promise<Team[] | []>
  findByPk(id: string | number): Promise<Team>
}

export interface IMatchService {
  findAll(): Promise<Match[]>
  findAllFiltered(query: boolean | string): Promise<Match[]>
  create(homeTeam: number, awayTeam: number, homeTeamGoals: number, awayTeamGoals: number, authorization: string | undefined): Promise<Match | MyError | undefined>
  endMatch(id: number): Promise<void>;
}

export interface IMatchModel {
  findAll(): Promise<Match[]>
  findAllFiltered(query: boolean | string): Promise<Match[]>
  create(homeTeam: number, awayTeam: number, homeTeamGoals: number, awayTeamGoals: number): Promise<Match>
  endMatch(id: number): Promise<void>;
}