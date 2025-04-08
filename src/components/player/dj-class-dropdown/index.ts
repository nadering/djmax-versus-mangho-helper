interface DjClassProps {
  name: string;
  isSub: boolean;
  subContent?: string[];
}

export const DJ_CLASS_LIST: DjClassProps[] = [
  { name: "로오디", isSub: false },
  {
    name: "비마",
    isSub: true,
    subContent: ["1", "2", "3", "4"],
  },
  {
    name: "쇼스",
    isSub: true,
    subContent: ["1", "2", "3", "4"],
  },
  {
    name: "헤라",
    isSub: true,
    subContent: ["1", "2", "3", "4"],
  },
  {
    name: "트세",
    isSub: true,
    subContent: ["1", "2", "3", "4"],
  },
  {
    name: "프페",
    isSub: true,
    subContent: ["1", "2", "3", "4"],
  },
  {
    name: "하클",
    isSub: true,
    subContent: ["1", "2", "3", "4"],
  },
  {
    name: "프디",
    isSub: true,
    subContent: ["1", "2", "3", "4"],
  },
  {
    name: "미들맨",
    isSub: true,
    subContent: ["1", "2", "3", "4"],
  },
  {
    name: "그 외",
    isSub: false,
  },
];
