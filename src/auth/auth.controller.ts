import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ){}

    @Post('/login')
    async login(@Body() body: any, @Res() res: Response){
        const data =  await this.authService.login(body.username, body.password)
        if(data.message){
            return res.status(400).send({
                status: 400,
                data: [],
                error: data.message
            })
        }
        setTimeout(async () => {
            return res.status(200).send({
                status: 200,
                data: data
            })
        },500)
    }
}
