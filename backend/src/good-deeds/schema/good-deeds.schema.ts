import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from '../../users/schema/users.schema';

export type GoodDeedDocument = GoodDeed & Document;

@Schema()
export class GoodDeed {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: String, required: true })
  userId: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const GoodDeedSchema = SchemaFactory.createForClass(GoodDeed);