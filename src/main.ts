import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  BadRequestException,
  ValidationError,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { formatError } from './utils/shared';
import { TransformInterceptor } from './utils/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.setGlobalPrefix('api');

  app.useGlobalInterceptors(new TransformInterceptor());

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors: ValidationError[]) =>
        new BadRequestException(formatError(errors)),
    }),
  );

  app.enableVersioning({
    type: VersioningType.URI,
  });

  await app.listen(+process.env.PORT || 3000);
}

bootstrap();
