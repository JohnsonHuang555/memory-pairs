import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getOrdinalSuffix = (rank: number) => {
  if (rank <= 0) return '';

  if (rank >= 11 && rank <= 13) {
    return 'th';
  }

  switch (rank % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
};

/* shuffle */
export function shuffleArray<T>(array: T[]) {
  // 複製原始陣列以避免修改
  let shuffledArray = array.slice();

  // Fisher-Yates 洗牌算法
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    // 生成 0 到 i 之間的隨機整數
    const j = Math.floor(Math.random() * (i + 1));

    // 交換元素 shuffledArray[i] 和 shuffledArray[j]
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  return shuffledArray;
}

/** 隨機從陣列中取幾筆資料(不打亂陣列) */
export function getRandomElementsFromArray<T>(arr: T[], num: number) {
  const originalArray = [...arr]; // 複製原始陣列
  const selectedItems = [];

  while (selectedItems.length < num) {
    const randomIndex = Math.floor(Math.random() * originalArray.length);
    selectedItems.push(originalArray[randomIndex]);
    originalArray.splice(randomIndex, 1); // 避免重複選取
  }

  return selectedItems;
}
