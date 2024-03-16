import { useQuery } from "@tanstack/react-query";
import UserNotesList from "../components/userNotesList";
import { UserNotes } from "../schemas/userNotes";
import axiosInstance from "../utils/axiosInstance";
import { Button, Spinner } from "@nextui-org/react";
import { openCreateNoteModal } from "../stores/createNoteModal.store";
import { useCallback } from "react";

const UserNotesPage = () => {
  const query = useQuery<UserNotes[]>({
    queryKey: ["notes"],
    queryFn: async () => (await axiosInstance().get("notes/users")).data,
  });
  const UserNotesView = useCallback(() => {
    if (query.isFetching) return <Spinner />;
    if (query.data) {
      if (query.data.length > 0)
        return query.data.map((userNotes) => <UserNotesList key={userNotes.id} userNotes={userNotes} />);
      return <p className="text-default-500">No notes found</p>;
    }
  }, [query.data, query.isFetching]);
  return (
    <div className="w-[100vw] h-[100vh] flex flex-col items-start px-14 py-6 gap-10">
      <div className="flex flex-row items-center gap-6">
        <h1 className="text-[28px] text-left uppercase tracking-widest cursor-default select-none">Notes</h1>
        <Button className="text-lg" color="primary" variant="flat" onClick={() => openCreateNoteModal()}>
          Create Note
        </Button>
      </div>
      <UserNotesView />
    </div>
  );
};

export default UserNotesPage;
