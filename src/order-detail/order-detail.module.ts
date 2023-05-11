import { Module } from '@nestjs/common';
import { OrderDetailService } from './order-detail.service';
import { OrderDetailController } from './order-detail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetailEntity } from './entities/order-detail.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { ProductEntity } from 'src/product/entities/product.entity';
import { OrderEntity } from 'src/order/entities/order.entity';
import { ProductCartEntity } from 'src/product-cart/entities/product-cart.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderDetailEntity, UserEntity, ProductEntity, OrderEntity, ProductCartEntity])],
  controllers: [OrderDetailController],
  providers: [OrderDetailService]
})
export class OrderDetailModule {}
