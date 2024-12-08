import { ItemType } from "@/models/Item";

export const allItems = [
  {
    type: ItemType.AddTime,
    maxLevel: 6,
    upgradeGold: 600,
    purchaseGold: 300,
  },
  {
    type: ItemType.ViewFirst,
    maxLevel: 5,
    upgradeGold: 1000,
    purchaseGold: 500,
  },
  {
    type: ItemType.AutoPairs,
    maxLevel: 3,
    upgradeGold: 1400,
    purchaseGold: 700,
  }
];