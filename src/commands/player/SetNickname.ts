import { PlayerProps } from "@/components/player/Player";
import Command from "..";

interface SetNicknameCommandProps {
  id: string;
  nickname: string;
  setPlayers: React.Dispatch<React.SetStateAction<PlayerProps[]>>;
}

/** 닉네임 변경 커맨드 */
export class SetNicknameCommand implements Command {
  private id: string;
  private nickname: string;
  private setPlayers: React.Dispatch<React.SetStateAction<PlayerProps[]>>;

  private beforeChangeNickname: string | null = null;

  constructor({ id, nickname, setPlayers }: SetNicknameCommandProps) {
    this.id = id;
    this.nickname = nickname;
    this.setPlayers = setPlayers;
  }

  execute() {
    this.setPlayers((prevPlayers) => {
      return prevPlayers.map((player) => {
        if (player.id === this.id && player.nickname !== this.nickname) {
          this.beforeChangeNickname = player.nickname;
          return { ...player, nickname: this.nickname };
        }
        return { ...player };
      });
    });
  }

  undo() {
    this.setPlayers((prevPlayers) => {
      return prevPlayers.map((player) => {
        if (player.id === this.id && this.beforeChangeNickname !== null) {
          return { ...player, nickname: this.beforeChangeNickname };
        }
        return { ...player };
      });
    });
    this.beforeChangeNickname = null;
  }

  redo() {
    this.execute();
  }
}
