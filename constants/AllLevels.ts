import { ancientThemeLevels } from './levels/ancient';
import { animalThemeLevels } from './levels/animal';
import { avatarThemeLevels } from './levels/avatar';
import { cactusThemeLevels } from './levels/cactus';
import { chineseThemeLevels } from './levels/chinese';
import { cityBuildingThemeLevels } from './levels/city-building';
import { coinThemeLevels } from './levels/coin';
import { colorThemeLevels } from './levels/color';
import { emailThemeLevels } from './levels/email';
import { emojiThemeLevels } from './levels/emoji';
import { furnitureThemeLevels } from './levels/furniture';
import { gesturesThemeLevels } from './levels/gestures';
import { giftThemeLevels } from './levels/gift';
import { grassThemeLevels } from './levels/grass';
import { landmarkThemeLevels } from './levels/landmark';
import { leaveThemeLevels } from './levels/leave';
import { noticeThemeLevels } from './levels/notice';
import { origamiThemeLevels } from './levels/origami';
import { smartWatchThemeLevels } from './levels/smart-watch';
import { spaceThemeLevels } from './levels/space';
import { sweetDrinkThemeLevels } from './levels/sweet-drink';
import { treeThemeLevels } from './levels/tree';
import { waterSportThemeLevels } from './levels/water-sport';
import { weatherThemeLevels } from './levels/weather';

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
  ...chineseThemeLevels, // --10
  ...smartWatchThemeLevels,
  ...noticeThemeLevels,
  ...spaceThemeLevels,
  ...grassThemeLevels,
  ...coinThemeLevels,
  ...giftThemeLevels,
  ...waterSportThemeLevels,
  ...sweetDrinkThemeLevels,
  ...emailThemeLevels,
  ...origamiThemeLevels, // --20
  ...cityBuildingThemeLevels,
  ...landmarkThemeLevels,
  ...weatherThemeLevels,
  ...gesturesThemeLevels,
];
