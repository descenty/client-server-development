import { Injectable } from '@nestjs/common';
// import { CreateNoteDto } from './dto/create-note.dto';
// import { UpdateNoteDto } from './dto/update-note.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from './entities/note.entity';
import { DeleteResult, Repository } from 'typeorm';
import { UUID } from 'crypto';

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(Note)
    private repository: Repository<Note>,
  ) {}
  // async create(createNoteDto: CreateNoteDto) {
  //   return 'This action adds a new note';
  // }

  async findAll(): Promise<Note[]> {
    return await this.repository.find();
  }

  async findOne(id: UUID): Promise<Note | null> {
    return await this.repository.findOneBy({ id });
  }

  // async update(id: number, updateNoteDto: UpdateNoteDto) {
  //   return `This action updates a #${id} note`;
  // }

  async delete(id: UUID): Promise<DeleteResult> {
    return await this.repository.delete(id);
  }
}
