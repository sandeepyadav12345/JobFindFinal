import {Field, ID, InputType} from '@nestjs/graphql';
import { IsEmail, MinLength } from 'class-validator';
import {IsNotEmptyString} from '../../common/is-not-empty-string.validator';

@InputType()
export class JobCreateInput {

  @Field(()=> String)
  @IsNotEmptyString()
  title: string;

  @Field(()=> String)
  @IsNotEmptyString()
  position: string;

  @Field(()=> String)
  @IsNotEmptyString()
  description: string;

  @Field(()=> String)
  @IsNotEmptyString()
  placeName: string;

  @Field(()=> String)
  @IsNotEmptyString()
  industry: string;

}
