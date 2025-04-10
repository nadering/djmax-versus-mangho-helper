import { atom, createStore } from "jotai";
import { Dispatch, SetStateAction } from "react";
import { PlayerProps } from "@/components/player/Player";

export const playerStore = createStore();

export const playerDispatcherAtom = atom<Dispatch<
  SetStateAction<PlayerProps[]>
> | null>(null);
