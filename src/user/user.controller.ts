import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Headers, HttpCode } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller({
    path: 'user',
    version: '1',
})
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }

    @Get()
    findAll(@Query() query: { uuid: string }) {
        console.log(query);

        return this.userService.findAll();
    }

    @Get(':id')
    @HttpCode(500)
    findOne(@Param('id') id: string, @Headers() headers) {
        console.log(headers);

        return this.userService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(+id, updateUserDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.userService.remove(+id);
    }
}
