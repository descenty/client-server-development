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
  Req,
} from '@nestjs/common';
import { NoteService } from './note.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UUID } from 'crypto';
import { AuthGuard } from 'src/auth.guard';
import { Request } from 'express';

@Controller('notes')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Post()
  @HttpCode(201)
  @UseGuards(AuthGuard)
  async create(@Body() createNoteDto: CreateNoteDto, @Req() request: Request) {
    return await this.noteService.create(createNoteDto, request['user'].id);
  }

  @Get()
  async findAll() {
    return await this.noteService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: UUID) {
    const note = await this.noteService.findOne(id);
    if (!note) throw new HttpException('Note not found', 404);
    return note;
  }

  // @Patch(':id')
  // update(@Param('id') id: UUID, @Body() updateNoteDto: UpdateNoteDto) {
  //   return this.noteService.update(id, updateNoteDto);
  // }

  @Delete(':id')
  @HttpCode(204)
  @UseGuards(AuthGuard)
  async delete(@Param('id') id: UUID, @Req() request: Request) {
    return await this.noteService.delete(id, request['user']);
  }
}
