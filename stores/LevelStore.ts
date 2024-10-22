import { allLevels } from '@/constants/AllLevels';
import { Level } from '@/models/Level';

import { create } from 'zustand';

type LevelState = {
  currentLevelId: number;
  selectedLevelId?: number;
  levels: Level[];
  setPlayLevel: (level: number) => void;
};

const useLevelStore = create<LevelState>(set => ({
  currentLevelId: 1,
  levels: allLevels.map(level => ({
    ...level,
    stars: 0,
    bestScore: 100,
  })),
  setPlayLevel: (level: number) => {
    set(() => ({
      selectedLevelId: level,
    }));
  },
}));

export default useLevelStore;
