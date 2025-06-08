import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/db/prisma.service';
import * as DTO from '../dtos/post.dto';
import { randomInt } from 'crypto';


@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(post: DTO.CreatePostDto) {
    // post.posted_at.map() = new Date(post.posted_at);
    return await this.prisma.posts.createMany({
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
      take: 10
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

  async findHome(initial: number = 0, filter: 'random' | 'lasts' | 'most' = 'random') {
    const order = (filter == 'lasts' ? 'p.posted_at DESC' : filter == 'most' ? 'likes DESC' : 'random()')
    const reg = await this.prisma.$queryRawUnsafe<any[]>(`SELECT p.id, p.description, p.image_url, p.posted_at, u.id AS user_id, u.name AS user_name, u.profile_picture, (SELECT COUNT(*) FROM likes l WHERE l.post_id = p.id) AS likes, (SELECT COUNT(*) FROM comments c WHERE c.post_id = p.id) AS comments FROM posts p JOIN users u ON u.id = p.user_id ORDER BY ${order} LIMIT 10 OFFSET ${initial};`);
    
    return reg.map(post => ({
    ...post,
    id: Number(post.id),
    user_id: Number(post.user_id),
    likes: Number(post.likes),
    comments: Number(post.comments)
  }));

  //   return await this.prisma.posts.findMany({
  //     select: {
  //       id: true,
  //       description: true,
  //       image_url: true,
  //       posted_at: true,
  //       users: {
  //         select: {
  //           id: true,
  //           name: true,
  //           profile_picture: true
  //         }
  //       },
  //       _count: {
  //           select: { likes: true, comments: true }
  //       }
  //     },
  //     skip: initial,
  //     take: 10,
  //   }
  // );
  }
}
