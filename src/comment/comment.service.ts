import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from './entities/comment.entity';
import { Repository } from 'typeorm';
import { ProductEntity } from 'src/product/entities/product.entity';
import { UserEntity } from 'src/user/entities/user.entity';

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(CommentEntity) private commentRepository: Repository<CommentEntity>,
        @InjectRepository(ProductEntity) private productEntity: Repository<ProductEntity>,
        @InjectRepository(UserEntity) private userEntity: Repository<UserEntity>

    ){}

    async create(userId: number, body: any){
        try {
            const product = await this.productEntity.findOne({
                where: {id: +body.productId}
            })
            const user = await this.userEntity.findOne({
                where: {id: userId}
            })
            const newComment = this.commentRepository.create({
                content: body.content,
                product,
                user
            })
            await this.commentRepository.save(newComment)
            return newComment
        } catch (error) {
            console.log(error)
        }
    }

    async getAll(productId: number){
        try {
            const listComment = await this.commentRepository.find({
                where: {product: {id: productId}},
                relations: {
                    user: true
                }
            })
            return listComment
        } catch (error) {
            console.log(error)
        }
    }
}
