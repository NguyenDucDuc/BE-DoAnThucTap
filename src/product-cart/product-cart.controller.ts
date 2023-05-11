import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Res } from '@nestjs/common';
import { ProductCartService } from './product-cart.service';
import { CreateProductCartDto } from './dto/create-product-cart.dto';
import { UpdateProductCartDto } from './dto/update-product-cart.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Response } from 'express';

@Controller('product-cart')
export class ProductCartController {
  constructor(
    private productCartService: ProductCartService
    ) {}

    @Post('/')
    @UseGuards(AuthGuard)
    async create(@Body() body: any, @Req() req: any, @Res() res: Response){
      const userId = req.user.userId
      return res.status(200).send({
        status: 200,
        data: await this.productCartService.create(userId, body)
      })
    }

    @Get('/:cartId')
    async getByCartId(@Param() params: any, @Res() res: Response){
      return res.status(200).send({
        status: 200,
        data: await this.productCartService.getByCartId(+params.cartId)
      })
    }

    @Post('/change-quantity')
    async changeQuantity(@Body() body: any, @Res() res: any){
      return res.status(200).send({
        status: 200,
        data: await this.productCartService.changeQuantity(body)
      })
    }

    @Post('/delete')
    async deleteProductCart(@Body() body: any, @Res() res: any){
      return res.status(200).send({
        status: 200,
        data: await this.productCartService.deleteProductCart(body)
      })
    }

}
