import { ItemType } from "@/models/Item";

export const allItems = [
  {
    type: ItemType.AddTime,
    maxLevel: 6,
    upgradeGold: 500,
    purchaseGold: 250,
  },
  {
    type: ItemType.ViewFirst,
    maxLevel: 5,
    upgradeGold: 600,
    purchaseGold: 300,
  },
  {
    type: ItemType.AutoPairs,
    maxLevel: 3,
    upgradeGold: 700,
    purchaseGold: 350,
  }
];