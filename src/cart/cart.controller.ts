import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseGuards, Req } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get('/get-detail')
  @UseGuards(AuthGuard)
  async getDetail(@Param() params: any, @Res() res: any, @Req() req: any){
    return res.status(200).send({
      status: 200,
      data: await this.cartService.getDetail(req.user.userId)
    })
  }
 
}
