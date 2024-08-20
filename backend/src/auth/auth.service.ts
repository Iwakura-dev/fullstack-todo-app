import { ConflictException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UserDocument } from '../users/schema/users.schema';
import { JwtService } from "@nestjs/jwt";
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) { }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(username);
    if (user) {
      const isPasswordValid = await argon2.verify(user.password, password);
      if (isPasswordValid) {
        const { password, ...result } = user.toObject();
        return result;
      }
    }
    return null;
  }
  async login(user: any) {
    const payload = { username: user.username, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
  async register(username: string, password: string, email?: string): Promise<UserDocument> {
    const existingUser = await this.usersService.findOneByUsername(username);
    if (existingUser) {
      throw new ConflictException('Username already exists!');
    }
    if (email) {
      const existingEmailUser = await this.usersService.findOneByEmail(email);
      if (existingEmailUser) {
        throw new ConflictException('Email already exists!');
      }
    }
    const hashedPassword = await argon2.hash(password);
    return this.usersService.create(username, hashedPassword, email);
  }
}