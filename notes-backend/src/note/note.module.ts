import { Module } from '@nestjs/common';
import { NoteService } from './note.service';
import { NoteController } from './note.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from './entities/note.entity';
import { UserService } from 'src/user/user.service';
import { CacheModule } from '@nestjs/cache-manager';
import { AuthService } from 'src/auth/auth.service';

@Module({
  controllers: [NoteController],
  providers: [NoteService, UserService, AuthService],
  imports: [TypeOrmModule.forFeature([Note]), CacheModule.register()],
})
export class NoteModule {}
