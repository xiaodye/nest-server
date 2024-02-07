import { Controller, Post, Body, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UploadService } from './upload.service';
import { CreateUploadDto } from './dto/create-upload.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('upload')
export class UploadController {
    constructor(private readonly uploadService: UploadService) {}

    @Post('album')
    @UseInterceptors(FileInterceptor('file'))
    create(@UploadedFile() file: any) {
        console.log('file:', file);

        return {
            data: '上传成功',
        };
    }
}
