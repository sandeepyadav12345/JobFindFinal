import {PassportStrategy} from '@nestjs/passport';
import {ExtractJwt, Strategy} from 'passport-jwt';
import {ConfigService} from '@nestjs/config';
import {Injectable, UnauthorizedException} from '@nestjs/common';
import {AuthService} from './auth.service';
import {Admin} from '../admin/admin';
import {isMongoId} from 'class-validator';
import {ObjectId} from 'mongodb';

@Injectable()
export class AdminJwtStrategy extends PassportStrategy(Strategy) {

  constructor(private readonly config: ConfigService,
              private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get<string>('ACCESS_SECRET'),
    });
  }

  public validate(payload: any): Promise<Admin> {
    const id = payload.sub;
    if (!id && !isMongoId(id)) throw new UnauthorizedException();
    return this.authService.validateAdmin(new ObjectId(id));
  }
  
}
