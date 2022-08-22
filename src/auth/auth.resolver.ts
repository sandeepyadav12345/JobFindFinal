import {Args, Mutation, Query,  Resolver} from '@nestjs/graphql';
import {Admin} from '../admin/admin';
import {AdminRegisterInput} from './dto/adminregister.input';
import {AuthService} from './auth.service';
import {AdminLoginInput} from './dto/adminlogin.input';
import {CurrentUser} from '../common/current-user.decorator';
import {UseGuards} from '@nestjs/common';
import { JwtGuard} from '../common/jwt.guard';



@Resolver(() => Admin)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {
  }

  @Mutation(() => Admin)
  register(@Args('adminregisterData') adminregisterData: AdminRegisterInput): Promise<Admin> {
    return this.authService.register(adminregisterData);
  }

  @Mutation(() => String)
  login(@Args('adminloginData') adminloginData: AdminLoginInput): Promise<string> {
    return this.authService.login(adminloginData);
  }

  @Query(() => Admin)
  @UseGuards(JwtGuard)
  adminProfile(@CurrentUser() admin: Admin): Admin {
    return admin;
  }

}
