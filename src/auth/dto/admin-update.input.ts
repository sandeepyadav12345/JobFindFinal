import {Field, InputType, PartialType} from '@nestjs/graphql';
import {AdminLoginInput} from './adminlogin.input';
import {IsNotEmptyString} from '../../common/is-not-empty-string.validator';
import {Transform} from 'class-transformer';
import {ObjectId} from 'mongodb';

@InputType()
export class AdminUpdateInput extends PartialType(AdminLoginInput) {
  @Field()
  @IsNotEmptyString()
  @Transform((val: string) => new ObjectId(val))
  _id: string;
}
