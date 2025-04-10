import { playerDispatcherAtom, playerStore } from "@/stores/PlayerStore";
import { AddPlayerCommand } from "../AddPlayer";
import { runCommand } from "@/utils/CommandUtil";
import { MAXIMUM_PLAYER } from "@/constants/Player";

/** 플레이어 외부에서 사용할 수 있는 플레이어 추가 기능 */
export const addPlayerCommandRunner = () => {
  const dispatcher = playerStore.get(playerDispatcherAtom);
  if (dispatcher !== null) {
    const setPlayers = dispatcher.setPlayers;
    let playerCount = 0;

    // 현재 사람 수를 확인하고, 최대치 이상이라면 커맨드를 실행하지 않음
    setPlayers((prev) => {
      playerCount = prev.length;
      return prev;
    });

    if (playerCount < MAXIMUM_PLAYER) {
      runCommand(new AddPlayerCommand(dispatcher.setPlayers));
    }
  }
};
