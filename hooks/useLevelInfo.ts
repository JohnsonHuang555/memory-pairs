import { LevelTheme } from '@/models/Level';
import useLevelStore from '@/stores/LevelStore';

export const gameTheme: {[key: string]: string } = {
  [LevelTheme.ChineseWord]: '中文字',
  [LevelTheme.Color]: '顏色',
  [LevelTheme.Fruit]: '水果',
  [LevelTheme.Emoji]: '表情',
  [LevelTheme.Landmark]: '地標',
  [LevelTheme.Gift]: '禮物盒',
  [LevelTheme.Leaves]: '葉子',
  [LevelTheme.Instrument]: '樂器',
  [LevelTheme.Transport]: '交通工具',
  [LevelTheme.ZodiacChinese]: '十二生肖',
  [LevelTheme.ZodiacWestern]: '十二星座',
  [LevelTheme.Entertainments]: '娛樂活動',
  [LevelTheme.ChineseEra]: '天干地支',
  [LevelTheme.Tree]: '樹木',
  [LevelTheme.Weather]: '天氣',
  [LevelTheme.Coin]: '錢幣',
  [LevelTheme.CarSign]: '汽車信號',
  [LevelTheme.CowboyHat]: '牛仔帽',
  [LevelTheme.Sushi]: '握壽司',
  [LevelTheme.Dice]: '骰子',
  [LevelTheme.Jersey]: '球衣',
  [LevelTheme.WaterSport]: '水上活動',
  [LevelTheme.Ancient]: '古人',
  [LevelTheme.EasterDay]: '復活節',
  [LevelTheme.BreakFast]: '早餐',
  [LevelTheme.Animal]: '動物',
  [LevelTheme.Ball]: '球類',
  [LevelTheme.Chess]: '西洋棋',
  [LevelTheme.Christmas]: '聖誕節',
  [LevelTheme.Beer]: '啤酒',
  [LevelTheme.User]: '使用者圖示',
  [LevelTheme.Monster]: '怪獸',
  [LevelTheme.AlphabetBraille]: '點字字母表',
  [LevelTheme.Flower]: '花',
  [LevelTheme.Lock]: '鎖頭',
  [LevelTheme.Vehicles]: '交通工具2',
  [LevelTheme.File]: '檔案類型',
  [LevelTheme.Battery]: '電池電量',
  [LevelTheme.Border]: '設定邊界',
  [LevelTheme.NetworkValue]: '訊號強度',
  [LevelTheme.Grade]: '學校成績',
  [LevelTheme.Refresh]: '重新整理',
  [LevelTheme.EcologyGreen]: '生態與環保',
  [LevelTheme.Gesture]: '手勢',
}

export const gameMatchCount: {[key: string]: string } = {
  2: '兩個一組',
  3: '三個一組',
  4: '四個一組',
  5: '五個一組',
}

const useLevelInfo = () => {
  const { levels, selectedLevelId } = useLevelStore();

  const levelInfo = levels.find(level => level.id === selectedLevelId);

  return {
    levelInfo,
  };
};

export default useLevelInfo;
