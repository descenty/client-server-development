import { createEvent, createStore } from "effector";

export const openCreateNoteModal = createEvent();
export const closeCreateNoteModal = createEvent();

export const $isCreateNoteModalOpened = createStore(false)
  .on(openCreateNoteModal, () => true)
  .on(closeCreateNoteModal, () => false);
