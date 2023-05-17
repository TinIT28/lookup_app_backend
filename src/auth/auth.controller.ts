/* eslint-disable prettier/prettier */
import { Body, Controller, Post, UsePipes, ValidationPipe, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user-dto';
import { LoginUserDto } from 'src/user/dto/login-user-dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @UsePipes(new ValidationPipe())
    @Post('/register')
    async registerUser(@Body() user: CreateUserDto): Promise<{ token: string }> {
        return this.authService.register(user);
    }

    @Get('/login')
    async loginUser(@Body() user: LoginUserDto): Promise<{ token: string }> {
        return this.authService.login(user)
    }
}
