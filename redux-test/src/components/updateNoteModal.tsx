import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Textarea } from "@nextui-org/react";
import { UseMutateAsyncFunction } from "@tanstack/react-query";
import { useForm, SubmitHandler } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { NoteCreate } from "../schemas/note";
import { useUnit } from "effector-react";
import { $modalUpdateNote, setModalUpdateNote } from "../stores/updateNoteModal.store";
import { setModalNote } from "../stores/noteModal.store";
import { useEffect } from "react";

const UpdateNoteModal = ({
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
  const modalUpdateNote = useUnit($modalUpdateNote);

  // to reset form when modal is closed and avoid using previous note data
  useEffect(() => {
    reset({ title: modalUpdateNote?.title, content: modalUpdateNote?.content });
  }, [modalUpdateNote, reset]);

  const onSubmit: SubmitHandler<NoteCreate> = (data) => {
    saveFunc(data);
    // @ts-expect-error problems with id type
    setModalNote({ ...modalUpdateNote, ...data });
    setModalUpdateNote(null);
    reset({ title: "", content: "" });
  };
  return (
    <Modal isOpen={modalUpdateNote ? true : false} onClose={() => setModalUpdateNote(null)} placement="top-center">
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">Note '{modalUpdateNote?.title}'</ModalHeader>
        <ModalBody>
          <form className="flex flex-col gap-3">
            <Input
              label="Title"
              variant="bordered"
              defaultValue={modalUpdateNote?.title}
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
              defaultValue={modalUpdateNote?.content}
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

export default UpdateNoteModal;
