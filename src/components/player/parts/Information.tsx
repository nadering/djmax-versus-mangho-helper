import {
  ChangeEvent,
  memo,
  MouseEventHandler,
  useEffect,
  useState,
} from "react";

interface InformationProps {
  id: string;
  nickname: string;
  recentPlay: number;
  selected: boolean;
  isNew: boolean;
  onNicknameChange: (id: string, nickname: string) => void;
  onRecentPlayClick: MouseEventHandler<HTMLButtonElement>;
}

/** 최근 플레이 및 선택 여부에 따라 버튼 내 노드를 설정 */
const getRecentPlayNode = ({
  selected,
  isNew,
  recentPlay,
}: {
  selected: boolean;
  isNew: boolean;
  recentPlay: number;
}) => {
  if (selected) {
    return <span className="text-green-600 font-semibold">이번 판 (1/2)</span>;
  }
  if (isNew) {
    return (
      <span className="text-gray-600 font-semibold">플레이하지 않음!</span>
    );
  }
  if (recentPlay === 0) {
    return (
      <>
        <span className="text-gray-600 font-semibold">방금</span>
        <span className="text-gray-500"> 플레이</span>
      </>
    );
  }
  return (
    <>
      <span className="text-gray-600 font-semibold">{recentPlay}판</span>
      <span className="text-gray-500"> 전에 플레이</span>
    </>
  );
};

/** Player 컴포넌트에서 사용하며, 닉네임 및 플레이 후 지나간 판수나 플레이 여부 설정 등의 정보를 담당 */
const Information = memo(
  ({
    id,
    nickname,
    recentPlay,
    selected,
    isNew,
    onNicknameChange,
    onRecentPlayClick,
  }: InformationProps) => {
    const [innerNickname, setInnerNickname] = useState(nickname);

    /** 사용자가 닉네임을 입력하면, 보이는 닉네임은 데이터에 반영하지 않고 시각적으로만 변경 */
    const onNicknameInput = (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setInnerNickname(value);
    };

    /** 닉네임이 사용자의 입력으로 변경되었고 블러됐을 경우, 데이터의 닉네임을 변경 */
    const onNicknameBlur = () => {
      if (innerNickname !== nickname) {
        onNicknameChange(id, innerNickname);
      }
    };

    // 데이터에서 닉네임이 변경되면, 변경된 닉네임을 컴포넌트에 반영
    useEffect(() => {
      setInnerNickname((prev) => (prev !== nickname ? nickname : prev));
    }, [nickname]);

    return (
      <div className="basis-56 flex flex-col items-start justify-center gap-[2px] pl-9 py-3">
        <input
          type="text"
          value={innerNickname}
          placeholder="닉네임"
          className="w-full px-2 text-lg font-bold text-ellipsis"
          onChange={onNicknameInput}
          onBlur={onNicknameBlur}
          autoFocus={innerNickname.length === 0 && true}
        />
        <button
          title="플레이어 설정 및 최근 플레이 확인"
          className="w-full px-2 text-left cursor-pointer rounded-md hover:bg-gray-100 active:bg-gray-200"
          onClick={onRecentPlayClick}
        >
          {getRecentPlayNode({ selected, isNew, recentPlay })}
        </button>
      </div>
    );
  }
);
export default Information;
