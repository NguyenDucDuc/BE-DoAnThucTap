import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCartEntity } from 'src/product-cart/entities/product-cart.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { ProductEntity } from 'src/product/entities/product.entity';
import { OrderEntity } from './entities/order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductCartEntity, UserEntity, ProductEntity, OrderEntity])],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule {}
