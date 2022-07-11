import { ITeamService, ITeamModel, Team } from '../protocols';

export default class TeamService implements ITeamService {
  constructor(private model: ITeamModel) {
    this.model = model;
  }

  async findAll(): Promise<Team[] | []> {
    const teams = this.model.findAll()

    return teams
  }

  async findByPk(id: string | number): Promise<Team> {
    const team = await this.model.findByPk(id)

    return team
  }
}
