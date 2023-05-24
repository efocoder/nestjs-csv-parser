import { ConfigModule } from '@nestjs/config';

export const Config = ConfigModule.forRoot({
  envFilePath: ['.env'],
});
