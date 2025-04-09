import { useEffect, useRef } from "react";
import { calculateToastStyle, removeToast } from "@/utils/ToastUtil";
import { ANIMATION_TIME, PREVENT_BLINKING_TIME } from "@/constants/toast";

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
  const animated = useRef(false);

  useEffect(() => {
    const fadeInTimer = setTimeout(() => {
      animated.current = true;
    }, ANIMATION_TIME);

    const fadeOutTimer = setTimeout(() => {
      toastRef.current?.classList.add("animate-fade-out-opacity");
    }, ttl - PREVENT_BLINKING_TIME);

    const lifeTimer = setTimeout(() => {
      removeToast(id);
    }, ttl);

    return () => {
      clearTimeout(fadeInTimer);
      clearTimeout(fadeOutTimer);
      clearTimeout(lifeTimer);
    };
  }, [children, ttl]);

  return (
    <li
      ref={toastRef}
      className={`absolute flex items-center justify-center px-3 py-1 bg-gray-800 text-white font-medium rounded-md shadow-lg select-none
        ${!animated.current ? "animate-fade-in-scale" : ""}`}
      style={calculateToastStyle(index)}
    >
      {children}
    </li>
  );
};
export default Toast;
