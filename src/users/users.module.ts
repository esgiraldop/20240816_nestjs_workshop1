import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entities';
import { createUserService, getUsersService, UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UsersController],
    providers: [UsersService, getUsersService, createUserService]
})
export class UsersModule {};
