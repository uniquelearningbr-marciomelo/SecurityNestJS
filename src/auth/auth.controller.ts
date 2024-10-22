import { Body, Controller, Post } from '@nestjs/common';
import { AuthReponseDto } from './auth.response.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post()
    signIn(
        @Body('username') username: string,
        @Body('password') password: string
    ):AuthReponseDto {
        return this.authService.authenticate(username, password);
    }
}
