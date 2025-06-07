import { Injectable } from '@nestjs/common';
import * as DTO from '../dtos/comment.dto';
import { PrismaService } from 'src/common/db/prisma.service';

@Injectable()

export class CommentsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCommentDto: DTO.CreateCommentDto) {
    return await this.prisma.comments.create({
      data: createCommentDto
    })    
  }

  async findAll(qPostId?: number) {
    return await this.prisma.comments.findMany({
      where: { post_id: qPostId },
      select: {
        id: true,
        text: true,
        posted_at: true,
        users: {
          select: {
            id: true,
            name: true,
            profile_picture: true,
          }
        }
      }
    })     
  }

  async findOne(id: number) {
    return await this.prisma.comments.findUnique({
      where: { id },
      select: {
        id: true,
        text: true,
        posted_at: true,
        posts: {
          select: {
            id: true,
            description: true,
            posted_at: true,
            image_url: true,
          },
          include: {
            users: {
              select: {
                id: true,
                name: true,
                profile_picture: true
              }
            }
          }
        },
        users: {
          select: {
            id: true,
            name: true,
            profile_picture: true
          }
        }
      },
    })    
  }

  async update(id: number, updateCommentDto: DTO.UpdateCommentDto) {
    return await this.prisma.comments.update({
      where: { id },
      data: updateCommentDto
    })
  }

  async remove(id: number) {
    return await this.prisma.comments.delete({
      where: { id }
    })      
  }
}
