import { Module } from '@nestjs/common';
import { CommodityPricesService } from './commodity-prices.service';
import { CommodityPricesController } from './commodity-prices.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CommodityPrice,
  CommodityPriceSchema,
} from './schemas/commodity-price.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CommodityPrice.name, schema: CommodityPriceSchema },
    ]),
  ],
  controllers: [CommodityPricesController],
  providers: [CommodityPricesService],
})
export class CommodityPricesModule {}
