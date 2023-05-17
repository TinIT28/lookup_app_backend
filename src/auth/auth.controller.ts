/* eslint-disable prettier/prettier */
import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user-dto';
import { User } from 'src/user/schema/user.schema';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @UsePipes(new ValidationPipe())
    @Post('/register')
    async registerUser(@Body() user: CreateUserDto): Promise<User> {
        return this.authService.register(user);
    }
}
