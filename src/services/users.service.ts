import { Injectable } from '@nestjs/common';
import { Users } from '../entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from '../dto/create-user.input';
import * as bcrypt from 'bcryptjs';

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
        const user = await this.usersRepository.findOne({ where: {email} });
        if (user && (await bcrypt.compare(password, user.password))) {
            return user;
          }
        
          return null;
    }
    
    async createUser(user: CreateUserInput): Promise<Users> {
        const { password, ...userData } = user;
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = this.usersRepository.create({ ...userData, password: hashedPassword });
        newUser.friend= []
        newUser.friendRequest=[]
        return this.usersRepository.save(newUser);
    }
    async getUserByEmail(email: string): Promise<Users> {
        return this.usersRepository.findOne({where: { email }});
      }
}