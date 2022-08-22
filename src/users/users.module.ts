import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Constants } from 'src/common/constants';
import { UserSchema } from './users';
import { UserService } from './users.service';

@Module({
  imports: [MongooseModule.forFeature([{name: Constants.UserRef, schema: UserSchema}])],
  providers: [ UserService],
  exports: [UserService]
})
export class UserModule {}
