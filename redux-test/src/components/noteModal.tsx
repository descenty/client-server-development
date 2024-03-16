"use client";
import { Button, Divider, Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";
import { useUnit } from "effector-react";
import { $modalNote, setModalNote } from "../stores/noteModal.store";
import RemoveIcon from "./icons/removeIcon";
import EditIcon from "./icons/editIcon";
import { setModalUpdateNote } from "../stores/updateNoteModal.store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../utils/axiosInstance";
import { useAppSelector } from "../stores/hooks";

const NoteModal = () => {
  const modalNote = useUnit($modalNote);
  const user = useAppSelector((state) => state.user.data);
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: async () => (await axiosInstance().delete(`notes/${modalNote?.id}`)).data,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  return (
    <Modal
      isOpen={modalNote ? true : false}
      onClose={() => setModalNote(null)}
      scrollBehavior="inside"
      placement="top-center"
    >
      {modalNote && (
        <ModalContent>
          <ModalHeader className="flex flex-row gap-4">
            <span className="text-xl font-semibold">{modalNote.title}</span>
            {user?.profile.sub === modalNote.userId && (
              <>
                <Button
                  isIconOnly
                  startContent={<EditIcon />}
                  size="sm"
                  color="default"
                  variant="bordered"
                  className="p-1"
                  onClick={() => setModalUpdateNote(modalNote)}
                />
                <Button
                  isIconOnly
                  startContent={<RemoveIcon />}
                  color="danger"
                  size="sm"
                  variant="flat"
                  className="p-1"
                  onClick={() => {
                    if (window.confirm("Are you sure you want to delete this note?")) {
                      deleteMutation.mutateAsync().then(() => {
                        setModalNote(null);
                      });
                    }
                  }}
                />
              </>
            )}
          </ModalHeader>
          <Divider />
          <ModalBody className="p-6">
            <p>{modalNote.content}</p>
          </ModalBody>
        </ModalContent>
      )}
    </Modal>
  );
};

export default NoteModal;
