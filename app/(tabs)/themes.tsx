import { useCallback, useMemo, useState } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import CoolText from '@/components/CoolText';
import MainContainer from '@/components/MainContainer';
import { allLevels } from '@/constants/AllLevels';
import { LevelTheme } from '@/models/Level';
import { Theme } from '@/models/Theme';
import { itemsPerPage } from '@/stores/LevelStore';
import usePlayerStore from '@/stores/PlayerStore';
import useThemeStore from '@/stores/ThemeStore';

import { Image } from 'expo-image';
import { useFocusEffect, useRouter } from 'expo-router';

export default function ThemesScreen() {
  const { coins, themeList, purchaseThemeIds } = usePlayerStore();
  const { currentPage, themes } = useThemeStore();
  const [isLoading, setLoading] = useState(true);
  const { push } = useRouter();

  useFocusEffect(
    useCallback(() => {
      setTimeout(() => {
        setLoading(false);
      }, 300);
      // Return a cleanup function if necessary
      return () => {
        setLoading(true);
      };
    }, []),
  );

  const totalStars = useMemo(
    () =>
      themeList
        .map(t => t.starsOfLevel)
        .reduce((acc, current) => {
          acc += current.reduce((a, c) => {
            a += c.stars;
            return a;
          }, 0);
          return acc;
        }, 0),
    [],
  );

  // 根據 currentPage 計算對應的關卡
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentThemes = useMemo(
    () => themes.slice(startIdx, startIdx + itemsPerPage),
    [startIdx],
  );

  const getStarsCount = useCallback(
    (themeType: LevelTheme) => {
      // 關卡星星總數
      const total =
        allLevels.filter(level => level.theme === themeType).length * 3;
      // 關卡玩家獲得星星總數
      const playerStars = themeList
        .filter(theme => theme.themeType === themeType)
        .reduce((acc, current) => {
          acc += current.starsOfLevel.reduce((a, c) => {
            a += c.stars;
            return a;
          }, 0);
          return acc;
        }, 0);

      return {
        total,
        playerStars,
      };
    },
    [allLevels, themeList],
  );

  const getThemeText = (theme: Theme) => {
    const isAlreadyPurchase = purchaseThemeIds.find(id => id === theme.id);
    if (theme.price && !isAlreadyPurchase) {
      return `需 ${theme.price} 金`;
    }
    if (theme.unlockStars && totalStars < theme.unlockStars) {
      return `需達 ${theme.unlockStars} 星`;
    } else {
      return `${getStarsCount(theme.type).playerStars} / ${getStarsCount(theme.type).total}`;
    }
  };

  const isLock = (theme: Theme) => {
    const isAlreadyPurchase = purchaseThemeIds.find(id => id === theme.id);
    if (theme.price && !isAlreadyPurchase) {
      return true;
    }
    if (theme.unlockStars && totalStars < theme.unlockStars) {
      return true;
    }
    return false;
  };

  return (
    <MainContainer title="主題" showLeftIcon showQuestionIcon>
      {!isLoading ? (
        <Animated.View entering={FadeIn} exiting={FadeOut}>
          <View
            className="mb-6 flex-row items-center justify-end"
            style={{ gap: 16 }}
          >
            <View className="flex-row items-center">
              <Image
                source={require('@/assets/images/icons/coin-2.png')}
                style={{ width: 22, height: 22, marginRight: 6 }}
              />
              <CoolText
                text={coins}
                fontWeight="medium"
                style={{ fontSize: 20, color: '#834B4B' }}
              />
            </View>
            <View className="flex-row items-center">
              <Image
                source={require('@/assets/images/icons/yellow-star.png')}
                style={{ width: 26, height: 26, marginRight: 4 }}
              />
              <CoolText
                text={totalStars}
                fontWeight="medium"
                style={{ fontSize: 20, color: '#834B4B' }}
              />
            </View>
          </View>
          <View className="mb-4 flex-row flex-wrap justify-between">
            {currentThemes.map(theme => (
              <View
                key={theme.id}
                className="mb-5 aspect-square w-[30%] rounded-xl"
                style={[
                  { backgroundColor: '#FFF' },
                  {
                    shadowOffset: {
                      width: 0,
                      height: 4,
                    },
                    shadowOpacity: 0.2,
                  },
                ]}
              >
                <TouchableOpacity
                  activeOpacity={!isLock(theme) ? 0.7 : 1}
                  onPress={() => {
                    if (!isLock(theme)) {
                      push(`/levels/${theme.type}`);
                    }
                  }}
                >
                  <View
                    className="items-center justify-center p-2"
                    style={{ width: '100%', height: '100%' }}
                  >
                    <Image
                      source={theme.image}
                      style={{
                        width: '70%',
                        height: '70%',
                        marginTop: 10,
                        marginBottom: 8,
                        borderRadius: 10,
                      }}
                    />
                    <CoolText
                      text={theme.title}
                      fontWeight="medium"
                      style={{
                        marginBottom: 10,
                        color: '#834B4B',
                        fontSize: 16,
                      }}
                    />
                  </View>
                </TouchableOpacity>
                {isLock(theme) && (
                  <View
                    style={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      borderRadius: 10,
                      backgroundColor: 'rgba(0, 0, 0, 0.35)',
                    }}
                  />
                )}
                <View
                  style={{
                    position: 'absolute',
                    top: 8,
                    left: 0,
                    paddingVertical: 4,
                    paddingHorizontal: 4,
                    borderBottomRightRadius: 4,
                    borderTopRightRadius: 4,
                    backgroundColor: 'rgba(0, 0, 0, 0.53)',
                  }}
                >
                  <CoolText
                    text={getThemeText(theme)}
                    style={{ color: '#FFF', fontSize: 16 }}
                  />
                </View>
              </View>
            ))}
          </View>
        </Animated.View>
      ) : (
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <ActivityIndicator size="large" />
        </View>
      )}
    </MainContainer>
  );
}
