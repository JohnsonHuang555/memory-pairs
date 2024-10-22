import { Card } from '@/models/Card';
import { Level } from '@/models/Level';
import { shuffleArray } from '@/utils';

import { create } from 'zustand';

type GameState = {
  cards: Card[];
  selectedCards: Card[];
  matchCount: number;
  generateCards: (levelInfo: Level) => void;
  onFlip: (id: number) => void;
  checkIsMatch: (card: Card) => void;
  updateCard: (id: number) => void;
};

const useGameStore = create<GameState>((set, get) => ({
  cards: [],
  selectedCards: [],
  matchCount: 0,
  reset: () => {
    set(() => ({ cards: [], selectedCards: [], matchCount: 0 }));
  },
  generateCards: ({ questions, matchCount }: Level) => {
    let tempId = 0;
    const cards: Card[] = questions.reduce<Card[]>((acc, content) => {
      for (let index = 0; index < matchCount; index++) {
        tempId++;
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
      selectedCards: [],
      cards: shuffledCards,
      matchCount,
    }));
  },
  onFlip: (id: number) => {
    const cards = get().cards;
    const newCards = cards.map(card => {
      if (card.id === id) {
        card.isFlipped = !card.isFlipped;
      }
      return card;
    });
    set(() => ({
      cards: newCards,
    }));
  },
  checkIsMatch: (card: Card) => {
    set(state => {
      const alreadyExist = state.selectedCards.find(c => c.id === card.id);
      // 沒選過的才能寫入
      if (alreadyExist) return state;

      const temp: Card[] = [...state.selectedCards, { ...card }];
      const newCards = temp.reduce<Card[]>((acc, card, index) => {
        if (index % 2 === 1) {
          // 每 2 張卡片一組，並進行配對
          const prevCard = acc[acc.length - 1];
          if (prevCard.content === card.content) {
            prevCard.isMatched = true;
            card.isMatched = true;
          } else {
            prevCard.isMatched = false;
            card.isMatched = false;
          }
        }
        acc.push(card);
        return acc;
      }, []);
      return {
        ...state,
        selectedCards: newCards,
      };
    });
  },
  updateCard: (id: number) => {
    set(state => {
      return state;
      // if (state.selectedCards.length === 0) return state;
      // const currentIndex = state.selectedCards.findIndex(
      //   card => card.id === id,
      // );
      // // 確保找到的索引有效且不是負數
      // if (currentIndex === -1) return state;

      // // 根據規則，找到另一個物件的索引
      // const pairIndex =
      //   currentIndex % 2 === 0 ? currentIndex + 1 : currentIndex - 1;

      // // 另一張卡
      // const otherCard = state.selectedCards[pairIndex];

      // if (state.selectedCards[currentIndex].isMatched) {
      //   if (otherCard.isAnimateComplete) {
      //     const newCards = state.cards.map(c => {
      //       if (c.id === id || c.id === otherCard.id) {
      //         c.isMatched = true;
      //       }
      //       return c;
      //     });
      //     const newCurrentSelectCards = state.selectedCards.filter(
      //       c => ![id, otherCard?.id].includes(c.id),
      //     );

      //     return {
      //       cards: newCards,
      //       selectedCards: newCurrentSelectCards,
      //     };
      //   } else {
      //     const newCurrentSelectCards = state.selectedCards.map(c => {
      //       if (c.id === id) {
      //         c.isAnimateComplete = true;
      //       }
      //       return c;
      //     });
      //     return {
      //       selectedCards: newCurrentSelectCards
      //     }
      //   }
      // } else {
      //   if (otherCard?.isAnimateComplete) {
      //     setTimeout(() => {
      //       setCards(state =>
      //         state.map(c => {
      //           if (c.id === cardId || c.id === otherCard?.id) {
      //             c.isFlip = false;
      //           }
      //           return c;
      //         }),
      //       );
      //     }, 500);

      //     const newCurrentSelectCards = currentSelectedCards.filter(
      //       c => ![cardId, otherCard?.id].includes(c.id),
      //     );

      //     setCurrentSelectedCards(newCurrentSelectCards);
      //   } else {
      //     const newCurrentSelectCards = currentSelectedCards.map(c => {
      //       if (c.id === cardId) {
      //         c.isAnimateComplete = true;
      //       }
      //       return c;
      //     });
      //     setCurrentSelectedCards(newCurrentSelectCards);
      //   }
      // }
    });
  },
}));

export default useGameStore;
