import { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import CoolText from './CoolText';

type FlipCardProps = {
  onFlip: () => void;
};

const FlipCard = ({ onFlip }: FlipCardProps) => {
  const [flipped, setFlipped] = useState(false);
  const rotation = useSharedValue(0); // 初始旋轉角度
  const scale = useSharedValue(1); // 初始化卡片的縮放比例

  // 當點擊卡片時觸發翻轉
  const flipCard = () => {
    // 翻開卡片時，觸發 1 秒後自動翻回
    if (!flipped) {
      onFlip();
      rotation.value = withSpring(180);
      setFlipped(true);

      setTimeout(() => {
        rotation.value = withSpring(0); // 2 秒後蓋回卡片
        setFlipped(false);
      }, 1000); // 1 秒後自動翻回
    }
  };

  // 卡片的正面樣式
  const frontAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { rotateY: `${interpolate(rotation.value, [0, 180], [0, 180])}deg` },
        { scale: scale.value }, // 點擊時放大
      ],
      opacity: interpolate(rotation.value, [0, 90, 180], [1, 0, 0]),
    };
  });

  // 卡片的背面樣式
  const backAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { rotateY: `${interpolate(rotation.value, [0, 180], [180, 360])}deg` },
        { scale: scale.value }, // 點擊時放大
      ],
      opacity: interpolate(rotation.value, [0, 90, 180], [0, 0, 1]),
    };
  });

  const handlePressIn = () => {
    scale.value = withSpring(1.15, {
      damping: 8,
      stiffness: 150,
    });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, {
      damping: 8,
      stiffness: 150,
    });
    flipCard(); // 點擊後翻轉卡片
  };

  return (
    <TouchableOpacity
      onPress={flipCard}
      activeOpacity={0.9}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <View style={styles.container}>
        {/* 正面 */}
        <Animated.View style={[styles.card, frontAnimatedStyle]}>
          <Image
            source={require('@/assets/images/card-question.png')}
            style={{ width: 50, height: 50 }}
          />
        </Animated.View>

        {/* 背面 */}
        <Animated.View
          style={[styles.card, styles.cardBack, backAnimatedStyle]}
        >
          <CoolText style={styles.text} text={2} />
        </Animated.View>
      </View>
    </TouchableOpacity>
  );
};

export default FlipCard;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    shadowOffset: {
      width: 2,
      height: 8,
    },
    shadowOpacity: 0.2,
  },
  card: {
    position: 'absolute',
    backgroundColor: '#FFF6ED',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backfaceVisibility: 'hidden', // 隱藏背面
    borderRadius: 12,
    borderColor: '#834B4B',
    borderWidth: 3,
  },
  cardBack: {
    backgroundColor: '#FFF',
    borderWidth: 0,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
});
