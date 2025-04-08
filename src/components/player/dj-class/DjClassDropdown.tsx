import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { memo, useRef } from "react";
import { DJ_CLASS_LIST } from ".";

export type ButtonType = "4" | "5" | "6" | "8";

export interface DjClassProps {
  value: string;
}

export interface OnDjClassSelectProps {
  id: string;
  button: ButtonType;
  value: string;
}

interface DjClassDropdownProps extends DjClassProps {
  id: string;
  button: ButtonType;
  onDjClassSelect: ({ id, button, value }: OnDjClassSelectProps) => void;
}

/** DJ CLASS 정보를 설정하는 드랍다운 */
const DjClassDropdown = memo(
  ({ id, button, value, onDjClassSelect }: DjClassDropdownProps) => {
    const buttonRef = useRef<HTMLButtonElement>(null);

    return (
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button
            ref={buttonRef}
            title={`DJ CLASS - ${button}키`}
            className="relative w-18 h-6 p-2 rounded-md outline-none cursor-pointer duration-100 hover:bg-gray-100 focus:bg-gray-100 active:bg-gray-200"
            onMouseOut={() => buttonRef.current?.blur()}
          >
            <span
              className={`absolute top-[50%] left-0 right-0 translate-y-[-50%] mx-auto ${value.length !== 0 ? "font-medium text-gray-800" : "text-gray-400"}`}
            >
              {value.length !== 0 ? value : `${button}키`}
            </span>
            <span
              className={`absolute -top-[10px] left-1 font-light text-xs text-gray-600`}
            >
              {value.length !== 0 && `${button}키`}
            </span>
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content
          sideOffset={4}
          className="bg-white shadow-lg rounded-lg border w-28 p-2 z-50"
        >
          {DJ_CLASS_LIST.map((item) => {
            if (item.isSub && item.subContent) {
              return (
                <DropdownMenu.Sub key={item.name}>
                  <DropdownMenu.SubTrigger className="relative px-3 py-1.5 text-sm text-gray-800 rounded-md cursor-pointer hover:bg-gray-100 active:bg-gray-200">
                    {item.name}
                    <span className="block absolute top-[50%] right-2 translate-y-[-50%] text-xs text-gray-600">
                      ▶
                    </span>
                  </DropdownMenu.SubTrigger>
                  <DropdownMenu.SubContent
                    sideOffset={4}
                    className="bg-white shadow-md rounded-md border w-12 p-1 z-50"
                  >
                    {item.subContent.map((subItem) => (
                      <DropdownMenu.Item
                        key={subItem}
                        onSelect={() =>
                          onDjClassSelect({
                            id,
                            button,
                            value: `${item.name}${subItem}`,
                          })
                        }
                        className="px-3 py-1.5 text-sm text-gray-800 text-center rounded-md cursor-pointer hover:bg-gray-100 active:bg-gray-200"
                      >
                        {subItem}
                      </DropdownMenu.Item>
                    ))}
                  </DropdownMenu.SubContent>
                </DropdownMenu.Sub>
              );
            } else {
              return (
                <DropdownMenu.Item
                  key={item.name}
                  onSelect={() =>
                    onDjClassSelect({
                      id,
                      button,
                      value: item.name,
                    })
                  }
                  className="px-3 py-1.5 text-sm text-gray-800 rounded-md cursor-pointer hover:bg-gray-100 active:bg-gray-200"
                >
                  {item.name}
                </DropdownMenu.Item>
              );
            }
          })}
          <hr className="h-0 border-t-1 border-gray-400 my-2"></hr>
          <DropdownMenu.Item
            onSelect={() =>
              onDjClassSelect({
                id,
                button,
                value: "",
              })
            }
            className="px-3 py-1.5 text-sm text-gray-800 rounded-md cursor-pointer hover:bg-gray-100 active:bg-gray-200"
          >
            초기화
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    );
  }
);
export default DjClassDropdown;
