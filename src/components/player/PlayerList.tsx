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
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import AddPlayerButton from "./AddPlayerButton";
import Player, { PlayerProps } from "./Player";
import { OnDjClassSelectProps } from "./dj-class-dropdown/DjClassDropdown";
import { makePlayer } from "@/utils/PlayerUtil";
import {
  AddPlayerCommand,
  DeletePlayerCommand,
  MovePlayerCommand,
  SetCaptainCommand,
  SetDjClassCommand,
  SetDjClassFakeCommand,
  SetNicknameCommand,
  SetRecentPlayCommand,
} from "@/commands/player";
import { runCommand } from "@/utils/CommandUtil";
import { MAXIMUM_PLAYER } from "@/constants/Player";
import { useSetAtom } from "jotai";
import { playerDispatcherAtom, playerStore } from "@/stores/PlayerStore";

const initialPlayer = makePlayer(true);
const initialPlayers: PlayerProps[] = [initialPlayer];

/** 버망호 플레이어 목록 */
const PlayerList = () => {
  // 플레이어
  const [players, setPlayers] = useState(initialPlayers);
  const [selectedPlayerId, setSelectedPlayerId] = useState<string | null>(null);
  const isCaptainExist = useMemo(
    () => players.some((p) => p.isCaptain),
    [players]
  );

  // 드래그
  const sensors = useSensors(useSensor(PointerSensor));

  // Dispatcher
  const setDispatcher = useSetAtom(playerDispatcherAtom, {
    store: playerStore,
  });

  // 커맨드 목록
  const handleAddButton = () => {
    runCommand(new AddPlayerCommand(setPlayers));
  };

  const handleNickname = (id: string, nickname: string) => {
    runCommand(new SetNicknameCommand({ id, nickname, setPlayers }));
  };

  const handleRecentPlayButton = (id: string) => {
    runCommand(
      new SetRecentPlayCommand({
        id,
        setPlayers,
        setSelectedPlayerId,
      })
    );
  };

  const handleDjClassFake = (
    id: string,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const checked = event.target.checked;
    runCommand(new SetDjClassFakeCommand({ id, checked, setPlayers }));
  };

  const handleDjClassSelect = ({ id, button, value }: OnDjClassSelectProps) => {
    runCommand(new SetDjClassCommand({ id, button, value, setPlayers }));
  };

  const handleCaptainButton = (id: string) => {
    runCommand(
      new SetCaptainCommand({
        id,
        setPlayers,
      })
    );
  };

  const handleDeleteButton = (id: string) => {
    runCommand(
      new DeletePlayerCommand({
        id,
        setPlayers,
        setSelectedPlayerId,
      })
    );
  };

  /** 컴포넌트 드래그 이벤트가 종료되면, 리스트에서 인덱스를 변경 */
  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const fromIndex = players.findIndex((p) => p.id === active.id);
    const toIndex = players.findIndex((p) => p.id === over.id);

    runCommand(
      new MovePlayerCommand({
        fromIndex,
        toIndex,
        setPlayers,
      })
    );
  };

  // 전역으로 setPlayers 등록
  useEffect(() => {
    setDispatcher(setPlayers);
  }, [setPlayers]);

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
        <ul
          className="w-full min-w-110 max-w-xl flex flex-col gap-2 p-4"
          role="list"
        >
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
