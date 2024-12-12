export type Achievement = {
  id: string; // 為了不要有順序性
  title: string;
  description: string;
  completed: boolean;
  received: boolean;
  rewards: number;
};
