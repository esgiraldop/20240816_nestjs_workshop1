import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/dtos/createUser.dto';
import { User } from 'src/entities/user.entities';
import { Repository } from 'typeorm';

@Injectable()
export class getUsersService {
    constructor(@InjectRepository(User) private userRepository:Repository<User>){}

    async getUsers():Promise<User[]>{
        return await this.userRepository.find()
    }

}

@Injectable()
export class createUserService{
    constructor(@InjectRepository(User) private userRepository:Repository<User>){}

    async createUser(userData:CreateUserDto):Promise<User>{
        const newUser = this.userRepository.create(userData)
        return await this.userRepository.save(newUser)
    }
}

@Injectable()
export class UsersService{
    constructor(
        private getUsersService:getUsersService,
        private createUsersService:createUserService
    ){}

    async getUsers():Promise<User[]>{
        return await this.getUsersService.getUsers()
    }

    async createUser(userData:CreateUserDto):Promise<User>{
        return await this.createUsersService.createUser(userData)
    }
}