import {PassportStrategy} from '@nestjs/passport';
import {ExtractJwt, Strategy} from 'passport-jwt';
import {ConfigService} from '@nestjs/config';
import {Injectable, UnauthorizedException} from '@nestjs/common';
import {AuthService} from './auth.service';
import {Admin} from '../admin/admin';
import {isMongoId} from 'class-validator';
import {ObjectId} from 'mongodb';
import { Constants } from 'src/common/constants';
import {Request} from 'express';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, Constants.refresh) {

  constructor(private readonly config: ConfigService,
              private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get<string>('REFRESH_TOKEN_SECRET'),
      passReqToCallback: true,
    });
  }

  public validate(req:Request, payload: any) {
    const refreshToken = req.get('Authorization').replace('Bearer', '').trim();
    //const adminId = payload.sub;
    return {payload, refreshToken};
  }  
}
