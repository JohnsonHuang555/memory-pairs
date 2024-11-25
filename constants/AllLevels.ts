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
    theme: LevelTheme.Grade,
    type: LevelType.ImageUrl,
    matchCount: 2,
    questions: [
      require('@/assets/images/questions/grades/grade-1.svg'),
      require('@/assets/images/questions/grades/grade-2.svg'),
      require('@/assets/images/questions/grades/grade-3.svg'),
      require('@/assets/images/questions/grades/grade-4.svg'),
      require('@/assets/images/questions/grades/grade-5.svg'),
      require('@/assets/images/questions/grades/grade-6.svg'),
    ],
    timer: 60,
    star1Score: 200,
    star2Score: 350,
    star3Score: 430,
    star1Coins: 10,
    star2Coins: 30,
    star3Coins: 50,
    columns: 3,
  },
];
