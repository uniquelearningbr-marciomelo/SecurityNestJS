import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthReponseDto } from './auth.response.dto';
import { JwtService } from '@nestjs/jwt';
import { compareSync as bcryptCompareSync } from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/db/entities/users/users.service';

@Injectable()
export class AuthService {
    private jwtExpirateTimeInSeconds: number;

    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) {
        this.jwtExpirateTimeInSeconds = +this.configService.get<string>('JWT_EXPIRES_IN');
    }

    async authenticate(username: string, password: string): Promise<AuthReponseDto> {
        const users = await this.usersService.findByUsername(username);
        const foundUser = users[0];
        
        if (!foundUser || !bcryptCompareSync(password, foundUser.password)) {
            throw new UnauthorizedException();
        }

        const payload = { sub: foundUser.id, username: foundUser.username };
        const token = this.jwtService.sign(payload);

        return { token, expiresIn: this.jwtExpirateTimeInSeconds };
    }
}
