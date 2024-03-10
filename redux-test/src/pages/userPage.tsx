import { Card, CardFooter, Image } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import seedrandom from "seedrandom";
import NotesList from "../components/notesList";
import { useAppSelector } from "../stores/hooks";

const UserPage = () => {
  const { id } = useParams();
  const user = useAppSelector((state) => state.user.data);
  const [userAvatarNumber, setUserAvatarNumber] = useState(1);
  useEffect(() => {
    const rng = seedrandom(id);
    setUserAvatarNumber(Math.floor(rng() * 100));
  }, [id]);
  return (
    <div className="flex flex-col justify-center items-center gap-6 py-8">
      <Card
        shadow="lg"
        isFooterBlurred
        radius="lg"
        className="border-none flex-col w-[240px] h-[240px] items-center cursor-default"
      >
        <Image
          alt="Woman listing to music"
          className="z-0"
          src={`https://randomuser.me/api/portraits/men/${userAvatarNumber}.jpg`}
          width={240}
          height={200}
        />
        <CardFooter className="absolute bottom-0 bg-black/60 h-20 flex flex-col gap-4 items-start">
          <p className="text-xl tracking-wide text-white/80">{user?.profile.name}</p>
          <p className="mt-[-12px] text-sm tracking-widest text-default-500">{user?.profile.email}</p>
        </CardFooter>
      </Card>
      <h1 className="text-2xl text-left uppercase tracking-widest cursor-default">Notes</h1>
      <NotesList justify="center" />
    </div>
  );
};

export default UserPage;
