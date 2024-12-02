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
    type: LevelTheme.Animal,
    image: require('@/assets/images/themes/color.svg'),
  },
  // {
  //   id: 3,
  //   title: '十二生肖',
  //   type: LevelTheme.ZodiacChinese,
  //   image: require('@/assets/images/questions/zodiac-chinese/zodiac-chinese-1.png'),
  // },
  // {
  //   id: 4,
  //   title: '十二星座',
  //   type: LevelTheme.ZodiacWestern,
  //   image: require('@/assets/images/questions/zodiac-western/zodiac-western-1.svg'),
  // },
];
