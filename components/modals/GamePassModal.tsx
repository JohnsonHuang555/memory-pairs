import { useMemo } from 'react';
import { Image, View } from 'react-native';
import Animated, { BounceIn, FadeIn } from 'react-native-reanimated';

import CoolText from '../CoolText';
import BaseModal from './BaseModal';
import GoLevelsButton from './buttons/GoLevelsButton';
import NextLevelButton from './buttons/NextLevelButton';
import ReplayButton from './buttons/ReplayButton';
import useLevelInfo from '@/hooks/useLevelInfo';
import useGameStore from '@/stores/GameStore';

type GamePassModalProps = {
  show: boolean;
  onClose: () => void;
};

const GamePassModal = ({ show, onClose }: GamePassModalProps) => {
  const { score, stars } = useGameStore();
  const { levelInfo } = useLevelInfo();

  if (!levelInfo) return null;

  const coins = useMemo(() => {
    if (stars === 1) {
      return levelInfo.star1Coins;
    } else if (stars === 2) {
      return levelInfo.star2Coins;
    } else {
      return levelInfo.star3Coins;
    }
  }, []);

  return (
    <BaseModal
      title="過關"
      show={show}
      width={80}
      onClose={onClose}
      disabledBackdropPress
    >
      <View className="mb-6 flex-row" style={{ gap: 4 }}>
        {stars > 0 ? (
          <Animated.View entering={BounceIn.duration(300).delay(500)}>
            <Image
              source={require('@/assets/images/yellow-star.png')}
              style={{
                width: 65,
                height: 65,
                marginTop: 24,
                transform: [{ rotate: '-25deg' }],
              }}
            />
          </Animated.View>
        ) : (
          <Animated.View entering={BounceIn.duration(300).delay(500)}>
            <Image
              source={require('@/assets/images/grey-star.png')}
              style={{
                width: 65,
                height: 65,
                marginTop: 24,
                transform: [{ rotate: '-25deg' }],
              }}
            />
          </Animated.View>
        )}
        {stars > 1 ? (
          <Animated.View entering={BounceIn.duration(300).delay(800)}>
            <Image
              source={require('@/assets/images/yellow-star.png')}
              style={{ width: 75, height: 75 }}
            />
          </Animated.View>
        ) : (
          <Animated.View entering={BounceIn.duration(300).delay(800)}>
            <Image
              source={require('@/assets/images/grey-star.png')}
              style={{ width: 75, height: 75 }}
            />
          </Animated.View>
        )}
        {stars > 2 ? (
          <Animated.View entering={BounceIn.duration(300).delay(1100)}>
            <Image
              source={require('@/assets/images/yellow-star.png')}
              style={{
                width: 65,
                height: 65,
                marginTop: 24,
                transform: [{ rotate: '25deg' }],
              }}
            />
          </Animated.View>
        ) : (
          <Animated.View entering={BounceIn.duration(300).delay(1100)}>
            <Image
              source={require('@/assets/images/grey-star.png')}
              style={{
                width: 65,
                height: 65,
                marginTop: 24,
                transform: [{ rotate: '25deg' }],
              }}
            />
          </Animated.View>
        )}
      </View>
      <Animated.View
        entering={FadeIn.delay(1400)}
        className="items-center"
        style={{ marginBottom: 28 }}
      >
        <CoolText
          text="分數"
          fontWeight="medium"
          className="mb-4"
          style={{ fontSize: 18, color: '#717171' }}
        />
        <CoolText
          text={score}
          fontWeight="medium"
          style={{ fontSize: 22, color: '#834B4B' }}
        />
      </Animated.View>
      <Animated.View
        entering={FadeIn.delay(1700)}
        className="items-center"
        style={{ marginBottom: 28 }}
      >
        <CoolText
          text="獲得金幣"
          fontWeight="medium"
          className="mb-4"
          style={{ fontSize: 18, color: '#717171' }}
        />
        <View className="flex-row items-center">
          <Image
            source={require('@/assets/images/coin.png')}
            style={{ width: 32, height: 32, marginRight: 4 }}
          />
          <CoolText
            text={coins}
            fontWeight="medium"
            style={{ fontSize: 22, color: '#834B4B' }}
          />
        </View>
      </Animated.View>
      <Animated.View
        entering={FadeIn.delay(2000)}
        className="flex-row justify-between"
        style={{ width: '90%' }}
      >
        <GoLevelsButton />
        <ReplayButton />
        <NextLevelButton />
      </Animated.View>
    </BaseModal>
  );
};

export default GamePassModal;
