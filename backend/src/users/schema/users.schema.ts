import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserInterface } from './user.interface';

export type UserDocument = UserInterface;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ unique: true, sparse: true })
  email?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);