import { Injectable, Logger } from '@nestjs/common';
import { parse } from 'csv-parse';

import { CommodityPrice } from './schemas/commodity-price.schema';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { fetchCommodityDto } from './dto/create-commodity-price.dto';
import { formatDate, validateDates } from '../utils/shared';

@Injectable()
export class CommodityPricesService {
  private readonly logger = new Logger(CommodityPricesService.name);
  private commodities = [];

  constructor(
    @InjectModel(CommodityPrice.name)
    private commodityModel: Model<CommodityPrice>,
    @InjectConnection() private readonly connection: mongoose.Connection,
  ) {}

  async parseAndStoreData(file: Express.Multer.File) {
    // Read csv and create an array of CommodityPrice objects
    try {
      const columns = ['commodity', 'market', 'price', 'date'];

      parse(
        file.buffer,
        {
          delimiter: ',',
          columns: columns,
          fromLine: 2,
          cast: (value, context) => {
            if (context.column === 'date') return new Date(value);

            return value;
          },
        },
        async (error, results: CommodityPrice[]) => {
          if (error) {
            this.logger.error(error);
          }
          await this.storeInDb(results);
        },
      );
      return 'Request is been processed...';
    } catch (e) {
      this.logger.error(e);
    }
  }

  async findCommodities(filter: fetchCommodityDto) {
    const { commodity, market, start_date, end_date } = filter;
    validateDates(formatDate(start_date), formatDate(end_date));
    try {
      return await this.commodityModel.aggregate([
        {
          $match: {
            commodity: {
              $regex: `^${commodity}$`,
              $options: 'i',
            },
            market: { $regex: `^${market}$`, $options: 'i' },
            date: {
              $gte: formatDate(start_date),
              $lte: formatDate(end_date),
            },
          },
        },
        {
          $group: {
            _id: commodity,
            average_price: { $avg: '$price' },
          },
        },
        {
          $project: {
            _id: 0,
            commodity: commodity,
            market: market,
            average_price: '$average_price',
            start_start: start_date,
            end_date: end_date,
          },
        },
      ]);
    } catch (e) {
      this.logger.error(e);
    }
  }

  private async storeInDb(commodities: CommodityPrice[]) {
    const session = await this.connection.startSession();
    session.startTransaction();
    try {
      const results = await this.commodityModel.insertMany(commodities, {
        session,
      });
      await session.commitTransaction();

      return results;
    } catch (e) {
      this.logger.error(e);
      await session.abortTransaction();
    } finally {
      await session.endSession();
    }
  }
}
