import { addPlayerCommandRunner } from "@/commands/player/runner/AddPlayerRunner";
import { redoCommandFromStack, undoCommandFromStack } from "./CommandUtil";
import { COMMAND_WAITING_TIME } from "@/constants/Command";

/** 키보드 이벤트 핸들러 */
export const handleKeyboardCommand = (event: KeyboardEvent) => {
  const isMac = navigator.userAgent.toLowerCase().includes("mac");
  const ctrlKey = isMac ? event.metaKey : event.ctrlKey;
  const altKey = event.altKey;

  if (ctrlKey && event.key === "z") {
    // 실행 취소 (Ctrl + Z)
    event.preventDefault();
    undoCommandFromStack();
  } else if (ctrlKey && event.key === "y") {
    // 다시 실행 (Ctrl + Y)
    event.preventDefault();
    redoCommandFromStack();
  } else if (altKey && event.key === "n") {
    // 플레이어 추가 (Alt + N)
    event.preventDefault();

    // 닉네임을 입력하던 게 있다면, onBlur 이벤트로 해당 닉네임 변경을 우선 반영
    const activeElement = document.activeElement as HTMLElement | null;
    if (activeElement?.dataset.nicknameInput !== undefined) {
      activeElement.blur();
    }

    // 이전 커맨드가 완료될 때까지 대기 후 실행
    setTimeout(() => {
      addPlayerCommandRunner();
    }, COMMAND_WAITING_TIME);
  }
};
