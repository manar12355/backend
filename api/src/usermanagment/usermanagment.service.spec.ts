import { Test, TestingModule } from '@nestjs/testing';
import { UsermanagmentService } from './usermanagment.service';

describe('UsermanagmentService', () => {
  let service: UsermanagmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsermanagmentService],
    }).compile();

    service = module.get<UsermanagmentService>(UsermanagmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
