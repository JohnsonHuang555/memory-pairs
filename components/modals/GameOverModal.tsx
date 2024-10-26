import { Image, View } from 'react-native';

import CoolText from '../CoolText';
import BaseModal from './BaseModal';
import useGameStore from '@/stores/GameState';

import GoLevelsButton from './buttons/GoLevelsButton';
import ReplayButton from './buttons/ReplayButton';

type GameOverModalProps = {
  show: boolean;
  onClose: () => void;
};

const GameOverModal = ({ show, onClose }: GameOverModalProps) => {
  const { score } = useGameStore();

  return (
    <BaseModal
      title="失敗"
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
      <View className="flex-row justify-between" style={{ width: '60%' }}>
        <GoLevelsButton />
        <ReplayButton />
      </View>
      {/* <CoolButton
        width={150}
        height={50}
        text="重新開始"
        fontSize={18}
        onClick={() => {
          resetGame();
          setShowLevelModal(true);
          router.push('/levels');
        }}
      /> */}
    </BaseModal>
  );
};

export default GameOverModal;
