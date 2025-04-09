import Command from "..";
import { PlayerProps } from "@/components/player/Player";

interface DeletePlayerCommandProps {
  id: string;
  setPlayers: React.Dispatch<React.SetStateAction<PlayerProps[]>>;
  setSelectedPlayerId: React.Dispatch<React.SetStateAction<string | null>>;
}

/** 플레이어 삭제 커맨드 */
export class DeletePlayerCommand implements Command {
  private id: string;
  private setPlayers: React.Dispatch<React.SetStateAction<PlayerProps[]>>;
  private setSelectedPlayerId: React.Dispatch<
    React.SetStateAction<string | null>
  >;

  private deletedIndex: number | null = null;
  private deletedPlayer: PlayerProps | undefined;

  constructor({
    id,
    setPlayers,
    setSelectedPlayerId,
  }: DeletePlayerCommandProps) {
    this.id = id;
    this.setPlayers = setPlayers;
    this.setSelectedPlayerId = setSelectedPlayerId;
  }

  execute() {
    this.setPlayers((prevPlayers) => {
      this.deletedIndex = prevPlayers.findIndex((p) => p.id === this.id);
      this.deletedPlayer = { ...prevPlayers[this.deletedIndex] };

      // 플레이할 사람으로 선택했었다면, 선택 해제
      // Undo되어도 선택 해제 상태로 유지
      this.setSelectedPlayerId((prevSelectedId) => {
        if (
          this.deletedIndex !== null &&
          this.deletedPlayer !== undefined &&
          prevSelectedId === this.deletedPlayer.id
        ) {
          return null;
        }
        return prevSelectedId;
      });

      return prevPlayers.filter((p) => p.id !== this.id);
    });
  }

  undo() {
    const index = this.deletedIndex;
    const player = this.deletedPlayer;

    if (typeof index === "number" && player !== undefined) {
      this.setPlayers((prev) => {
        const before = prev.slice(0, index);
        const after = prev.slice(index);
        const restored = [...before, player, ...after];

        return restored;
      });

      this.deletedIndex = null;
      this.deletedPlayer = undefined;
    }
  }

  redo() {
    this.execute();
  }
}
