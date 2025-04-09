import { redoCommandFromStack, undoCommandFromStack } from "./CommandUtil";

/** 키보드 이벤트 핸들러 */
export const handleKeyboardCommand = (event: KeyboardEvent) => {
  const isMac = navigator.userAgent.toLowerCase().includes("mac");
  const ctrlKey = isMac ? event.metaKey : event.ctrlKey;

  if (ctrlKey && event.key === "z") {
    // 실행 취소 (Ctrl + Z)
    event.preventDefault();
    undoCommandFromStack();
  } else if (ctrlKey && event.key === "y") {
    // 다시 실행 (Ctrl + Y)
    event.preventDefault();
    redoCommandFromStack();
  }
};
