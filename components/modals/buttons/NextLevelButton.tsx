import { StyleSheet, View } from 'react-native';

import BounceAnimation from '@/components/BounceAnimation';
import useGameStore from '@/stores/GameStore';
import useLevelStore from '@/stores/LevelStore';
import usePlayerStore from '@/stores/PlayerStore';

import { Image } from 'expo-image';
import { useRouter } from 'expo-router';

const NextLevelButton = () => {
  const { resetGame } = useGameStore();
  const { setShowLevelModal, setPlayLevel } = useLevelStore();
  const { currentLevelId } = usePlayerStore();
  const { push } = useRouter();

  return (
    <BounceAnimation
      onPress={() => {
        push('/levels');
        resetGame();
        setPlayLevel(currentLevelId);
        setShowLevelModal(true);
      }}
    >
      <View className="rounded-full border" style={styles.actions}>
        <Image
          source={require('@/assets/images/next-level.png')}
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
