import { useAtomValue } from "jotai";
import {
  commandStore,
  redoStackAtom,
  undoStackAtom,
} from "@/stores/CommandStore";
import {
  redoCommandFromStack,
  undoCommandFromStack,
} from "@/utils/CommandUtil";
import { ArrowLeft, ArrowRight } from "lucide-react";

/** 되돌리기 및 다시 실행 버튼 */
const CommandArrow = () => {
  const undoStack = useAtomValue(undoStackAtom, { store: commandStore });
  const redoStack = useAtomValue(redoStackAtom, { store: commandStore });

  const isUndoExist = undoStack.length !== 0;
  const isRedoExist = redoStack.length !== 0;

  return (
    <div className="absolute top-[50%] left-4 translate-y-[-50%] group flex gap-3">
      <button
        title="실행 취소 (Ctrl+Z)"
        className={
          isUndoExist ? "cursor-pointer duration-100 hover:scale-120" : ""
        }
        onClick={() => undoCommandFromStack()}
      >
        <ArrowLeft
          className="w-6 h-6"
          color={isUndoExist ? "#333333" : "#bbbbbb"}
        />
      </button>
      <button
        title="다시 실행 (Ctrl+Y)"
        className={
          isRedoExist ? "cursor-pointer duration-100 hover:scale-120" : ""
        }
        onClick={() => redoCommandFromStack()}
      >
        <ArrowRight
          className="w-6 h-6"
          color={isRedoExist ? "#333333" : "#bbbbbb"}
        />
      </button>
    </div>
  );
};
export default CommandArrow;
