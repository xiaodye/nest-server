import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import * as session from 'express-session';
import * as cors from 'cors';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.use(cors());
    app.enableVersioning({
        type: VersioningType.URI,
    });
    app.use(session({ secret: 'xiaodye', rolling: true }));
    await app.listen(3114);
}

bootstrap();
