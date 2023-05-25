import { IsNotEmpty } from 'class-validator';

export class fetchCommodityDto {
  @IsNotEmpty({ message: 'commodity param is required to filter' })
  commodity: string;

  @IsNotEmpty({ message: 'start_date param is required to filter' })
  start_date: Date;

  @IsNotEmpty({ message: 'end_date param is required to filter' })
  end_date: Date;

  @IsNotEmpty({ message: 'market param is required to filter' })
  market: string;
}
