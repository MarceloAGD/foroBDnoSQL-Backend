import { Injectable } from '@nestjs/common';
import { Users } from '../entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from '../dto/create-user.input';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users) 
        private usersRepository : Repository<Users>,
        ){}

    async findAll(): Promise<Users[]> {
        return this.usersRepository.find();
    }
    
    async findOne(email: string): Promise<Users>{
        return this.usersRepository.findOne({
            where:{
                email,
            }
        })
    }

    async findUserByEmailPassword(email: string, password: string): Promise<Users>{
        return this.usersRepository.findOne({
            where: {
                email,
                password,
            },
        });
    }
    async createUser(user: CreateUserInput): Promise<Users>{
        const newUser = this.usersRepository.create(user)
        return this.usersRepository.save(newUser)
    }
}