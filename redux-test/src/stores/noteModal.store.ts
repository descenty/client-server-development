import { createEvent, createStore } from "effector";
import { Note } from "../schemas/note";

export const setModalNote = createEvent<Note | null>();

export const $modalNote = createStore<Note | null>(null).on(setModalNote, (_, note) => note);
