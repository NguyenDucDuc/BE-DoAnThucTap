import { CommentEntity } from "src/comment/entities/comment.entity";
import { OrderEntity } from "src/order/entities/order.entity";
import { ProductCartEntity } from "src/product-cart/entities/product-cart.entity";
import { ProductEntity } from "src/product/entities/product.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";



@Entity({
    name: 'user'
})
export class UserEntity {
  @PrimaryGeneratedColumn('identity', {
    type: 'int'
  })
  id: number;

  @Column({
    type: 'text',
    nullable: true
  })
  fullName: string;

  @Column({
    type: 'text',
    nullable: true
  })
  username: string;

  @Column({
    type: 'text',
    nullable: true
  })
  password: string;

  @Column({
    type: 'text',
    nullable: true
  })
  avatar: string;

  @Column({
    type: 'text',
    nullable: true
  })
  role: string;

  @OneToMany(() => ProductEntity, (product) => product.user, {onDelete: 'CASCADE', nullable: true})
  products: ProductEntity[]

  @OneToMany(() => OrderEntity, (order) => order.user, {onDelete: 'CASCADE', nullable: true})
  orders: OrderEntity[]

  @OneToMany(() => CommentEntity, (comment) => comment.user, {onDelete: 'CASCADE', nullable: true})
  comments: CommentEntity[]
}