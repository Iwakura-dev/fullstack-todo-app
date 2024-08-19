import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from "./auth.service";
import { UserDocument } from "../users/schema/users.schema";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  async register(@Body() body: { username: string, password: string; }): Promise<UserDocument> {
    const user = await this.authService.register(body.username, body.password);
    return user;
  }

  @Post('login')
  async login(@Body() body: { username: string; password: string; }) {
    const user = await this.authService.validateUser(body.username, body.password);
    if (!user) {
      throw new Error("Invalid credentials!");
    }
    const token = await this.authService.login(user);
    return { user, token };
  }
}
