/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user-dto';
import { User } from 'src/user/schema/user.schema';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(private userService: UserService) { }

    async register(user: CreateUserDto): Promise<User> {
        return await this.userService.create(user);
    }
}
