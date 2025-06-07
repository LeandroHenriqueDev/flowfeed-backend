import { Module } from '@nestjs/common';
import { LikesService } from './services/likes.service';
import { LikesController } from './controllers/likes.controller';
import { DbModule } from 'src/common/db/db.module';

@Module({
  imports: [DbModule],
  controllers: [LikesController],
  providers: [LikesService],
})
export class LikesModule {}
