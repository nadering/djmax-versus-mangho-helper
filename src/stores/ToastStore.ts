import { atom, createStore } from "jotai";
import { ToastProps } from "@/components/toast/Toast";

export const toastStore = createStore();

export const showUndoToastAtom = atom(false);
export const showRedoToastAtom = atom(false);

export const toastListAtom = atom<ToastProps[]>([]);
