import { Test, TestingModule } from '@nestjs/testing';
import { CommodityPricesController } from './commodity-prices.controller';
import { CommodityPricesService } from './commodity-prices.service';

describe('CommodityPricesController', () => {
  let controller: CommodityPricesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommodityPricesController],
      providers: [CommodityPricesService],
    }).compile();

    controller = module.get<CommodityPricesController>(CommodityPricesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
