import { LevelTheme } from '@/models/Level';

export const allThemes = [
  {
    id: 1,
    title: '動物',
    type: LevelTheme.Animal,
    image: require('@/assets/images/questions/animal/animal-28.svg'),
    unlockStars: 0,
  },
  {
    id: 2,
    title: '顏色',
    type: LevelTheme.Color,
    image: require('@/assets/images/themes/color.svg'),
    unlockStars: 0,
  },
  {
    id: 3,
    title: '頭像',
    type: LevelTheme.Avatar,
    image: require('@/assets/images/questions/avatar/avatar-1.svg'),
    unlockStars: 0,
  },
  // {
  //   id: 4,
  //   title: '十二星座',
  //   type: LevelTheme.ZodiacWestern,
  //   image: require('@/assets/images/questions/zodiac-western/zodiac-western-1.svg'),
  // },
];
