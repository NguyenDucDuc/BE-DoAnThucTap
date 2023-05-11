import { OrderDetailEntity } from 'src/order-detail/entities/order-detail.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

@Entity({
    name: 'order'
})
export class OrderEntity {
  @PrimaryGeneratedColumn('identity', {
    type: 'int'
  })
  id: number;

  @CreateDateColumn({type: 'date'})
  createdAt: Date;

  @UpdateDateColumn({type: 'date'})
  updatedAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.id)
  @JoinColumn({
    name: 'userId'
  })
  user: UserEntity

  @OneToMany(() => OrderDetailEntity, (orderDetail) => orderDetail.order)
  orderDetails: OrderDetailEntity[]
}