import { allLevels } from '@/constants/AllLevels';
import { LevelTheme } from '@/models/Level';
import usePlayerStore from '@/stores/PlayerStore';

export const useThemeInfo = (theme: LevelTheme) => {
  const { themeList } = usePlayerStore();

  const playerLevelInfo = themeList.find(
    playerData => playerData.themeType === theme,
  );

  // 取得主題關卡列表
  const levels = allLevels.filter(level => level.theme === theme);

  return {
    levels,
    currentLevelId: playerLevelInfo?.currentLevelId || 1,
    starsOfLevel: playerLevelInfo?.starsOfLevel || []
  };
};
