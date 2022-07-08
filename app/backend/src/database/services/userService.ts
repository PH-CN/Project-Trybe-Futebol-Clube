import { IUserModel, IUserService } from '../protocols';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken'

const jwtConfig = {
  algorithm: 'HS256',
} as jwt.SignOptions;

const secret = process.env.JWT_SECRET || 'jwt_secret';

export default class UserService implements IUserService {
  constructor(private model: IUserModel) {
    this.model = model;
  }

  async login(email: string, password: string): Promise<string | boolean> {
    const user = await this.model.findOne(email);

    if (!user) return false;

    const verifyPass = bcrypt.compareSync(password, user.password);

    if (!verifyPass) return false;

    const { id, role, username } = user

    const token =  jwt.sign({ id, username, role, email }, secret, jwtConfig)

    return token
  }
}