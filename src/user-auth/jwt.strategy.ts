import {PassportStrategy} from '@nestjs/passport';
import {ExtractJwt, Strategy} from 'passport-jwt';
import {ConfigService} from '@nestjs/config';
import {Injectable, UnauthorizedException} from '@nestjs/common';
import {isMongoId} from 'class-validator';
import {ObjectId} from 'mongodb';
import { User } from '../users/users';
import { UserAuthService } from './user-auth.service';

@Injectable()
export class UserJwtStrategy extends PassportStrategy(Strategy) {

  constructor(private readonly config: ConfigService,
              private readonly userAuthService: UserAuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get<string>('ACCESS_SECRET'),
    });
  }

  public validate(payload: any): Promise<User> {
    const id = payload.sub;
    if (!id && !isMongoId(id)) throw new UnauthorizedException();
    return this.userAuthService.validateUser(new ObjectId(id));
  }
  
}
