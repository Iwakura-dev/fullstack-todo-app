import { ConflictException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./schemas/user.schema";
import { Model } from "mongoose";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";
import { LoginDto } from "./dto/login.dto";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService
  ) { }
  async signUp(signUpDto): Promise<{ token: string; }> {
    const { email, password } = signUpDto;
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userModel.create({
      email,
      password: hashedPassword
    });

    const token = this.jwtService.sign({ id: user._id });
    return { token };
  }
  async login(loginDto: LoginDto): Promise<{ token: string; }> {
    const { email, password } = loginDto;
    const existingUser = await this.userModel.findOne({ email });
    if (!existingUser) {
      throw new ConflictException('Invalid email or password');
    }
    const isPasswordMatched = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordMatched) {
      throw new ConflictException('Invalid email or password');
    }
    const token = this.jwtService.sign({ id: existingUser._id });
    return {
      token
    };
  }
}