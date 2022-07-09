import { IUserModel, IUserService, MyError } from '../protocols';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken'

const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i;

const jwtConfig = {
  algorithm: 'HS256',
} as jwt.SignOptions;

const secret = process.env.JWT_SECRET || 'jwt_secret';

export default class UserService implements IUserService {
  constructor(private model: IUserModel) {
    this.model = model;
  }

  async login(email: string, password: string): Promise<MyError | string> {
    if (!email || !password) return { error: true, code: 400, message: 'All fields must be filled' }

    if (!emailRegex.test(email)) return { error: true, code: 401, message: 'Incorrect email or password' }

    const user = await this.model.findOne(email);

    if (!user) return { error: true, code: 401,  message: 'Incorrect email or password' };

    const verifyPass = bcrypt.compareSync(password, user.password);

    if (!verifyPass) return { error: true, code: 401,  message: 'Incorret email or password' };

    const { id, role, username } = user;

    const token =  jwt.sign({ id, username, role, email }, secret, jwtConfig);

    return token;
  }
}