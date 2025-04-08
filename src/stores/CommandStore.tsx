import { atom } from "jotai";
import Command from "../commands";

const MAXIMUM_UNDO_STACK = 30;

/** Undo 커맨드를 저장하는 스택 */
export const undoStackAtom = atom<Command[]>([]);

/** Command를 받아 undoStackAtom에 추가 (Set only) */
export const pushUndoAtom = atom(null, (get, set, newUndo: Command) => {
  const current = get(undoStackAtom);

  if (current.length < MAXIMUM_UNDO_STACK) {
    set(undoStackAtom, [...current, newUndo]);
  }
});
