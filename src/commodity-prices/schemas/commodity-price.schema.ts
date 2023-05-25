import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { IsDecimal } from 'class-validator';

export type CommodityPriceDocument = HydratedDocument<CommodityPrice>;

@Schema()
export class CommodityPrice {
  @Prop({ required: true })
  commodity: string;

  @Prop({ required: true })
  market: string;

  @IsDecimal({ force_decimal: true, decimal_digits: '2' })
  @Prop({ required: true, type: Types.Decimal128 })
  price: Types.Decimal128;

  @Prop({ required: true })
  date: Date;
}

export const CommodityPriceSchema =
  SchemaFactory.createForClass(CommodityPrice);
