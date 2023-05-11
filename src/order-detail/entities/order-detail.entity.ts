import { OrderEntity } from 'src/order/entities/order.entity';
import { ProductEntity } from 'src/product/entities/product.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';

@Entity({
    name: 'orderdetail'
})
export class OrderDetailEntity {
  @PrimaryGeneratedColumn('identity', {
    type: 'int'
  })
  id: number;

  @Column({
    type: 'int',
    nullable: true
  })
  quantity: number;

  @Column({
    type: 'float',
    nullable: true
  })
  price: number;

  @Column({
    type: 'float',
    nullable: true
  })
  totalPrice: number;

  @CreateDateColumn({type: 'date'})
  createdAt: Date

  @ManyToOne(() => OrderEntity, (order) => order.id, {onDelete: 'CASCADE'})
  @JoinColumn({
    name: 'orderId'
  })
  order: OrderEntity

  @ManyToOne(() => ProductEntity, (product) => product.id, {onDelete: 'CASCADE'})
  @JoinColumn({
    name: 'productId'
  })
  product: ProductEntity
}