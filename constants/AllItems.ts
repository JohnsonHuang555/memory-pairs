import { Item } from "@/models/Item";

export const allItems = [
  {
    type: Item.AddTime,
    maxLevel: 6,
    upgradeGold: 500,
    purchaseGold: 200,
  },
  {
    type: Item.ViewFirst,
    maxLevel: 6,
    upgradeGold: 600,
    purchaseGold: 300,
  },
  {
    type: Item.AutoPairs,
    maxLevel: 6,
    upgradeGold: 800,
    purchaseGold: 500,
  }
];