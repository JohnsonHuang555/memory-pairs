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
  id: string;
  completed: boolean;
  received: boolean;
};

// 玩家行為統計
type PlayerBehaviorStatistics = {
  flipCount: number; // 翻牌次數
  matchCount: number; // 配對次數
  gamePassCount: number; // 過關次數
  maxCombo: number; // 最高 Combo 數
  maxRank: number; // 最高名次
  maxScore: number; // 最高名次
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
  playerBehaviorStatistics: PlayerBehaviorStatistics;
  // 過關
  passGame: (params: {
    themeType: LevelTheme;
    levelInfo: Level;
    maxCombo: number;
    score: number;
    lastLevelId: number;
    stars: number;
    coins: number;
    currentPassLevelCount: number;
    currentAllStars: number;
  }) => void;
  // 更新玩家道具
  updatePlayerItem: (
    type: ItemType,
    action: 'purchase' | 'upgrade' | 'use',
  ) => void;
  // 更新購買主題
  updatePurchaseThemeIds: (id: number) => void;
  // 收取成就報酬
  receiveAchievementRewards: (id: string, rewards: number) => void;
  setIsMusicOn: () => void;
  setIsSoundOn: () => void;
  // 更新玩家資料
  updatePlayerInfo: (name: string, id?: string) => void;
  // 新增翻牌次數
  addFlipCount: () => void;
  // 新增配對次數
  addMatchCount: () => void;
  // 新增最高排名
  updateMaxRank: (rank: number) => void;
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
      playerBehaviorStatistics: {
        flipCount: 0,
        matchCount: 0,
        gamePassCount: 0,
        maxCombo: 0,
        maxRank: 0,
        maxScore: 0,
      },
      passGame: ({
        themeType,
        levelInfo,
        maxCombo,
        score,
        lastLevelId,
        stars,
        coins,
        currentPassLevelCount,
        currentAllStars,
      }) => {
        const themeList = get().themeList;
        const currentScore = get().playerBehaviorStatistics.maxScore;
        const currentCombo = get().playerBehaviorStatistics.maxCombo;

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
          set(() => ({
            themeList: newThemeList,
          }));
        } else {
          // 代表是新的主題資料
          set(state => ({
            themeList: [
              ...state.themeList,
              {
                themeType,
                currentLevelId: 2,
                starsOfLevel: [
                  {
                    id: levelInfo.id,
                    stars,
                    score,
                  },
                ],
              },
            ],
          }));
        }

        const playerAchievements = get().playerAchievements;
        const newAchievements = [...playerAchievements].map(p => {
          if (p.id === 'a1' && !p.completed && currentPassLevelCount >= 1) {
            p.completed = true;
          }
          if (p.id === 'a2' && !p.completed && currentPassLevelCount >= 10) {
            p.completed = true;
          }
          if (p.id === 'a3' && !p.completed && currentPassLevelCount >= 50) {
            p.completed = true;
          }
          if (p.id === 'a4' && !p.completed && currentPassLevelCount >= 100) {
            p.completed = true;
          }
          if (p.id === 'a5' && !p.completed && currentPassLevelCount >= 500) {
            p.completed = true;
          }
          if (p.id === 'a6' && !p.completed && currentPassLevelCount >= 1000) {
            p.completed = true;
          }
          if (p.id === 'b1' && !p.completed && stars === 3) {
            p.completed = true;
          }
          if (p.id === 'b2' && !p.completed && currentAllStars >= 50) {
            p.completed = true;
          }
          if (p.id === 'b3' && !p.completed && currentAllStars >= 100) {
            p.completed = true;
          }
          if (p.id === 'b4' && !p.completed && currentAllStars >= 500) {
            p.completed = true;
          }
          if (p.id === 'b5' && !p.completed && currentAllStars >= 1000) {
            p.completed = true;
          }
          if (p.id === 'b6' && !p.completed && currentAllStars >= 1500) {
            p.completed = true;
          }
          if (p.id === 'c1' && !p.completed && maxCombo >= 3) {
            p.completed = true;
          }
          if (p.id === 'c2' && !p.completed && maxCombo >= 5) {
            p.completed = true;
          }
          if (p.id === 'c3' && !p.completed && maxCombo >= 8) {
            p.completed = true;
          }
          if (p.id === 'c4' && !p.completed && maxCombo >= 12) {
            p.completed = true;
          }
          if (p.id === 'd1' && !p.completed && score >= 300) {
            p.completed = true;
          }
          if (p.id === 'd2' && !p.completed && score >= 500) {
            p.completed = true;
          }
          if (p.id === 'd3' && !p.completed && score >= 800) {
            p.completed = true;
          }
          return p;
        });

        set(state => ({
          playerAchievements: newAchievements,
          playerBehaviorStatistics: {
            ...state.playerBehaviorStatistics,
            maxScore: score > currentScore ? score : currentScore,
            maxCombo: maxCombo > currentCombo ? maxCombo : currentCombo,
            gamePassCount: state.playerBehaviorStatistics.gamePassCount + 1,
          },
          coins: state.coins + coins,
        }));
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
      updatePurchaseThemeIds: (id: number) => {
        set(state => ({ purchaseThemeIds: [...state.purchaseThemeIds, id] }));
      },
      receiveAchievementRewards: (id: string, rewards: number) => {
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
      addFlipCount: () => {
        set(state => ({
          playerBehaviorStatistics: {
            ...state.playerBehaviorStatistics,
            flipCount: state.playerBehaviorStatistics.flipCount + 1,
          },
        }));
      },
      addMatchCount: () => {
        set(state => ({
          playerBehaviorStatistics: {
            ...state.playerBehaviorStatistics,
            matchCount: state.playerBehaviorStatistics.matchCount + 1,
          },
        }));
      },
      updateMaxRank: (rank: number) => {
        const maxRank = get().playerBehaviorStatistics.maxRank;
        if (rank > maxRank) {
          set(state => ({
            playerBehaviorStatistics: {
              ...state.playerBehaviorStatistics,
              maxRank: rank,
            },
          }));
        }
      },
    }),
    {
      name: 'player-storage',
      storage: createJSONStorage(() => storage),
    },
  ),
);

export default usePlayerStore;
