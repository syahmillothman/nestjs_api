import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Category } from "src/category/entities/category.entity";

export class CreatePostDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty({message: 'Please insert something'})
    @IsString()
    content: string;

    @IsNumber()
    @IsOptional()
    categoryId: number;

    @IsOptional()
    @IsString()
    mainImageUrl: string;

    @IsOptional()
    category: Category;
}
