import { UUID } from "crypto";

export type Note = {
  id: UUID;
  title: string;
  content: string;
  userId: UUID;
  createdAt: Date;
};

export type NoteCreate = {
  title: string;
  content: string;
};
