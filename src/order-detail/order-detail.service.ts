import { Injectable } from '@nestjs/common';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order-detail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDetailEntity } from './entities/order-detail.entity';
import { Repository } from 'typeorm';
import { OrderEntity } from 'src/order/entities/order.entity';
import { ProductEntity } from 'src/product/entities/product.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { ProductCartEntity } from 'src/product-cart/entities/product-cart.entity';

@Injectable()
export class OrderDetailService {
  constructor(
  @InjectRepository(OrderDetailEntity) private orderDetailRepository: Repository<OrderDetailEntity>,
  @InjectRepository(OrderEntity) private orderRepository: Repository<OrderEntity>,
  @InjectRepository(ProductEntity) private productRepository: Repository<ProductEntity>,
  @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
  @InjectRepository(ProductCartEntity) private productCartRepository: Repository<ProductCartEntity>,


  ){
    
  }
  async create(userId: number, body: any) {
    try {
      const order = await this.orderRepository.findOne({where: {id: body.orderId}})
      const user = await this.userRepository.findOne({where: {id: userId}})
      const product = await this.productRepository.findOne({where: {id: body.productId}})
      const newOrderDetail = this.orderDetailRepository.create({
        order: order,
        price: body.price,
        product,
        quantity: body.quantity,
        totalPrice: body.totalPrice
      })
      await this.orderDetailRepository.save(newOrderDetail)
      // xóa sản phẩm trong product cart
      await this.productCartRepository.delete({product: {id: body.productId}})
      return newOrderDetail
    } catch (error) {
      console.log(error)
    }
  }

  async statsTotalPrice(){
    try {
      const res: any[] = await this.orderDetailRepository.query(
        `select extract(month from "createdAt") as month, sum("totalPrice") as "total"
        from orderdetail
        group by extract(month from "createdAt")  
        `
      )
        const stats = []
      for(let i=1; i<=12; i++){
        const findItem = res.find((item) => item.month === i)
        const newObj = {
          month: i,
          total: findItem ? findItem.total : 0
        }
        stats.push(newObj)
      }
      return stats
    } catch (error) {
      console.log(error)
    }
  }

  findAll() {
    return `This action returns all orderDetail`;
  }

  findOne(id: number) {
    return `This action returns a #${id} orderDetail`;
  }

  update(id: number, updateOrderDetailDto: UpdateOrderDetailDto) {
    return `This action updates a #${id} orderDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} orderDetail`;
  }
}
