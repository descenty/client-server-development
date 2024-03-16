import { Note } from "../schemas/note";
import UserNoteShort from "./userNoteShort";

const NotesList = (
  { notes, justify }: { notes: Note[]; justify?: "start" | "center" | "end" } = { notes: [], justify: "start" }
) => (
  <div className={`flex flex-row flex-wrap gap-6 justify-${justify}`}>
    {notes.map((note) => (
      <UserNoteShort key={note.id} note={note} />
    ))}
  </div>
);

export default NotesList;
