import { ProductEntity } from 'src/product/entities/product.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';

@Entity({
    name: 'comment'
})
export class CommentEntity {
  @PrimaryGeneratedColumn('identity', {
    type: 'int'
  })
  id: number;

  @Column({
    type: 'text',
    nullable: true
  })
  content: string;

  @ManyToOne(() => UserEntity, (user) => user.comments, {onDelete: 'CASCADE', nullable: true})
  @JoinColumn({
    name: 'userId'
  })
  user: UserEntity

  @ManyToOne(() => ProductEntity, (product) => product.comments, {onDelete: 'CASCADE', nullable: true})
  @JoinColumn({
    name: 'productId'
  })
  product: ProductEntity

  @CreateDateColumn()
  createdAt: string;
}