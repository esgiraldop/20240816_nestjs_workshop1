import { Test, TestingModule } from '@nestjs/testing';
import { MicrocreditsController } from './microcredits.controller';

describe('MicrocreditsController', () => {
  let controller: MicrocreditsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MicrocreditsController],
    }).compile();

    controller = module.get<MicrocreditsController>(MicrocreditsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
