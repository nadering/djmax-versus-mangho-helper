import "./App.css";
import GuideModal from "./components/guide/GuideModal";
import PlayerList from "./components/player-list/PlayerList";

function App() {
  return (
    <div className="relative w-full h-full flex flex-col items-center bg-gray-200 py-8">
      <div className="relative w-full max-w-xl flex justify-center">
        <p className="text-4xl font-bold select-none">버망호 도우미</p>
        <GuideModal />
      </div>
      <PlayerList />
    </div>
  );
}

export default App;
