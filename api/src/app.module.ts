import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { UsermanagmentModule } from './usermanagment/usermanagment.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ClientModule } from './client/client.module';

@Module({
  imports: [UserModule, UsermanagmentModule, TypeOrmModule.forRootAsync({
    useFactory: () => ({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'test',
      autoLoadEntities: true,
      synchronize:true,
    }),
  }),
ConfigModule.forRoot(),UserModule,UsermanagmentModule, AuthModule,ClientModule
],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule {}
