import {Module} from '@nestjs/common';
import {PassportModule} from '@nestjs/passport';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {JwtModule} from '@nestjs/jwt';
import {AuthService} from './auth.service';
import { JwtStrategy} from './jwt.strategy';
import {AdminModule} from '../admin/admin.module';
import {AuthResolver} from './auth.resolver';
import { RefreshTokenStrategy } from './refreshtoken.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({}),
    AdminModule,
  ],
  providers: [
    AuthResolver,
    AuthService,
    JwtStrategy,
    RefreshTokenStrategy,
  ]
})
export class AuthModule {
}
