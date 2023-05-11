import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCartEntity } from 'src/product-cart/entities/product-cart.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { ProductEntity } from 'src/product/entities/product.entity';
import { OrderEntity } from 'src/order/entities/order.entity';
import { CommentEntity } from './entities/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductCartEntity, UserEntity, ProductEntity, OrderEntity, CommentEntity])],
  controllers: [CommentController],
  providers: [CommentService]
})
export class CommentModule {}
