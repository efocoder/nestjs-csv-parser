import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail } from 'class-validator';
import * as bcrypt from 'bcrypt';
import { Document } from 'mongoose';

export type UserDocument = Document<User>;

@Schema()
export class User {
  @Prop({ unique: true, required: true })
  @IsEmail()
  email: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, minlength: 6 })
  password: string;

  static async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  }

  static response(userObj) {
    return {
      id: userObj._id,
      email: userObj.email,
      name: userObj.name,
    };
  }

  static async checkPassword(password: string, user: any): Promise<boolean> {
    return await bcrypt.compare(password, user.password);
  }
}

export const UserSchema = SchemaFactory.createForClass(User);
