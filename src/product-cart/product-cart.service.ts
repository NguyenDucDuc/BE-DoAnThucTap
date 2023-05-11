import { Injectable } from '@nestjs/common';
import { CreateProductCartDto } from './dto/create-product-cart.dto';
import { UpdateProductCartDto } from './dto/update-product-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductCartEntity } from './entities/product-cart.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { ProductEntity } from 'src/product/entities/product.entity';
import { CartEntity } from 'src/cart/entities/cart.entity';

@Injectable()
export class ProductCartService {
  constructor(
    @InjectRepository(ProductCartEntity) private productCartRepository: Repository<ProductCartEntity>,
    @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
    @InjectRepository(ProductEntity) private productRepository: Repository<ProductEntity>,
    @InjectRepository(CartEntity) private cartRepository: Repository<CartEntity>,
  ) {

  }

  async create(userId: number, body: any): Promise<any> {
    const cart = await this.cartRepository.findOne({
      where: {
        user: {
          id: userId
        }
      }
    })

    if (!cart) return

    const product = await this.productRepository.findOne({
      where: {
        id: (+body.productId)
      }
    })

    if (!product) return

    const existProductCartItem = await this.productCartRepository.findOne({
      where: {
        product: {
          id: product.id
        },
        cart: {
          id: cart.id
        }
      },
      relations: {
        product: true
      }
    })

    if (existProductCartItem) {
      existProductCartItem.quantity += +body.quantity
      await this.productCartRepository.save(existProductCartItem)
      return existProductCartItem
    } else {
      const newProductCart = this.productCartRepository.create({
        price: product.price,
        quantity: body.quantity,
        cart: cart,
        product: product
      })
      await this.productCartRepository.save(newProductCart)
      return newProductCart
    }
  }

  async getByCartId(cartId: number) {
    const productCarts = await this.productCartRepository.find({
      where: {
        cart: {
          id: cartId
        }
      },
      relations: {
        product: true
      }
    })

    let totalProduct = 0
    let totalPrice = 0
    await Promise.all(productCarts.map(item => {
      totalProduct += item.quantity
      totalPrice += item.quantity * item.price
    }))

    return {productCarts, totalProduct, totalPrice}
  }

  async changeQuantity(body: any){
    
    const productCart = await this.productCartRepository.findOne({
      where: {
        product: {
          id: body.productId
        },
        cart: {
          id: body.cartId
        }
      }
    })
    await this.productCartRepository.update({product: {id: body.productId}, cart: {id: body.cartId}}, {quantity: body.quantity})
    const newProductCart = await this.productCartRepository.findOne({where: {id: productCart.id}, relations: {product: true, cart: true}})
    return newProductCart
  }

  async deleteProductCart(body: any){
    
    const productCart = await this.productCartRepository.findOne({
      where: {
        product: {
          id: body.productId
        },
        cart: {
          id: body.cartId
        }
      },
      relations: {
        product: true,
      },
      select: {
        id: true,
        price: true,
      }
    })

    const id = productCart.id
    await this.productCartRepository.remove(productCart)
    return {
      ...productCart,
      id: id
    }
  }
}
