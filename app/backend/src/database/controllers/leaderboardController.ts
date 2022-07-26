import { Request, Response, NextFunction } from 'express';
import { ILeaderboardService } from '../protocols';

export default class LeaderboardController {
  constructor(private service: ILeaderboardService) {
    this.service = service;
  }

  async leaderboardHome (req: Request, res: Response, next: NextFunction) {
    
    const leaderboard = await this.service.leaderboardHome();

    return res.status(200).json(leaderboard);
  }

  async leaderboardAway (req: Request, res: Response, next: NextFunction) {
    
    const leaderboard = await this.service.leaderboardAway();

    return res.status(200).json(leaderboard);
  }

  async leaderboard (req: Request, res: Response, next: NextFunction) {
    
    const leaderboard = await this.service.leaderboard();

    return res.status(200).json(leaderboard);
  }
}
