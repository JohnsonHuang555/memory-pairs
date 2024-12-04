import { LevelTheme } from '@/models/Level';
import useLevelStore from '@/stores/LevelStore';

import { useLocalSearchParams } from 'expo-router';

export const gameTheme: { [key: string]: string } = {
  [LevelTheme.ChineseWord]: '中文字',
  [LevelTheme.Color]: '顏色',
  [LevelTheme.Fruit]: '水果',
  [LevelTheme.Emoji]: '表情',
  [LevelTheme.Landmark]: '知名地標',
  [LevelTheme.Gift]: '禮物盒',
  [LevelTheme.Leaves]: '葉子',
  [LevelTheme.Instrument]: '樂器',
  [LevelTheme.Transport]: '交通工具',
  [LevelTheme.ZodiacChinese]: '十二生肖',
  [LevelTheme.ZodiacWestern]: '十二星座',
  [LevelTheme.Entertainments]: '娛樂活動',
  [LevelTheme.ChineseEra]: '天干地支',
  [LevelTheme.Weather]: '天氣',
  [LevelTheme.Coin]: '錢幣',
  [LevelTheme.CarSign]: '汽車信號',
  [LevelTheme.CowboyHat]: '牛仔帽',
  [LevelTheme.Sushi]: '握壽司',
  [LevelTheme.Dice]: '骰子',
  [LevelTheme.Jersey]: '球衣',
  [LevelTheme.WaterSport]: '水上活動',
  [LevelTheme.Ancient]: '古人',
  [LevelTheme.BreakFast]: '早餐',
  [LevelTheme.Ball]: '球類',
  [LevelTheme.Chess]: '西洋棋',
  [LevelTheme.Christmas]: '聖誕節',
  [LevelTheme.Beer]: '啤酒',
  [LevelTheme.User]: '使用者圖示',
  [LevelTheme.Monster]: '怪獸',
  [LevelTheme.AlphabetBraille]: '點字字母表',
  [LevelTheme.Flower]: '花',
  // [LevelTheme.Lock]: '鎖頭',
  [LevelTheme.File]: '檔案格式',
  [LevelTheme.Battery]: '電池電量',
  [LevelTheme.Border]: '設定邊界',
  [LevelTheme.NetworkValue]: '訊號強度',
  [LevelTheme.Grade]: '學校成績',
  [LevelTheme.Refresh]: '重新整理',
  [LevelTheme.EcologyGreen]: '生態與環保',
  [LevelTheme.Gesture]: '手勢',
  [LevelTheme.Bag]: '手提袋',
  [LevelTheme.ShoppingCart]: '購物車',
  [LevelTheme.Dumbbell]: '啞鈴',
  [LevelTheme.Star]: '星星',
  [LevelTheme.Grass]: '草堆',
  [LevelTheme.Animal]: '動物',
  [LevelTheme.Tree]: '樹木',
  [LevelTheme.Envelope]: 'Email',
  [LevelTheme.Sweet]: '甜點',
  [LevelTheme.Planet]: '星球',
  [LevelTheme.WashHand]: '沒事多洗手',
  [LevelTheme.Tool]: '工具',
  [LevelTheme.Cactus]: '仙人掌',
  [LevelTheme.JapaneseCulture]: '日本文化',
  [LevelTheme.Avatar]: '頭像',
  [LevelTheme.Medal]: '獎牌',
  [LevelTheme.Party]: '派對',
  [LevelTheme.SitFurniture]: '傢俱座椅',
  [LevelTheme.DeskFurniture]: '傢俱桌子',
  [LevelTheme.Clock]: '時鐘',
  [LevelTheme.MathSymbol]: '數學符號',
  [LevelTheme.ProhibitNoticeBoard]: '禁止告示牌',
  [LevelTheme.CautionNoticeBoard]: '警告告示牌',
  [LevelTheme.AlignWay]: '對齊方式',
  [LevelTheme.SortWay]: '排序方式',
  [LevelTheme.Moon]: '月亮',
  [LevelTheme.Sound]: '音效設定',
  [LevelTheme.Coffee]: '咖啡豆',
  [LevelTheme.Space]: '太空',
  [LevelTheme.Sun]: '太陽',
  [LevelTheme.Food]: '食物',
  [LevelTheme.OrigamiObject]: '摺紙物品',
  [LevelTheme.OrigamiAnimal]: '摺紙動物',
  [LevelTheme.Device]: '3C用品',
  [LevelTheme.Folder]: '資料夾',
  [LevelTheme.SmartWatch]: '智慧手錶',
  [LevelTheme.CityBuilding]: '城市建築',
  [LevelTheme.Stickman]: '火柴人',
  [LevelTheme.HeartLove]: '滿滿的愛心',
  [LevelTheme.Chart]: '圖表',
  [LevelTheme.Clothe]: '衣服',
  [LevelTheme.WinterBuilding]: '冬季建築',
  [LevelTheme.MobileGesture]: '滑動手勢',
  [LevelTheme.Travel]: '旅遊活動',
  [LevelTheme.Autumn]: '秋天',
  [LevelTheme.Bell]: '鈴鐺',
};

export const gameMatchCount: { [key: string]: string } = {
  2: '兩個一組',
  3: '三個一組',
  4: '四個一組',
  5: '五個一組',
  6: '六個一組',
  7: '七個一組',
};

const useLevelInfo = () => {
  const { theme } = useLocalSearchParams();
  const { levels, selectedLevelId } = useLevelStore();

  const levelInfo = levels
    .filter(l => l.theme === Number(theme))
    .find(level => level.id === selectedLevelId);

  return {
    levelInfo,
  };
};

export default useLevelInfo;
