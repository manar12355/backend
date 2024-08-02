import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { client } from './entities/client.entity';
client
@Module({
  controllers: [ClientController],
  providers: [ClientService],
  imports: [TypeOrmModule.forFeature([client])],
})
export class ClientModule {}
