import { StyleSheet, View } from 'react-native';

import BounceAnimation from '@/components/BounceAnimation';
import useGameStore from '@/stores/GameStore';
import useLevelStore from '@/stores/LevelStore';

import { Image } from 'expo-image';

type ReplayButtonProps = {
  onPress: () => void;
};

const ReplayButton = ({ onPress }: ReplayButtonProps) => {
  const { resetGame, setDisableGame } = useGameStore();
  const { setShowLevelModal } = useLevelStore();

  return (
    <BounceAnimation
      onPress={() => {
        setTimeout(() => {
          resetGame();
          setShowLevelModal(true);
        }, 1000);

        setDisableGame();
        onPress();
      }}
    >
      <View className="rounded-full" style={styles.actions}>
        <Image
          source={require('@/assets/images/icons/replay.png')}
          style={{ width: 30, height: 30 }}
        />
      </View>
    </BounceAnimation>
  );
};

export default ReplayButton;

const styles = StyleSheet.create({
  actions: {
    padding: 12,
    borderColor: '#834B4B',
    backgroundColor: '#FFFCF0',
    borderWidth: 3,
  },
});
