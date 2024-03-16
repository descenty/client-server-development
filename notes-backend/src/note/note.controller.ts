import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpException,
  HttpCode,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { NoteService } from './note.service';
import { CreateNoteDto } from './dto/createNote.dto';
import { UUID } from 'crypto';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/user/user.decorator';
import { UserDto } from 'src/auth/dto/user.dto';
import { Note } from './entities/note.entity';
import { UserNotesDto } from './dto/userNotes.dto';
import { DeleteResult } from 'typeorm';

@Controller('notes')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Post()
  @HttpCode(201)
  @UseGuards(AuthGuard)
  async create(
    @Body() createNoteDto: CreateNoteDto,
    @User() user: UserDto,
  ): Promise<Note> {
    return await this.noteService.create(createNoteDto, user.id);
  }

  @Get()
  async findAll(): Promise<Note[]> {
    return await this.noteService.findAll();
  }

  @Get('/users')
  async findAllByUsers(): Promise<UserNotesDto[]> {
    return await this.noteService.findAllByUsers();
  }

  @Get('/users/:id')
  async findAllByUserId(@Param('id') id: UUID): Promise<UserNotesDto> {
    return await this.noteService.findAllByUserId(id);
  }

  @Get(':id')
  async findOne(@Param('id') id: UUID): Promise<Note> {
    const note = await this.noteService.findOne(id);
    if (!note) throw new HttpException('Note not found', 404);
    return note;
  }

  @Patch(':id')
  async update(@Param('id') id: UUID, @Body() createNoteDto: CreateNoteDto) {
    return await this.noteService.update(id, createNoteDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @UseGuards(AuthGuard)
  async delete(
    @Param('id') id: UUID,
    @User() user: UserDto,
  ): Promise<DeleteResult> {
    return await this.noteService.delete(id, user.id);
  }
}
