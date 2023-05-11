import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(CategoryEntity) private categoryRepository: Repository<CategoryEntity>
    ){}
    
    async getAll(query: any){
        return await this.categoryRepository.find({
            where: {
                name: query.name ? query.name : null
            }
        })
    }
}
