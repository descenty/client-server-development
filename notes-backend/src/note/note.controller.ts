import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpCode,
} from '@nestjs/common';
import { NoteService } from './note.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { UUID } from 'crypto';

@Controller('notes')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Post()
  @HttpCode(201)
  create(@Body() createNoteDto: CreateNoteDto) {
    return this.noteService.create(createNoteDto);
  }

  @Get()
  findAll() {
    return this.noteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: UUID) {
    const note = this.noteService.findOne(id);
    if (!note) throw new HttpException('Note not found', 404);
    return note;
  }

  // @Patch(':id')
  // update(@Param('id') id: UUID, @Body() updateNoteDto: UpdateNoteDto) {
  //   return this.noteService.update(id, updateNoteDto);
  // }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id') id: UUID) {
    return this.noteService.delete(id);
  }
}
