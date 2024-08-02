import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { JwtModule } from '@nestjs/jwt';
import { UsermanagmentModule } from 'src/usermanagment/usermanagment.module';
import { ClientModule } from 'src/client/client.module';
@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    UsermanagmentModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  exports: [AuthService],
})
export class AuthModule {}
