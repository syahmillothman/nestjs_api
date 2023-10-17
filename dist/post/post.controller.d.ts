/// <reference types="multer" />
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Request, Response } from 'express';
import { User } from 'src/auth/entities/user.entity';
export declare class PostController {
    private readonly postService;
    constructor(postService: PostService);
    create(createPostDto: CreatePostDto, req: Request, user: User): Promise<import("./entities/post.entity").Post>;
    findAll(query: any, user: User): Promise<import("./entities/post.entity").Post[]>;
    findOne(id: string): Promise<import("./entities/post.entity").Post>;
    findBySlug(slug: string): Promise<import("./entities/post.entity").Post>;
    uploadPhoto(file: Express.Multer.File): {
        filePath: string;
    } | {
        error: string;
    };
    getPicture(fileId: any, res: Response): Promise<void>;
    update(slug: string, updatePostDto: UpdatePostDto): Promise<import("./entities/post.entity").Post>;
    remove(id: string): Promise<{
        success: boolean;
        post: import("./entities/post.entity").Post;
    }>;
}
