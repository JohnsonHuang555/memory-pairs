import { allItems } from '@/constants/AllItems';
import { Item, PlayerItem } from '@/models/Item';

import { create } from 'zustand';

type StarsOfLevel = {
  id: number;
  stars: number;
};

type PlayerState = {
  currentLevelId: number;
  starsOfLevel: StarsOfLevel[];
  coins: number;
  items: PlayerItem[];
  updateCurrentLevelId: (id: number) => void;
  setStarsOfLevel: (id: number, stars: number, coins: number) => void;
  updatePlayerItem: (type: Item, action: 'purchase' | 'upgrade') => void;
};

// 需存到手機裡的資料
const usePlayerStore = create<PlayerState>((set, get) => ({
  currentLevelId: 1,
  starsOfLevel: [],
  coins: 0,
  items: allItems.map(item => ({
    ...item,
    level: 1,
    quantity: 0,
  })),
  updateCurrentLevelId: (id: number) => {
    set(state => ({
      currentLevelId:
        id === state.currentLevelId
          ? state.currentLevelId + 1
          : state.currentLevelId,
    }));
  },
  setStarsOfLevel: (id: number, stars: number, coins: number) => {
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
        set(state => ({
          starsOfLevel: newStarsOfLevel,
          coins: state.coins + coins,
        }));
      }
      set(state => ({ coins: state.coins + coins }));
    } else {
      set(state => ({
        starsOfLevel: [...state.starsOfLevel, { id, stars }],
        coins: state.coins + coins,
      }));
    }
  },
  updatePlayerItem: (type: Item, action: 'purchase' | 'upgrade') => {
    const items = get().items;
    const newItems = items.map(item => {
      if (item.type === type) {
        switch (action) {
          case 'purchase':
            return { ...item, quantity: item.quantity + 1 };
          case 'upgrade':
            return { ...item, level: item.level + 1 };
        }
      }
      return item;
    });
    set(() => ({ items: newItems }));
  },
}));

export default usePlayerStore;
