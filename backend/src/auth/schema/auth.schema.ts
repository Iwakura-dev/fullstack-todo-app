import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Auth {
  @Prop({ unique: true })
  email: string;

  @Prop({ minlength: 6 })
  password: string;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);