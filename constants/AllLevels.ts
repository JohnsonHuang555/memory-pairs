import { LevelTheme } from '@/models/Level';

export enum LevelType {
  String = 'string',
  ImageUrl = 'imageUrl',
}

export const allLevels = [
  {
    id: 1,
    theme: LevelTheme.Color,
    type: LevelType.String,
    matchCount: 2,
    questions: ['#00FFFF', '#FF00CC'],
    timer: 60,
    star1Score: 30,
    star2Score: 60,
    star3Score: 100,
  },
  {
    id: 2,
    theme: LevelTheme.Color,
    type: LevelType.String,
    matchCount: 2,
    questions: ['#00FFFF', '#FF00CC'],
    timer: 60,
    star1Score: 240,
    star2Score: 360,
    star3Score: 720,
  },
  {
    id: 3,
    theme: LevelTheme.Color,
    type: LevelType.String,
    matchCount: 2,
    questions: ['#00FFFF', '#FF00CC'],
    timer: 60,
    star1Score: 300,
    star2Score: 450,
    star3Score: 900,
  },
  {
    id: 4,
    theme: LevelTheme.Color,
    type: LevelType.String,
    matchCount: 2,
    questions: ['#00FFFF', '#FF00CC'],
    timer: 60,
    star1Score: 300,
    star2Score: 450,
    star3Score: 900,
  },
];
