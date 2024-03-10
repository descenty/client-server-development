import UserNoteShort from "./userNoteShort";

const NotesList = ({ justify }: { justify?: "start" | "center" | "end" } = { justify: "start" }) => (
  <div className={`flex flex-row flex-wrap gap-6 justify-${justify}`}>
    {[...Array(10)].map((_, index) => (
      <UserNoteShort key={index} />
    ))}
  </div>
);

export default NotesList;
