import { Controller, Post, UseInterceptors, UploadedFile, Get, Res } from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { join } from 'node:path/posix';
import { zip } from 'compressing';

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

    @Get('download')
    downloadFile(@Res() res: Response) {
        const url = join(__dirname, '../images/1707313785398.jpg');
        res.download(url);
    }

    @Get('stream')
    async downloadFileWithStream(@Res() res: Response) {
        const url = join(__dirname, '../images/1707313785398.jpg');
        const tarStream = new zip.Stream();
        await tarStream.addEntry(url);
        res.setHeader('Content-Type', 'application/octet-stream');
        res.setHeader('Content-Disposition', 'attachment, filename=xiaodye');
        tarStream.pipe(res);
    }
}
