import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type FriendDocument = Friend & Document;

@Schema()
export class Friend {

  @Prop({ required: true, unique: true })
  tag: string;

  @Prop({ required: true })
  userId: string;
}

export const FriendSchema = SchemaFactory.createForClass(Friend);