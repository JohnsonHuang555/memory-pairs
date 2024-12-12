import { allThemes } from '@/constants/AllThemes';
import { Theme } from '@/models/Theme';

import { create } from 'zustand';

type ThemeState = {
  themes: Theme[];
};

const useThemeStore = create<ThemeState>((set, get) => ({
  themes: allThemes,
}));

export default useThemeStore;
