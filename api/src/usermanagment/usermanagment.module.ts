import { Module } from '@nestjs/common';
import { UsermanagmentService } from './usermanagment.service';
import { UsermanagmentController } from './usermanagment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usermanagment } from './entities/usermanagment.entity';

@Module({
  controllers: [UsermanagmentController],
  providers: [UsermanagmentService],
  imports:[TypeOrmModule.forFeature([Usermanagment])],
  exports:[UsermanagmentService]
})
export class UsermanagmentModule {}
