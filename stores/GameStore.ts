import { Card } from '@/models/Card';
import { UseItem } from '@/models/Item';
import { Level } from '@/models/Level';
import { getRandomElementsFromArray, shuffleArray } from '@/utils';

import { create } from 'zustand';

type GameState = {
  score: number;
  cards: Card[];
  selectedCards: Card[];
  matchCount: number;
  questions: string[];
  timer: number;
  isPreviousMatch: boolean;
  combo: number;
  passGame: boolean;
  stars: number;
  isCompleteGame: boolean;
  useItems: UseItem[];
  needUpdatePlayerInfo: boolean;
  disableGame: boolean;
  setStars: (stars: number) => void;
  generateCards: (levelInfo: Level) => void;
  onFlip: (id: number) => void;
  checkIsMatch: (card: Card) => void;
  updateCard: (id: number) => void;
  resetGame: () => void;
  finalCalculateScore: (remainedTime: number) => void;
  setUseItems: (items: UseItem[]) => void;
  setAutoPairsItemEffect: (count: number) => void;
  setDisableGame: () => void;
};

const initState = {
  score: 0,
  cards: [],
  selectedCards: [],
  matchCount: 0,
  questions: [],
  timer: 0,
  combo: 0,
  isPreviousMatch: false,
  passGame: false,
  stars: 0,
  isCompleteGame: false,
  useItems: [],
  needUpdatePlayerInfo: false,
  disableGame: false,
};

