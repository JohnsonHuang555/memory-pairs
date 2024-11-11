import { StyleSheet, View } from 'react-native';

import BounceAnimation from '@/components/BounceAnimation';
import useGameStore from '@/stores/GameStore';
import useLevelStore from '@/stores/LevelStore';

import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import useLevelInfo from '@/hooks/useLevelInfo';

const NextLevelButton = () => {
  const { resetGame } = useGameStore();
  const { setShowLevelModal, setPlayLevel } = useLevelStore();
  const { levelInfo } = useLevelInfo();
  const { push } = useRouter();

  return (
    <BounceAnimation
      onPress={() => {
        if (!levelInfo) return;
        push('/levels');
        resetGame();
        setPlayLevel(levelInfo.id + 1);
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
