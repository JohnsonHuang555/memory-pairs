import { StyleSheet, View } from 'react-native';

import BounceAnimation from '@/components/BounceAnimation';

import { Image } from 'expo-image';

type GamePlayButtonProps = {
  onResume: () => void;
};

const GamePlayButton = ({ onResume }: GamePlayButtonProps) => {
  return (
    <BounceAnimation onPress={onResume}>
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
