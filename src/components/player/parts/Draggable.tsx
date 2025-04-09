import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Menu } from "lucide-react";
import { memo } from "react";

interface DraggableProps {
  id: string;
  children: React.ReactNode;
}

/** Player 컴포넌트에서 사용하며, 컴포넌트의 드래그 기능 및 전체 구조를 담당 */
const Draggable = memo(({ id, children }: DraggableProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      className="relative w-full h-20 flex gap-2 bg-white rounded-lg shadow-md select-none"
      role="listitem"
    >
      <button
        title="드래그"
        className="absolute left-0 w-9 h-full flex items-center justify-center px-2 rounded-l-lg cursor-grab duration-100
          hover:bg-gray-100 active:cursor-grabbing active:bg-gray-200"
        type="button"
        aria-label="플레이어 드래그 핸들"
        {...attributes}
        {...listeners}
      >
        <Menu className="w-5 h-5" aria-hidden />
      </button>
      {children}
    </li>
  );
});
export default Draggable;
