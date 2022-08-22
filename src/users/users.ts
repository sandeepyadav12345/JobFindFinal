import {Document} from 'mongoose';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Field, ID, ObjectType} from '@nestjs/graphql';
import {Constants} from '../common/constants';

@ObjectType()
@Schema({collection: Constants.UserRef, id: false})
export class User extends Document {
  @Field(() => ID)
  _id: any;

  @Field()
  @Prop({required: true})
  firstName: string;

  @Field()
  @Prop({required: true})
  lastName: string;

  @Field()
  @Prop({required: true})
  email: string;

  @Prop({required: true})
  password: string;
  
  @Field()
  @Prop({required:true})
  mobileNumber: number;

  @Field()
  @Prop({required:true})
  dateOfBirth: string;

  @Field()
  @Prop({required:true})
  location: string;

  @Field()
  @Prop({required:true})
  language: string;


}
export const UserSchema = SchemaFactory.createForClass(User);
