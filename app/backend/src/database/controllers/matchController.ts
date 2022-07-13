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
}
