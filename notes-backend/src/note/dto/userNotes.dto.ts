import { UUID } from 'node:crypto';
import { Note } from '../entities/note.entity';

export class UserNotesDto {
  id: UUID;
  name: string;
  email: string;
  notes: Note[];
}
