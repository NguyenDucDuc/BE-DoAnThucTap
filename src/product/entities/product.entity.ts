import { CategoryEntity } from 'src/category/entities/category.entity';
import { CommentEntity } from 'src/comment/entities/comment.entity';
import { OrderDetailEntity } from 'src/order-detail/entities/order-detail.entity';
import { ProductCartEntity } from 'src/product-cart/entities/product-cart.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity({
    name: 'product'
})
export class ProductEntity {
  @PrimaryGeneratedColumn('identity', {
    type: 'int'
  })
  id: number;

  @Column({
    type: 'text',
    nullable: true
  })
  name: string;

  @Column({
    type: 'float',
    nullable: true
  })
  price: number;

  @Column({
    type: 'text',
    nullable: true
  })
  image: string;

  @Column({
    type: 'int',
    nullable: true,
    default: 0
  })
  like: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.id, {onDelete: 'CASCADE'})
  @JoinColumn({
    name: 'userId'
  })
  user: number;

  @ManyToOne(() => CategoryEntity, (category) => category.id, {onDelete: 'CASCADE'})
  @JoinColumn({
    name: 'categoryId'
  })
  category: CategoryEntity;

  @OneToMany(() => OrderDetailEntity, (orderDetail) => orderDetail.product, {onDelete: 'CASCADE', nullable: true})
  orderDetails: OrderDetailEntity[];

  @OneToMany(() => ProductCartEntity, (productCart) => productCart.product,{onDelete: 'CASCADE', nullable: true})
  productCarts: ProductCartEntity[]

  @OneToMany(() => CommentEntity, (comment) => comment.product,{onDelete: 'CASCADE', nullable: true})
  comments: CommentEntity[]
}