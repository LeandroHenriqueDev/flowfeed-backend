import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { PrismaService } from 'src/common/db/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: CreateUserDto) {
    user.created_at = new Date(user.created_at);
    return await this.prisma.users.create({
      data: user
    })
  }
  async findAll() {
    return await this.prisma.users.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.users.findUnique({
      where: { id }
    })
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.prisma.users.update({
      where: { id },
      data: updateUserDto
    })
  }

  async remove(id: number) {
    return await this.prisma.users.delete({
      where: { id }
    })
  }

  // reserved to future features

}
