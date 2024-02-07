import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    getHello(): any {
        return {
            code: 200,
            msg: 'success',
            data: 'Hello World!',
        };
    }
}
