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

  async findAllFiltered(query: boolean | string): Promise<Match[]> {
    const bool = (query === 'true');
    const matches = await this.model.findAll({
      where: { in_progress: bool },
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

  async create(homeTeam: number, awayTeam: number, homeTeamGoals: number, awayTeamGoals: number): Promise<Match> {
    const inProgress = true;

    const newMatch = this.model.create({homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress});

    return newMatch;
  }

  async endMatch(id: number): Promise<void> {
    await this.model.update({ inProgress: false }, { where: { id } })
  }
}
