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
}
