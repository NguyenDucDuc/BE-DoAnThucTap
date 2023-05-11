import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CartEntity } from './entities/cart.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity) private cartRepository: Repository<CartEntity>,
  ){}

  async getDetail(userId: number){
    const cart = await this.cartRepository.findOne({
      where: {
        user: {
          id: userId
        }
      }
    })
    return cart
  }
}
