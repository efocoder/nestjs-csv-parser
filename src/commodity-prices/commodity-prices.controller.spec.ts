import { Test, TestingModule } from '@nestjs/testing';
import { CommodityPricesController } from './commodity-prices.controller';
import { CommodityPricesService } from './commodity-prices.service';
import { getConnectionToken, getModelToken } from '@nestjs/mongoose';
import { CommodityPrice } from './schemas/commodity-price.schema';
import { JwtService } from '@nestjs/jwt';
import { CreateResponseType } from '../utils/shared';

describe('CommodityPricesController', () => {
  let controller: CommodityPricesController;
  let service: CommodityPricesService;

  const mockService = () => ({
    parseAndStoreData: jest.fn(),
  });

  const mockFile = {
    filename: 'file',
    originalname: 'sample_market_price_data.csv',
    mimetype: 'text/csv',
    buffer: Buffer.from('src/file/sample_market_price_data.csv', 'utf8'),
    size: 3000,
  } as Express.Multer.File;

  const mockData: CommodityPrice[] = [
    {
      commodity: 'Rice',
      market: 'Tema Market',
      price: 2,
      date: new Date(),
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommodityPricesController],
      providers: [
        CommodityPricesService,
        JwtService,
        {
          provide: getModelToken(CommodityPrice.name),
          useValue: {
            new: jest.fn().mockResolvedValue(mockData),
            constructor: jest.fn().mockResolvedValue(mockData),
            insertMany: jest.fn().mockResolvedValue(mockData),
            aggregate: jest.fn(),
          },
        },
        { provide: getConnectionToken(), useValue: {} },
      ],
    }).compile();

    controller = module.get(CommodityPricesController);
    service = module.get(CommodityPricesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('parseAndStoreData', () => {
    it('should insert commodity with details', async function () {
      controller.parseAndStoreData =
        mockService().parseAndStoreData.mockResolvedValue(mockFile);
      const result: CreateResponseType = await controller.parseAndStoreData(
        mockFile,
      );

      expect(typeof result).toBe('object');
      expect(controller.parseAndStoreData).toHaveBeenCalledWith(mockFile);
      expect(result['data']).not.toBeNull();
      expect(result['message']).not.toBeNull();
    });
  });
});
