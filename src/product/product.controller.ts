import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Query, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Response, query } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import { AdminGuard } from 'src/guards/admin.guard';


@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(AuthGuard)
  @Get('/')
  async getAll(@Query() query: any ,@Res() res: Response){
    return res.status(200).send({
      status: 200,
      data: await this.productService.getAll(query)
    })
  }

  @Get('/detail/:productId')
  async getDetail(@Param() params: any, @Res() res: any){
    return res.status(200).send({
      status: 200,
      data: await this.productService.getDetail(+params.productId)
    })
  }

  @Get('/total')
  async getTotalProduct(@Res() res: Response){
    return res.status(200).send({
      status: 200,
      data: await this.productService.totalProduct()
    })
  }

  @Post()
  async create(@Body() body: any, @Res() res: any){
    return res.status(200).send({
      status: 200,
      data: await this.productService.addProduct(body)
    })
  }

  @Post(':productId/delete')
  async delete(@Body() body: any, @Param() param: any, @Res() res: any){
    return res.status(200).send({
      status: 200,
      data: await this.productService.deleteProduct(param)
    })
  }

  
  @Post(':productId/like')
  async like(@Body() body: any, @Param() param: any, @Res() res: any){
    return res.status(200).send({
      status: 200,
      data: await this.productService.like(param, body)
    })
  }
}
