import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from 'src/dtos/createUser.dto';

@Controller('users')
export class UsersController {
    constructor(private userService:UsersService){}

    @Get()
    async getUsers(){
        return this.userService.getUsers()
    }

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto){
        return this.userService.createUser(createUserDto)
    }
}
