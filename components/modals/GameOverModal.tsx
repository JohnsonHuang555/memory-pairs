import { useRef } from 'react';
import { View } from 'react-native';
import Animated, { BounceIn, FadeIn } from 'react-native-reanimated';

import CoolText from '../CoolText';
import BaseModal from './BaseModal';
import GoLevelsButton from './buttons/GoLevelsButton';
import ReplayButton from './buttons/ReplayButton';
import useGameStore from '@/stores/GameStore';

import { Image } from 'expo-image';

type GameOverModalProps = {
  show: boolean;
  onRouteChange: () => void;
};

const GameOverModal = ({ show, onRouteChange }: GameOverModalProps) => {
  const modalRef = useRef<any>(null);
  const { score } = useGameStore();

  return (
    <BaseModal
      title="失敗"
      show={show}
      width={70}
      onClose={onRouteChange}
      disabledBackdropPress
      ref={modalRef}
    >
      <Animated.View
        className="mb-6 flex-row"
        style={{ gap: 4, marginBottom: 32 }}
        entering={FadeIn.duration(300).delay(500)}
      >
        <Image
          source={require('@/assets/images/icons/grey-star.png')}
          style={{
            width: 65,
            height: 65,
            marginTop: 24,
            transform: [{ rotate: '-25deg' }],
          }}
        />
        <Image
          source={require('@/assets/images/icons/grey-star.png')}
          style={{ width: 75, height: 75 }}
        />
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
      <Animated.View
        entering={FadeIn.delay(800)}
        className="flex-col"
        style={{ marginBottom: 28, width: '70%', gap: 16 }}
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
              text={0}
              fontWeight="medium"
              style={{ fontSize: 20, color: '#834B4B' }}
            />
          </View>
        </View>
      </Animated.View>
      <View
        className="flex-row justify-between"
        style={{ width: '60%', marginBottom: 8 }}
      >
        <Animated.View entering={BounceIn.delay(1100)}>
          <GoLevelsButton
            onPress={() => {
              modalRef.current.close();
            }}
          />
        </Animated.View>
        <Animated.View entering={BounceIn.delay(1300)}>
          <ReplayButton
            onPress={() => {
              modalRef.current.close();
            }}
          />
        </Animated.View>
      </View>
    </BaseModal>
  );
};

export default GameOverModal;
