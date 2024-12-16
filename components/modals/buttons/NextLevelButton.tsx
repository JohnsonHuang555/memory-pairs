import { StyleSheet, View } from 'react-native';

import BounceAnimation from '@/components/BounceAnimation';
import useLevelInfo from '@/hooks/useLevelInfo';
import useAudioStore from '@/stores/AudioStore';
import useGameStore from '@/stores/GameStore';
import useLevelStore from '@/stores/LevelStore';

import { Image } from 'expo-image';
import usePlayerStore from '@/stores/PlayerStore';

type NextLevelButtonProps = {
  onPress: () => void;
};

const NextLevelButton = ({ onPress }: NextLevelButtonProps) => {
  const playSound = useAudioStore(state => state.playSound);
  const { resetGame, setDisableGame } = useGameStore();
  const { setShowLevelModal, setPlayLevel, updateCurrentPage } =
    useLevelStore();
  const { levelInfo } = useLevelInfo();
  const { isSoundOn } = usePlayerStore();

  return (
    <BounceAnimation
      onPress={() => {
        if (!levelInfo) return;
        setTimeout(() => {
          resetGame();
          setPlayLevel(levelInfo.id + 1);
          if (levelInfo.id % 20 === 0) {
            updateCurrentPage(1);
          }
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
          source={require('@/assets/images/icons/next-level.png')}
          style={{ width: 30, height: 30, right: -2 }}
        />
      </View>
    </BounceAnimation>
  );
};

export default NextLevelButton;

const styles = StyleSheet.create({
  actions: {
    padding: 12,
    borderColor: '#834B4B',
    backgroundColor: '#FFFCF0',
    borderWidth: 3,
  },
});
