import Command from "..";
import { PlayerProps } from "@/components/player/Player";
import { MAXIMUM_PLAYER } from "@/constants/Player";
import { makePlayer } from "@/utils/PlayerUtil";

/** 플레이어 추가 커맨드 */
export class AddPlayerCommand implements Command {
  private deletedPlayer: PlayerProps | undefined;

  constructor(
    private setPlayers: React.Dispatch<React.SetStateAction<PlayerProps[]>>
  ) {}

  execute() {
    this.setPlayers((prevPlayers) => {
      if (prevPlayers.length >= MAXIMUM_PLAYER) {
        return prevPlayers;
      }

      const newPlayer = makePlayer();
      if (prevPlayers.length === 0) {
        newPlayer.isCaptain = true;
      }

      return [newPlayer, ...prevPlayers];
    });
  }

  undo() {
    this.setPlayers((prev) => {
      this.deletedPlayer = prev.at(0);
      return prev.slice(1);
    });
  }

  redo() {
    this.setPlayers((prev) => {
      if (this.deletedPlayer) {
        return [{ ...this.deletedPlayer }, ...prev];
      } else {
        return prev;
      }
    });
  }
}
