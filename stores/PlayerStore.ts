import { allAchievements } from '@/constants/AllAchievements';
import { allItems } from '@/constants/AllItems';
import { ItemType, PlayerItem } from '@/models/Item';
import { Level } from '@/models/Level';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { create } from 'zustand';
import { StateStorage, createJSONStorage, persist } from 'zustand/middleware';

type StarsOfLevel = {
  id: number;
  stars: number;
  score: number;
};

type PlayerAchievement = {
  id: number;
  completed: boolean;
  received: boolean;
};

type PlayerState = {
  currentLevelId: number;
  starsOfLevel: StarsOfLevel[];
  coins: number;
  items: PlayerItem[];
  playerAchievements: PlayerAchievement[];
  isMusicOn: boolean;
  isSoundOn: boolean;
  updateCurrentLevelId: (
    levelInfo: Level,
    totalStars: number,
    maxCombo: number,
    score: number,
    lastLevelId: number,
  ) => void;
  setStarsOfLevel: (
    id: number,
    stars: number,
    coins: number,
    score: number,
  ) => void;
  updatePlayerItem: (
    type: ItemType,
    action: 'purchase' | 'upgrade' | 'use',
  ) => void;
  receiveAchievementRewards: (id: number, rewards: number) => void;
  setIsMusicOn: () => void;
  setIsSoundOn: () => void;
};

const storage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    console.log(name, 'has been retrieved');
    const data = (await AsyncStorage.getItem(name)) || null;

    console.log('data: ', data);
    return data;
  },
  setItem: async (name: string, value: string): Promise<void> => {
    console.log(name, 'with value', value, 'has been saved');
    await AsyncStorage.setItem(name, value);
  },
  removeItem: async (name: string): Promise<void> => {
    console.log(name, 'has been deleted');
    await AsyncStorage.removeItem(name);
  },
};

export const usePlayerStore = create<PlayerState>()(
  persist(
    (set, get) => ({
      currentLevelId: 1,
      starsOfLevel: [],
      coins: 0,
      items: allItems.map(item => ({
        ...item,
        level: 1,
        quantity: 0,
      })),
      playerAchievements: allAchievements.map(achievement => ({
        id: achievement.id,
        received: false,
        completed: false,
      })),
      isMusicOn: true,
      isSoundOn: true,
      // 過關
      updateCurrentLevelId: (
        levelInfo: Level,
        totalStars: number,
        maxCombo: number,
        score: number,
        lastLevelId: number,
      ) => {
        const playerAchievements = get().playerAchievements;
        const currentLevelId = get().currentLevelId;

        const newAchievements = [...playerAchievements];

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
        if (currentLevelId > 80 && !newAchievements[4].completed) {
          newAchievements[4].completed = true;
        }
        if (currentLevelId === 100 && !newAchievements[5].completed) {
          newAchievements[5].completed = true;
        }
        if (levelInfo.stars === 3 && !newAchievements[6].completed) {
          newAchievements[6].completed = true;
        }
        if (totalStars >= 30 && !newAchievements[7].completed) {
          newAchievements[7].completed = true;
        }
        if (totalStars >= 60 && !newAchievements[8].completed) {
          newAchievements[8].completed = true;
        }
        if (totalStars >= 90 && !newAchievements[9].completed) {
          newAchievements[9].completed = true;
        }
        if (totalStars >= 120 && !newAchievements[10].completed) {
          newAchievements[10].completed = true;
        }
        if (totalStars >= 150 && !newAchievements[11].completed) {
          newAchievements[11].completed = true;
        }
        if (maxCombo >= 3 && !newAchievements[12].completed) {
          newAchievements[12].completed = true;
        }
        if (maxCombo >= 5 && !newAchievements[13].completed) {
          newAchievements[13].completed = true;
        }
        if (maxCombo >= 8 && !newAchievements[14].completed) {
          newAchievements[14].completed = true;
        }
        if (maxCombo >= 12 && !newAchievements[15].completed) {
          newAchievements[15].completed = true;
        }
        if (score >= 300 && !newAchievements[16].completed) {
          newAchievements[16].completed = true;
        }
        if (score >= 600 && !newAchievements[17].completed) {
          newAchievements[17].completed = true;
        }

        set(state => ({
          currentLevelId:
            levelInfo.id === state.currentLevelId &&
            lastLevelId !== levelInfo.id
              ? state.currentLevelId + 1
              : state.currentLevelId,
          playerAchievements: newAchievements,
        }));
      },
      setStarsOfLevel: (
        id: number,
        stars: number,
        coins: number,
        score: number,
      ) => {
        const starsOfLevel = get().starsOfLevel;
        const isAlreadyHasStars = starsOfLevel.find(s => s.id === id);
        if (isAlreadyHasStars) {
          const newStarsOfLevel = starsOfLevel.map(level => {
            if (level.id === id) {
              return {
                ...level,
                stars:
                  isAlreadyHasStars.stars < stars
                    ? stars
                    : isAlreadyHasStars.stars,
                score:
                  (isAlreadyHasStars.score || 0) < score
                    ? score
                    : isAlreadyHasStars.score,
              };
            }
            return level;
          });
          set(state => ({
            starsOfLevel: newStarsOfLevel,
            coins: state.coins + coins,
          }));
        } else {
          set(state => ({
            starsOfLevel: [...state.starsOfLevel, { id, stars, score }],
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
        const playerAchievements = get().playerAchievements;
        const newAchievements = playerAchievements.map(achievement => {
          if (achievement.id === id) {
            return { ...achievement, received: true };
          }
          return achievement;
        });

        set(state => ({
          playerAchievements: newAchievements,
          coins: state.coins + rewards,
        }));
      },
      setIsMusicOn: () => set(state => ({ isMusicOn: !state.isMusicOn })),
      setIsSoundOn: () => set(state => ({ isSoundOn: !state.isSoundOn })),
    }),
    {
      name: 'player-storage',
      storage: createJSONStorage(() => storage),
    },
  ),
);

export default usePlayerStore;
