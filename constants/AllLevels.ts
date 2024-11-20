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
    theme: LevelTheme.Ancient,
    type: LevelType.ImageUrl,
    matchCount: MatchCount.Two,
    questions: [
      require('@/assets/images/questions/ancients/ancient-1.jpg'),
      require('@/assets/images/questions/ancients/ancient-2.jpg'),
      require('@/assets/images/questions/ancients/ancient-3.jpg'),
      require('@/assets/images/questions/ancients/ancient-4.jpg'),
      require('@/assets/images/questions/ancients/ancient-5.jpg'),
      require('@/assets/images/questions/ancients/ancient-6.jpg'),
      require('@/assets/images/questions/ancients/ancient-7.jpg'),
      require('@/assets/images/questions/ancients/ancient-8.jpg'),
    ],
    timer: 60,
    star1Score: 200,
    star2Score: 350,
    star3Score: 430,
    star1Coins: 10,
    star2Coins: 20,
    star3Coins: 50,
    columns: 4,
  },
];
