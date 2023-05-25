import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { IsDecimal } from 'class-validator';

export type CommodityPriceDocument = HydratedDocument<CommodityPrice>;

@Schema()
export class CommodityPrice {
  @Prop({ required: true })
  commodity: string;

  @Prop({ required: true })
  market: string;

  @IsDecimal({ force_decimal: true, decimal_digits: '2' })
  @Prop({ required: true, type: SchemaTypes.Number })
  price: number;

  @Prop({ required: true })
  date: Date;
}

export const CommodityPriceSchema =
  SchemaFactory.createForClass(CommodityPrice);
