import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/db/prisma.service';
import * as DTO from '../dtos/post.dto';


@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(post: DTO.CreatePostDto) {
    post.posted_at = new Date(post.posted_at);
    return await this.prisma.posts.create({
      data: post
    });
  }

  async findAll() {
    return await this.prisma.posts.findMany({
      select: {
        id: true,
        description: true,
        image_url: true,
        posted_at: true,
        users: {
          select: {
            id: true,
            name: true,
            profile_picture: true
          }
        },
        _count: {
            select: { likes: true, comments: true }
        }
      },
      skip: 0,
      take: 7
    }
  );
  }

  async findOne(id: number) {
    return await this.prisma.posts.findUnique({
      where: { id },
      include: {
        users: true
      }
    })  
  }

  async update(id: number, updatePostDto: DTO.UpdatePostDto) {
    return await this.prisma.posts.update({
      where: { id },
      data: updatePostDto
    }) 
  }

  async remove(id: number) {
    return await this.prisma.posts.delete({
      where: { id },
    })
  }

  async likesCount(post_id: number){
    return await this.prisma.posts.findUnique(
      {
        where: { id: post_id },
        select: {
          id: true,
          _count: {
            select: {
              likes: true
            }
          }
        }
      });

  }
}
