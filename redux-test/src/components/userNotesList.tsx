import { Avatar, Button, Divider, Link } from "@nextui-org/react";
import NotesList from "./notesList";

const UserNotesList = () => (
  <div className="flex flex-col justify-center items-start gap-6">
    <div className="flex flex-row items-center gap-10">
      <Link color="foreground" href="/users/22" className="flex flex-row gap-8 items-center cursor-pointer">
        <Avatar size="lg" src={`https://randomuser.me/api/portraits/men/${22}.jpg`} />
        <h2 className="text-xl">Alexander Bychenkov</h2>
      </Link>
      <Button className="text-lg px-6 py-6" color="primary" variant="flat">
        Add Note
      </Button>
    </div>
    <Divider />
    <NotesList />
  </div>
);

export default UserNotesList;
