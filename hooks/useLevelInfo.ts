import { LevelTheme } from '@/models/Level';
import useLevelStore from '@/stores/LevelStore';

export const gameTheme: {[key: string]: string } = {
  [LevelTheme.Color]: '顏色'
}

export const gameMatchCount: {[key: string]: string } = {
  [2]: '兩個一組'
}

const useLevelInfo = () => {
  const { levels, selectedLevelId } = useLevelStore();

  const levelInfo = levels.find(level => level.id === selectedLevelId);

  return {
    levelInfo,
  };
};

export default useLevelInfo;
