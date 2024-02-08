import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import UserModule from './user/user.module';
import { ConfigModule } from './config/config.module';
import { UploadModule } from './upload/upload.module';
import { GuardModule } from './guard/guard.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'node:path/posix';
import { AuthorModule } from './author/author.module';

@Module({
    imports: [
        UserModule,
        ConfigModule,
        UploadModule,
        GuardModule,
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: '267845967',
            database: 'nest-serve',
            entities: [__dirname + '/../../car.entity{.ts,.js}'],
            synchronize: true,
            retryDelay: 500,
            autoLoadEntities: true, // 自动加载实体
        }),
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
            sortSchema: true,
        }),
        AuthorModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
