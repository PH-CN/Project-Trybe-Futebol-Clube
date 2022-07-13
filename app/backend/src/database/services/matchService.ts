import { IMatchService, IMatchModel, Match } from '../protocols';
import { ParsedQs } from 'qs';

export default class MatchService implements IMatchService {
  constructor(private model: IMatchModel) {
    this.model = model;
  }

  async findAll(): Promise<Match[] | []> {
    const matches = this.model.findAll();

    return matches;
  }

  async findAllFiltered(query: boolean | string): Promise<Match[] | []> {
    const matches = this.model.findAllFiltered(query);

    return matches;
  }
}
