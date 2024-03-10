import UserNotesList from "../components/userNotesList";

const UserNotesPage = () => (
  <div className="w-[100vw] h-[100vh] flex flex-col items-start px-14 py-6 gap-10">
    <h1 className="text-[28px] text-left uppercase tracking-widest cursor-default select-none">Notes</h1>
    <UserNotesList />
  </div>
);

export default UserNotesPage;
