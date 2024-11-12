import { LevelTheme } from '@/models/Level';
import useLevelStore from '@/stores/LevelStore';

export const gameTheme: {[key: string]: string } = {
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
  [LevelTheme.Tree]: '樹',
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
