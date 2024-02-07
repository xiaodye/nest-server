import { Controller, Get, HttpCode, Req } from '@nestjs/common';
import { AppService } from './app.service';
import * as svgCaptcha from 'svg-captcha';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get('hello')
    getHello(): string {
        return this.appService.getHello();
    }

    @Get('code')
    @HttpCode(200)
    createCode(@Req() req: any) {
        const captcha = svgCaptcha.create({
            size: 4,
            fontSize: 50,
            width: 100,
            height: 34,
            background: '#cc9966',
        });

        // req.type('image/svg+xml');
        // req.send(captcha.data);

        return {
            code: 200,
            msg: 'SUCCESS',
            data: captcha.data,
        };
    }
}
