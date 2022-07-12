import { Request, Response, NextFunction } from 'express';
import { IMatchService } from '../protocols';

export default class MatchController {
  constructor(private service: IMatchService) {
    this.service = service;
  }

  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const matches = await this.service.findAll();

      return res.status(200).json(matches);
    } catch (error) {
      next(error);
    }
  }
}
