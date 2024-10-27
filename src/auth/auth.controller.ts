import { Body, Controller, Post } from '@nestjs/common';
import { AuthReponseDto } from './auth.response.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async signIn(
        @Body('username') username: string,
        @Body('password') password: string
    ):Promise<AuthReponseDto> {
        return await this.authService.authenticate(username, password);
    }
}
