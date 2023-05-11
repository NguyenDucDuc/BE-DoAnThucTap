import { ProductEntity } from 'src/product/entities/product.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity({
    name: 'category'
})
export class CategoryEntity {
  @PrimaryGeneratedColumn('identity', {
    type: 'int'
  })
  id: number;

  @Column({
    type: 'text',
    nullable: true
  })
  name: string;

  @OneToMany(() => ProductEntity, (product) => product.category)
  products: ProductEntity[]
}