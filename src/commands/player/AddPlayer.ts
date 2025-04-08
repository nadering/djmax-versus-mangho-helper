import Command, { MAXIMUM_PLAYER } from "..";
import { PlayerProps } from "../../components/player/Player";
import { makePlayer } from "../../utils/PlayerListUtil";

/** 플레이어 추가 커맨드 */
export class AddPlayerCommand implements Command {
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
    this.setPlayers((prev) => prev.slice(1));
  }
}
