import { allThemes } from '@/constants/AllThemes';
import { Theme } from '@/models/Theme';

import { create } from 'zustand';

export const itemsPerPage = 20; // 每頁顯示 20 個主題

type ThemeState = {
  currentPage: number;
  themes: Theme[];
  updateCurrentPage: (val: number) => void;
};

const useThemeStore = create<ThemeState>((set, get) => ({
  currentPage: 1,
  themes: allThemes,
  updateCurrentPage: (val: number) => {
    set(state => ({
      currentPage: state.currentPage + val,
    }));
  },
}));

export default useThemeStore;
