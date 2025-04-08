import { nanoid } from "nanoid";
import { PlayerProps } from "../components/player/Player";

/** 한 번도 하지 않은 플레이어를 맨 위로 올리고, 그 뒤로는 플레이 후 기다린 판수 내림차순으로 정렬 */
export const sortPlayers = (players: PlayerProps[]) => {
  const isNew = players.filter((p) => p.isNew);
  const notNew = players
    .filter((p) => !p.isNew)
    .sort((a, b) => b.recentPlay - a.recentPlay);
  return [...isNew, ...notNew];
};

/** 새로운 플레이어 객체를 반환 */
export const makePlayer = (isCaptain: boolean = false) => {
  return {
    id: nanoid(),
    nickname: "",
    recentPlay: 0,
    data: {
      4: {
        value: "",
      },
      5: {
        value: "",
      },
      6: {
        value: "",
      },
      8: {
        value: "",
      },
    },
    selected: false,
    isNew: true,
    isDjClassFake: false,
    isCaptain,
  } as PlayerProps;
};
