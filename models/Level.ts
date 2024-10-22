export type Level = {
  id: number; // 關卡編號
  theme: LevelTheme; // 關卡主題
  matchCount: number; // 幾個一組 ex. 2
  totalMatch: number; // 共幾組 ex. 8
  bestScore: number; // 最佳分數
  stars: number;
};

export enum LevelTheme {
  Color = 'color',
  ChineseWord = 'chineseWord',
}
