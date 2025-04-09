import { CSSProperties } from "react";
import { ToastProps } from "@/components/toast/Toast";
import { toastListAtom, toastStore } from "@/stores/ToastStore";
import { nanoid } from "nanoid";

/** 인덱스에 따라 토스트 스타일을 계산 후 반환 */
export const calculateToastStyle = (index: number): CSSProperties => {
  return {
    zIndex: 9999 - index,
    top: `${index * 6}px`,
    transform: `scale(${1 - index * 0.07})`,
    opacity: `${1 - index * 0.2}`,
  };
};

/** 토스트 속성을 받고 새로운 토스트 객체를 반환 */
export const makeToast = (
  children: React.ReactNode,
  ttl: number
): ToastProps => {
  return {
    children,
    id: nanoid(),
    ttl,
  };
};

/** 토스트 객체를 리스트에 추가 */
export const addToast = (toast: ToastProps) => {
  const toastList = toastStore.get(toastListAtom);
  toastStore.set(toastListAtom, [{ ...toast }, ...toastList]);
};

/** 토스트 객체를 리스트에서 제거 */
export const removeToast = (id: string) => {
  const toastList = toastStore.get(toastListAtom);
  toastStore.set(
    toastListAtom,
    toastList.filter((toast) => toast.id !== id)
  );
};
