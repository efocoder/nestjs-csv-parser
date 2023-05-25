import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  ParseFilePipeBuilder,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CommodityPricesService } from './commodity-prices.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { createResponse } from '../utils/shared';
import { fetchCommodityDto } from './dto/create-commodity-price.dto';

@Controller({ path: 'commodities', version: '1' })
export class CommodityPricesController {
  constructor(
    private readonly commodityPricesService: CommodityPricesService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async parseAndStoreData(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'csv',
        })
        .addMaxSizeValidator({
          maxSize: 10 * 1024 * 1024, //10MB
        })
        .build({
          fileIsRequired: true,
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
  ) {
    return createResponse(
      HttpStatus.OK,
      await this.commodityPricesService.parseAndStoreData(file),
    );
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  async findCommodities(@Query() filter: fetchCommodityDto) {
    return createResponse(
      HttpStatus.OK,
      'Request successful',
      await this.commodityPricesService.findCommodities(filter),
    );
  }
}
