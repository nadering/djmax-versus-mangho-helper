import { PlusCircleIcon } from "lucide-react";
import { ButtonHTMLAttributes, memo } from "react";

interface AddPlayerButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {}

/** 새로운 플레이어를 추가하는 버튼 */
const AddPlayerButton = memo(({ onClick }: AddPlayerButtonProps) => {
  return (
    <button
      title="플레이어 추가"
      className="group relative w-full h-10 flex items-center justify-center gap-2 bg-white rounded-lg shadow-md select-none duration-100 cursor-pointer
      hover:bg-gray-100 active:bg-gray-200"
      onClick={onClick}
      type="button"
      aria-label="플레이어 추가"
    >
      <PlusCircleIcon
        className="w-6 h-6 text-gray-500 group-hover:text-gray-600"
        aria-hidden
      />
    </button>
  );
});
export default AddPlayerButton;
