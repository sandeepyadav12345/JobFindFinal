import {BadRequestException, Injectable, UnauthorizedException} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import {ObjectId} from 'mongodb';
import { UserRegisterInput } from '../user-auth/dto/userregister.input';
import { User } from '../users/users';
import { UserService } from '../users/users.service';
import { UserLoginInput } from '../user-auth/dto/userlogin.input';

@Injectable()
export class UserAuthService {
  constructor(
    private readonly userService: UserService,
              private readonly jwtService: JwtService) {
  }

  public async userRegister(dto: UserRegisterInput): Promise<User> {
    const user = await this.userService.getOneByEmail(dto.email);
    if (user) throw new BadRequestException(`user with email '${dto.email}' already exists`);
    dto.password = await this.encodePassword(dto.password);
    return this.userService.create(dto as User);
  }

  public async userLogin(dto: UserLoginInput): Promise<string> {
    const user = await this.userService.getOneByEmail(dto.email);
    if (!user) throw new BadRequestException(`Incorrect email`);
    const isPassCorrect = await bcrypt.compare(dto.password, user.password);
    if (!isPassCorrect) throw new BadRequestException('Incorrect password');
    return this.jwtService.sign({sub: user._id});
  }

  public validateUser(id: ObjectId): Promise<User> {
    return this.userService.getOneByIdOrFail(id)
      .catch(() => {
        throw new UnauthorizedException();
      });
  }

  private async encodePassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }
}
