import { Request, Response, NextFunction } from 'express';
import { ITeamService } from '../protocols';

export default class TeamController {
  constructor(private service: ITeamService) {
    this.service = service;
  }

  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const teams = await this.service.findAll();

      return res.status(200).json(teams);
    } catch (error) {
      next(error)
    }
  }
}
