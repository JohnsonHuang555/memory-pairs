import { useMemo, useRef } from 'react';
import { View } from 'react-native';
import Animated, { BounceIn, FadeIn } from 'react-native-reanimated';

import CoolText from '../CoolText';
import BaseModal from './BaseModal';
import GoLevelsButton from './buttons/GoLevelsButton';
import NextLevelButton from './buttons/NextLevelButton';
import ReplayButton from './buttons/ReplayButton';
import useLevelInfo from '@/hooks/useLevelInfo';
import useGameStore from '@/stores/GameStore';

import { Image } from 'expo-image';

type GamePassModalProps = {
  isLastLevel: boolean;
  show: boolean;
  onRouteChange: () => void;
};

const GamePassModal = ({
  isLastLevel,
  show,
  onRouteChange,
}: GamePassModalProps) => {
  const modalRef = useRef<any>(null);
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
  }, [stars]);

  return (
    <BaseModal
      title="過關"
      show={show}
      width={70}
      onClose={onRouteChange}
      disabledBackdropPress
      ref={modalRef}
    >
      <View className="flex-row" style={{ gap: 4, marginBottom: 32 }}>
        {stars > 0 ? (
          <Animated.View entering={BounceIn.duration(300).delay(500)}>
            <Image
              source={require('@/assets/images/icons/yellow-star.png')}
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
              source={require('@/assets/images/icons/grey-star.png')}
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
              source={require('@/assets/images/icons/yellow-star.png')}
              style={{ width: 75, height: 75 }}
            />
          </Animated.View>
        ) : (
          <Animated.View entering={BounceIn.duration(300).delay(800)}>
            <Image
              source={require('@/assets/images/icons/grey-star.png')}
              style={{ width: 75, height: 75 }}
            />
          </Animated.View>
        )}
        {stars > 2 ? (
          <Animated.View entering={BounceIn.duration(300).delay(1100)}>
            <Image
              source={require('@/assets/images/icons/yellow-star.png')}
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
              source={require('@/assets/images/icons/grey-star.png')}
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
        className="flex-col"
        style={{ marginBottom: 28, width: '80%', gap: 16 }}
      >
        <View className="flex-row items-center justify-between">
          <CoolText
            text="分數"
            fontWeight="medium"
            style={{ fontSize: 18, color: '#717171' }}
          />
          <CoolText
            text={score}
            fontWeight="medium"
            style={{ fontSize: 20, color: '#834B4B' }}
          />
        </View>
        <View className="flex-row items-center justify-between">
          <CoolText
            text="獲得金幣"
            fontWeight="medium"
            style={{ fontSize: 18, color: '#717171' }}
          />
          <View className="flex-row items-center">
            <Image
              source={require('@/assets/images/icons/coin-2.png')}
              style={{ width: 20, height: 20, marginRight: 8 }}
            />
            <CoolText
              text={coins}
              fontWeight="medium"
              style={{ fontSize: 20, color: '#834B4B' }}
            />
          </View>
        </View>
      </Animated.View>
      <View
        className="flex-row justify-between"
        style={{ width: isLastLevel ? '60%' : '90%', marginBottom: 8 }}
      >
        <Animated.View entering={BounceIn.delay(1700)}>
          <GoLevelsButton
            onPress={() => {
              modalRef.current.close();
            }}
          />
        </Animated.View>
        <Animated.View entering={BounceIn.delay(1900)}>
          <ReplayButton
            onPress={() => {
              modalRef.current.close();
            }}
          />
        </Animated.View>
        {!isLastLevel && (
          <Animated.View entering={BounceIn.delay(2100)}>
            <NextLevelButton
              onPress={() => {
                modalRef.current.close();
              }}
            />
          </Animated.View>
        )}
      </View>
    </BaseModal>
  );
};

export default GamePassModal;
