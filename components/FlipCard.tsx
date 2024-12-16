import { useEffect, useMemo, useRef, useState } from 'react';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
} from 'react-native-reanimated';

import CoolText from './CoolText';
import { Card } from '@/models/Card';
import { LevelTheme, LevelType } from '@/models/Level';
import usePlayerStore from '@/stores/PlayerStore';

import { Image } from 'expo-image';

type FlipCardProps = {
  card: Card;
  type: LevelType;
  theme: LevelTheme;
  disabled: boolean;
  columns: number;
  itemViewFirst: boolean; // 道具先看幾秒
  itemViewFirstValue?: number; // 道具先看幾秒
  itemAutoPairs: boolean; // 道具自動配對
  onFlip: (card: Card) => void;
  updateCard: (id: number) => void;
};

// 問號的大小
const QuestionImageWidth: { [key: string]: number } = {
  2: 110,
  3: 80,
  4: 50,
  5: 40,
};

const FlipCard = React.memo(
  ({
    card,
    type,
    theme,
    disabled,
    columns,
    itemViewFirst,
    itemViewFirstValue,
    itemAutoPairs,
    onFlip,
    updateCard,
  }: FlipCardProps) => {
    const prevIsFlipped = useRef(card.isFlipped);
    const prevIsMatched = useRef(card.isMatched);
    const rotation = useSharedValue(0); // 初始旋轉角度
    const scale = useSharedValue(1); // 初始化卡片的縮放比例
    const [isViewFirst, setIsViewFirst] = useState(false);
    const { addMatchCount } = usePlayerStore();

    // 當點擊卡片時觸發翻轉
    const flipCard = () => {
      // 翻開卡片時，觸發 1 秒後自動翻回
      if (!card.isFlipped) {
        onFlip(card);
        rotation.value = withSpring(
          180,
          {
            damping: 20, // 增大阻尼，减少反弹
            stiffness: 200, // 增大刚度，加快动画响应
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
        rotation.value = withDelay(
          100,
          withSpring(0, {
            damping: 20, // 增大阻尼，减少反弹
            stiffness: 200, // 增大刚度，加快动画响应
            mass: 1, // 设置适中的质量
            overshootClamping: true, // 禁止超过目标值
          }),
        );
      }

      // 更新前一個值
      prevIsFlipped.current = card.isFlipped;
    }, [card.isFlipped]);

    useEffect(() => {
      // 兩個道具都有用
      if (itemViewFirst && itemViewFirstValue && itemAutoPairs) {
        if (!card.isMatched) {
          setIsViewFirst(true);
          rotation.value = withSpring(180, {
            damping: 20, // 增大阻尼，减少反弹
            stiffness: 200, // 增大刚度，加快动画响应
            mass: 1, // 设置适中的质量
            overshootClamping: true, // 禁止超过目标值
          });
          setTimeout(() => {
            setIsViewFirst(false);
            rotation.value = withSpring(0);
          }, itemViewFirstValue * 1000);
        } else {
          rotation.value = withSpring(180, {
            damping: 20, // 增大阻尼，减少反弹
            stiffness: 200, // 增大刚度，加快动画响应
            mass: 1, // 设置适中的质量
            overshootClamping: true, // 禁止超过目标值
          });
        }
        // 只用先看幾秒的道具
      } else if (itemViewFirst && itemViewFirstValue) {
        if (!card.isMatched) {
          setIsViewFirst(true);
          rotation.value = withSpring(180, {
            damping: 20, // 增大阻尼，减少反弹
            stiffness: 200, // 增大刚度，加快动画响应
            mass: 1, // 设置适中的质量
            overshootClamping: true, // 禁止超过目标值
          });
          setTimeout(() => {
            setIsViewFirst(false);
            rotation.value = withSpring(0);
          }, itemViewFirstValue * 1000);
        }
        // 只用自動配對的道具
      } else if (itemAutoPairs && card.isMatched) {
        rotation.value = withSpring(180, {
          damping: 20, // 增大阻尼，减少反弹
          stiffness: 200, // 增大刚度，加快动画响应
          mass: 1, // 设置适中的质量
          overshootClamping: true, // 禁止超过目标值
        });
      }
    }, [itemViewFirst, itemViewFirstValue, itemAutoPairs, card.isMatched]);

    useEffect(() => {
      if (prevIsMatched.current === false && card.isMatched) {
        addMatchCount();
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
    }, [card.isMatched]);

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
          {
            rotateY: `${interpolate(rotation.value, [0, 180], [180, 360])}deg`,
          },
          { scale: scale.value },
        ],
        opacity: interpolate(rotation.value, [0, 90, 180], [0, 0, 1]),
      };
    });

    const handlePressIn = () => {
      if (card.isFlipped || card.isMatched || disabled || isViewFirst) {
        return;
      }
      scale.value = withSpring(0.9, {
        damping: 10,
        stiffness: 200,
      });
    };

    const handlePressOut = () => {
      if (card.isFlipped || card.isMatched || disabled || isViewFirst) {
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
              borderRadius: 8,
            }}
          />
        );
      }
      switch (type) {
        case LevelType.ImageUrl:
          return (
            <Image
              source={card.content}
              contentFit="contain"
              style={{
                width: '87%',
                height: '87%',
                borderRadius: 8,
              }}
            />
          );
        case LevelType.String:
        default:
          let fontSize = 24;
          if (columns === 3) {
            fontSize = 52;
          } else if (columns === 4) {
            fontSize = 36;
          }
          return (
            <CoolText
              text={card.content}
              fontWeight="medium"
              style={{ fontSize }}
            />
          );
      }
    }, []);

    return (
      <TouchableOpacity
        onPress={flipCard}
        activeOpacity={1}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <View style={styles.container}>
          {/* 背面 */}
          <Animated.View style={[styles.card, frontAnimatedStyle]}>
            <Image
              source={require('@/assets/images/icons/card-question.png')}
              style={{
                width: QuestionImageWidth[columns],
                height: QuestionImageWidth[columns],
              }}
            />
          </Animated.View>
          {/* 正面 */}
          <Animated.View
            style={[
              styles.card,
              styles.cardBack,
              backAnimatedStyle,
              { borderWidth: columns === 3 ? 3 : 2 },
            ]}
          >
            {cardContent}
          </Animated.View>
        </View>
      </TouchableOpacity>
    );
  },
);

export default FlipCard;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    shadowOffset: {
      width: 2,
      height: 4,
    },
    shadowOpacity: 0.1,
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
    borderColor: '#ddd',
  },
});
