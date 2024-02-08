import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Headers, HttpCode } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller({
    path: 'user',
    version: '1',
})
@ApiTags('用户接口')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }

    @Get()
    @ApiOperation({ summary: 'GET', description: '获取所有用户' })
    findAll(@Query() query: { uuid: string }) {
        console.log(query);

        return this.userService.findAll();
    }

    /**
     * 查找某个用户
     * @param id 用户的id
     * @param headers 请求头
     * @returns
     */
    @Get(':id')
    @HttpCode(500)
    @ApiParam({ name: 'id', required: true, type: 'int', description: '用户的id' })
    @ApiQuery({ name: 'pageSize', description: '分页参数' })
    @ApiResponse({ status: 200, description: '鸡哥来喽' })
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
