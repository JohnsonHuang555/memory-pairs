export enum Item {
  AddTime = 'addTime',
  ViewFirst = 'viewFirst',
  AutoPairs = 'autoPairs',
}

export type PlayerItem = {
  type: Item;
  quantity: number;
  level: number;
  maxLevel: number;
  upgradeGold: number;
  purchaseGold: number;
};
