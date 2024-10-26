import { allLevels } from '@/constants/AllLevels';
import { Level } from '@/models/Level';

import { create } from 'zustand';

type LevelState = {
  currentLevelId: number;
  selectedLevelId?: number;
  levels: Level[];
  showNextLevelModal: boolean; // 自動跳出關卡彈窗
  setPlayLevel: (level: number) => void; // 確定要玩的關卡
  setShowNextLevelModal: (value: boolean) => void;
};

const useLevelStore = create<LevelState>(set => ({
  currentLevelId: 1,
  levels: allLevels.map(level => ({
    ...level,
    stars: 0,
  })),
  showNextLevelModal: false,
  setPlayLevel: (level: number) => {
    set(() => ({
      selectedLevelId: level,
    }));
  },
  setShowNextLevelModal: (value: boolean) => {
    set(() => ({
      showNextLevelModal: value,
    }));
  },
  // 過關
  passGame: () => {
    
  }
}));

export default useLevelStore;
