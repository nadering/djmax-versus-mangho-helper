import { atom, createStore } from "jotai";
import { ToastProps } from "@/components/toast/Toast";

export const toastStore = createStore();

export const toastListAtom = atom<ToastProps[]>([]);
