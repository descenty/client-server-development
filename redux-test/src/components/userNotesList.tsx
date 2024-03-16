import { Avatar, Divider, Link } from "@nextui-org/react";
import NotesList from "./notesList";
import { UserNotes } from "../schemas/userNotes";
import seedrandom from "seedrandom";
import { useEffect, useState } from "react";
import { useAppSelector } from "../stores/hooks";

const UserNotesList = ({ userNotes }: { userNotes: UserNotes }) => {
  const [userAvatarNumber, setUserAvatarNumber] = useState<number | null>(null);
  useEffect(() => {
    const rng = seedrandom(userNotes.id);
    setUserAvatarNumber(Math.floor(rng() * 100));
  }, [userNotes.id]);
  const user = useAppSelector((state) => state.user.data);
  return (
    <div className="flex flex-col justify-center items-start gap-6">
      <div className="flex flex-row items-center gap-10">
        <Link
          color="foreground"
          href={`/users/${userNotes.id}`}
          className="flex flex-row gap-8 items-center cursor-pointer"
        >
          {userAvatarNumber && (
            <Avatar size="lg" src={`https://randomuser.me/api/portraits/men/${userAvatarNumber}.jpg`} />
          )}
          <h2 className="text-2xl">{user?.profile.sub == userNotes.id ? "You" : userNotes.name}</h2>
        </Link>
      </div>
      <Divider />
      <NotesList notes={userNotes.notes} />
    </div>
  );
};

export default UserNotesList;
