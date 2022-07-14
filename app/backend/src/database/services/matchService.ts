import { IMatchService, IMatchModel, Match, MyError } from '../protocols';
import Teams from '../models/TeamModel';
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

    if (!decoded) {
      return { error: true, code: 401, message: 'Invalid token' }
    }

    if (homeTeam === awayTeam) {
      return { error: true, code: 401, message: 'It is not possible to create a match with two equal teams' }
    }

    const homeTeamTest = await Teams.findByPk(homeTeam);
    const awayTeamTest = await Teams.findByPk(awayTeam);

    if (!homeTeamTest || !awayTeamTest) {
      return { error: true, code: 404, message: 'There is no team with such id!'}
    }

    const newMatch = this.model.create(homeTeam, awayTeam, homeTeamGoals, awayTeamGoals)

    return newMatch;
  }

  async endMatch(id: number): Promise<void> {
    await this.model.endMatch(id);
  }
}
