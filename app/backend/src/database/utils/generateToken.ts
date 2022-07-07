import * as jwt from 'jsonwebtoken';
import { User } from '../protocols';

const secret = process.env.JWT_SECRET || 'verysecretpassword';

const generateToken = (data: User) => {
  const token = jwt.sign({ data }, secret, { expiresIn: '2d' });

  return token;
};

export default generateToken;