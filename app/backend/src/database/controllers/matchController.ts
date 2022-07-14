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
      return res.status(newMatch.code as number).json({message: newMatch.message})
    }
    return res.status(201).json(newMatch);
  } catch (error) {
    next(error);
  }
 }

 async endMatch (req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;

    await this.service.endMatch(Number(id));

    return res.status(200).json({ 'message': 'Finished' })
  } catch (error) {
    next(error);
  }
 }
}
