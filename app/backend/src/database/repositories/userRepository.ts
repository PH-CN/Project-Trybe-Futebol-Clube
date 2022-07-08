import UserModel from '../models/UserModel';
import { User, IUserModel } from '../protocols'

export default class UserRepository implements IUserModel {
  constructor (private model = UserModel) {
    this.model = model
  }

  async findOne(email: string): Promise<User | null> {
    const user = await this.model.findOne({ where: { email } })

    return user
  }
}