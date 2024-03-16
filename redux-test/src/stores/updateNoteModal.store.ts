import { createEvent, createStore } from "effector";
import { Note } from "../schemas/note";

export const setModalUpdateNote = createEvent<Note | null>();

export const $modalUpdateNote = createStore<Note | null>(null).on(setModalUpdateNote, (_, note) => note);
