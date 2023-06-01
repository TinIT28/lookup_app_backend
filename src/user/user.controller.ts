/* eslint-disable prettier/prettier */
import { Controller, Get, Request, Res, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';
import { JwtGuard } from 'src/auth/utils/JwtGuard';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @UseGuards(JwtGuard)
    @Get()
    async getUserDetail(@Request() req, @Res() res: Response) {
        try {
            const user = await this.userService.findUserById(req.user._id);
            res.status(200).json(user)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

}
