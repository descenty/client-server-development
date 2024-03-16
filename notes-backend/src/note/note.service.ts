import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from './entities/note.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UUID } from 'crypto';
import { CreateNoteDto } from './dto/createNote.dto';
import { UserNotesDto } from './dto/userNotes.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(Note)
    private repository: Repository<Note>,
    private userService: UserService,
  ) {}
  create(createNoteDto: CreateNoteDto, userId: UUID) {
    return this.repository.save({
      title: createNoteDto.title,
      content: createNoteDto.content,
      userId: userId,
    });
  }

  async findAll(): Promise<Note[]> {
    return await this.repository.find();
  }

  async findAllByUsers(): Promise<UserNotesDto[]> {
    const userNotesDTOs: UserNotesDto[] = await this.repository.query(
      `SELECT "userId" as "id", json_agg(json_build_object('id', id, 'title', title, 'content', content, 'userId', "userId", 'createdAt', "createdAt")) as notes FROM "note" GROUP BY "userId"`,
    );
    if (!userNotesDTOs.length) return [];
    return Promise.all(
      userNotesDTOs.map(async (userNotesDTO) => {
        const user = await this.userService.getById(userNotesDTO.id);
        return {
          id: userNotesDTO.id,
          name: `${user.firstName} ${user.lastName}`,
          notes: userNotesDTO.notes,
        } as UserNotesDto;
      }),
    );
  }

  async findAllByUserId(id: UUID): Promise<UserNotesDto> {
    const userNotesDTO: UserNotesDto = (
      await this.repository.query(
        `SELECT "userId" as "id", json_agg(json_build_object('id', id, 'title', title, 'content', content, 'userId', "userId", 'createdAt', "createdAt")) as notes FROM "note" WHERE "userId" = $1 GROUP BY "userId"`,
        [id],
      )
    )[0];
    const user = await this.userService.getById(id);
    if (!userNotesDTO)
      return {
        id: id,
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        notes: [],
      };
    return {
      id: userNotesDTO.id,
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      notes: userNotesDTO.notes,
    } as UserNotesDto;
  }

  async findOne(id: UUID): Promise<Note | null> {
    return await this.repository.findOneBy({ id });
  }

  async update(id: UUID, createNoteDto: CreateNoteDto): Promise<UpdateResult> {
    return await this.repository.update({ id }, createNoteDto);
  }

  async delete(id: UUID, userId: UUID): Promise<DeleteResult> {
    return await this.repository.delete({ id, userId });
  }
}
