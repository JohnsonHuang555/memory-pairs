export type Card = {
  id: number;
  content: any;
  isFlipped: boolean; // 已翻開
  isMatched: boolean; // 已配對
  isAnimateComplete?: boolean; // 動畫跑完
}
