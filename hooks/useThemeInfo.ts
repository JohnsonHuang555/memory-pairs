import { allLevels } from '@/constants/AllLevels';
import { LevelTheme } from '@/models/Level';
import usePlayerStore from '@/stores/PlayerStore';

export const useThemeInfo = (theme: LevelTheme) => {
  const { themeLevelInfo } = usePlayerStore();

  const playerLevelInfo = themeLevelInfo.find(
    playerData => playerData.themeType === theme,
  );

  const levels = allLevels.filter(level => level.theme === theme);
  const currentLevelId = levels.find(
    level => level.id === playerLevelInfo?.currentLevelId,
  )?.id || 1;

  return {
    levels,
    currentLevelId,
  };
};
