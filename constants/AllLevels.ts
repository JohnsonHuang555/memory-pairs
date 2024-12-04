import { ancientThemeLevels } from './levels/ancient';
import { animalThemeLevels } from './levels/animal';
import { avatarThemeLevels } from './levels/avatar';
import { colorThemeLevels } from './levels/color';
import { Level } from '@/models/Level';

export enum MatchCount {
  Two = 2,
  Three = 3,
  Four = 4,
  Five = 5,
  Six = 6,
  Seven = 7,
}

export const allLevels: Level[] = [
  ...animalThemeLevels,
  ...colorThemeLevels,
  ...avatarThemeLevels,
  ...ancientThemeLevels,
];
