import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, UseInterceptors, ClassSerializerInterceptor, Req, Query, UseGuards, UploadedFile, BadRequestException, Res } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Request, Response } from 'express';
import { User } from 'src/auth/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/auth/user.decorator';
import { CurrentUserGuard } from 'src/auth/current-user.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ACGuard, UseRoles } from 'nest-access-control';

@Controller('posts')
@UseInterceptors(ClassSerializerInterceptor) // "userId": 1,"categoryId": 3, hide bende ni klau xaktif
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard("jwt"), ACGuard)
  @UseRoles({
    possession: 'any',
    action: 'create',
    resource:  'post'
  })
  create(@Body() createPostDto: CreatePostDto, @Req() req: Request, @CurrentUser() user: User) {
    return this.postService.create(createPostDto, req.user as User);
  }

  @Get()
  @UseGuards(CurrentUserGuard)
  findAll(@Query() query: any, @CurrentUser() user: User) {
    return this.postService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(+id);
  }

  @Get('/slug/:slug')
  findBySlug(@Param('slug') slug: string) {
    return this.postService.findBySlug(slug);
  }

  @Post('upload-photo')
  @UseInterceptors(
    FileInterceptor('picture', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const name = file.originalname.split('.')[0];
          const fileExtension = file.originalname.split('.')[1];
          const newFilename =
            name.split(' ').join('_') + '_' + Date.now() + '.' + fileExtension;
          cb(null, newFilename);
        },
      }),
      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
          return callback(null, false);
        }
        callback(null, true);
      },
    }),
  )
  uploadPhoto(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      return {
        error: 'File is not an image, please upload correct format',
      };
    } else {
      const response = {
        filePath: `http://localhost:3000/posts/pictures/${file.filename}`,
      };
      return response;
    }
  }

  @Get('pictures/:fileId')
  async getPicture(@Param('fileId') fileId, @Res() res: Response){
    res.sendFile(fileId, {root: './uploads'});

  }

  @Patch(':slug')
  @UseGuards(AuthGuard('jwt')) 
  @UseGuards(AuthGuard("jwt"), ACGuard)
  @UseRoles({
    possession: 'any',
    action: 'update',
    resource:  'post'
  })
  update(@Param('slug') slug: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(slug, updatePostDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt')) 
  @UseGuards(AuthGuard("jwt"), ACGuard)
  @UseRoles({
    possession: 'any',
    action: 'delete',
    resource:  'post'
  })
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }
}
