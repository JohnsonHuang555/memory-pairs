import { StyleSheet, View } from 'react-native';

import BounceAnimation from '@/components/BounceAnimation';
import useGameStore from '@/stores/GameStore';
import useLevelStore from '@/stores/LevelStore';

import { Image } from 'expo-image';

type GoLevelsButtonProps = {
  onPress: () => void;
}

const GoLevelsButton = ({ onPress }: GoLevelsButtonProps) => {
  const { resetGame } = useGameStore();
  const { setPlayLevel } = useLevelStore();

  return (
    <BounceAnimation
      onPress={() => {
        setTimeout(() => {
          resetGame();
          setPlayLevel(undefined);
        }, 500);
        onPress();
      }}
    >
      <View className="rounded-full" style={styles.actions}>
        <Image
          source={require('@/assets/images/icons/levels.png')}
          style={{ width: 30, height: 30 }}
        />
      </View>
    </BounceAnimation>
  );
};

export default GoLevelsButton;

const styles = StyleSheet.create({
  actions: {
    padding: 12,
    borderColor: '#834B4B',
    backgroundColor: '#FFFCF0',
    borderWidth: 3,
  },
});
