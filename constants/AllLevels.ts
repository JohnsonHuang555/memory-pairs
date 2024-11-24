import { LevelTheme } from '@/models/Level';

export enum LevelType {
  String = 'string',
  ImageUrl = 'imageUrl',
}

export enum MatchCount {
  Two = 2,
  Three = 3,
  Four = 4,
  Five = 5,
}

export const allLevels = [
  {
    id: 1,
    theme: LevelTheme.ChineseWord,
    type: LevelType.String,
    matchCount: 2,
    questions: ['幕', '墓', '募', '暮', '寞', '冪'],
    timer: 60,
    star1Score: 200,
    star2Score: 350,
    star3Score: 430,
    star1Coins: 10,
    star2Coins: 30,
    star3Coins: 50,
    columns: 4,
  },
];
