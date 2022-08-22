import {Module} from '@nestjs/common';
import {PassportModule} from '@nestjs/passport';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {JwtModule} from '@nestjs/jwt';
import {UserJwtStrategy} from './jwt.strategy';
import { UserModule } from '../users/users.module';
import { UserAuthResolver } from './user-auth.resolver';
import { UserAuthService } from './user-auth.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('ACCESS_SECRET'),
        signOptions: {expiresIn: config.get<string>('ACCESS_EXPIRES_IN')}
      }),
      inject: [ConfigService]
    }),
  
    UserModule,
  ],
  providers: [
    UserAuthResolver,
    UserAuthService,
    UserJwtStrategy
  ]
})
export class UserAuthModule {
}
