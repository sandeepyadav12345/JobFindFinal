import {Field, InputType} from '@nestjs/graphql';
import {IsNotEmptyString} from '../../common/is-not-empty-string.validator';
import {AdminLoginInput} from './adminlogin.input';

@InputType()
export class AdminRegisterInput extends AdminLoginInput {
  @Field()
  @IsNotEmptyString()
  name: string;
}
