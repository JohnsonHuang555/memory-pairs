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
    title: '人物',
    type: LevelTheme.Avatar,
    image: require('@/assets/images/questions/avatar/avatar-1.svg'),
    unlockStars: 0,
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
    unlockStars: 60,
  },
  // {
  //   id: 6,
  //   title: '壽司',
  //   type: LevelTheme.Sushi,
  //   image: require('@/assets/images/questions/sushi/sushi-1.svg'),
  //   unlockStars: 60,
  // },
];
