import { LevelType } from '@/constants/AllLevels';

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
  star1Coins: number; // 星星獎勵
  star2Coins: number;
  star3Coins: number;
};

export enum LevelTheme {
  Color = 'color',
  ChineseWord = 'chineseWord',
  Animal = 'animal',
  Fruit = 'fruit',
  Emoji = 'emoji',
  Landmark = 'landmark',
  Gift = 'gift',
  Leaves = 'leaves',
  Instrument = 'instrument',
  Transport = 'transport',
  Zodiac = 'zodiac',
  Entertainments = 'entertainments',
  ChineseEra = 'chineseEra',
  Envelopes = 'envelopes',
  Tree = 'tree',
  Christmas = 'christmas',
  Ball = 'ball',
  Battery = 'battery',
  Planet = 'planet',
  Cactus = 'cactus',
  File = 'file',
  Weather = 'weather',
  Avatar = 'avatar',
  Coin = 'coin',
  CarSign = 'carSign',
  Halloween = 'halloween',
  CowboyHat = 'cowboyHat',
  MapPin = 'mapPin',
  WashHand = 'washHand',
  Clothes = 'clothes',
  Hat = 'hat',
  Beer = 'beer',
  Sushi = 'sushi',
  Party = 'party',
  Dice = 'dice',
}
