import {Args, Mutation, Query,  Resolver} from '@nestjs/graphql';
import {CurrentUser} from './current-user.decorator';
import {UseGuards} from '@nestjs/common';
import {UserJwtGuard} from './jwt.guard';
import { User } from '../users/users';
import { UserRegisterInput } from './dto/userregister.input';
import { UserLoginInput } from './dto/userlogin.input';
import { UserAuthService } from './user-auth.service';


@Resolver(()=> User)
export class UserAuthResolver {
  constructor(private readonly userAuthService: UserAuthService) {
  }

  @Mutation(() => User)
  userRegister(@Args('userregisterData') userregisterData: UserRegisterInput): Promise<User> {
    return this.userAuthService.userRegister(userregisterData);
  }

  @Mutation(() => String)
  userLogin(@Args('userloginData') userloginData: UserLoginInput): Promise<string> {
    return this.userAuthService.userLogin(userloginData);
  }

  @Query(() => User)
  @UseGuards(UserJwtGuard)
  userProfile(@CurrentUser() user: User): User {
    return user;
  }
}
