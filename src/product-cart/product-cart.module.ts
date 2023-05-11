import { Module } from '@nestjs/common';
import { ProductCartService } from './product-cart.service';
import { ProductCartController } from './product-cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCartEntity } from './entities/product-cart.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { ProductEntity } from 'src/product/entities/product.entity';
import { CartEntity } from 'src/cart/entities/cart.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductCartEntity, UserEntity, ProductEntity, CartEntity])],
  controllers: [ProductCartController],
  providers: [ProductCartService]
})
export class ProductCartModule {}
