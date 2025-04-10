import { useEffect, useRef } from "react";
import { calculateToastStyle, removeToast } from "@/utils/ToastUtil";
import { PREVENT_BLINKING_TIME } from "@/constants/Toast";

export interface ToastProps {
  children: React.ReactNode;
  id: string;
  ttl: number;
}

interface IndexProps {
  index: number;
}

/** 토스트 팝업 */
const Toast = ({ children, id, ttl, index }: ToastProps & IndexProps) => {
  const toastRef = useRef<HTMLLIElement>(null);
  const isTop = index === 0;

  useEffect(() => {
    const fadeOutTimer = setTimeout(() => {
      toastRef.current?.classList.add("animate-fade-out-opacity");
    }, ttl - PREVENT_BLINKING_TIME);

    const lifeTimer = setTimeout(() => {
      removeToast(id);
    }, ttl);

    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(lifeTimer);
    };
  }, []);

  return (
    <li
      ref={toastRef}
      className={`absolute flex items-center justify-center px-3 py-1 bg-gray-800 text-white font-medium rounded-md shadow-lg select-none
        ${isTop ? "animate-fade-in-scale" : ""}`}
      style={calculateToastStyle(index)}
      role="listitem"
      data-testid={`toast-${id}`}
    >
      <div
        className={`${!isTop ? "opacity-0 pointer-events-none" : ""}`}
        aria-hidden={!isTop}
      >
        {children}
      </div>
    </li>
  );
};
export default Toast;
