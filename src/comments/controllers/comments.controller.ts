import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommentsService } from '../services/comments.service';
import * as DTO from '../dtos/comment.dto';


@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  create(@Body() createCommentDto: DTO.CreateCommentDto) {
    createCommentDto.posted_at = new Date(createCommentDto.posted_at)
    return this.commentsService.create(createCommentDto);
  }

  @Get()
  findAll() {
    return this.commentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: DTO.UpdateCommentDto) {
    updateCommentDto.posted_at === undefined ? updateCommentDto.posted_at = new Date(Date.now()) : new Date (updateCommentDto.posted_at);
    return this.commentsService.update(+id, updateCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentsService.remove(+id);
  }
}
