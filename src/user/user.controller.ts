import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
export class UserController {
    constructor(
        private userService: UserService
    ){}

    @Post('/')
    async create(@Body() body: any, @Res() res: Response){
        return res.status(200).send({
            status: 200,
            data: await this.userService.create(body)
        })
    }

    @Get('/current-user')
    @UseGuards(AuthGuard)
    async currentUser(@Req() req: any, @Res() res: any){
        return res.status(200).send({
            status: 200,
            data: await this.userService.currentUser(req.user.userId)
        })
    }

    @Get('/is-admin')
    @UseGuards(AuthGuard)
    async isAdmin(@Req() req: any, @Res() res: any){
        return res.status(200).send({
            status: 200,
            data: await this.userService.isAdmin(req.user.userId)
        })
    }
}
