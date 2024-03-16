import { UUID } from "crypto";
import { Note } from "./note";

export type UserNotes = {
  id: UUID;
  name: string;
  email: string;
  notes: Note[];
};
