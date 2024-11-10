import { useCallback, useMemo } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import CoolText from '@/components/CoolText';
import MainContainer from '@/components/MainContainer';
import LevelSelectModal from '@/components/modals/LevelSelectModal';
import { Level } from '@/models/Level';
import useLevelStore from '@/stores/LevelStore';
import usePlayerStore from '@/stores/PlayerStore';

import { Image } from 'expo-image';

export default function LevelsPage() {
  const { currentLevelId, coins } = usePlayerStore();
  const { levels, setPlayLevel, showLevelModal, setShowLevelModal } =
    useLevelStore();

  const totalStars = useMemo(
    () =>
      levels.reduce((acc, current) => {
        acc += current.stars;
        return acc;
      }, 0),
    [],
  );

  const toggleModal = () => {
    setShowLevelModal(!showLevelModal);
  };

  const checkIsLock = useCallback((levelId: number) => {
    if (levelId <= currentLevelId) {
      return false;
    }
    return true;
  }, []);

  const renderStars = (level: Level) => {
    if (checkIsLock(level.id)) {
      return (
        <Image
          source={require('@/assets/images/lock.png')}
          style={{ width: 40, height: 40 }}
        />
      );
    } else {
      const stars = Array.from({ length: 3 }, (_, i) => i + 1).map(s => {
        if (level.stars && s <= level.stars) {
          return (
            <Image
              key={s}
              source={require('@/assets/images/yellow-star.png')}
              style={{ width: 20, height: 20 }}
            />
          );
        } else {
          return (
            <Image
              key={s}
              source={require('@/assets/images/grey-star.png')}
              style={{ width: 20, height: 20 }}
            />
          );
        }
      });
      return (
        <>
          <CoolText
            text={level.id}
            className="my-2 text-[28px] text-white"
            fontWeight="medium"
          />
          <View className="flex-row">{stars}</View>
        </>
      );
    }
  };

  return (
    <MainContainer title="關卡" showLeftIcon showQuestionIcon>
      <LevelSelectModal
        show={showLevelModal}
        onClose={() => {
          setPlayLevel(undefined);
          setShowLevelModal(false);
        }}
      />
      <Animated.View
        entering={FadeIn.delay(300)}
        exiting={FadeOut.duration(100)}
      >
        <View className="mb-6 flex-row items-center justify-between">
          <View className="flex-row items-center">
            <Image
              source={require('@/assets/images/coin.png')}
              style={{ width: 26, height: 26, marginRight: 4 }}
            />
            <CoolText
              text={coins}
              className="text-2xl text-[#834B4B]"
              fontWeight="medium"
            />
          </View>
          <View className="flex-row items-center">
            <Image
              source={require('@/assets/images/yellow-star.png')}
              style={{ width: 26, height: 26, marginRight: 4 }}
            />
            <CoolText
              text={totalStars}
              className="text-2xl text-[#834B4B]"
              fontWeight="medium"
            />
          </View>
        </View>
        <View className="flex-row flex-wrap justify-between">
          {levels.map(level => (
            <TouchableOpacity
              activeOpacity={!checkIsLock(level.id) ? 0.8 : 1}
              key={level.id}
              onPress={() => {
                if (!checkIsLock(level.id)) {
                  setPlayLevel(level.id);
                  toggleModal();
                }
              }}
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
                    height: 8,
                  },
                  shadowOpacity: 0.2,
                },
              ]}
            >
              <View
                className="items-center justify-center"
                style={{ width: '100%', height: '100%' }}
              >
                {renderStars(level)}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </Animated.View>
    </MainContainer>
  );
}
