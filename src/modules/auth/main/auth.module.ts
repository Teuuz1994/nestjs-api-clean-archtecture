import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { UsersModule } from '@/modules/users/main/users.module';
import {
  composeProvidersFactory,
  composeControllersFactory,
} from './factories';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        secret: config.get('JWT_SECRET_KEY'),
        signOptions: {
          expiresIn: config.get('JWT_EXPIRATION_TIME'),
        },
      }),
      inject: [ConfigService],
    }),
    UsersModule,
  ],
  providers: composeProvidersFactory(),
  controllers: composeControllersFactory(),
})
export class AuthModule {}
