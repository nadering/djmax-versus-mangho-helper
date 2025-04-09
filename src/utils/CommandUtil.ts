import Command from "@/commands";
import {
  commandStore,
  pushRedoAtom,
  pushUndoAtom,
  redoStackAtom,
  undoStackAtom,
} from "@/stores/CommandStore";
import { addToast, makeToast } from "./ToastUtil";

/** 커맨드 실행 */
export const runCommand = (command: Command) => {
  command.execute();
  commandStore.set(pushUndoAtom, command);
  commandStore.set(redoStackAtom, []);
};

/** 커맨드 실행 취소 */
export const undoCommandFromStack = () => {
  const undoStack = commandStore.get(undoStackAtom);
  const newUndoStack = [...undoStack];

  const command = newUndoStack.pop();
  if (command) {
    command.undo();
    commandStore.set(undoStackAtom, [...newUndoStack]);
    commandStore.set(pushRedoAtom, command);
    addToast(makeToast("실행 취소", 1500));
  }
};

/** 실행 취소했던 커맨드를 다시 실행 */
export const redoCommandFromStack = () => {
  const redoStack = commandStore.get(redoStackAtom);
  const newRedoStack = [...redoStack];

  const command = newRedoStack.pop();
  if (command) {
    command.redo();
    commandStore.set(redoStackAtom, [...newRedoStack]);
    commandStore.set(pushUndoAtom, command);
    addToast(makeToast("다시 실행", 1500));
  }
};
