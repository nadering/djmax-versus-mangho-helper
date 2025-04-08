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
} from "@dnd-kit/sortable";
import { ChangeEvent, useState } from "react";
import AddPlayerButton from "./AddPlayerButton";
import { MAXIMUM_PLAYER } from "../../commands";
import { useSetAtom } from "jotai";
import { pushUndoAtom } from "../../stores/CommandStore";
import Player, { PlayerProps } from "./Player";
import { OnDjClassSelectProps } from "./dj-class-dropdown/DjClassDropdown";
import { makePlayer } from "../../utils/PlayerListUtil";
import {
  AddPlayerCommand,
  DeletePlayerCommand,
  MovePlayerCommand,
  SetCaptainCommand,
  SetRecentPlayCommand,
} from "../../commands/player";

const initialPlayer = makePlayer(true);
const initialPlayers: PlayerProps[] = [initialPlayer];

/** 버망호 플레이어 목록 */
const PlayerList = () => {
  const [players, setPlayers] = useState(initialPlayers);
  const [selectedPlayerId, setSelectedPlayerId] = useState<string | null>(null);
  const isCaptainExist = players.some((p) => p.isCaptain);

  // Undo 전역 상태
  const pushUndo = useSetAtom(pushUndoAtom);

  // 드래그
  const sensors = useSensors(useSensor(PointerSensor));

  // 단순 이벤트 핸들러
  const handleNickname = (id: string, event: ChangeEvent<HTMLInputElement>) => {
    setPlayers((prevPlayers) => {
      return prevPlayers.map((player) => {
        if (player.id === id) {
          player.nickname = event.target.value;
        }
        return { ...player };
      });
    });
  };

  const handleDjClassFake = (
    id: string,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setPlayers((prevPlayers) => {
      return prevPlayers.map((player) => {
        if (player.id === id) {
          player.isDjClassFake = event.target.checked;
        }
        return { ...player };
      });
    });
  };

  const handleDjClassSelect = ({ id, button, value }: OnDjClassSelectProps) => {
    setPlayers((prevPlayers) => {
      return prevPlayers.map((player) => {
        if (player.id === id) {
          player.data[button].value = value;
        }
        return { ...player };
      });
    });
  };

  // 커맨드
  const handleAddButton = () => {
    const command = new AddPlayerCommand(setPlayers);
    command.execute();
    pushUndo(command);
  };

  const handleDeleteButton = (id: string) => {
    const command = new DeletePlayerCommand({
      id,
      setPlayers,
      setSelectedPlayerId,
    });
    command.execute();
    pushUndo(command);
  };

  const handleRecentPlayButton = (id: string) => {
    const command = new SetRecentPlayCommand({
      id,
      setPlayers,
      setSelectedPlayerId,
    });
    command.execute();
    pushUndo(command);
  };

  const handleCaptainButton = (id: string) => {
    const command = new SetCaptainCommand({
      id,
      setPlayers,
    });
    command.execute();
    pushUndo(command);
  };

  /** 컴포넌트 드래그 이벤트가 종료되면, 리스트에서 인덱스를 변경 */
  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const fromIndex = players.findIndex((p) => p.id === active.id);
    const toIndex = players.findIndex((p) => p.id === over.id);

    const command = new MovePlayerCommand({
      fromIndex,
      toIndex,
      setPlayers,
    });
    command.execute();
    pushUndo(command);
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
          {players.length < MAXIMUM_PLAYER && (
            <AddPlayerButton onClick={handleAddButton} />
          )}
          {players.map((player) => (
            <Player.Draggable key={player.id} {...player}>
              <Player.Information
                {...player}
                selected={selectedPlayerId === player.id}
                onNicknameChange={handleNickname}
                onRecentPlayClick={() => handleRecentPlayButton(player.id)}
              />
              <Player.DjClass
                {...player}
                onDjClassFakeChange={handleDjClassFake}
                onDjClassSelect={handleDjClassSelect}
              />
              <Player.Control
                {...player}
                isCaptainExist={isCaptainExist}
                onCaptainButtonClick={() => handleCaptainButton(player.id)}
                onDeleteButtonClick={() => handleDeleteButton(player.id)}
              />
            </Player.Draggable>
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  );
};
export default PlayerList;
