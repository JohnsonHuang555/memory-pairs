import { useMemo, useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import CoolText from './CoolText';
import { LevelType } from '@/constants/AllLevels';
import { Card } from '@/models/Card';
import { LevelTheme } from '@/models/Level';

type FlipCardProps = {
  card: Card;
  type: LevelType;
  theme: LevelTheme;
  onFlip: () => void;
};

const FlipCard = ({ card, type, theme, onFlip }: FlipCardProps) => {
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

  const cardContent = useMemo(() => {
    if (theme === LevelTheme.Color) {
      return (
        <View
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: card.content,
            borderRadius: 12,
          }}
        />
      );
    }
    switch (type) {
      case LevelType.ImageUrl:
        // return (
        //   <Image source={card.content} style={{ width: 50, height: 50 }} />
        // );
      case LevelType.String:
      default:
        return (
          <CoolText
            text={card.content}
            fontWeight="medium"
            style={{ fontSize: 24 }}
          />
        );
    }
  }, []);

  return (
    <TouchableOpacity
      onPress={flipCard}
      activeOpacity={0.9}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <View style={styles.container}>
        {/* 背面 */}
        <Animated.View style={[styles.card, frontAnimatedStyle]}>
          <Image
            source={require('@/assets/images/card-question.png')}
            style={{ width: 50, height: 50 }}
          />
        </Animated.View>

        {/* 正面 */}
        <Animated.View
          style={[styles.card, styles.cardBack, backAnimatedStyle]}
        >
          {cardContent}
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
    borderColor: '#d9d9d9',
    borderWidth: 2,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
});
