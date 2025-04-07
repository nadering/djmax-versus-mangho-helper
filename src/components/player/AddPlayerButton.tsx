import { PlusCircleIcon } from "lucide-react";
import { ButtonHTMLAttributes, memo } from "react";

interface AddPlayerButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {}

/** 새로운 플레이어를 추가하는 버튼 */
const AddPlayerButton = memo(({ onClick }: AddPlayerButtonProps) => {
  return (
    <button
      className="relative w-full h-10 flex items-center justify-center gap-2 bg-white rounded-lg shadow-md select-none duration-100 cursor-pointer
      hover:bg-gray-100 active:bg-gray-200"
      onClick={onClick}
    >
      <PlusCircleIcon className="w-6 h-6" color="#999999" />
    </button>
  );
});
export default AddPlayerButton;
