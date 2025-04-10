import { atom, createStore } from "jotai";
import { Dispatch, SetStateAction } from "react";
import { PlayerProps } from "@/components/player/Player";

export const playerStore = createStore();

interface PlayerDispatcher {
  setPlayers: Dispatch<SetStateAction<PlayerProps[]>>;
}

export const playerDispatcherAtom = atom<PlayerDispatcher | null>(null);
