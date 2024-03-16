import "./App.css";
import AppHeader from "./components/appHeader";
import TermsOfUse from "./components/termsOfUse";
import { useAuth } from "react-oidc-context";
import { useEffect } from "react";
import { useAppDispatch } from "./stores/hooks";
import { setUser } from "./stores/userSlice";
import { extractRoles } from "./utils";
import UserNotesPage from "./pages/userNotesPage";
import { Route, Routes } from "react-router-dom";
import UserPage from "./pages/userPage";
import CreateNoteModal from "./components/createNoteModal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "./utils/axiosInstance";
import { NoteCreate } from "./schemas/note";
import NoteModal from "./components/noteModal";
import { $modalNote } from "./stores/noteModal.store";
import UpdateNoteModal from "./components/updateNoteModal";

function App() {
  const auth = useAuth();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (auth.isAuthenticated && auth.user) {
      const user = { ...auth.user, roles: extractRoles(auth.user.access_token) };
      // @ts-expect-error missing properties, why?
      dispatch(setUser(user));
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      dispatch(setUser(null));
      localStorage.removeItem("user");
    }
  }, [auth, dispatch]);

  const queryClient = useQueryClient();
  const createMutation = useMutation({
    mutationFn: async (noteCreate: NoteCreate) => (await axiosInstance().post("notes", noteCreate)).data,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });
  const updateMutation = useMutation({
    mutationFn: async (noteCreate: NoteCreate) =>
      (await axiosInstance().patch(`notes/${$modalNote.getState()?.id}`, noteCreate)).data,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });
  return (
    <>
      <AppHeader />
      <div className="px-16 py-4 flex flex-row items-center w-[100vw]">
        <Routes>
          <Route path="/" element={<UserNotesPage />} />
          <Route path="/users/:id" element={<UserPage />} />
        </Routes>
      </div>
      <NoteModal />
      <CreateNoteModal saveFunc={createMutation.mutateAsync} />
      <UpdateNoteModal saveFunc={updateMutation.mutateAsync} />
      <TermsOfUse />
    </>
  );
}

export default App;
