import MatchModel from '../models/MatchModel';
import Teams from '../models/TeamModel';
import { IMatchModel, Match } from '../protocols';

export default class MatchRepository implements IMatchModel {
  constructor(private model = MatchModel) {
    this.model = model;
  }

  async findAll(): Promise<Match[] | []> {
    const matches = await this.model.findAll({
      attributes: 
      { exclude: ['home_team', 'away_team'] 
    },
      include:
       [
        { model: Teams, as: 'teamHome', 
        attributes: {
           exclude: ['id'] 
          } 
          }, 
        {
          model: Teams, as: 'teamAway',
          attributes: {
            exclude: ['id'] 
          }
         },
        ]
      });

    return matches;
  }
}
