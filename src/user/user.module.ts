import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { LoggerMiddleware } from 'src/middleware/logger/logger.middleware';

@Module({
    controllers: [UserController],
    providers: [UserService],
})
export default class UserModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(LoggerMiddleware)
            // .forRoutes({ path: '/user', version: '1', method: RequestMethod.GET | RequestMethod.POST });
            .forRoutes('/v1/user');
    }
}
