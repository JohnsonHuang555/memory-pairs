import { create } from 'zustand';

type StarsOfLevel = {
  id: number;
  stars: number;
};

type PlayerState = {
  currentLevelId: number;
  starsOfLevel: StarsOfLevel[];
  coins: number;
  updateCurrentLevelId: (id: number) => void;
  setStarsOfLevel: (id: number, stars: number) => void;
};

// 需存到手機裡的資料
const usePlayerStore = create<PlayerState>((set, get) => ({
  currentLevelId: 1,
  starsOfLevel: [],
  coins: 0,
  updateCurrentLevelId: (id: number) => {
    set(state => ({
      currentLevelId:
        id === state.currentLevelId
          ? state.currentLevelId + 1
          : state.currentLevelId,
    }));
  },
  setStarsOfLevel: (id: number, stars: number) => {
    const starsOfLevel = get().starsOfLevel;
    const isAlreadyHasStars = starsOfLevel.find(s => s.id === id);
    if (isAlreadyHasStars) {
      if (isAlreadyHasStars.stars < stars) {
        const newStarsOfLevel = starsOfLevel.map(level => {
          if (level.id === id) {
            return { ...level, stars };
          }
          return level;
        });
        set(() => ({ starsOfLevel: newStarsOfLevel }));
      }
    } else {
      set(state => ({ starsOfLevel: [...state.starsOfLevel, { id, stars }] }));
    }
  },
}));

export default usePlayerStore;
