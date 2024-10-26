import { allLevels } from '@/constants/AllLevels';
import { Level } from '@/models/Level';

import { create } from 'zustand';

type LevelState = {
  currentLevelId: number;
  selectedLevelId?: number;
  levels: Level[];
  showLevelModal: boolean;
  setPlayLevel: (level?: number) => void;
  setShowLevelModal: (value: boolean) => void;
};

const useLevelStore = create<LevelState>(set => ({
  currentLevelId: 1,
  levels: allLevels.map(level => ({
    ...level,
    stars: 0,
  })),
  showLevelModal: false,
  setPlayLevel: (level?: number) => {
    set(() => ({
      selectedLevelId: level,
    }));
  },
  setShowLevelModal: (value: boolean) => {
    set(() => ({
      showLevelModal: value,
    }));
  },
  // 過關
  passGame: () => {},
}));

export default useLevelStore;
