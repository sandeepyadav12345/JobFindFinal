import {Document} from 'mongoose';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Field, ID, ObjectType} from '@nestjs/graphql';
import {Constants} from '../common/constants';

@ObjectType()
@Schema({collection: Constants.AdminRef, id: false})
export class Admin extends Document {
  @Field(() => ID)
  _id: any;

  @Field()
  @Prop({required: true})
  name: string;

  @Field()
  @Prop({required: true})
  email: string;

  @Prop({required: true})
  password: string; 

  @Prop({required:true})
  refreshToken:string;

  @Prop()
  accessToken:string;
  @Prop()
  payload: any;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
