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
  columns: number; // 一排幾列
};

export enum LevelTheme {
  Color = 'color',
  ChineseWord = 'chineseWord',
  Fruit = 'fruit',
  Emoji = 'emoji',
  Landmark = 'landmark',
  Gift = 'gift',
  Leaves = 'leaves',
  Instrument = 'instrument',
  Transport = 'transport',
  ZodiacChinese = 'zodiacChinese',
  ZodiacWestern = 'zodiacWestern',
  Entertainments = 'entertainments',
  ChineseEra = 'chineseEra',
  Tree = 'tree',
  Weather = 'weather',
  Coin = 'coin',
  CarSign = 'carSign',
  CowboyHat = 'cowboyHat',
  Sushi = 'sushi',
  Dice = 'dice',
  Jersey = 'jersey',
  WaterSport = 'waterSport',
  Ancient = 'ancient',
  EasterDay = 'eaterDay',
  BreakFast = 'breakfast',
  Animal = 'animal',
  Ball = 'ball',
  Chess = 'chess',
  Christmas = 'christmas',
  Beer = 'beer',
  User = 'user',
  Monster = 'monster',
  AlphabetBraille = 'alphabetBraille',
  Flower = 'flower',
  Lock = 'lock',
  Vehicles = 'vehicles',
  File = 'file',
  Battery = 'battery',
  Border = 'border',
  NetworkValue = 'networkValue',
  Grade = 'grade',
  Refresh = 'refresh',
  EcologyGreen = 'ecologyGreen',
  Gesture = 'gesture',
}
