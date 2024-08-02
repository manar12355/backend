import { Test, TestingModule } from '@nestjs/testing';
import { UsermanagmentController } from './usermanagment.controller';
import { UsermanagmentService } from './usermanagment.service';

describe('UsermanagmentController', () => {
  let controller: UsermanagmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsermanagmentController],
      providers: [UsermanagmentService],
    }).compile();

    controller = module.get<UsermanagmentController>(UsermanagmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
