import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Field, ID, ObjectType} from '@nestjs/graphql';
import {Constants} from '../common/constants';
import {Document, Mongoose, Types} from 'mongoose';
import { isNullableType } from 'graphql';

@ObjectType()
@Schema({collection: Constants.JobRef, id: false, timestamps: true})
export class Job extends Document {
  @Field(() => ID)
  _id: any;

  @Field()
  @Prop()
  title: string; 

  @Field()
  @Prop()
  position: string; 

  @Field()
  @Prop()
  description: string;

  @Field()
  @Prop()
  placeName: string; 

  @Field()
  @Prop()
  industry: string; 

  @Field({nullable:true})
  createdAt: Date;

  @Field(({nullable:true}))
  updatedAt: Date;

}

export const JobSchema = SchemaFactory.createForClass(Job);

