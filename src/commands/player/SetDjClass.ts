import { PlayerProps } from "@/components/player/Player";
import Command from "..";
import { ButtonType } from "@/components/player/dj-class-dropdown/DjClassDropdown";

interface SetDjClassCommandProps {
  id: string;
  button: ButtonType;
  value: string;
  setPlayers: React.Dispatch<React.SetStateAction<PlayerProps[]>>;
}

/** DJ CLASS 설정 커맨드 */
export class SetDjClassCommand implements Command {
  private id: string;
  private button: ButtonType;
  private value: string;
  private setPlayers: React.Dispatch<React.SetStateAction<PlayerProps[]>>;

  private previousValue: string | null = null;

  constructor({ id, button, value, setPlayers }: SetDjClassCommandProps) {
    this.id = id;
    this.button = button;
    this.value = value;
    this.setPlayers = setPlayers;
  }

  execute() {
    this.setPlayers((prevPlayers) => {
      return prevPlayers.map((player) => {
        if (
          player.id === this.id &&
          player.data[this.button].value !== this.value
        ) {
          this.previousValue = player.data[this.button].value;
          player.data[this.button].value = this.value;
        }
        return { ...player };
      });
    });
  }

  undo() {
    this.setPlayers((prevPlayers) => {
      return prevPlayers.map((player) => {
        if (player.id === this.id && this.previousValue !== null) {
          player.data[this.button].value = this.previousValue;
        }
        return { ...player };
      });
    });
  }

  redo() {
    this.execute();
  }
}
