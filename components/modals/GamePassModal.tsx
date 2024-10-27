import { Image, View } from 'react-native';

import CoolText from '../CoolText';
import BaseModal from './BaseModal';
import GoLevelsButton from './buttons/GoLevelsButton';
import ReplayButton from './buttons/ReplayButton';
import useGameStore from '@/stores/GameState';

type GamePassModalProps = {
  show: boolean;
  onClose: () => void;
};

const GamePassModal = ({ show, onClose }: GamePassModalProps) => {
  const { score, stars } = useGameStore();

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
          <Image
            source={require('@/assets/images/yellow-star.png')}
            style={{
              width: 65,
              height: 65,
              marginTop: 24,
              transform: [{ rotate: '-25deg' }],
            }}
          />
        ) : (
          <Image
            source={require('@/assets/images/grey-star.png')}
            style={{
              width: 65,
              height: 65,
              marginTop: 24,
              transform: [{ rotate: '-25deg' }],
            }}
          />
        )}
        {stars > 1 ? (
          <Image
            source={require('@/assets/images/yellow-star.png')}
            style={{ width: 75, height: 75 }}
          />
        ) : (
          <Image
            source={require('@/assets/images/grey-star.png')}
            style={{ width: 75, height: 75 }}
          />
        )}
        {stars > 2 ? (
          <Image
            source={require('@/assets/images/yellow-star.png')}
            style={{
              width: 65,
              height: 65,
              marginTop: 24,
              transform: [{ rotate: '25deg' }],
            }}
          />
        ) : (
          <Image
            source={require('@/assets/images/grey-star.png')}
            style={{
              width: 65,
              height: 65,
              marginTop: 24,
              transform: [{ rotate: '25deg' }],
            }}
          />
        )}
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
            style={{ width: 32, height: 32, marginRight: 4 }}
          />
          <CoolText
            text={score}
            fontWeight="medium"
            style={{ fontSize: 22, color: '#834B4B' }}
          />
        </View>
      </View>
      <View className="flex-row justify-between" style={{ width: '60%' }}>
        <GoLevelsButton />
        <ReplayButton />
      </View>
    </BaseModal>
  );
};

export default GamePassModal;
