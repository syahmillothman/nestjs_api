import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class PostService {
  constructor(@InjectRepository(Post) private readonly repo: Repository<Post>){
  }

  async create(createPostDto: CreatePostDto, user: User) {
    const post = new Post();
    post.userId = user.id;
    Object.assign(post, createPostDto);

    this.repo.create(post);
    return await this.repo.save(post);
  }

  // http://localhost:3000/post?sort=asc&title=firstpost
  async findAll(query?: string) {
    const myQuery = this.repo
      .createQueryBuilder("post")
      .leftJoinAndSelect("post.category", "category")
      .leftJoinAndSelect("post.user", "user");
    
    // check if query present or not
    if(!(Object.keys(query).length === 0) && query.constructor === Object){
      const queryKeys = Object.keys(query); // get key of the query string
      
      // check if title key is present
      if(queryKeys.includes('title')){
        myQuery.where('post.title LIKE :title', {title: `%${query['title']}%`})
      }
      // check if the sort key is present, we will sort by title field only
      if(queryKeys.includes('sort')){
        myQuery.orderBy('post.title', query['sort'].toUpperCase()); // asc or desc
      }

      // check if category is present, show only selected
      if(queryKeys.includes('category')){
        myQuery.andWhere('category.title = :cat', {cat: query['category']});
      }

      return await myQuery.getMany();

    }else{
      return await myQuery.getMany();
    }
    
    // return await this.repo.find();
  }

  async findOne(id: number) {
    const post = await this.repo.findOne({where: {id}});
    if(!post){
      throw new BadRequestException('Post not found');
    }
    return post;
  }

  async findBySlug(slug: string){
    try{
      const post = await this.repo.findOneOrFail({where: {slug}});
      return post;
    }catch(err){
      throw new BadRequestException(`Post with slug ${slug} not found`)
    }
  }

  async update(slug: string, updatePostDto: UpdatePostDto) {
    const post = await this.repo.findOne({where: {slug}});

    if(!post){
      throw new BadRequestException('post not found');
    }else{
      post.modifiedOn = new Date(Date.now());
      post.category = updatePostDto.category;

      Object.assign(post, updatePostDto);
      return this.repo.save(post);
    }
  }

 async  remove(id: number) {
  const post = await this.repo.findOne({where: {id}});

    if(!post){
      throw new BadRequestException('post not found');
    }else{
      await this.repo.remove(post);
      return {success: true, post};
    }
  }
}
