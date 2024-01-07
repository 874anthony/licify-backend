/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { UserRole } from 'src/shared/interfaces/users.interface';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({
    type: String,
    required: true,
    enum: UserRole,
  })
  role: UserRole;

  @Prop({ required: true })
  businessName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, select: false })
  password: string;

  @Prop()
  avatar: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
