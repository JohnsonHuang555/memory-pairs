import { StyleSheet, View } from 'react-native';

import BounceAnimation from '@/components/BounceAnimation';
import useAudioStore from '@/stores/AudioStore';
import useGameStore from '@/stores/GameStore';
import useLevelStore from '@/stores/LevelStore';
import usePlayerStore from '@/stores/PlayerStore';

import { Image } from 'expo-image';

type ReplayButtonProps = {
  onPress: () => void;
};

const ReplayButton = ({ onPress }: ReplayButtonProps) => {
  const playSound = useAudioStore(state => state.playSound);
  const { resetGame, setDisableGame } = useGameStore();
  const { setShowLevelModal } = useLevelStore();
  const { isSoundOn } = usePlayerStore();

  return (
    <BounceAnimation
      onPress={() => {
        setTimeout(() => {
          resetGame();
          setShowLevelModal(true);
        }, 1000);

        if (isSoundOn) {
          playSound('confirm');
        }
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
