import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'
import { CartEntity } from 'src/cart/entities/cart.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
        @InjectRepository(CartEntity) private cartRepository: Repository<CartEntity>
    ){}

    async create(body: any): Promise<any>{
        const salt = await bcrypt.genSalt(10)
        const hashed = await bcrypt.hash(body.password, salt)
        const user = this.userRepository.create({
            fullName: body.fullName,
            username: body.username,
            password: hashed,
            role: "USER",
            avatar: body.avatar
        })
        
        await this.userRepository.save(user)

        const newCart = this.cartRepository.create({
            user: user
        })
        await this.cartRepository.save(newCart)
        return user
    }

    async currentUser(userId: number){
        const user = await this.userRepository.findOne({
            where: {
                id: userId
            }
        })

        return user
    }

    async isAdmin(userId: number){
        const user = await this.userRepository.findOne({
            where: {id: userId}
        })
        if(user.role === "ADMIN")
            return true
        return false
    }
    
}
