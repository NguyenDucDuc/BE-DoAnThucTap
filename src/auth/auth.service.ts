import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
        private jwtService: JwtService
    ) { }

    async login(username: string, passwordB: string): Promise<any> {
        const user = await this.userRepository.findOne({
            where: {
                username: username
            }
        })
        if (user) {
            const validPassword = await bcrypt.compare(passwordB, user.password)
            console.log(validPassword)
            if (validPassword) {
                const payload = { userId: user.id, username: user.username, sub: user.id };
                return {
                    ...user,
                    access_token: await this.jwtService.signAsync(payload),
                };
            } else {
                throw new UnauthorizedException()
            }
        }else {
            return {message: 'Tài khoản không chính xác!!!'}
        }

    }
}
