import { LevelTheme } from '@/models/Level';
import useLevelStore from '@/stores/LevelStore';

export const gameTheme: {[key: string]: string } = {
  [LevelTheme.Color]: '顏色',
  [LevelTheme.Animal]: '動物',
  [LevelTheme.Fruit]: '水果',
  [LevelTheme.Emoji]: '表情',
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
