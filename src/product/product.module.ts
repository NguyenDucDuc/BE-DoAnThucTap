import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCartEntity } from 'src/product-cart/entities/product-cart.entity';
import { ProductEntity } from './entities/product.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { CartEntity } from 'src/cart/entities/cart.entity';
import { CategoryEntity } from 'src/category/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductCartEntity, UserEntity, ProductEntity, CartEntity, CategoryEntity])],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}
