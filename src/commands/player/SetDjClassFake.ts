import { PlayerProps } from "@/components/player/Player";
import Command from "..";

interface SetDjClassFakeCommandProps {
  id: string;
  checked: boolean;
  setPlayers: React.Dispatch<React.SetStateAction<PlayerProps[]>>;
}

/** DJ CLASS 위장 여부 설정 커맨드 */
export class SetDjClassFakeCommand implements Command {
  private id: string;
  private checked: boolean;
  private setPlayers: React.Dispatch<React.SetStateAction<PlayerProps[]>>;

  constructor({ id, checked, setPlayers }: SetDjClassFakeCommandProps) {
    this.id = id;
    this.checked = checked;
    this.setPlayers = setPlayers;
  }

  execute() {
    this.setPlayers((prevPlayers) => {
      return prevPlayers.map((player) => {
        if (player.id === this.id) {
          return { ...player, isDjClassFake: this.checked };
        }
        return { ...player };
      });
    });
  }

  undo() {
    this.setPlayers((prevPlayers) => {
      return prevPlayers.map((player) => {
        if (player.id === this.id) {
          return { ...player, isDjClassFake: !player.isDjClassFake };
        }
        return { ...player };
      });
    });
  }

  redo() {
    this.execute();
  }
}
