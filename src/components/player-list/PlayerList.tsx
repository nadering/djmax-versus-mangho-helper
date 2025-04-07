import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { useState } from "react";
import Player, { PlayerProps } from "../player/Player";
import { nanoid } from "nanoid";
import AddPlayerButton from "../player/AddPlayerButton";

const initialPlayers: PlayerProps[] = [
  {
    id: nanoid(),
    recentPlay: 0,
    isCaptain: true,
    isNew: true,
  },
];

/** 한 번도 하지 않은 플레이어를 맨 위로 올리고, 그 뒤로는 플레이 후 기다린 판수 내림차순으로 정렬 */
function sortPlayers(players: PlayerProps[]) {
  const isNew = players.filter((p) => p.isNew);
  const notNew = players
    .filter((p) => !p.isNew)
    .sort((a, b) => b.recentPlay - a.recentPlay);
  return [...isNew, ...notNew];
}

/** 버망호 플레이어 목록 */
const PlayerList = () => {
  const [players, setPlayers] = useState(initialPlayers);
  const [selectedPlayerId, setSelectedPlayerId] = useState<string | null>(null);
  const isCaptainExist = players.some((p) => p.isCaptain);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleAddButton = () => {
    if (players.length >= 8) {
      return;
    }

    const newPlayer: PlayerProps = {
      id: nanoid(),
      recentPlay: 0,
      isCaptain: false,
      isNew: true,
    };
    if (players.length === 0) {
      newPlayer.isCaptain = true;
    }

    setPlayers([newPlayer, ...players]);
  };

  const handleRecentPlayButton = (id: string) => {
    if (selectedPlayerId === null) {
      setSelectedPlayerId(id);
    } else if (selectedPlayerId === id) {
      setSelectedPlayerId(null);
    } else {
      const updated = players.map((p) => {
        if (p.id === id || p.id === selectedPlayerId) {
          return { ...p, recentPlay: 0, isNew: false };
        }
        return { ...p, recentPlay: p.recentPlay + 1 };
      });

      setPlayers(sortPlayers(updated));
      setSelectedPlayerId(null);
    }
  };

  const handleCaptainButton = (id: string) => {
    const updated = players.map((p) =>
      p.id === id ? { ...p, isCaptain: !p.isCaptain } : p
    );
    setPlayers(updated);
  };

  const handleDeleteButton = (id: string) => {
    setPlayers(players.filter((p) => p.id !== id));
  };

  /** 컴포넌트 드래그 이벤트가 종료되면, 리스트에서 인덱스를 변경 */
  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = players.findIndex((p) => p.id === active.id);
    const newIndex = players.findIndex((p) => p.id === over.id);
    const reordered = arrayMove(players, oldIndex, newIndex);
    setPlayers(reordered); // 사용자 드래그 → 정렬 무시하고 그대로 반영
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={players.map((player) => player.id)}
        strategy={verticalListSortingStrategy}
      >
        <ul className="w-full min-w-110 max-w-xl flex flex-col gap-2 p-4">
          {players.length < 8 && <AddPlayerButton onClick={handleAddButton} />}
          {players.map((player) => (
            <Player
              key={player.id}
              {...player}
              isCaptainExist={isCaptainExist}
              selected={player.id === selectedPlayerId}
              onRecentPlayClick={() => handleRecentPlayButton(player.id)}
              onCaptionButtonClick={() => handleCaptainButton(player.id)}
              onDeleteButtonClick={() => handleDeleteButton(player.id)}
            />
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  );
};
export default PlayerList;
