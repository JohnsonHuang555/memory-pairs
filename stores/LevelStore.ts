import { allLevels } from '@/constants/AllLevels';
import { Level } from '@/models/Level';

import { create } from 'zustand';

type LevelState = {
  currentPage: number;
  selectedLevelId?: number;
  levels: Level[];
  showLevelModal: boolean;
  setPlayLevel: (level?: number) => void;
  setShowLevelModal: (value: boolean) => void;
  updateLevel: (id: number, stars: number) => void;
};

const useLevelStore = create<LevelState>((set, get) => ({
  currentPage: 1,
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
  updateLevel: (id: number, stars: number) => {
    const levels = get().levels;
    const newLevels = [...levels].map(level => {
      if (id === level.id) {
        return { ...level, stars };
      }
      return level;
    });

    set(() => ({
      levels: newLevels,
    }));
  },
}));

export default useLevelStore;
