import { Test, TestingModule } from '@nestjs/testing';
import { CommodityPricesService } from './commodity-prices.service';

describe('CommodityPricesService', () => {
  let service: CommodityPricesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommodityPricesService],
    }).compile();

    service = module.get<CommodityPricesService>(CommodityPricesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
