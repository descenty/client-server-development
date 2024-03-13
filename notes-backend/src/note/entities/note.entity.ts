import { UUID } from 'node:crypto';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Note {
  @PrimaryGeneratedColumn()
  id: UUID;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  userId: UUID;

  @CreateDateColumn()
  createdAt: Date;
}
