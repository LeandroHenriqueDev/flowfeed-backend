import { Module } from '@nestjs/common';
import { PostsService } from './services/posts.service';
import { PostsController } from './controllers/posts.controller';
import { DbModule } from 'src/common/db/db.module';

@Module({
  imports: [DbModule],
  // em Imports não se deve importar um serviço individual, 
  // e sim o módulo da qual ele fazer parte
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
