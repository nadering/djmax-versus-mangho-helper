import { arrayMove } from "@dnd-kit/sortable";
import Command from "..";
import { PlayerProps } from "@/components/player/Player";

interface MovePlayerCommandProps {
  fromIndex: number;
  toIndex: number;
  setPlayers: React.Dispatch<React.SetStateAction<PlayerProps[]>>;
}

/** 플레이어 드래그 이동 커맨드 */
export class MovePlayerCommand implements Command {
  private fromIndex: number;
  private toIndex: number;
  private setPlayers: React.Dispatch<React.SetStateAction<PlayerProps[]>>;

  constructor({ fromIndex, toIndex, setPlayers }: MovePlayerCommandProps) {
    this.fromIndex = fromIndex;
    this.toIndex = toIndex;
    this.setPlayers = setPlayers;
  }

  execute() {
    this.setPlayers((prevPlayers) => {
      return arrayMove(prevPlayers, this.fromIndex, this.toIndex);
    });
  }

  undo() {
    this.setPlayers((prevPlayers) => {
      return arrayMove(prevPlayers, this.toIndex, this.fromIndex);
    });
  }

  redo() {
    this.execute();
  }
}
