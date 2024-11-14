import { StyleSheet, View } from 'react-native';

import BounceAnimation from '@/components/BounceAnimation';
import useGameStore from '@/stores/GameStore';
import useLevelStore from '@/stores/LevelStore';

import { Image } from 'expo-image';
import { useRouter } from 'expo-router';

const ReplayButton = () => {
  const { resetGame } = useGameStore();
  const { setShowLevelModal } = useLevelStore();
  const { push } = useRouter();

  return (
    <BounceAnimation
      onPress={() => {
        setTimeout(() => {
          setShowLevelModal(true);
        }, 100);
        resetGame();
        push('/levels');
      }}
    >
      <View className="rounded-full border" style={styles.actions}>
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
