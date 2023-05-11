import { Controller, Get, Query } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
    constructor(
        private categoryService: CategoryService
    ){}

    @Get()
    async getAll(@Query() query: any){
        return await this.categoryService.getAll(query)
    }
}
