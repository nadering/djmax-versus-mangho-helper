import { Crown, Trash2 } from "lucide-react";
import { memo, MouseEventHandler } from "react";

interface ControlProps {
  isCaptain: boolean;
  isCaptainExist: boolean;
  onCaptainButtonClick: MouseEventHandler<HTMLButtonElement>;
  onDeleteButtonClick: MouseEventHandler<HTMLButtonElement>;
}

/** Plyaer 컴포넌트에서 사용하며, 컨트롤 버튼 2종(선장, 삭제) 담당 */
const Control = memo(
  ({
    isCaptain,
    isCaptainExist,
    onCaptainButtonClick,
    onDeleteButtonClick,
  }: ControlProps) => {
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

    return (
      <div className="absolute right-0 w-11 h-full flex flex-col justify-center px-3 gap-3">
        <button
          title="선장"
          className={`${isCaptainAnother ? "" : "cursor-pointer duration-100 hover:scale-120"}`}
          disabled={isCaptainAnother}
          onClick={onCaptainButtonClick}
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
    );
  }
);
export default Control;
