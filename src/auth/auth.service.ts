import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthReponseDto } from './auth.response.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/entities/users/users.service';
import { compareSync as bcryptCompareSync } from 'bcrypt';
import { ConfigService } from '@nestjs/config';

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

    authenticate(username: string, password: string): AuthReponseDto {
        const foundUser = this.usersService.findByUsername(username);

        if (!foundUser || !bcryptCompareSync(password, foundUser.password)) {
            new UnauthorizedException();
        }

        const payload = { sub: foundUser.id, username: foundUser.username };
        const token = this.jwtService.sign(payload);

        return { token, expiresIn: this.jwtExpirateTimeInSeconds };
    }
}
