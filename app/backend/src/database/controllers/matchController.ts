import { Request, Response, NextFunction } from 'express';
import { IMatchService } from '../protocols';

export default class MatchController {
  constructor(private service: IMatchService) {
    this.service = service;
  }

  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { inProgress } = req.query;

      if (inProgress) {
        const matches = await this.service.findAllFiltered(inProgress as string | boolean);

        return res.status(200).json(matches);

      } else {
        const matches = await this.service.findAll();

        return res.status(200).json(matches);
      }
    } catch (error) {
      next(error);
    }
  }
  
 async create (req: Request, res: Response, next: NextFunction) {
  try {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = req.body;
    const { authorization } = req.headers;

    const newMatch = await this.service
      .create(homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, authorization);
    
    if (typeof newMatch === 'object' && newMatch.error) {
      return res.status(401).json(newMatch.message)
    }
    return res.status(201).json(newMatch);
  } catch (error) {
    next(error);
  }
 }
}
