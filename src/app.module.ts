import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Config } from './config/config';
import { UsersModule } from './users/users.module';
import { CommodityPricesModule } from './commodity-prices/commodity-prices.module';

@Module({
  imports: [
    Config,
    // Having issues with setting up replicas in order the mongoose transaction to work. so used mongodb atlas to save time
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.1z4rrvt.mongodb.net/?retryWrites=true&w=majority`,
    ),
    UsersModule,
    CommodityPricesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
