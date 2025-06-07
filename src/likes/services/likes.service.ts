import { Injectable } from '@nestjs/common';
import * as DTO from '../dtos/like.dto';
import { PrismaService } from 'src/common/db/prisma.service';

@Injectable()
export class LikesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createLikeDto: DTO.CreateLikeDto) {
    return await this.prisma.likes.create({
      data: createLikeDto
    })
  }

  async findAll() {
    return await this.prisma.likes.findMany({
      include: {
        posts: {
          select: {
            id: true
          },
        },
        users: {
          select: {
            id: true
          }
        }
      }
    })
  }

  async update(id: number, updateLikeDto: DTO.UpdateLikeDto) {
    return await this.prisma.likes.update({
      where: { id },
      data: updateLikeDto
    })
  }

  async remove(id: number) {
    return await this.prisma.likes.delete({
      where: { id }
    })
  }
}
