import { useEffect, useState } from "react";
import GuideModal from "./components/guide/GuideModal";
import PlayerList from "./components/player-list/PlayerList";
import { useAtom } from "jotai";
import { undoStackAtom } from "./stores/CommandStore";
import Toast from "./components/toast/Toast";
import "./App.css";

function App() {
  const [undoStack, setUndoStack] = useAtom(undoStackAtom);
  const [showUndoToast, setShowUndoToast] = useState(false);

  const handleKeyDown = (event: KeyboardEvent) => {
    const isMac = navigator.userAgent.toLowerCase().includes("mac");
    const ctrlKey = isMac ? event.metaKey : event.ctrlKey;

    if (ctrlKey && event.key === "z") {
      // 되돌리기 (Ctrl + Z)
      event.preventDefault();
      console.log("stack:", undoStack);

      const command = undoStack.pop();
      if (command) {
        command.undo();
        setUndoStack([...undoStack]);
        setShowUndoToast(true);
      }
    }
  };

  /** 키보드 이벤트를 최상위 컴포넌트에서 핸들링 */
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [undoStack]);

  return (
    <div className="relative w-full h-full flex flex-col items-center bg-gray-200 py-8">
      <div className="relative w-full max-w-xl flex justify-center">
        <p className="text-4xl font-bold select-none">버망호 도우미</p>
        <GuideModal />
      </div>
      <PlayerList />

      {showUndoToast && (
        <Toast key={Date.now()} ttl={1500} setter={setShowUndoToast}>
          되돌리기
        </Toast>
      )}
    </div>
  );
}

export default App;
