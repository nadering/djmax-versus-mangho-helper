import Command from "..";
import { PlayerProps } from "../../components/player/Player";

interface SetCaptainCommandProps {
  id: string;
  setPlayers: React.Dispatch<React.SetStateAction<PlayerProps[]>>;
}

/** 선장 설정 커맨드 */
export class SetCaptainCommand implements Command {
  private id: string;
  private setPlayers: React.Dispatch<React.SetStateAction<PlayerProps[]>>;

  constructor({ id, setPlayers }: SetCaptainCommandProps) {
    this.id = id;
    this.setPlayers = setPlayers;
  }

  execute() {
    this.setPlayers((prev) => {
      const updated = prev.map((p) =>
        p.id === this.id ? { ...p, isCaptain: !p.isCaptain } : p
      );
      return updated;
    });
  }

  undo() {
    this.setPlayers((prev) => {
      const isCaptainExist = prev.some((p) => p.isCaptain);
      if (isCaptainExist) {
        return prev.map((p) => ({ ...p, isCaptain: false }));
      } else {
        return prev.map((p) =>
          p.id === this.id ? { ...p, isCaptain: true } : p
        );
      }
    });
  }
}
