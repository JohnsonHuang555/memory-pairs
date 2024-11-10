import { allAchievements } from '@/constants/AllAchievements';
import { allItems } from '@/constants/AllItems';
import { Achievement } from '@/models/Achievement';
import { ItemType, PlayerItem } from '@/models/Item';
import { Level } from '@/models/Level';

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
  updateCurrentLevelId: (
    levelInfo: Level,
    totalStars: number,
    timeLeft: number,
    maxCombo: number,
    score: number,
  ) => void;
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
  // 過關
  updateCurrentLevelId: (
    levelInfo: Level,
    totalStars: number,
    timeLeft: number,
    maxCombo: number,
    score: number,
  ) => {
    const achievements = get().achievements;
    const currentLevelId = get().currentLevelId;

    const newAchievements = [...achievements];

    // 成就檢查
    if (currentLevelId > 0 && !newAchievements[0].completed) {
      newAchievements[0].completed = true;
    }
    if (currentLevelId > 5 && !newAchievements[1].completed) {
      newAchievements[1].completed = true;
    }
    if (currentLevelId > 20 && !newAchievements[2].completed) {
      newAchievements[2].completed = true;
    }
    if (currentLevelId > 50 && !newAchievements[3].completed) {
      newAchievements[3].completed = true;
    }
    if (levelInfo.stars === 3 && !newAchievements[4].completed) {
      newAchievements[4].completed = true;
    }
    if (totalStars >= 30 && !newAchievements[5].completed) {
      newAchievements[5].completed = true;
    }
    if (totalStars >= 60 && !newAchievements[6].completed) {
      newAchievements[6].completed = true;
    }
    if (totalStars >= 90 && !newAchievements[7].completed) {
      newAchievements[7].completed = true;
    }
    if (totalStars >= 120 && !newAchievements[8].completed) {
      newAchievements[8].completed = true;
    }
    if (totalStars >= 150 && !newAchievements[9].completed) {
      newAchievements[9].completed = true;
    }
    if (maxCombo >= 3 && !newAchievements[10].completed) {
      newAchievements[10].completed = true;
    }
    if (maxCombo >= 5 && !newAchievements[11].completed) {
      newAchievements[11].completed = true;
    }
    if (maxCombo >= 8 && !newAchievements[12].completed) {
      newAchievements[12].completed = true;
    }
    if (maxCombo >= 12 && !newAchievements[13].completed) {
      newAchievements[13].completed = true;
    }
    if (score >= 300 && !newAchievements[14].completed) {
      newAchievements[14].completed = true;
    }
    if (score >= 600 && !newAchievements[15].completed) {
      newAchievements[15].completed = true;
    }

    set(state => ({
      currentLevelId:
        levelInfo.id === state.currentLevelId
          ? state.currentLevelId + 1
          : state.currentLevelId,
      achievements: newAchievements,
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
  updateAchievement: () => {},
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
