import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/users.dto';
import { v4 as uuid } from 'uuid';
import { hashSync as bcryptHashSync } from 'bcrypt';

@Injectable()
export class UsersService {

    private readonly users: UserDto[] = [
        {
            username: 'teste',
            password: '$2b$10$ofKXa2XHvSw2LlUXHLkpeu7fxAenFk48iEy1s1QgMm1aapLq/tk56',
            id: 'c2a6c015-bb42-4ab2-9c4e-ed15b1297d33'
        }
    ]

    create(userDto: UserDto) {
        userDto.id = uuid();
        userDto.password = bcryptHashSync(userDto.password, 10);
        this.users.push(userDto);
        console.log(this.users);
    }

    findByUsername(username: string): UserDto | null{
        return this.users.find(user => user.username === username);
    }

    findAll(): UserDto[] {  
        return this.users;
    }
}
