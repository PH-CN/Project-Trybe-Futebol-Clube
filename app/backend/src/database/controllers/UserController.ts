import { Request, Response, NextFunction } from 'express';
import { IUserService } from '../protocols';

export default class UserController {
  constructor(private service: IUserService) {
    this.service = service
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      if (!email) {
        return res.status(400).json({ message: 'All fields must be filled' })
      }

      const token = await this.service.login(email, password);

      if (!token) {
        return res.status(401).json({ message: 'Incorret credentials' })
      }

      return res.status(200).json({ token })
    } catch (error) {
      next(error)
    }
  }
}