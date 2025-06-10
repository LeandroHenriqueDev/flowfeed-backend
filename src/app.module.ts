import { Module } from '@nestjs/common';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';
import { CommentsModule } from './comments/comments.module';
import { LikesModule } from './likes/likes.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [ UsersModule, PostsModule, CommentsModule, LikesModule, AuthModule ],
  controllers: []
})
export class AppModule {}
