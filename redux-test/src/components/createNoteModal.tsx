import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Textarea } from "@nextui-org/react";
import { UseMutateAsyncFunction } from "@tanstack/react-query";
import { useForm, SubmitHandler } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { NoteCreate } from "../schemas/note";
import { $isCreateNoteModalOpened, closeCreateNoteModal } from "../stores/createNoteModal.store";
import { useUnit } from "effector-react";

const CreateNoteModal = ({
  saveFunc,
}: {
  saveFunc: UseMutateAsyncFunction<NoteCreate, unknown, NoteCreate, unknown>;
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NoteCreate>();
  const isCreateNoteModalOpened = useUnit($isCreateNoteModalOpened);
  const onSubmit: SubmitHandler<NoteCreate> = (data) => {
    saveFunc(data);
    closeCreateNoteModal();
    reset();
  };
  return (
    <Modal isOpen={isCreateNoteModalOpened} onClose={closeCreateNoteModal} placement="top-center">
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">New Note</ModalHeader>
        <ModalBody>
          <form className="flex flex-col gap-3">
            <Input
              label="Title"
              variant="bordered"
              {...register("title", {
                required: {
                  value: true,
                  message: "Title is required",
                },
              })}
            />
            <Textarea
              label="Content"
              variant="bordered"
              {...register("content", {
                required: {
                  value: true,
                  message: "Content is required",
                },
              })}
            />
          </form>
          {["title", "content"].map((key) => (
            <ErrorMessage
              key={key}
              errors={errors}
              name={key as keyof NoteCreate}
              render={({ message }) => <p className="text-red-500">{message}</p>}
            />
          ))}
        </ModalBody>
        <ModalFooter>
          <Button type="submit" color="primary" onPress={() => handleSubmit(onSubmit)()}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateNoteModal;
