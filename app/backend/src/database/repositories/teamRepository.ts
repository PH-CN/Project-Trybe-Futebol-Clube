import TeamModel from '../models/TeamModel';
import { Team, ITeamModel } from '../protocols';

export default class TeamRepository implements ITeamModel {
  constructor(private model = TeamModel) {
    this.model = model;
  }

  async findAll(): Promise<Team[] | []> {
    const teams = await this.model.findAll();

    return teams;
  }

  async findByPk(id: string | number): Promise<Team> {
    const team = await this.model.findByPk(id);

    return team as Team;
  }
}
