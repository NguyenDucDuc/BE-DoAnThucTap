import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CategoryEntity } from 'src/category/entities/category.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity) private productRepository: Repository<ProductEntity>,
    @InjectRepository(CategoryEntity) private categoryRepository: Repository<CategoryEntity>

  ) { }

  async getAll(query: any): Promise<any[]> {
    const page = +query.page
    const limit = +query.limit
    const category = +query.category
    const products = await this.productRepository.find({
      where: {
        category: {
          id: category ? category : null
        }
      },
      take: limit ? limit : 5,
      skip: (page && limit) ? (page - 1) * limit : null,
    })
    return products
  }

  async totalProduct(): Promise<any> {
    try {
      const totalProduct = await this.productRepository.find()
      return totalProduct.length
    } catch (error) {
      console.log(error)
    }
  }

  async getDetail(productId: number) {
    const product = await this.productRepository.findOne({
      where: {
        id: productId
      },
      relations: {
        productCarts: true
      }
    })

    return product
  }

  async addProduct(body: any){
    try {
      const category = await this.categoryRepository.findOne({where: {id: body.category}})
      const newProduct = this.productRepository.create({
        image: body.image,
        name: body.name,
        price: body.price,
        category
      })
      await this.productRepository.save(newProduct)
      return newProduct
    } catch (error) {
      console.log(error)
    }
  }

  async deleteProduct(param: any){
    try {
      await this.productRepository.delete({id: +param.productId})
      return null
    } catch (error) {
      console.log(error)
    }
  }

  async like(param: any, body: any){
    try {
      await this.productRepository.update({id: param.productId}, {like: body.like})
      return null
    } catch (error) {
      console.log(error)
    }
  }
}

// page = 1, size = 5
// [page-1*size, size] => [0, 5] => 
