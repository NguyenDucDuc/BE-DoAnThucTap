import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, UseGuards } from '@nestjs/common';
import { OrderDetailService } from './order-detail.service';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order-detail.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('order-detail')
export class OrderDetailController {
  constructor(private readonly orderDetailService: OrderDetailService) {}

  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() body: any, @Req() req: any, @Res() res: any) {
    const userId = req.user.userId
    return res.status(200).send({
      status: 200,
      data: await this.orderDetailService.create(userId, body)
    })
  }

  @Get('/stats-total-price')
  async statsTotalPrice(@Body() body: any, @Req() req: any, @Res() res: any){
    return res.status(200).send({
      status: 200,
      data: await this.orderDetailService.statsTotalPrice()
    })
  }

  @Get()
  findAll() {
    return this.orderDetailService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderDetailService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDetailDto: UpdateOrderDetailDto) {
    return this.orderDetailService.update(+id, updateOrderDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderDetailService.remove(+id);
  }
}
