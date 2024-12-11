export enum LevelType {
  String = 'string',
  ImageUrl = 'imageUrl',
}

export type Level = {
  id: number; // 關卡編號
  theme: LevelTheme; // 關卡主題
  type: LevelType;
  matchCount: number; // 幾個一組 ex. 2
  questions: string[]; // 題目組
  stars?: number;
  timer: number;
  star1Score: number; // 星星門檻
  star2Score: number;
  star3Score: number;
  star1Coins: number; // 星星獎勵
  star2Coins: number;
  star3Coins: number;
  columns: number; // 一排幾列
};

export enum LevelTheme {
  Color = 1,
  ChineseWord = 2,
  Emoji = 4,
  Leaves = 7,
  Ancient = 22,
  Grass = 48,
  Animal = 49,
  Tree = 50,
  Cactus = 56,
  Avatar = 58,
  Medal = 59,
  SmartWatch = 80,
  Stickman = 82,
  Chart = 84,
  Clothe = 85,
  Furniture = 90,
  Notice = 91,
  Space = 92,
}
