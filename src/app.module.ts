import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { OrderDetailModule } from './order-detail/order-detail.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user/entities/user.entity';
import { ProductEntity } from './product/entities/product.entity';
import { OrderEntity } from './order/entities/order.entity';
import { OrderDetailEntity } from './order-detail/entities/order-detail.entity';
import { CategoryEntity } from './category/entities/category.entity';
import { AuthModule } from './auth/auth.module';
import { CartModule } from './cart/cart.module';
import { ProductCartModule } from './product-cart/product-cart.module';
import { CartEntity } from './cart/entities/cart.entity';
import { ProductCartEntity } from './product-cart/entities/product-cart.entity';
import { CommentModule } from './comment/comment.module';
import { CommentEntity } from './comment/entities/comment.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '25251525',
      database: 'salemachine',
      entities: [UserEntity, ProductEntity, OrderEntity, OrderDetailEntity, CategoryEntity, CartEntity, ProductCartEntity, CommentEntity],
      synchronize: true,
    }),
    UserModule,
    CategoryModule, 
    ProductModule,  
    OrderModule, 
    OrderDetailModule, AuthModule, CartModule, ProductCartModule, CommentModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
