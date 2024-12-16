import { StyleSheet, View } from 'react-native';

import BounceAnimation from '@/components/BounceAnimation';
import useAudioStore from '@/stores/AudioStore';
import usePlayerStore from '@/stores/PlayerStore';

import { Image } from 'expo-image';

type GamePlayButtonProps = {
  onPress: () => void;
};

const GamePlayButton = ({ onPress }: GamePlayButtonProps) => {
  const playSound = useAudioStore(state => state.playSound);
  const { isSoundOn } = usePlayerStore();

  return (
    <BounceAnimation
      onPress={() => {
        if (isSoundOn) {
          playSound('confirm');
        }
        onPress();
      }}
    >
      <View
        className="items-center justify-center rounded-full"
        style={[styles.actions, { width: 60, height: 60 }]}
      >
        <Image
          source={require('@/assets/images/icons/game-play.png')}
          style={{
            width: 30,
            height: 30,
            position: 'absolute',
            left: 15,
          }}
        />
      </View>
    </BounceAnimation>
  );
};

export default GamePlayButton;

const styles = StyleSheet.create({
  actions: {
    padding: 12,
    borderColor: '#834B4B',
    backgroundColor: '#FFFCF0',
    borderWidth: 3,
  },
});
