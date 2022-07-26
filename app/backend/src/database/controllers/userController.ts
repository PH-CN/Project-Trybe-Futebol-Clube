import { Request, Response, NextFunction } from 'express';
import { IUserService } from '../protocols';

export default class UserController {
  constructor(private service: IUserService) {
    this.service = service;
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      const token = await this.service.login(email, password);

      if (typeof token === 'object') {
        return res.status(token.code).json({ message: token.message });
      }

      return res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  }

  async validateAuth(req: Request, res: Response, next: NextFunction) {
    try {
      const { authorization } = req.headers;

      const validation = this.service.validateAuth(authorization);

      if (typeof validation === 'object') {
        return res.status(200).json({ role: validation.role });
      }
    } catch (error) {
      next(error);
    }
  }
}
