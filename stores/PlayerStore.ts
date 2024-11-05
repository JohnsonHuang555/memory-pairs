import { allAchievements } from '@/constants/AllAchievements';
import { allItems } from '@/constants/AllItems';
import { Achievement } from '@/models/Achievement';
import { ItemType, PlayerItem } from '@/models/Item';

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
  achievements: Achievement[];
  updateCurrentLevelId: (id: number) => void;
  setStarsOfLevel: (id: number, stars: number, coins: number) => void;
  updatePlayerItem: (
    type: ItemType,
    action: 'purchase' | 'upgrade' | 'use',
  ) => void;
  receiveAchievementRewards: (id: number, rewards: number) => void;
};

// 需存到手機裡的資料
const usePlayerStore = create<PlayerState>((set, get) => ({
  currentLevelId: 1,
  starsOfLevel: [],
  coins: 10000,
  items: allItems.map(item => ({
    ...item,
    level: 1,
    quantity: 0,
  })),
  achievements: allAchievements.map(achievement => ({
    ...achievement,
    received: false,
    completed: false,
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
  updatePlayerItem: (
    type: ItemType,
    action: 'purchase' | 'upgrade' | 'use',
  ) => {
    const items = get().items;
    let price = 0;
    const newItems = items.map(item => {
      if (item.type === type) {
        switch (action) {
          case 'purchase':
            price = item.purchaseGold;
            return { ...item, quantity: item.quantity + 1 };
          case 'upgrade':
            price = item.upgradeGold;

            return { ...item, level: item.level + 1 };
          case 'use':
            return { ...item, quantity: item.quantity - 1 };
        }
      }
      return item;
    });
    set(state => ({ items: newItems, coins: state.coins - price }));
  },
  receiveAchievementRewards: (id: number, rewards: number) => {
    const achievements = get().achievements;
    const newAchievements = achievements.map(achievement => {
      if (achievement.id === id) {
        return { ...achievement, received: true };
      }
      return achievement;
    });

    set(state => ({
      achievements: newAchievements,
      coins: state.coins + rewards,
    }));
  },
}));

export default usePlayerStore;
