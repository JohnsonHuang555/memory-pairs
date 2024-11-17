import { LevelTheme } from '@/models/Level';
import useLevelStore from '@/stores/LevelStore';

export const gameTheme: {[key: string]: string } = {
  [LevelTheme.ChineseWord]: '中文字',
  [LevelTheme.Color]: '顏色',
  [LevelTheme.Animal]: '動物',
  [LevelTheme.Fruit]: '水果',
  [LevelTheme.Emoji]: '表情',
  [LevelTheme.Landmark]: '地標',
  [LevelTheme.Gift]: '禮物盒',
  [LevelTheme.Leaves]: '葉子',
  [LevelTheme.Instrument]: '樂器',
  [LevelTheme.Transport]: '交通工具',
  [LevelTheme.Zodiac]: '十二生肖',
  [LevelTheme.Entertainments]: '娛樂活動',
  [LevelTheme.ChineseEra]: '天干地支',
  [LevelTheme.Envelopes]: '信封袋',
  [LevelTheme.Tree]: '樹木',
  [LevelTheme.Christmas]: '聖誕節',
  [LevelTheme.Ball]: '球類',
  [LevelTheme.Battery]: '電池',
  [LevelTheme.Planet]: '星球',
  [LevelTheme.Cactus]: '仙人掌',
  [LevelTheme.File]: '檔案類型',
  [LevelTheme.Weather]: '天氣',
  [LevelTheme.Avatar]: '人物頭像',
  [LevelTheme.Coin]: '錢幣',
  [LevelTheme.CarSign]: '汽車信號',
  [LevelTheme.Halloween]: '萬聖節',
  [LevelTheme.CowboyHat]: '牛仔帽',
  [LevelTheme.MapPin]: '地圖圖標',
  [LevelTheme.WashHand]: '洗手式',
  [LevelTheme.Clothes]: '衣服',
  [LevelTheme.Hat]: '帽子',
  [LevelTheme.Beer]: '啤酒',
  [LevelTheme.Sushi]: '握壽司',
  [LevelTheme.Party]: '慶祝',
  [LevelTheme.Dice]: '骰子',
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
