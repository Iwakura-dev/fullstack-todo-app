import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserInterface } from './user.interface';

export type UserDocument = UserInterface;

@Schema()
export class User {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);