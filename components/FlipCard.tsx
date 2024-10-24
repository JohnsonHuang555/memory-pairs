import { useEffect, useMemo, useRef } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, {
  interpolate,
  runOnJS,
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
  onFlip: (card: Card) => void;
  updateCard: (id: number) => void;
};

const FlipCard = ({ card, type, theme, onFlip, updateCard }: FlipCardProps) => {
  const prevIsFlipped = useRef(card.isFlipped);
  const prevIsMatched = useRef(card.isMatched);
  const rotation = useSharedValue(0); // 初始旋轉角度
  const scale = useSharedValue(1); // 初始化卡片的縮放比例

  // 當點擊卡片時觸發翻轉
  const flipCard = () => {
    // 翻開卡片時，觸發 1 秒後自動翻回
    if (!card.isFlipped) {
      onFlip(card);
      rotation.value = withSpring(
        180,
        {
          damping: 20, // 增大阻尼，减少反弹
          stiffness: 150, // 增大刚度，加快动画响应
          mass: 1, // 设置适中的质量
          overshootClamping: true, // 禁止超过目标值
        },
        finish => {
          if (finish) {
            runOnJS(updateCard)(card.id);
          }
        },
      );
    }
  };

  useEffect(() => {
    // 判斷是否從 true 變成 false
    if (prevIsFlipped.current === true && card.isFlipped === false) {
      // 觸發動畫，當 isFlipped 從 true 變為 false 時
      rotation.value = withSpring(0);
    }

    // 更新前一個值
    prevIsFlipped.current = card.isFlipped;
  }, [card.isFlipped]);

  useEffect(() => {
    if (prevIsMatched.current === false && card.isMatched) {
      scale.value = withSpring(1.15, {
        damping: 10,
        stiffness: 200,
      });
      setTimeout(() => {
        scale.value = withSpring(1, {
          damping: 10,
          stiffness: 200,
        });
      }, 200);
    }
    // 更新前一個值
    prevIsMatched.current = card.isMatched;
  }, [card.isMatched])

  // 卡片的背面樣式
  const frontAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { rotateY: `${interpolate(rotation.value, [0, 180], [0, 180])}deg` },
        { scale: scale.value }, // 點擊時放大
      ],
      opacity: interpolate(rotation.value, [0, 90, 180], [1, 0, 0]),
    };
  });

  // 卡片的正面樣式
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
    if (card.isFlipped || card.isMatched) {
      return;
    }
    scale.value = withSpring(1.15, {
      damping: 10,
      stiffness: 200,
    });
  };

  const handlePressOut = () => {
    if (card.isFlipped || card.isMatched) {
      return;
    }
    scale.value = withSpring(1, {
      damping: 10,
      stiffness: 200,
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
