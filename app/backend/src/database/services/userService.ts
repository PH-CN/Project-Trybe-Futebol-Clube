import { User, IUserModel, IUserService } from '../protocols';
import generateToken from '../utils/generateToken';
import * as bcrypt from 'bcryptjs';

export default class UserService implements IUserService {
  constructor(private model: IUserModel) {
    this.model = model;
  }

  async login(email: string, password: string): Promise<string> {
    const user = await this.model.findOne(email)

    if (!user) {
      throw new Error('User not found')
    }

    const verifyPass = bcrypt.compareSync(password, user.password)

    if (!verifyPass) {
      throw new Error('Wrong credentials')
    }

    return generateToken(user);
  }
}