import { Card, CardFooter, Image, Spinner } from "@nextui-org/react";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import seedrandom from "seedrandom";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../utils/axiosInstance";
import { UserNotes } from "../schemas/userNotes";
import NotesList from "../components/notesList";

const UserPage = () => {
  const { id } = useParams();
  const [userAvatarNumber, setUserAvatarNumber] = useState<number | null>(null);
  useEffect(() => {
    const rng = seedrandom(id);
    setUserAvatarNumber(Math.floor(rng() * 100));
  }, [id]);
  const query = useQuery<UserNotes>({
    queryKey: ["notes"],
    queryFn: async () => (await axiosInstance().get(`notes/users/${id}`)).data,
  });
  const NotesView = useCallback(() => {
    if (query.isFetching) return <Spinner />;
    if (query.data) {
      if (query.data.notes.length > 0) return <NotesList notes={query.data.notes} justify="center" />;
      return <p className="text-default-500">No notes found</p>;
    }
  }, [query.data, query.isFetching]);
  return (
    <div className="flex flex-col justify-center items-center gap-6 py-8 w-full">
      {query.data ? (
        <>
          <Card
            shadow="lg"
            isFooterBlurred
            radius="lg"
            className="border-none flex-col w-[240px] h-[240px] items-center cursor-default"
          >
            {userAvatarNumber && (
              <Image
                className="z-0"
                src={`https://randomuser.me/api/portraits/men/${userAvatarNumber}.jpg`}
                width={240}
                height={200}
              />
            )}
            <CardFooter className="absolute bottom-0 bg-black/60 h-20 flex flex-col gap-4 items-start">
              <p className="text-xl tracking-wide text-white/80">{query.data.name}</p>
              <p className="mt-[-12px] text-sm tracking-widest text-default-500">{query.data.email}</p>
            </CardFooter>
          </Card>
          <h1 className="text-2xl text-left uppercase tracking-widest cursor-default">Notes</h1>
          <NotesView />
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default UserPage;
