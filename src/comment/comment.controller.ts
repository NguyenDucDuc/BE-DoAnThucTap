import { Body, Controller, Get, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() body: any, @Req() req: any, @Res() res: any){
    return res.status(200).send({
      status: 200,
      data: await this.commentService.create(req.user.userId, body)
    })
  }

  @Get(':productId/get-all')
  async getAll(@Body() body: any, @Param() param: any, @Req() req: any, @Res() res: any){
    return res.status(200).send({
      status: 200,
      data: await this.commentService.getAll(+param.productId)
    })
  }
}
