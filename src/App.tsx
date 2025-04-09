import { useEffect } from "react";
import GuideModal from "./components/guide/GuideModal";
import PlayerList from "./components/player/PlayerList";
import Toast from "./components/toast/Toast";
import "./styles/App.css";
import "./styles/animations.css";
import { useAtomValue } from "jotai";
import { toastListAtom, toastStore } from "./stores/ToastStore";
import CommandArrow from "./components/guide/CommandArrow";
import ToastViewport from "./components/toast/ToastViewport";
import { handleKeyboardCommand } from "./utils/KeyboardUtil";

function App() {
  // 토스트 팝업
  const toastList = useAtomValue(toastListAtom, { store: toastStore });

  /** 키보드 이벤트를 최상위 컴포넌트에서 핸들링 */
  useEffect(() => {
    window.addEventListener("keydown", handleKeyboardCommand);
    return () => window.removeEventListener("keydown", handleKeyboardCommand);
  }, []);

  return (
    <>
      <main className="relative w-full h-full flex flex-col items-center bg-gray-200 py-8">
        <div className="relative w-full max-w-xl flex justify-center">
          <CommandArrow />
          <h1 className="text-4xl font-bold select-none">버망호 도우미</h1>
          <GuideModal />
        </div>
        <PlayerList />
      </main>
      <ToastViewport>
        {toastList.map((toast, index) => (
          <Toast key={toast.id} index={index} {...toast} />
        ))}
      </ToastViewport>
    </>
  );
}

export default App;
