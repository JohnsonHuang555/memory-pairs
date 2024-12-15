import { StyleSheet, View } from 'react-native';

import BounceAnimation from '@/components/BounceAnimation';
import useLevelInfo from '@/hooks/useLevelInfo';
import useGameStore from '@/stores/GameStore';
import useLevelStore from '@/stores/LevelStore';

import { Image } from 'expo-image';

type NextLevelButtonProps = {
  onPress: () => void;
};

const NextLevelButton = ({ onPress }: NextLevelButtonProps) => {
  const { resetGame, setDisableGame } = useGameStore();
  const { setShowLevelModal, setPlayLevel, updateCurrentPage } =
    useLevelStore();
  const { levelInfo } = useLevelInfo();

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
