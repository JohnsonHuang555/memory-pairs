import { LevelTheme } from '@/models/Level';

export const allThemes = [
  {
    id: 1,
    title: '動物',
    type: LevelTheme.Animal,
    image: require('@/assets/images/questions/animal/animal-28.svg'),
  },
  {
    id: 2,
    title: '顏色',
    type: LevelTheme.Color,
    image: require('@/assets/images/themes/color.svg'),
  },
  {
    id: 3,
    title: '人物',
    type: LevelTheme.Avatar,
    image: require('@/assets/images/questions/avatar/avatar-1.svg'),
  },
  {
    id: 4,
    title: '古人',
    type: LevelTheme.Ancient,
    image: require('@/assets/images/questions/ancient/ancient-1.jpg'),
    unlockStars: 60,
  },
  {
    id: 5,
    title: '表情',
    type: LevelTheme.Emoji,
    image: require('@/assets/images/questions/emoji/emoji-34.svg'),
    price: 100,
  },
  {
    id: 6,
    title: '葉子',
    type: LevelTheme.Leaves,
    image: require('@/assets/images/questions/leave/leave-13.svg'),
  },
  {
    id: 7,
    title: '樹木',
    type: LevelTheme.Tree,
    image: require('@/assets/images/questions/tree/tree-18.svg'),
    price: 5000,
  },
  {
    id: 8,
    title: '仙人掌',
    type: LevelTheme.Cactus,
    image: require('@/assets/images/questions/cactus/cactus-3.svg'),
  },
  {
    id: 9,
    title: '傢俱',
    type: LevelTheme.Furniture,
    image: require('@/assets/images/questions/furniture/furniture-3.svg'),
  },
];
