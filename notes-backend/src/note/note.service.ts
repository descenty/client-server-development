import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from './entities/note.entity';
import { DeleteResult, Repository } from 'typeorm';
import { UUID } from 'crypto';
import { CreateNoteDto } from './dto/create-note.dto';

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(Note)
    private repository: Repository<Note>,
  ) {}
  create(createNoteDto: CreateNoteDto, userId: UUID) {
    return this.repository.create({
      title: createNoteDto.title,
      content: createNoteDto.content,
      userId: userId,
    });
  }

  async findAll(): Promise<Note[]> {
    return await this.repository.find();
  }

  async findOne(id: UUID): Promise<Note | null> {
    return await this.repository.findOneBy({ id });
  }

  async delete(id: UUID, userId: UUID): Promise<DeleteResult> {
    return await this.repository.delete({ id, userId });
  }
}
