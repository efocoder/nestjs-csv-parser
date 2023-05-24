import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map } from 'rxjs';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(map((data) => data));
  }
}

// export class TransformInterceptor implements NestInterceptor {
//   intercept(context: ExecutionContext, next: CallHandler<any>) {
//     return next
//       .handle()
//       .pipe(map((data) => instanceToPlain(data, { ignoreDecorators: false })));
//   }
// }
