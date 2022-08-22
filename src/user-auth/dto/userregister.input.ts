import {Field, InputType} from '@nestjs/graphql';
import {IsNotEmptyString} from '../../common/is-not-empty-string.validator';
import {UserLoginInput} from './userlogin.input';

@InputType()
export class UserRegisterInput extends UserLoginInput {
  @Field()
  @IsNotEmptyString()
  firstName: string;

  @Field()
  @IsNotEmptyString()
  lastName: string;

  @Field()
  @IsNotEmptyString()
  dateOfBirth: string;

  @Field(()=>Number)
  mobileNumber: number;

  @Field()
  @IsNotEmptyString()
  language: string;

  @Field()
  @IsNotEmptyString()
  location: string;
}
