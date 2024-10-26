import { LevelType } from "@/constants/AllLevels";

export type Level = {
  id: number; // 關卡編號
  theme: LevelTheme; // 關卡主題
  type: LevelType;
  matchCount: number; // 幾個一組 ex. 2
  questions: string[]; // 題目組
  stars: number;
  timer: number;
  star1Score: number; // 星星門檻
  star2Score: number;
  star3Score: number;
};

export enum LevelTheme {
  Color = 'color',
  ChineseWord = 'chineseWord',
}
