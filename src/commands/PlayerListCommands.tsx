import Command, { MAXIMUM_PLAYER } from ".";
import { PlayerProps } from "../components/player/Player";
import { makePlayer, sortPlayers } from "../utils/PlayerListUtil";
import { arrayMove } from "@dnd-kit/sortable";

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

interface DeletePlayerCommandProps {
  id: string;
  setPlayers: React.Dispatch<React.SetStateAction<PlayerProps[]>>;
  setSelectedPlayerId: React.Dispatch<React.SetStateAction<string | null>>;
}

/** 플레이어 삭제 커맨드 */
export class DeletePlayerCommand implements Command {
  private id: string;
  private setPlayers: React.Dispatch<React.SetStateAction<PlayerProps[]>>;
  private setSelectedPlayerId: React.Dispatch<
    React.SetStateAction<string | null>
  >;

  private deletedIndex: number | null = null;
  private deletedPlayer: PlayerProps | undefined;

  constructor({
    id,
    setPlayers,
    setSelectedPlayerId,
  }: DeletePlayerCommandProps) {
    this.id = id;
    this.setPlayers = setPlayers;
    this.setSelectedPlayerId = setSelectedPlayerId;
  }

  execute() {
    this.setPlayers((prevPlayers) => {
      this.deletedIndex = prevPlayers.findIndex((p) => p.id === this.id);
      this.deletedPlayer = { ...prevPlayers[this.deletedIndex] };

      // 플레이할 사람으로 선택했었다면, 선택 해제
      // Undo되어도 선택 해제 상태로 유지
      this.setSelectedPlayerId((prevSelectedId) => {
        if (
          this.deletedIndex !== null &&
          this.deletedPlayer !== undefined &&
          prevSelectedId === this.deletedPlayer.id
        ) {
          return null;
        }
        return prevSelectedId;
      });

      return prevPlayers.filter((p) => p.id !== this.id);
    });
  }

  undo() {
    const index = this.deletedIndex;
    const player = this.deletedPlayer;

    if (typeof index === "number" && player !== undefined) {
      this.setPlayers((prev) => {
        const before = prev.slice(0, index);
        const after = prev.slice(index);
        const restored = [...before, player, ...after];

        // 디버깅용 로그
        if (restored.some((p) => !p || typeof p.id !== "string")) {
          console.warn("복원된 플레이어 리스트에 문제가 있습니다:", restored);
        }

        return restored;
      });

      this.deletedIndex = null;
      this.deletedPlayer = undefined;
    }
  }
}

interface MovePlayerCommandProps {
  fromIndex: number;
  toIndex: number;
  setPlayers: React.Dispatch<React.SetStateAction<PlayerProps[]>>;
}

/** 플레이어 드래그 이동 커맨드 */
export class MovePlayerCommand implements Command {
  private fromIndex: number;
  private toIndex: number;
  private setPlayers: React.Dispatch<React.SetStateAction<PlayerProps[]>>;

  constructor({ fromIndex, toIndex, setPlayers }: MovePlayerCommandProps) {
    this.fromIndex = fromIndex;
    this.toIndex = toIndex;
    this.setPlayers = setPlayers;
  }

  execute() {
    this.setPlayers((prevPlayers) => {
      return arrayMove(prevPlayers, this.fromIndex, this.toIndex);
    });
  }

  undo() {
    this.setPlayers((prevPlayers) => {
      return arrayMove(prevPlayers, this.toIndex, this.fromIndex);
    });
  }
}

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
