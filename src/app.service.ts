import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './product/entities/product.entity';
import { Repository } from 'typeorm';
import { UserEntity } from './user/entities/user.entity';
import { CategoryEntity } from './category/entities/category.entity';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(ProductEntity) private productRepo: Repository<ProductEntity>,
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
    @InjectRepository(CategoryEntity) private categoryRepo: Repository<CategoryEntity>

  ) { }
  getHello(): string {
    return 'Hello World!';
  }

  async autoCreateData() {
    const category = await this.categoryRepo.find()
    if (category.length === 0) {
      // create category
      const newCategory1 = this.categoryRepo.create({
        name: 'Máy móc'
      })
      const newCategory2 = this.categoryRepo.create({
        name: 'Thiết bị'
      })
      const newCategory3 = this.categoryRepo.create({
        name: 'Đồ bảo hộ'
      })
      const newCategory4 = this.categoryRepo.create({
        name: 'Vật liệu'
      })
      await this.categoryRepo.save(newCategory1)
      await this.categoryRepo.save(newCategory2)
      await this.categoryRepo.save(newCategory3)
      await this.categoryRepo.save(newCategory4)
      // create product
      const newProduct1 = this.productRepo.create({
        category: newCategory1,
        name: 'Product 1',
        price: 3200000,
        image: 'https://res.cloudinary.com/dlyeizufn/image/upload/v1683722598/havrsttbjgjiv99sdzid.jpg',
        like: 0
      })
      await this.productRepo.save(newProduct1)
      const newProduct2 = this.productRepo.create({
        category: newCategory1,
        name: 'Product 2',
        price: 7800000,
        image: 'https://res.cloudinary.com/dlyeizufn/image/upload/v1683722598/havrsttbjgjiv99sdzid.jpg',
        like: 10
      })
      await this.productRepo.save(newProduct2)
      const newProduct3 = this.productRepo.create({
        category: newCategory1,
        name: 'Product 3',
        price: 2400000,
        image: 'https://res.cloudinary.com/dlyeizufn/image/upload/v1683722598/havrsttbjgjiv99sdzid.jpg',
        like: 0
      })
      await this.productRepo.save(newProduct3)
      const newProduct4 = this.productRepo.create({
        category: newCategory1,
        name: 'Product 4',
        price: 3200000,
        image: 'https://res.cloudinary.com/dlyeizufn/image/upload/v1683722598/havrsttbjgjiv99sdzid.jpg',
        like: 10
      })
      await this.productRepo.save(newProduct4)
      const newProduct5 = this.productRepo.create({
        category: newCategory1,
        name: 'Product 5',
        price: 7600000,
        image: 'https://res.cloudinary.com/dlyeizufn/image/upload/v1683722598/havrsttbjgjiv99sdzid.jpg',
        like: 0
      })
      await this.productRepo.save(newProduct5)
      // create user admin
      const salt = await bcrypt.genSalt(10)
      const hashed = await bcrypt.hash('123', salt)
      const newUserAdmin = this.userRepo.create({
        avatar: 'https://res.cloudinary.com/dlyeizufn/image/upload/v1683722598/havrsttbjgjiv99sdzid.jpg',
        username: 'admin',
        password: hashed,
        fullName: 'Admin system',
        role: 'ADMIN'
      })
      await this.userRepo.save(newUserAdmin)
    }
  }
}
 