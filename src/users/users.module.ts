import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { DbModule } from 'src/common/db/db.module';

@Module({
  imports: [DbModule],
  // em Imports não se deve importar um serviço individual, 
  // e sim o módulo da qual ele fazer parte
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
