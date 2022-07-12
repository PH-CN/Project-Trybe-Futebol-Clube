import { IMatchService, IMatchModel, Match } from '../protocols';

export default class MatchService implements IMatchService {
  constructor(private model: IMatchModel) {
    this.model = model;
  }

  async findAll(): Promise<Match[] | []> {
    const matches = this.model.findAll();

    return matches;
  }
}
