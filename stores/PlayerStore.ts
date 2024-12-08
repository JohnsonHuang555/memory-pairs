import { allAchievements } from '@/constants/AllAchievements';
import { allItems } from '@/constants/AllItems';
import { ItemType, PlayerItem } from '@/models/Item';
import { Level, LevelTheme } from '@/models/Level';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { create } from 'zustand';
import { StateStorage, createJSONStorage, persist } from 'zustand/middleware';

type PlayerThemeInfo = {
  themeType: LevelTheme;
  currentLevelId: number;
  starsOfLevel: StarsOfLevel[];
};

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
  id?: string;
  name?: string;
  themeList: PlayerThemeInfo[];
  coins: number;
  items: PlayerItem[];
  purchaseThemeIds: number[];
  playerAchievements: PlayerAchievement[];
  isMusicOn: boolean;
  isSoundOn: boolean;
  passGame: (params: {
    themeType: LevelTheme;
    levelInfo: Level;
    maxCombo: number;
    score: number;
    lastLevelId: number;
    stars: number;
    coins: number;
  }) => void;
  updatePlayerItem: (
    type: ItemType,
    action: 'purchase' | 'upgrade' | 'use',
  ) => void;
  updatePurchaseThemeIds: (id: number) => void;
  receiveAchievementRewards: (id: number, rewards: number) => void;
  setIsMusicOn: () => void;
  setIsSoundOn: () => void;
  updatePlayerInfo: (name: string, id?: string) => void;
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

const usePlayerStore = create<PlayerState>()(
  persist(
    (set, get) => ({
      currentLevelId: 1,
      themeList: [],
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
      purchaseThemeIds: [],
      isMusicOn: true,
      isSoundOn: true,
      // 過關
      passGame: ({
        themeType,
        levelInfo,
        maxCombo,
        score,
        lastLevelId,
        stars,
        coins,
      }) => {
        const themeList = get().themeList;

        const isExist = themeList.find(theme => theme.themeType === themeType);
        if (isExist) {
          const newThemeList = themeList.map(themeInfo => {
            const temp = { ...themeInfo };
            if (temp.themeType === themeType) {
              const starsOfLevelIndex = temp.starsOfLevel.findIndex(
                s => s.id === levelInfo.id,
              );
              if (starsOfLevelIndex !== -1) {
                temp.starsOfLevel[starsOfLevelIndex].stars =
                  temp.starsOfLevel[starsOfLevelIndex].stars < stars
                    ? stars
                    : temp.starsOfLevel[starsOfLevelIndex].stars;

                temp.starsOfLevel[starsOfLevelIndex].score =
                  (temp.starsOfLevel[starsOfLevelIndex].score || 0) < score
                    ? score
                    : temp.starsOfLevel[starsOfLevelIndex].score;
              } else {
                temp.starsOfLevel.push({ id: levelInfo.id, stars, score });
              }

              temp.currentLevelId =
                levelInfo.id === temp.currentLevelId &&
                lastLevelId !== levelInfo.id
                  ? temp.currentLevelId + 1
                  : temp.currentLevelId;

              return temp;
            }
            return themeInfo;
          });
          set(state => ({
            themeList: newThemeList,
            coins: state.coins + coins,
          }));
        } else {
          // 代表是新的主題資料
          set(state => ({
            themeList: [
              ...state.themeList,
              {
                themeType,
                currentLevelId: 1,
                starsOfLevel: [
                  {
                    id: levelInfo.id,
                    stars,
                    score,
                  },
                ],
              },
            ],
            coins: state.coins + coins,
          }));
        }
      },
      // updateCurrentLevelId: (
      //   themeType: LevelTheme,
      //   levelInfo: Level,
      //   totalStars: number,
      //   maxCombo: number,
      //   score: number,
      //   lastLevelId: number,
      // ) => {
      //   const playerAchievements = get().playerAchievements;
      //   const themeInfo = get().themeList.find(
      //     t => t.themeType === themeType && t.currentLevelId === levelInfo.id,
      //   );

      //   if (!themeInfo) return;

      //   const newAchievements = [...playerAchievements];

      //   // 成就檢查
      //   // if (currentLevelId > 0 && !newAchievements[0].completed) {
      //   //   newAchievements[0].completed = true;
      //   // }
      //   // if (currentLevelId > 5 && !newAchievements[1].completed) {
      //   //   newAchievements[1].completed = true;
      //   // }
      //   // if (currentLevelId > 20 && !newAchievements[2].completed) {
      //   //   newAchievements[2].completed = true;
      //   // }
      //   // if (currentLevelId > 50 && !newAchievements[3].completed) {
      //   //   newAchievements[3].completed = true;
      //   // }
      //   // if (currentLevelId > 80 && !newAchievements[4].completed) {
      //   //   newAchievements[4].completed = true;
      //   // }
      //   // if (currentLevelId === 100 && !newAchievements[5].completed) {
      //   //   newAchievements[5].completed = true;
      //   // }
      //   // if (levelInfo.stars === 3 && !newAchievements[6].completed) {
      //   //   newAchievements[6].completed = true;
      //   // }
      //   // if (totalStars >= 30 && !newAchievements[7].completed) {
      //   //   newAchievements[7].completed = true;
      //   // }
      //   // if (totalStars >= 60 && !newAchievements[8].completed) {
      //   //   newAchievements[8].completed = true;
      //   // }
      //   // if (totalStars >= 90 && !newAchievements[9].completed) {
      //   //   newAchievements[9].completed = true;
      //   // }
      //   // if (totalStars >= 120 && !newAchievements[10].completed) {
      //   //   newAchievements[10].completed = true;
      //   // }
      //   // if (totalStars >= 150 && !newAchievements[11].completed) {
      //   //   newAchievements[11].completed = true;
      //   // }
      //   // if (maxCombo >= 3 && !newAchievements[12].completed) {
      //   //   newAchievements[12].completed = true;
      //   // }
      //   // if (maxCombo >= 5 && !newAchievements[13].completed) {
      //   //   newAchievements[13].completed = true;
      //   // }
      //   // if (maxCombo >= 8 && !newAchievements[14].completed) {
      //   //   newAchievements[14].completed = true;
      //   // }
      //   // if (maxCombo >= 12 && !newAchievements[15].completed) {
      //   //   newAchievements[15].completed = true;
      //   // }
      //   // if (score >= 300 && !newAchievements[16].completed) {
      //   //   newAchievements[16].completed = true;
      //   // }
      //   // if (score >= 600 && !newAchievements[17].completed) {
      //   //   newAchievements[17].completed = true;
      //   // }

      //   // set(state => ({
      //   //   currentLevelId:
      //   //     levelInfo.id === state.currentLevelId &&
      //   //     lastLevelId !== levelInfo.id
      //   //       ? state.currentLevelId + 1
      //   //       : state.currentLevelId,
      //   //   playerAchievements: newAchievements,
      //   // }));
      // },
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
      updatePurchaseThemeIds: (id: number) => {
        set(state => ({ purchaseThemeIds: [...state.purchaseThemeIds, id] }));
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
      updatePlayerInfo: (name: string, id?: string) =>
        set(() => ({ name, id })),
    }),
    {
      name: 'player-storage',
      storage: createJSONStorage(() => storage),
    },
  ),
);

export default usePlayerStore;
