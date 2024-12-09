import { ancientThemeLevels } from './levels/ancient';
import { animalThemeLevels } from './levels/animal';
import { avatarThemeLevels } from './levels/avatar';
import { cactusThemeLevels } from './levels/cactus';
import { colorThemeLevels } from './levels/color';
import { emojiThemeLevels } from './levels/emoji';
import { furnitureThemeLevels } from './levels/furniture';
import { leaveThemeLevels } from './levels/leave';
import { treeThemeLevels } from './levels/tree';

export enum MatchCount {
  Two = 2,
  Three = 3,
  Four = 4,
  Five = 5,
  Six = 6,
  Seven = 7,
}

export const allLevels = [
  ...animalThemeLevels,
  ...colorThemeLevels,
  ...avatarThemeLevels,
  ...ancientThemeLevels,
  ...emojiThemeLevels,
  ...leaveThemeLevels,
  ...treeThemeLevels,
  ...cactusThemeLevels,
  ...furnitureThemeLevels,
];
