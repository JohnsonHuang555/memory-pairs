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
  Fruit = 3,
  Emoji = 4,
  Landmark = 5,
  Gift = 6,
  Leaves = 7,
  Instrument = 8,
  Transport = 9,
  ZodiacChinese = 10,
  ZodiacWestern = 11,
  Entertainments = 12,
  ChineseEra = 13,
  Weather = 14,
  Coin = 15,
  CarSign = 16,
  CowboyHat = 17,
  Sushi = 18,
  Dice = 19,
  Jersey = 20,
  WaterSport = 21,
  Ancient = 22,
  // EasterDay = 23,
  BreakFast = 24,
  Ball = 25,
  Chess = 26,
  Christmas = 27,
  Beer = 28,
  User = 29,
  Monster = 30,
  AlphabetBraille = 31,
  Flower = 32,
  // Lock = 33,
  // Vehicles = 34,
  File = 35,
  Battery = 36,
  Border = 37,
  NetworkValue = 38,
  Grade = 39,
  Refresh = 40,
  EcologyGreen = 41,
  Gesture = 42,
  Bell = 43,
  Bag = 44,
  ShoppingCart = 45,
  Dumbbell = 46,
  Star = 47,
  Grass = 48,
  Animal = 49,
  Tree = 50,
  Envelope = 51,
  Sweet = 52,
  Planet = 53,
  WashHand = 54,
  Tool = 55,
  Cactus = 56,
  JapaneseCulture = 57,
  Avatar = 58,
  Medal = 59,
  Party = 60,
  SitFurniture = 61,
  DeskFurniture = 62,
  PTable = 63,
  Clock = 64,
  MathSymbol = 65,
  ProhibitNoticeBoard = 66,
  CautionNoticeBoard = 67,
  AlignWay = 68,
  SortWay = 69,
  Moon = 70,
  Sound = 71,
  Coffee = 72,
  Space = 73,
  Sun = 74,
  Food = 75,
  OrigamiObject = 76,
  OrigamiAnimal = 77,
  Device = 78,
  Folder = 79,
  SmartWatch = 80,
  CityBuilding = 81,
  Stickman = 82,
  HeartLove = 83,
  Chart = 84,
  Clothe = 85,
  WinterBuilding = 86,
  MobileGesture = 87,
  Travel = 88,
  Autumn = 89,
  Furniture = 90,
}
