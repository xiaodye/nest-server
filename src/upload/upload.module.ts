import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'node:path';

@Module({
    imports: [
        MulterModule.register({
            storage: diskStorage({
                destination: join(__dirname, '../images'),
                filename: (_, file, callback) => {
                    const filename = `${new Date().getTime() + extname(file.originalname)}`;
                    return callback(null, filename);
                },
            }),
        }),
    ],
    controllers: [UploadController],
    providers: [UploadService, MulterModule],
})
export class UploadModule {}
