import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { ProductCartEntity } from 'src/product-cart/entities/product-cart.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartEntity } from './entities/cart.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductCartEntity, CartEntity])],
  controllers: [CartController],
  providers: [CartService]
})
export class CartModule {}
