import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/user/entities/user.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity) private orderRepository: Repository<OrderEntity>,
    @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
  ){}
  async create(userId:number) {
    try {
      const user = await this.userRepository.findOne({where: {id: userId}})
      const newOrder = this.orderRepository.create({user})
      await this.orderRepository.save(newOrder)
      return newOrder
    } catch (error) {
      console.log(error)
    }
  }

  

  findAll() {
    return `This action returns all order`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
