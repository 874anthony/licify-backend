/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/users/schemas/user.schema';

export type ProjectDocument = mongoose.HydratedDocument<Project>;

@Schema()
export class Project {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;

  @Prop({ required: true })
  items: string[];

  @Prop({ required: true })
  price: number;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
    required: true,
  })
  constructorClient: mongoose.Schema.Types.ObjectId;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
  })
  provider: mongoose.Schema.Types.ObjectId;

  @Prop()
  description: string;

  @Prop()
  images: string[];
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
