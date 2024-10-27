import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserDto } from './dto/users.dto';
import { v4 as uuid } from 'uuid';
import { hashSync as bcryptHashSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Users } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users) private readonly userRepository: Repository<Users>
    ) { }

    async create(newUser: Users): Promise<Users> {
        newUser.id = uuid();
        newUser.password = bcryptHashSync(newUser.password, 10);
        return await this.userRepository.save(newUser);
        console.log(newUser);
    }

    async findByUsername(username: string): Promise<Users[]> {
        return await this.userRepository.find({ where: { username: username } }).then((found) => found);
    }

    async findAll(): Promise<Users[]> {
        return await this.userRepository.find();
    }
}
