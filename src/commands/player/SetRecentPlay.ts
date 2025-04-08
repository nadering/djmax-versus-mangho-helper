import Command from "..";
import { PlayerProps } from "../../components/player/Player";
import { sortPlayers } from "../../utils/PlayerListUtil";

interface SetRecentPlayCommandProps {
  id: string;
  setPlayers: React.Dispatch<React.SetStateAction<PlayerProps[]>>;
  setSelectedPlayerId: React.Dispatch<React.SetStateAction<string | null>>;
}

/** 최근 플레이 설정 커맨드 */
export class SetRecentPlayCommand implements Command {
  private id: string;

  private previousPlayers: PlayerProps[] | null = null;
  private previousSelectedPlayerId: string | null = null;

  private setPlayers: React.Dispatch<React.SetStateAction<PlayerProps[]>>;
  private setSelectedPlayerId: React.Dispatch<
    React.SetStateAction<string | null>
  >;

  constructor({
    id,
    setPlayers,
    setSelectedPlayerId,
  }: SetRecentPlayCommandProps) {
    this.id = id;
    this.setPlayers = setPlayers;
    this.setSelectedPlayerId = setSelectedPlayerId;
  }

  execute() {
    let capturedPrevPlayers: PlayerProps[] = [];

    this.setPlayers((prevPlayers) => {
      capturedPrevPlayers = prevPlayers.map((p) => ({ ...p }));
      return prevPlayers; // 일단 여기서 복사만 하고 변화는 setSelectedPlayerId 내부에서
    });

    this.setSelectedPlayerId((prevSelectedId) => {
      this.previousPlayers = capturedPrevPlayers;

      if (prevSelectedId === null) {
        // 한 명을 고른 경우
        this.previousSelectedPlayerId = null;
        return this.id;
      }

      if (prevSelectedId === this.id) {
        // 선택한 사람을 다시 고른 경우
        this.previousSelectedPlayerId = this.id;
        return null;
      }

      // 두 명을 모두 고른 경우
      this.previousSelectedPlayerId = prevSelectedId;

      this.setPlayers(() => {
        const updated = capturedPrevPlayers.map((p) => {
          if (p.id === this.id || p.id === prevSelectedId) {
            return { ...p, recentPlay: 0, isNew: false };
          }
          return { ...p, recentPlay: p.recentPlay + 1 };
        });

        return sortPlayers(updated);
      });

      return null;
    });
  }

  undo() {
    if (this.previousSelectedPlayerId !== null) {
      const restoreId = this.previousSelectedPlayerId;
      this.setSelectedPlayerId(() => restoreId);
      this.previousSelectedPlayerId = null;
    } else {
      this.setSelectedPlayerId(() => null);
    }

    if (this.previousPlayers !== null) {
      // 깊은 복사로 완전히 새로운 배열 반환
      const restored = this.previousPlayers.map((p) => ({ ...p }));
      this.setPlayers(() => restored);
      this.previousPlayers = null;
    }
  }
}
