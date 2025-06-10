import { Injectable } from '@nestjs/common';
import * as DTO from '../dtos/user.dto';
import { PrismaService } from 'src/common/db/prisma.service';
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: DTO.CreateUserDto) {
    user.created_at = new Date(user.created_at);
    const hash = await bcrypt.hash(user.password_hash, 10);
    return await this.prisma.users.create({
      data: { ...user, password_hash: hash }
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

  async update(id: number, updateUserDto: DTO.UpdateUserDto) {
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

  async userFind(username: string) {
    const email = username;
    return await this.prisma.users.findUnique({
      where: { email }
    })
  }
  // reserved to future features

}
