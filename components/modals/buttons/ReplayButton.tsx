import { Image, StyleSheet, View } from 'react-native';

import BounceAnimation from '@/components/BounceAnimation';
import useGameStore from '@/stores/GameState';
import useLevelStore from '@/stores/LevelStore';

import { useRouter } from 'expo-router';

const ReplayButton = () => {
  const { resetGame } = useGameStore();
  const { setShowLevelModal } = useLevelStore();
  const { push } = useRouter();

  return (
    <BounceAnimation
      onPress={() => {
        push('/levels');
        resetGame();
        setShowLevelModal(true);
      }}
    >
      <View className="rounded-full border" style={styles.actions}>
        <Image
          source={require('@/assets/images/replay.png')}
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
