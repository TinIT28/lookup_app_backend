/* eslint-disable prettier/prettier */
import { Body, Controller, Post, UsePipes, ValidationPipe, Get, UseGuards, Req, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user-dto';
import { GoogleAuthGuard } from './utils/Guards';
import { LoginUserDto } from 'src/user/dto/login-user-dto';
import { User } from 'src/user/schema/user.schema';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @UsePipes(new ValidationPipe())
    @Post('register')
    async registerUser(@Body() user: CreateUserDto): Promise<User | undefined> {
        return this.authService.register(user);
    }


    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() user: LoginUserDto): Promise<{ token: string } | undefined> {
        return this.authService.loginUser(user);
    }

    @Get('google/login')
    @UseGuards(GoogleAuthGuard)
    async handleLogin() {
        return { msg: 'Google Authentication' };
    }

    @Get('google/redirect')
    @UseGuards(GoogleAuthGuard)
    async handleRedirect() {
        return { msg: 'Ok' };
    }

    // @Get('status')
    // user(@Req() req) {
    //     console.log(req.user);
    //     if (req.user) {
    //         return { msg: 'Authenticated' };
    //     } else {
    //         return { msg: 'Not Authenticated' };
    //     }
    // }

}
