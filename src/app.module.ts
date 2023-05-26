import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Config } from './config/config';
import { UsersModule } from './users/users.module';
import { CommodityPricesModule } from './commodity-prices/commodity-prices.module';

@Module({
  imports: [
    Config,
    MongooseModule.forRoot(process.env.MONGODB_URL),
    UsersModule,
    CommodityPricesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

// `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.1z4rrvt.mongodb.net/?retryWrites=true&w=majority`