const useGameStore = create<GameState>((set, get) => ({
  ...initState,
  resetGame: () => {
    set(() => ({ ...initState }));
  },
  setStars: (stars: number) => {
    set(() => ({ stars }));
  },
  generateCards: ({ questions, matchCount, timer }: Level) => {
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
      cards: shuffledCards,
      matchCount,
      timer,
      questions,
    }));
  },
  onFlip: (id: number) => {
    const cards = get().cards;
    const newCards = cards.map(card => {
      if (card.id === id) {
        card.isFlipped = true;
      }
      return card;
    });
    set(() => ({
      cards: newCards,
    }));
  },
  checkIsMatch: (card: Card) => {
    const selectedCards = get().selectedCards;
    const matchCount = get().matchCount;
    const alreadyExist = selectedCards.find(c => c.id === card.id);
    // 沒選過的才能寫入
    if (alreadyExist) return;

    const temp: Card[] = [...selectedCards, { ...card }];
    let newCards: Card[] = [];

    switch (matchCount) {
      case 2:
        newCards = temp.reduce<Card[]>((acc, card, index) => {
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
        break;
      case 3:
        newCards = temp.reduce<Card[]>((acc, card, index) => {
          if (index % 3 === 2) {
            // 每三個卡片一組
            const group = acc.slice(-2); // 取前面兩張卡片
            if (group.every(c => c.content === card.content)) {
              group.forEach(c => {
                c.isFlipped = true;
                c.isMatched = true;
              });
              card.isFlipped = true;
              card.isMatched = true;
            } else {
              group.forEach(c => {
                c.isFlipped = false;
                c.isMatched = false;
              });
              card.isFlipped = false;
              card.isMatched = false;
            }
          }
          acc.push(card);
          return acc;
        }, []);
        break;
      case 4:
        newCards = temp.reduce<Card[]>((acc, card, index) => {
          if (index % 4 === 3) {
            // 每四個卡片一組
            const group = acc.slice(-3); // 取前面三張卡片
            if (group.every(c => c.content === card.content)) {
              group.forEach(c => {
                c.isFlipped = true;
                c.isMatched = true;
              });
              card.isFlipped = true;
              card.isMatched = true;
            } else {
              group.forEach(c => {
                c.isFlipped = false;
                c.isMatched = false;
              });
              card.isFlipped = false;
              card.isMatched = false;
            }
          }
          acc.push(card);
          return acc;
        }, []);
        break;
      case 5:
        newCards = temp.reduce<Card[]>((acc, card, index) => {
          if (index % 5 === 4) {
            // 每五個卡片一組
            const group = acc.slice(-4); // 取前面四張卡片
            if (group.every(c => c.content === card.content)) {
              group.forEach(c => {
                c.isFlipped = true;
                c.isMatched = true;
              });
              card.isFlipped = true;
              card.isMatched = true;
            } else {
              group.forEach(c => {
                c.isFlipped = false;
                c.isMatched = false;
              });
              card.isFlipped = false;
              card.isMatched = false;
            }
          }
          acc.push(card);
          return acc;
        }, []);
        break;
      case 6:
        newCards = temp.reduce<Card[]>((acc, card, index) => {
          if (index % 6 === 5) {
            // 每六個卡片一組
            const group = acc.slice(-5); // 取前面五張卡片
            if (group.every(c => c.content === card.content)) {
              group.forEach(c => {
                c.isFlipped = true;
                c.isMatched = true;
              });
              card.isFlipped = true;
              card.isMatched = true;
            } else {
              group.forEach(c => {
                c.isFlipped = false;
                c.isMatched = false;
              });
              card.isFlipped = false;
              card.isMatched = false;
            }
          }
          acc.push(card);
          return acc;
        }, []);
        break;
      case 7:
        newCards = temp.reduce<Card[]>((acc, card, index) => {
          if (index % 7 === 6) {
            // 每六個卡片一組
            const group = acc.slice(-6); // 取前面五張卡片
            if (group.every(c => c.content === card.content)) {
              group.forEach(c => {
                c.isFlipped = true;
                c.isMatched = true;
              });
              card.isFlipped = true;
              card.isMatched = true;
            } else {
              group.forEach(c => {
                c.isFlipped = false;
                c.isMatched = false;
              });
              card.isFlipped = false;
              card.isMatched = false;
            }
          }
          acc.push(card);
          return acc;
        }, []);
        break;
    }

    set(() => ({
      selectedCards: newCards,
    }));
  },
  updateCard: (id: number) => {
    const selectedCards = get().selectedCards;
    if (selectedCards.length === 0) return;

    const cards = get().cards;
    const combo = get().combo;
    const matchCount = get().matchCount;

    const currentIndex = selectedCards.findIndex(card => card.id === id);
    // 確保找到的索引有效且不是負數
    if (currentIndex === -1) return;

    switch (matchCount) {
      case 2: {
        const pairIndex =
          currentIndex % 2 === 0 ? currentIndex + 1 : currentIndex - 1;

        // 另一張卡
        const otherCard = selectedCards[pairIndex];

        if (selectedCards[currentIndex].isMatched) {
          if (otherCard?.isAnimateComplete) {
            const newCards = cards.map(c => {
              if (c.id === id || c.id === otherCard?.id) {
                return { ...c, isMatched: true };
              }
              return c;
            });

            const newSelectCards = selectedCards.filter(
              c => ![id, otherCard?.id].includes(c.id),
            );

            const isCompleteGame =
              newCards.filter(n => n.isMatched).length === cards.length;

            set(state => ({
              cards: newCards,
              selectedCards: newSelectCards,
              score:
                state.score + 30 + (state.isPreviousMatch ? combo + 1 * 30 : 0),
              isPreviousMatch: true,
              combo: state.isPreviousMatch ? state.combo + 1 : 0,
              isCompleteGame,
            }));
          } else {
            const newSelectCards = selectedCards.map(c => {
              if (c.id === id) {
                return { ...c, isAnimateComplete: true };
              }
              return c;
            });
            set(() => ({ selectedCards: newSelectCards }));
          }
        } else {
          if (otherCard?.isAnimateComplete) {
            const newCards = cards.map(c => {
              if (c.id === id || c.id === otherCard?.id) {
                return { ...c, isFlipped: false };
              }
              return c;
            });

            const newSelectCards = selectedCards.filter(
              c => ![id, otherCard?.id].includes(c.id),
            );
            set(() => ({
              cards: newCards,
              selectedCards: newSelectCards,
              isPreviousMatch: false,
              combo: 0,
            }));
          } else {
            const newSelectCards = selectedCards.map(c => {
              if (c.id === id) {
                return { ...c, isAnimateComplete: true };
              }
              return c;
            });
            set(() => ({ selectedCards: newSelectCards }));
          }
        }
        break;
      }
      case 3: {
        const needCheck = currentIndex % 3 === 2;
        // 前一張
        const prevFirstCard = selectedCards[currentIndex - 1];
        // 前第二張
        const prevSecondCard = selectedCards[currentIndex - 2];

        if (needCheck) {
          if (selectedCards[currentIndex].isMatched) {
            const newCards = cards.map(c => {
              if (
                c.id === id ||
                c.id === prevFirstCard.id ||
                c.id === prevSecondCard.id
              ) {
                return { ...c, isMatched: true };
              }
              return c;
            });

            const newSelectCards = selectedCards.filter(
              c => ![id, prevFirstCard.id, prevSecondCard.id].includes(c.id),
            );

            const isCompleteGame =
              newCards.filter(n => n.isMatched).length === cards.length;

            set(state => ({
              cards: newCards,
              selectedCards: newSelectCards,
              score:
                state.score + 30 + (state.isPreviousMatch ? combo + 1 * 30 : 0),
              isPreviousMatch: true,
              combo: state.isPreviousMatch ? state.combo + 1 : 0,
              isCompleteGame,
            }));
          } else {
            const newCards = cards.map(c => {
              if (
                c.id === id ||
                c.id === prevFirstCard.id ||
                c.id === prevSecondCard.id
              ) {
                return { ...c, isFlipped: false };
              }
              return c;
            });

            const newSelectCards = selectedCards.filter(
              c => ![id, prevFirstCard.id, prevSecondCard.id].includes(c.id),
            );

            set(() => ({
              cards: newCards,
              selectedCards: newSelectCards,
              isPreviousMatch: false,
            }));
          }
        } else {
          const newSelectCards = selectedCards.map(c => {
            if (c.id === id) {
              return { ...c, isAnimateComplete: true };
            }
            return c;
          });
          set(() => ({ selectedCards: newSelectCards }));
        }
        break;
      }
      case 4: {
        const needCheck = currentIndex % 4 === 3;
        // 前一張
        const prevFirstCard = selectedCards[currentIndex - 1];
        // 前第二張
        const prevSecondCard = selectedCards[currentIndex - 2];
        // 前第三張
        const prevThirdCard = selectedCards[currentIndex - 3];

        if (needCheck) {
          if (selectedCards[currentIndex].isMatched) {
            const newCards = cards.map(c => {
              if (
                c.id === id ||
                c.id === prevFirstCard.id ||
                c.id === prevSecondCard.id ||
                c.id === prevThirdCard.id
              ) {
                return { ...c, isMatched: true };
              }
              return c;
            });

            const newSelectCards = selectedCards.filter(
              c =>
                ![
                  id,
                  prevFirstCard.id,
                  prevSecondCard.id,
                  prevThirdCard.id,
                ].includes(c.id),
            );

            const isCompleteGame =
              newCards.filter(n => n.isMatched).length === cards.length;

            set(state => ({
              cards: newCards,
              selectedCards: newSelectCards,
              score:
                state.score + 30 + (state.isPreviousMatch ? combo + 1 * 30 : 0),
              isPreviousMatch: true,
              combo: state.isPreviousMatch ? state.combo + 1 : 0,
              isCompleteGame,
            }));
          } else {
            const newCards = cards.map(c => {
              if (
                c.id === id ||
                c.id === prevFirstCard.id ||
                c.id === prevSecondCard.id ||
                c.id === prevThirdCard.id
              ) {
                return { ...c, isFlipped: false };
              }
              return c;
            });

            const newSelectCards = selectedCards.filter(
              c =>
                ![
                  id,
                  prevFirstCard.id,
                  prevSecondCard.id,
                  prevThirdCard.id,
                ].includes(c.id),
            );

            set(() => ({
              cards: newCards,
              selectedCards: newSelectCards,
              isPreviousMatch: false,
            }));
          }
        } else {
          const newSelectCards = selectedCards.map(c => {
            if (c.id === id) {
              return { ...c, isAnimateComplete: true };
            }
            return c;
          });
          set(() => ({ selectedCards: newSelectCards }));
        }
        break;
      }
      case 5: {
        const needCheck = currentIndex % 5 === 4;
        // 前一張
        const prevFirstCard = selectedCards[currentIndex - 1];
        // 前第二張
        const prevSecondCard = selectedCards[currentIndex - 2];
        // 前第三張
        const prevThirdCard = selectedCards[currentIndex - 3];
        // 前第四張
        const prevFourthCard = selectedCards[currentIndex - 4];

        if (needCheck) {
          if (selectedCards[currentIndex].isMatched) {
            const newCards = cards.map(c => {
              if (
                c.id === id ||
                c.id === prevFirstCard.id ||
                c.id === prevSecondCard.id ||
                c.id === prevThirdCard.id ||
                c.id === prevFourthCard.id
              ) {
                return { ...c, isMatched: true };
              }
              return c;
            });

            const newSelectCards = selectedCards.filter(
              c =>
                ![
                  id,
                  prevFirstCard.id,
                  prevSecondCard.id,
                  prevThirdCard.id,
                  prevFourthCard.id,
                ].includes(c.id),
            );

            const isCompleteGame =
              newCards.filter(n => n.isMatched).length === cards.length;

            set(state => ({
              cards: newCards,
              selectedCards: newSelectCards,
              score:
                state.score + 30 + (state.isPreviousMatch ? combo + 1 * 30 : 0),
              isPreviousMatch: true,
              combo: state.isPreviousMatch ? state.combo + 1 : 0,
              isCompleteGame,
            }));
          } else {
            const newCards = cards.map(c => {
              if (
                c.id === id ||
                c.id === prevFirstCard.id ||
                c.id === prevSecondCard.id ||
                c.id === prevThirdCard.id ||
                c.id === prevFourthCard.id
              ) {
                return { ...c, isFlipped: false };
              }
              return c;
            });

            const newSelectCards = selectedCards.filter(
              c =>
                ![
                  id,
                  prevFirstCard.id,
                  prevSecondCard.id,
                  prevThirdCard.id,
                  prevFourthCard.id,
                ].includes(c.id),
            );

            set(() => ({
              cards: newCards,
              selectedCards: newSelectCards,
              isPreviousMatch: false,
            }));
          }
        } else {
          const newSelectCards = selectedCards.map(c => {
            if (c.id === id) {
              return { ...c, isAnimateComplete: true };
            }
            return c;
          });
          set(() => ({ selectedCards: newSelectCards }));
        }
        break;
      }
      case 6: {
        const needCheck = currentIndex % 6 === 5;
        // 前一張
        const prevFirstCard = selectedCards[currentIndex - 1];
        // 前第二張
        const prevSecondCard = selectedCards[currentIndex - 2];
        // 前第三張
        const prevThirdCard = selectedCards[currentIndex - 3];
        // 前第四張
        const prevFourthCard = selectedCards[currentIndex - 4];
        // 前第五張
        const prevFifthCard = selectedCards[currentIndex - 5];

        if (needCheck) {
          if (selectedCards[currentIndex].isMatched) {
            const newCards = cards.map(c => {
              if (
                c.id === id ||
                c.id === prevFirstCard.id ||
                c.id === prevSecondCard.id ||
                c.id === prevThirdCard.id ||
                c.id === prevFourthCard.id ||
                c.id === prevFifthCard.id
              ) {
                return { ...c, isMatched: true };
              }
              return c;
            });

            const newSelectCards = selectedCards.filter(
              c =>
                ![
                  id,
                  prevFirstCard.id,
                  prevSecondCard.id,
                  prevThirdCard.id,
                  prevFourthCard.id,
                  prevFifthCard.id,
                ].includes(c.id),
            );

            const isCompleteGame =
              newCards.filter(n => n.isMatched).length === cards.length;

            set(state => ({
              cards: newCards,
              selectedCards: newSelectCards,
              score:
                state.score + 30 + (state.isPreviousMatch ? combo + 1 * 30 : 0),
              isPreviousMatch: true,
              combo: state.isPreviousMatch ? state.combo + 1 : 0,
              isCompleteGame,
            }));
          } else {
            const newCards = cards.map(c => {
              if (
                c.id === id ||
                c.id === prevFirstCard.id ||
                c.id === prevSecondCard.id ||
                c.id === prevThirdCard.id ||
                c.id === prevFourthCard.id ||
                c.id === prevFifthCard.id
              ) {
                return { ...c, isFlipped: false };
              }
              return c;
            });

            const newSelectCards = selectedCards.filter(
              c =>
                ![
                  id,
                  prevFirstCard.id,
                  prevSecondCard.id,
                  prevThirdCard.id,
                  prevFourthCard.id,
                  prevFifthCard.id,
                ].includes(c.id),
            );

            set(() => ({
              cards: newCards,
              selectedCards: newSelectCards,
              isPreviousMatch: false,
            }));
          }
        } else {
          const newSelectCards = selectedCards.map(c => {
            if (c.id === id) {
              return { ...c, isAnimateComplete: true };
            }
            return c;
          });
          set(() => ({ selectedCards: newSelectCards }));
        }
        break;
      }
      case 7: {
        const needCheck = currentIndex % 7 === 6;
        // 前一張
        const prevFirstCard = selectedCards[currentIndex - 1];
        // 前第二張
        const prevSecondCard = selectedCards[currentIndex - 2];
        // 前第三張
        const prevThirdCard = selectedCards[currentIndex - 3];
        // 前第四張
        const prevFourthCard = selectedCards[currentIndex - 4];
        // 前第五張
        const prevFifthCard = selectedCards[currentIndex - 5];
        // 前第六張
        const prevSixthCard = selectedCards[currentIndex - 6];

        if (needCheck) {
          if (selectedCards[currentIndex].isMatched) {
            const newCards = cards.map(c => {
              if (
                c.id === id ||
                c.id === prevFirstCard.id ||
                c.id === prevSecondCard.id ||
                c.id === prevThirdCard.id ||
                c.id === prevFourthCard.id ||
                c.id === prevFifthCard.id ||
                c.id === prevSixthCard.id
              ) {
                return { ...c, isMatched: true };
              }
              return c;
            });

            const newSelectCards = selectedCards.filter(
              c =>
                ![
                  id,
                  prevFirstCard.id,
                  prevSecondCard.id,
                  prevThirdCard.id,
                  prevFourthCard.id,
                  prevFifthCard.id,
                  prevSixthCard.id,
                ].includes(c.id),
            );

            const isCompleteGame =
              newCards.filter(n => n.isMatched).length === cards.length;

            set(state => ({
              cards: newCards,
              selectedCards: newSelectCards,
              score:
                state.score + 30 + (state.isPreviousMatch ? combo + 1 * 30 : 0),
              isPreviousMatch: true,
              combo: state.isPreviousMatch ? state.combo + 1 : 0,
              isCompleteGame,
            }));
          } else {
            const newCards = cards.map(c => {
              if (
                c.id === id ||
                c.id === prevFirstCard.id ||
                c.id === prevSecondCard.id ||
                c.id === prevThirdCard.id ||
                c.id === prevFourthCard.id ||
                c.id === prevFifthCard.id ||
                c.id === prevSixthCard.id
              ) {
                return { ...c, isFlipped: false };
              }
              return c;
            });

            const newSelectCards = selectedCards.filter(
              c =>
                ![
                  id,
                  prevFirstCard.id,
                  prevSecondCard.id,
                  prevThirdCard.id,
                  prevFourthCard.id,
                  prevFifthCard.id,
                  prevSixthCard.id,
                ].includes(c.id),
            );

            set(() => ({
              cards: newCards,
              selectedCards: newSelectCards,
              isPreviousMatch: false,
            }));
          }
        } else {
          const newSelectCards = selectedCards.map(c => {
            if (c.id === id) {
              return { ...c, isAnimateComplete: true };
            }
            return c;
          });
          set(() => ({ selectedCards: newSelectCards }));
        }
        break;
      }
    }
  },
  finalCalculateScore: (remainedTime: number) => {
    set(state => ({
      score: state.score + remainedTime * 5,
    }));
    setTimeout(() => {
      set(() => ({ needUpdatePlayerInfo: true }));
    }, 1000);
  },
  setUseItems: (useItems: UseItem[]) => {
    set(() => ({ useItems }));
  },
  // 自動配對道具效果
  setAutoPairsItemEffect: (count: number) => {
    const cards = get().cards;
    const questions = get().questions;

    const randomValue = getRandomElementsFromArray(questions, count);
    const newCards = cards.map(card => {
      if (randomValue.includes(card.content)) {
        return { ...card, isFlipped: true, isMatched: true };
      }
      return card;
    });

    set(() => ({
      cards: newCards,
      score: count * 30 + (count - 1) * 30,
      isPreviousMatch: true,
      combo: count - 1,
    }));
  },
  setDisableGame: () => {
    set(() => ({
      disableGame: true,
    }));
  },
}));

export default useGameStore;
