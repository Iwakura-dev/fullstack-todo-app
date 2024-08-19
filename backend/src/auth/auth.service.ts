import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UserDocument } from '../users/schema/users.schema';
import { UserInterface } from '../users/schema/user.interface';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) { }

  async validateUser(username: string, password: string): Promise<UserDocument | null> {
    const user = await this.usersService.findOneByUsername(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async login(user: UserDocument) {
    const payload = { username: user.username, sub: user._id };
    return {
      access_token: jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES }),
    };
  }
  async register(username: string, password: string): Promise<UserDocument> {
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.usersService.create(username, hashedPassword);
  }
}