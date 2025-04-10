import { playerDispatcherAtom, playerStore } from "@/stores/PlayerStore";
import { AddPlayerCommand } from "../AddPlayer";
import { runCommand } from "@/utils/CommandUtil";

/** 플레이어 외부에서 사용할 수 있는 플레이어 추가 기능 */
export const addPlayerCommandRunner = () => {
  const setPlayers = playerStore.get(playerDispatcherAtom);
  if (setPlayers !== null) {
    runCommand(new AddPlayerCommand(setPlayers));
  }
};
