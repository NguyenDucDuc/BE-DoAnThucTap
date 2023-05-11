import { CartEntity } from 'src/cart/entities/cart.entity';
import { ProductEntity } from 'src/product/entities/product.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity({
    name: 'productcart'
})
export class ProductCartEntity {
  @PrimaryGeneratedColumn('identity', {
    type: 'int'
  })
  id: number;

  @Column({
    nullable: true,
    type: 'int'
  })
  quantity: number;

  @Column({
    nullable: true,
    type: 'float'
  })
  price: number;

  @ManyToOne(() => ProductEntity, (product) => product.id)
  @JoinColumn({
    name: 'productId'
  })
  product: ProductEntity

  @ManyToOne(() => CartEntity, (cart) => cart.id)
  @JoinColumn({
    name: 'cartId'
  })
  cart: CartEntity
}
