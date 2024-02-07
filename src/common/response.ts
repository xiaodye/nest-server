import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';

interface Data<T> {
    data: T;
}

@Injectable()
export default class Response<T> implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<Data<T>> {
        return next.handle().pipe(
            map((data) => ({
                status: 0,
                data,
                message: 'success',
            })),
        );
    }
}
