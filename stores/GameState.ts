import { Card } from '@/models/Card';
import { Level } from '@/models/Level';
import { shuffleArray } from '@/utils';

import { create } from 'zustand';

type GameState = {
  cards: Card[];
  generateCards: (levelInfo: Level) => void;
};

const useGameStore = create<GameState>(set => ({
  cards: [],
  generateCards: ({ questions, matchCount }: Level) => {
    let tempId = 0;
    const cards: Card[] = questions.reduce<Card[]>((acc, content) => {
      for (let index = 0; index < matchCount; index++) {
        tempId++
        // id 從 1 開始
        acc.push({
          id: tempId,
          content,
          isFlipped: false,
          isMatched: false,
        });
      }
      return acc;
    }, []);
    const shuffledCards = shuffleArray(cards);
    set(() => ({
      cards: shuffledCards,
    }));
  },
}));

export default useGameStore;
