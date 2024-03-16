import { Card, CardBody, CardHeader, Link } from "@nextui-org/react";
import { Note } from "../schemas/note";
import { setModalNote } from "../stores/noteModal.store";

const UserNoteShort = ({ note }: { note: Note }) => (
  <Link onClick={() => setModalNote(note)} className="cursor-pointer">
    <Card className="w-full max-w-[400px] max-h-[150px] px-4 py-4">
      <CardHeader className="text-xl text-start py-0">{note.title}</CardHeader>
      <CardBody className="pb-0 pt-2">
        <p className="tracking-wide text-base whitespace-nowrap text-gray-500 overflow-hidden overflow-ellipsis">
          {note.content}
        </p>
      </CardBody>
    </Card>
  </Link>
);

export default UserNoteShort;
