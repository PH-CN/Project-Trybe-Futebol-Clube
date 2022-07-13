import { IMatchService, IMatchModel, Match, MyError } from '../protocols';
import * as jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'jwt_secret';

export default class MatchService implements IMatchService {
  constructor(private model: IMatchModel) {
    this.model = model;
  }

  async findAll(): Promise<Match[] | []> {
    const matches = this.model.findAll();

    return matches;
  }

  async findAllFiltered(query: boolean | string): Promise<Match[] | []> {
    const matches = this.model.findAllFiltered(query);

    return matches;
  }

  async create(homeTeam: number, awayTeam: number, homeTeamGoals: number, awayTeamGoals: number, authorization: string): Promise<Match | MyError> {

    const decoded = jwt.verify(authorization, secret);

    console.log(decoded)
    
    if (!decoded) {
      return { error: true, code: 401, message: 'Invalid token' }
    }

    const newMatch = this.model.create(homeTeam, awayTeam, homeTeamGoals, awayTeamGoals)

    return newMatch;
  }
}
