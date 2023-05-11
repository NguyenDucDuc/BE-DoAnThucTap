import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { CartEntity } from 'src/cart/entities/cart.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, CartEntity])],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}
