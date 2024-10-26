import { Image, View } from 'react-native';

import CoolButton from '../CoolButton';
import CoolText from '../CoolText';
import BaseModal from './BaseModal';
import useGameStore from '@/stores/GameState';
import useLevelStore from '@/stores/LevelStore';

import { router } from 'expo-router';

type GameOverModalProps = {
  show: boolean;
  onClose: () => void;
};

const GameOverModal = ({ show, onClose }: GameOverModalProps) => {
  const { score, resetGame } = useGameStore();
  const { setShowNextLevelModal } = useLevelStore();

  return (
    <BaseModal
      title="過關"
      show={show}
      width={80}
      onClose={onClose}
      disabledBackdropPress
    >
      <View className="mb-6 flex-row" style={{ gap: 4 }}>
        <Image
          source={require('@/assets/images/grey-star.png')}
          style={{
            width: 65,
            height: 65,
            marginTop: 24,
            transform: [{ rotate: '-25deg' }],
          }}
        />
        <Image
          source={require('@/assets/images/grey-star.png')}
          style={{ width: 75, height: 75 }}
        />
        <Image
          source={require('@/assets/images/grey-star.png')}
          style={{
            width: 65,
            height: 65,
            marginTop: 24,
            transform: [{ rotate: '25deg' }],
          }}
        />
      </View>
      <View className="items-center" style={{ marginBottom: 28 }}>
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
      </View>
      <View className="items-center" style={{ marginBottom: 28 }}>
        <CoolText
          text="獲得金幣"
          fontWeight="medium"
          className="mb-4"
          style={{ fontSize: 18, color: '#717171' }}
        />
        <View className="flex-row items-center">
          <Image
            source={require('@/assets/images/coin.png')}
            style={{ width: 30, height: 30, marginRight: 4 }}
          />
          <CoolText
            text={30}
            fontWeight="medium"
            style={{ fontSize: 22, color: '#834B4B' }}
          />
        </View>
      </View>
      <CoolButton
        width={150}
        height={50}
        text="前往下一關"
        fontSize={18}
        onClick={() => {
          resetGame();
          setShowNextLevelModal(true);
          router.push('/levels');
        }}
      />
    </BaseModal>
  );
};

export default GameOverModal;
