import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import * as session from 'express-session';
import * as cors from 'cors';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'node:path/posix';
import Response from './common/response';
import HttpFilter from './common/filter';
// import { RoleGuard } from './guard/role/role.guard';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    // swagger
    const options = new DocumentBuilder()
        .setTitle('小然的 swagger 接口文档')
        .setDescription('接口描述')
        .setVersion('1')
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('/api-docs', app, document);

    app.use(cors()); // 全局中间价
    app.useStaticAssets(join(__dirname, 'images'), { prefix: '/static' }); // 托管静态文件
    app.enableVersioning({
        type: VersioningType.URI,
    });
    app.use(session({ secret: 'xiaodye', rolling: true })); // 全局中间价
    app.useGlobalInterceptors(new Response()); // 全局适配器
    app.useGlobalFilters(new HttpFilter()); // 全局过滤器
    // app.useGlobalGuards(new RoleGuard()); // 全局守卫

    await app.listen(3114);
}

bootstrap();
