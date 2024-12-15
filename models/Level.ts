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
  Emoji = 3,
  Leaves = 4,
  Ancient = 5,
  Grass = 6,
  Animal = 7,
  Tree = 8,
  Cactus = 9,
  Avatar = 10,
  SmartWatch = 11,
  Furniture = 12,
  Notice = 13,
  Space = 14,
  Coin = 15,
  Gift = 16,
  WaterSport = 17,
  SweetDrink = 18,
  Email = 19,
  Origami = 20,
  CityBuilding = 21,
}
