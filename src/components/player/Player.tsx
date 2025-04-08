import Draggable from "./composition/Draggable";
import Information from "./composition/Information";
import DjClass, { DjClassDataProps } from "./composition/DjClass";
import Control from "./composition/Control";

/**
 * 플레이어 구성 인터페이스,
 * Dot notation으로 쪼개어 사용하지만 전체 속성은 데이터 관리를 위해 필수로 선언해야 함
 */
export interface PlayerProps {
  id: string;
  nickname: string;
  recentPlay: number; // 플레이 후 지나간 판수
  data: DjClassDataProps; // DJ CLASS 데이터
  isNew: boolean; // 신입
  isDjClassFake: boolean; // DJ CLASS 위장 여부
  isCaptain: boolean; // 선장
  isCaptainExist?: boolean; // 자신이 아닌 선장 존재 여부
  selected: boolean; // 이번 판 플레이할지
}

/** 버망호 플레이어 */
const Player = {
  Draggable: Draggable,
  Information: Information,
  DjClass: DjClass,
  Control: Control,
};
export default Player;
