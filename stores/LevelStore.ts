import { allLevels } from '@/constants/AllLevels';
import { Level } from '@/models/Level';

import { create } from 'zustand';

export const itemsPerPage = 20; // 每頁顯示 20 個關卡

type LevelState = {
  currentPage: number;
  selectedLevelId?: number;
  levels: Level[];
  showLevelModal: boolean;
  setPlayLevel: (id?: number) => void;
  setShowLevelModal: (value: boolean) => void;
  updateLevel: (id: number, stars: number) => void;
  setDefaultCurrentPage: (page: number) => void;
  updateCurrentPage: (val: number) => void;
};

const useLevelStore = create<LevelState>((set, get) => ({
  currentPage: 1,
  levels: allLevels.map(level => ({
    ...level,
    star1Coins: 0,
    star1Score: 0,
    star2Coins: 0,
    star2Score: 0,
    star3Coins: 0,
    star3Score: 0,
    columns: 0,
    timer: 0,
    stars: 0,
  })),
  showLevelModal: false,
  setPlayLevel: (id?: number) => {
    set(() => ({
      selectedLevelId: id,
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

    console.log(newLevels, 'new')
    set(() => ({
      levels: newLevels,
    }));
  },
  setDefaultCurrentPage: (page: number) => {
    set(() => ({
      currentPage: page,
    }));
  },
  updateCurrentPage: (val: number) => {
    set(state => ({
      currentPage: state.currentPage + val,
    }));
  },
}));

export default useLevelStore;
