import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Check, Crown, Menu, Trash2 } from "lucide-react";
import { memo, MouseEventHandler, useRef } from "react";
import DjClassDropdown from "./DjClassDropdown";

export interface PlayerProps {
  id: string;
  recentPlay: number;
  isNew: boolean;
  isCaptain: boolean;
  isCaptainExist?: boolean;
  selected?: boolean;
}

interface PlayerHandlerProps {
  onRecentPlayClick: MouseEventHandler<HTMLButtonElement>;
  onCaptionButtonClick: MouseEventHandler<HTMLButtonElement>;
  onDeleteButtonClick: MouseEventHandler<HTMLButtonElement>;
}

/** 버망호 플레이어 */
const Player = memo(
  ({
    id,
    recentPlay,
    isNew,
    isCaptain,
    isCaptainExist = false,
    selected = false,
    onRecentPlayClick,
    onCaptionButtonClick,
    onDeleteButtonClick,
  }: PlayerProps & PlayerHandlerProps) => {
    // 위장 DJ CLASS 포커스 제거를 위한 Ref
    const inputRef = useRef<HTMLInputElement>(null);

    // 드래그
    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({ id });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };

    // 다른 사람들 중 선장이 있는지 여부
    const isCaptainAnother = isCaptainExist && !isCaptain;

    /** 선장 여부에 따라 선장 아이콘 색상 설정 */
    const getCaptainColor = (isCaptain: boolean, isCaptainExist: boolean) => {
      if (isCaptain) {
        return "#51bb93";
      } else if (isCaptainExist) {
        return "#dddddd";
      } else {
        return "#999999";
      }
    };

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
        return (
          <span className="text-green-600 font-semibold">이번 판 (1/2)</span>
        );
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

    return (
      <li
        ref={setNodeRef}
        style={style}
        className="relative w-full h-20 flex gap-2 bg-white rounded-lg shadow-md select-none"
      >
        {/* 드래그 */}
        <button
          title="드래그"
          className="absolute left-0 w-9 h-full flex items-center justify-center px-2 rounded-l-lg cursor-grab duration-100
          hover:bg-gray-100 active:cursor-grabbing active:bg-gray-200"
          {...attributes}
          {...listeners}
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* 닉네임 및 최근 플레이 정보 */}
        <div className="basis-56 flex flex-col items-start justify-center gap-[2px] pl-9 py-3">
          <input
            type="text"
            placeholder="닉네임"
            className="w-full px-2 text-lg font-bold text-ellipsis"
            autoFocus
          />
          <button
            title="플레이어 설정 및 최근 플레이 확인"
            className="w-full px-2 text-left cursor-pointer rounded-md hover:bg-gray-100 active:bg-gray-200"
            onClick={onRecentPlayClick}
          >
            {getRecentPlayNode({ selected, isNew, recentPlay })}
          </button>
        </div>

        {/* DJ CLASS */}
        <div className="flex shrink-0 gap-2 pr-11">
          <label
            title="DJ CLASS랑 실력이 다를 때 체크 후, 예상 DJ CLASS 설정"
            htmlFor={`fake-${id}`}
            className="group h-full flex flex-col items-center justify-center px-1 gap-[2px] cursor-pointer"
            onMouseOut={() => inputRef.current?.blur()}
          >
            <span className="text-sm font-medium">위장</span>
            <input
              ref={inputRef}
              id={`fake-${id}`}
              type="checkbox"
              className="sr-only peer"
            />
            <div
              className="w-4 h-4 border rounded-md flex items-center justify-center border-gray-400 duration-100
                group-hover:bg-blue-300! group-hover:border-blue-300! peer-focus:bg-blue-300! peer-focus:border-blue-300!
                peer-checked:bg-blue-400 peer-checked:border-blue-400 peer-checked:*:visible"
              aria-hidden
            >
              <Check className="w-3 h-3 invisible" color="#ffffff" />
            </div>
          </label>

          <div className="grid grid-cols-2 grid-rows-2 gap-x-1 gap-y-4 py-3">
            <DjClassDropdown button="4키" />
            <DjClassDropdown button="5키" />
            <DjClassDropdown button="6키" />
            <DjClassDropdown button="8키" />
          </div>
        </div>

        {/* 컨트롤 버튼 */}
        <div className="absolute right-0 w-11 h-full flex flex-col justify-center px-3 gap-3">
          <button
            title="선장"
            className={`${isCaptainAnother ? "" : "cursor-pointer duration-100 hover:scale-120"}`}
            disabled={isCaptainAnother}
            onClick={onCaptionButtonClick}
          >
            <Crown
              className="w-5 h-5"
              color={getCaptainColor(isCaptain, isCaptainExist)}
            />
          </button>
          <button
            title="삭제"
            className="cursor-pointer duration-100 hover:scale-120"
            onClick={onDeleteButtonClick}
          >
            <Trash2 className="w-5 h-5" color="#ff0f0f" />
          </button>
        </div>
      </li>
    );
  }
);

export default Player;
