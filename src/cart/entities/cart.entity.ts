import { ProductCartEntity } from 'src/product-cart/entities/product-cart.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

@Entity({
    name: 'cart'
})
export class CartEntity {
  @PrimaryGeneratedColumn('identity', {
    type: 'int'
  })
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.id )
  @JoinColumn({
    name: 'userId'
  })
  user: UserEntity

  @OneToMany(() => ProductCartEntity, (productCart) => productCart.cart)
  productCarts: ProductCartEntity[]
}