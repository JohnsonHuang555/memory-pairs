import { allLevels } from '@/constants/Levels';
import { Level } from '@/models/Level';

import { create } from 'zustand';

type LevelState = {
  currentLevel: number;
  levels: Level[];
};

const useLevelStore = create<LevelState>(set => ({
  currentLevel: 1,
  levels: allLevels.map(level => ({
    ...level,
    stars: 0,
    bestScore: 100,
  })),
}));

export default useLevelStore;
