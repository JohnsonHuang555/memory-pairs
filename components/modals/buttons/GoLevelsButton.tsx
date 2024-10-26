import BounceAnimation from "@/components/BounceAnimation";
import useGameStore from "@/stores/GameState";
import { useRouter } from "expo-router";
import { Image, StyleSheet, View } from 'react-native';

const GoLevelsButton = () => {
  const { resetGame } = useGameStore();
  const { push } = useRouter();

  return (
    <BounceAnimation
      onPress={() => {
        resetGame();
        push('/levels');
      }}
    >
      <View className="rounded-full border" style={styles.actions}>
        <Image
          source={require('@/assets/images/levels.png')}
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
