import { useCallback, useEffect, useMemo, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import CoolButton from '@/components/CoolButton';
import CoolText from '@/components/CoolText';
import MainContainer from '@/components/MainContainer';
import LevelSelectModal from '@/components/modals/LevelSelectModal';
import { gameTheme } from '@/hooks/useLevelInfo';
import { useThemeInfo } from '@/hooks/useThemeInfo';
import useAudioStore from '@/stores/AudioStore';
import useLevelStore, { itemsPerPage } from '@/stores/LevelStore';
import usePlayerStore from '@/stores/PlayerStore';

import { Image } from 'expo-image';
import { useLocalSearchParams } from 'expo-router/build/hooks';

export default function LevelScreen() {
  const { theme } = useLocalSearchParams();
  const { coins, isSoundOn } = usePlayerStore();
  const playSound = useAudioStore(state => state.playSound);
  const { levels, currentLevelId, starsOfLevel } = useThemeInfo(Number(theme));

  const {
    currentPage,
    showLevelModal,
    setPlayLevel,
    setShowLevelModal,
    updateCurrentPage,
    setDefaultCurrentPage,
  } = useLevelStore();

  // 根據 currentPage 計算對應的關卡
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentLevels = useMemo(
    () => levels.slice(startIdx, startIdx + itemsPerPage),
    [startIdx],
  );

  useEffect(() => {
    if (currentLevelId) {
      const page = Math.ceil(currentLevelId / itemsPerPage);
      setDefaultCurrentPage(page);
    }
  }, [currentLevelId]);

  const totalStars = useMemo(
    () =>
      starsOfLevel.reduce((acc, current) => {
        acc += current.stars;
        return acc;
      }, 0),
    [currentPage, startIdx],
  );

  const checkIsLock = useCallback((levelId: number) => {
    if (levelId <= currentLevelId) {
      return false;
    }
    return true;
  }, []);

  const renderStars = (levelId: number) => {
    if (checkIsLock(levelId)) {
      return (
        <Image
          source={require('@/assets/images/icons/lock.png')}
          style={{ width: 40, height: 40 }}
        />
      );
    } else {
      const playerLevel = starsOfLevel.find(l => l.id === levelId);
      const stars = Array.from({ length: 3 }, (_, i) => i + 1).map(s => {
        if (playerLevel && s <= playerLevel.stars) {
          return (
            <Image
              key={s}
              source={require('@/assets/images/icons/yellow-star.png')}
              style={{ width: 20, height: 20 }}
            />
          );
        } else {
          return (
            <Image
              key={s}
              source={require('@/assets/images/icons/grey-star.png')}
              style={{ width: 20, height: 20 }}
            />
          );
        }
      });

      return (
        <View className="flex-1 items-center justify-between">
          <CoolText
            text={levelId}
            fontWeight="medium"
            style={{ fontSize: 30, marginTop: 6, color: '#FFF' }}
          />
          <View className="flex-row" style={{ marginBottom: 2 }}>
            {stars}
          </View>
        </View>
      );
    }
  };

  return (
    <MainContainer title={gameTheme[theme as string]} showLeftIcon showRuleIcon>
      <LevelSelectModal
        show={showLevelModal}
        onClose={() => {
          setPlayLevel(undefined);
          setShowLevelModal(false);
        }}
      />
      <View className="mb-6 flex-row items-center justify-between">
        <CoolText
          text={`關卡 ${startIdx + 1} - ${levels.length > currentPage * 20 ? currentPage * 20 : levels.length}`}
          fontWeight="medium"
          style={{ fontSize: 20, color: '#834B4B' }}
        />
        <View style={{ gap: 16 }} className="flex-row justify-end">
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
              text={`${totalStars}/${levels.length * 3}`}
              fontWeight="medium"
              style={{ fontSize: 20, color: '#834B4B' }}
            />
          </View>
        </View>
      </View>
      <View className="mb-4 flex-1 flex-row flex-wrap justify-between">
        {currentLevels.map(level => (
          <Animated.View
            key={level.id}
            entering={FadeIn.delay(100)}
            exiting={FadeOut.duration(100)}
            className="mb-5 aspect-square w-[22%] rounded-xl p-2"
            style={[
              currentLevelId === level.id
                ? {
                    backgroundColor: '#9C5B43',
                  }
                : checkIsLock(level.id)
                  ? { backgroundColor: '#B3A9A5' }
                  : { backgroundColor: '#C08A76' },
              {
                shadowOffset: {
                  width: 2,
                  height: 5,
                },
                shadowOpacity: 0.2,
              },
            ]}
          >
            <TouchableOpacity
              activeOpacity={!checkIsLock(level.id) ? 0.7 : 1}
              onPress={() => {
                if (!checkIsLock(level.id)) {
                  if (isSoundOn) {
                    playSound('common');
                  }
                  setPlayLevel(level.id);
                  setShowLevelModal(true);
                }
              }}
            >
              <View
                className="items-center justify-center"
                style={{ width: '100%', height: '100%' }}
              >
                {renderStars(level.id)}
              </View>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </View>
      <View className="flex-row justify-between" style={{ marginBottom: 40 }}>
        <View>
          {currentPage > 1 && (
            <CoolButton
              prefix={
                <Image
                  source={require('@/assets/images/icons/arrow-left-2.png')}
                  style={{ width: 24, height: 24 }}
                />
              }
              height={50}
              width={50}
              backgroundColor="#919191"
              onClick={() => {
                playSound('common');
                updateCurrentPage(-1);
              }}
            />
          )}
        </View>
        {levels.length > 20 * currentPage && (
          <CoolButton
            prefix={
              <Image
                source={require('@/assets/images/icons/arrow-right-2.png')}
                style={{ width: 24, height: 24 }}
              />
            }
            height={50}
            width={50}
            backgroundColor="#919191"
            onClick={() => {
              playSound('common');
              updateCurrentPage(1);
            }}
          />
        )}
      </View>
    </MainContainer>
  );
}
