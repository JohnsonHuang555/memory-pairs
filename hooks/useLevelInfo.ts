import { useMemo } from 'react';

import { LevelTheme } from '@/models/Level';
import useLevelStore from '@/stores/LevelStore';

import { useLocalSearchParams } from 'expo-router';

export const gameTheme: { [key: string]: string } = {
  [LevelTheme.Animal]: '動物',
  [LevelTheme.Color]: '顏色',
  [LevelTheme.Avatar]: '人物',
  [LevelTheme.Ancient]: '古人',
  [LevelTheme.Emoji]: '表情',
  [LevelTheme.Leaves]: '葉子',
  [LevelTheme.Tree]: '樹木',
  [LevelTheme.Cactus]: '仙人掌',
  [LevelTheme.Furniture]: '傢俱',
  [LevelTheme.ChineseWord]: '中文字',
  [LevelTheme.SmartWatch]: '智慧手錶',
  [LevelTheme.Notice]: '公共標誌',
  [LevelTheme.Space]: '太空',
  [LevelTheme.Grass]: '草叢',
  [LevelTheme.Coin]: '錢幣',
  [LevelTheme.SweetDrink]: '甜點飲料',
  [LevelTheme.Gift]: '禮物盒',
  [LevelTheme.WaterSport]: '水上活動',
};

export const gameMatchCount: { [key: string]: string } = {
  2: '兩個一組',
  3: '三個一組',
  4: '四個一組',
  5: '五個一組',
  6: '六個一組',
  7: '七個一組',
};

const useLevelInfo = () => {
  const { theme } = useLocalSearchParams();
  const { levels, selectedLevelId } = useLevelStore();

  const levelInfo = useMemo(
    () =>
      levels
        .filter(l => l.theme === Number(theme))
        .map(l => {
          if (l.matchCount === 2 && l.questions.length === 6) {
            return {
              ...l,
              timer: 40,
              star1Score: 180,
              star2Score: 270,
              star3Score: 360,
              star1Coins: 10,
              star2Coins: 30,
              star3Coins: 50,
              columns: 3,
            };
          } else if (l.matchCount === 2 && l.questions.length === 8) {
            return {
              ...l,
              timer: 60,
              star1Score: 240,
              star2Score: 360,
              star3Score: 480,
              star1Coins: 20,
              star2Coins: 60,
              star3Coins: 100,
              columns: 4,
            };
          } else if (l.matchCount === 2 && l.questions.length === 10) {
            return {
              ...l,
              timer: 70,
              star1Score: 300,
              star2Score: 450,
              star3Score: 600,
              star1Coins: 30,
              star2Coins: 90,
              star3Coins: 150,
              columns: 4,
            };
          } else if (l.matchCount === 2 && l.questions.length === 12) {
            return {
              ...l,
              timer: 80,
              star1Score: 360,
              star2Score: 540,
              star3Score: 720,
              star1Coins: 40,
              star2Coins: 120,
              star3Coins: 200,
              columns: 4,
            };
          } else if (l.matchCount === 2 && l.questions.length === 15) {
            return {
              ...l,
              timer: 100,
              star1Score: 450,
              star2Score: 675,
              star3Score: 900,
              star1Coins: 50,
              star2Coins: 150,
              star3Coins: 250,
              columns: 5,
            };
          } else if (l.matchCount === 3 && l.questions.length === 4) {
            return {
              ...l,
              timer: 30,
              star1Score: 120,
              star2Score: 180,
              star3Score: 240,
              star1Coins: 60,
              star2Coins: 180,
              star3Coins: 300,
              columns: 3,
            };
          } else if (l.matchCount === 3 && l.questions.length === 8) {
            return {
              ...l,
              timer: 70,
              star1Score: 240,
              star2Score: 360,
              star3Score: 480,
              star1Coins: 70,
              star2Coins: 210,
              star3Coins: 350,
              columns: 4,
            };
          } else if (l.matchCount === 3 && l.questions.length === 10) {
            return {
              ...l,
              timer: 80,
              star1Score: 300,
              star2Score: 450,
              star3Score: 600,
              star1Coins: 80,
              star2Coins: 240,
              star3Coins: 400,
              columns: 5,
            };
          } else if (l.matchCount === 4 && l.questions.length === 3) {
            return {
              ...l,
              timer: 30,
              star1Score: 90,
              star2Score: 135,
              star3Score: 180,
              star1Coins: 90,
              star2Coins: 270,
              star3Coins: 450,
              columns: 3,
            };
          } else if (l.matchCount === 4 && l.questions.length === 4) {
            return {
              ...l,
              timer: 40,
              star1Score: 120,
              star2Score: 180,
              star3Score: 240,
              star1Coins: 100,
              star2Coins: 300,
              star3Coins: 500,
              columns: 4,
            };
          } else if (l.matchCount === 4 && l.questions.length === 5) {
            return {
              ...l,
              timer: 50,
              star1Score: 150,
              star2Score: 225,
              star3Score: 300,
              star1Coins: 110,
              star2Coins: 330,
              star3Coins: 550,
              columns: 4,
            };
          } else if (l.matchCount === 4 && l.questions.length === 6) {
            return {
              ...l,
              timer: 70,
              star1Score: 180,
              star2Score: 270,
              star3Score: 360,
              star1Coins: 120,
              star2Coins: 360,
              star3Coins: 600,
              columns: 4,
            };
          } else if (l.matchCount === 5 && l.questions.length === 4) {
            return {
              ...l,
              timer: 50,
              star1Score: 120,
              star2Score: 180,
              star3Score: 240,
              star1Coins: 130,
              star2Coins: 390,
              star3Coins: 650,
              columns: 4,
            };
          } else if (l.matchCount === 5 && l.questions.length === 5) {
            return {
              ...l,
              timer: 60,
              star1Score: 150,
              star2Score: 225,
              star3Score: 300,
              star1Coins: 140,
              star2Coins: 420,
              star3Coins: 700,
              columns: 5,
            };
          } else if (l.matchCount === 5 && l.questions.length === 6) {
            return {
              ...l,
              timer: 80,
              star1Score: 180,
              star2Score: 270,
              star3Score: 360,
              star1Coins: 150,
              star2Coins: 450,
              star3Coins: 750,
              columns: 5,
            };
          } else if (l.matchCount === 5 && l.questions.length === 7) {
            return {
              ...l,
              timer: 100,
              star1Score: 210,
              star2Score: 315,
              star3Score: 420,
              star1Coins: 160,
              star2Coins: 480,
              star3Coins: 800,
              columns: 5,
            };
          } else {
            return l;
          }
        })
        .find(level => level.id === selectedLevelId),
    [levels, theme, selectedLevelId],
  );

  return {
    levelInfo,
  };
};

export default useLevelInfo;
