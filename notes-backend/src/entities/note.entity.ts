import { UUID } from 'node:crypto';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column({ default: Date.now() })
  createdAt: Date;
}
