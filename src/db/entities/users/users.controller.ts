import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/users.dto';
import { Users } from './users.entity';
import { response } from 'express';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) { }

    @Get(':username')
    async findByUsername(@Res() response, @Param('username') username: string): Promise<Users[]> {
        const user = await this.userService.findByUsername(username);
        return response.status(200).json(user);
    }


    @Get()
    async findAll(@Res() response,): Promise<Users[]> {
        const users = await this.userService.findAll();
        return response.status(200).json(users);;
    }

    @Post()
    async create(@Res() response, @Body() userDto: UserDto) {
        return await this.userService.create(userDto);
    }
}
