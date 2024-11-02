export enum ItemType {
  AddTime = 'addTime',
  ViewFirst = 'viewFirst',
  AutoPairs = 'autoPairs',
}

export type PlayerItem = {
  type: ItemType;
  quantity: number;
  level: number;
  maxLevel: number;
  upgradeGold: number;
  purchaseGold: number;
};

export type UseItem = {
  type: ItemType;
  value: number;
};
