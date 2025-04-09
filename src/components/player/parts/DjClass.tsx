import { Check } from "lucide-react";
import { ChangeEvent, memo, useRef } from "react";
import DjClassDropdown, {
  DjClassProps,
  OnDjClassSelectProps,
} from "../dj-class-dropdown/DjClassDropdown";

export interface DjClassDataProps {
  4: DjClassProps;
  5: DjClassProps;
  6: DjClassProps;
  8: DjClassProps;
}

interface DjClassComponentProps {
  id: string;
  data: DjClassDataProps;
  isDjClassFake: boolean;
  onDjClassFakeChange: (
    id: string,
    event: ChangeEvent<HTMLInputElement>
  ) => void;
  onDjClassSelect: ({ id, button, value }: OnDjClassSelectProps) => void;
}

/** Player 컴포넌트에서 사용하며, DJ CLASS 위장 여부 및 데이터를 담당 */
const DjClass = memo(
  ({
    id,
    data,
    isDjClassFake,
    onDjClassFakeChange,
    onDjClassSelect,
  }: DjClassComponentProps) => {
    const inputRef = useRef<HTMLInputElement>(null);

    return (
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
            className="sr-only peer"
            id={`fake-${id}`}
            type="checkbox"
            checked={isDjClassFake}
            onChange={(event) => onDjClassFakeChange(id, event)}
          />
          <div
            className="w-4 h-4 border rounded-md flex items-center justify-center border-gray-400 duration-100
              group-hover:bg-blue-300! group-hover:border-blue-300! peer-focus:bg-blue-300! peer-focus:border-blue-300!
              peer-checked:bg-blue-400 peer-checked:border-blue-400 peer-checked:*:visible"
            aria-hidden
          >
            <Check className="w-3 h-3 invisible" color="#ffffff" aria-hidden />
          </div>
        </label>
        <div className="grid grid-cols-2 grid-rows-2 gap-x-1 gap-y-4 py-3">
          {(["4", "5", "6", "8"] as const).map((key) => (
            <DjClassDropdown
              key={key}
              id={id}
              button={key}
              value={data[key].value}
              onDjClassSelect={onDjClassSelect}
            />
          ))}
        </div>
      </div>
    );
  }
);
export default DjClass;
