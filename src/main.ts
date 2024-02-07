import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import * as session from 'express-session';
import * as cors from 'cors';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'node:path/posix';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.use(cors());
    app.useStaticAssets(join(__dirname, 'images'), { prefix: '/static' });
    app.enableVersioning({
        type: VersioningType.URI,
    });
    app.use(session({ secret: 'xiaodye', rolling: true }));
    await app.listen(3114);
}

bootstrap();
