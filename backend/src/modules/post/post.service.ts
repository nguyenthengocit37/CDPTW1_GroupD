import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from './dto/createPost.dto';
import { UpdatePostDto } from './dto/updatePost.dto';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postReponsitory: Repository<Post>,
  ) {}
  async create(postDto: CreatePostDto) {
    const post = this.postReponsitory.create(postDto);
    await this.postReponsitory.save(post);
    return post;
  }

  findAll(): Promise<Post[]> {
    return this.postReponsitory.find();
  }

  async findOne(id: string): Promise<Post> {
    try {
      const post = await this.postReponsitory.findOneBy({ id });
      if (!post) {
        throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
      }
      return post;
    } catch (error) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
  }

  async update(id: string, postDto: UpdatePostDto) {
    try {
      await this.postReponsitory.update(id, postDto);
      const updatedTodo = await this.postReponsitory.findOneBy({ id });
      if (!updatedTodo) {
        throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
      }
      return updatedTodo;
    } catch (error) {
      throw new HttpException('Update unsuccessfully', HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: string) {
    try {
      const deletedPost = await this.postReponsitory.delete(id);
      if (!deletedPost.affected) {
        throw new HttpException(
          'Remove unsuccessfully',
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (error) {
      throw new HttpException('Remove unsuccessfully', HttpStatus.BAD_REQUEST);
    }
  }
}
