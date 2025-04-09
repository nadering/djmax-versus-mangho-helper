import { atom, createStore } from "jotai";
import Command from "@/commands";
import { COMMAND_STACK_MAXIMUM_SIZE } from "@/constants/command";

export const commandStore = createStore();

export const undoStackAtom = atom<Command[]>([]);
export const redoStackAtom = atom<Command[]>([]);

/** Command를 받아 undoStackAtom에 추가 (Set only) */
export const pushUndoAtom = atom(null, (get, set, newUndo: Command) => {
  const current = get(undoStackAtom);

  if (current.length < COMMAND_STACK_MAXIMUM_SIZE) {
    set(undoStackAtom, [...current, newUndo]);
  }
});

/** Command를 받아 redoStackAtom에 추가 (Set only) */
export const pushRedoAtom = atom(null, (get, set, newRedo: Command) => {
  const current = get(redoStackAtom);

  if (current.length < COMMAND_STACK_MAXIMUM_SIZE) {
    set(redoStackAtom, [...current, newRedo]);
  }
});
