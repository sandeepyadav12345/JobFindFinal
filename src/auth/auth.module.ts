import {Module} from '@nestjs/common';
import {PassportModule} from '@nestjs/passport';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {JwtModule} from '@nestjs/jwt';
import {AuthService} from './auth.service';
import {AdminJwtStrategy} from './jwt.strategy';
import {AdminModule} from '../admin/admin.module';
import {AuthResolver} from './auth.resolver';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        //secret: config.get<string>('ACCESS_SECRET'),
        secret:'adminsecret',
        signOptions: {expiresIn: config.get<string>('ACCESS_EXPIRES_IN')}
      }),
      inject: [ConfigService]
    }),
    AdminModule,
  ],
  providers: [
    AuthResolver,
    AuthService,
    AdminJwtStrategy
  ]
})
export class AuthModule {
}
