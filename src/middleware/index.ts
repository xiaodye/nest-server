import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class Logger implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        console.log('自定义中间件');
        next();
    }
}
