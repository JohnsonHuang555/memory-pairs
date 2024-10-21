import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import CoolText from './CoolText';

const starThresholds = [100, 250, 300]; // 每顆星的分數門檻

const ProgressBarWithStars = () => {
  const maxScore = 300; // 三顆星的最高分
  const [playerScore, setPlayerScore] = useState(100); // 玩家得分

  // 設置進度（基於得分的比例）
  const progress = useSharedValue(0);

  // 星星縮放動畫
  const starScale = useSharedValue(1);

  // 進度條樣式動畫
  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: `${progress.value * 100}%`,
    };
  });

  // 監聽 playerScore 的變化並更新進度條
  useEffect(() => {
    progress.value = withTiming(
      playerScore / maxScore,
      { duration: 1000 },
      () => {
        const reachedStar = starThresholds.some(
          threshold => playerScore >= threshold,
        );
        if (reachedStar) {
          starScale.value = withSpring(1.2, {}, () => {
            starScale.value = withSpring(1);
          });
        }
      },
    );
  }, [playerScore]); // 將 playerScore 作為 useEffect 的依賴

  // 計算星星的位置（等分進度條）
  const calculateStarPositions = () => {
    return starThresholds.map((threshold, index) => ({
      id: index,
      position: threshold / maxScore, // 比例位置
      completed: playerScore >= threshold,
    }));
  };

  const stars = calculateStarPositions();

  return (
    <View style={styles.container}>
      {/* 在進度條上標示星星 */}
      <View style={styles.starContainer}>
        {stars.map(star => (
          <View
            key={star.id}
            style={[
              styles.starWrapper,
              {
                left: `${star.position * 100}%`,
                // 調整為進度條內部，避免超出
                transform: [{ translateX: -15 }], // 假設星星寬度為30
              },
            ]}
          >
            <Animated.Image
              source={
                star.completed
                  ? require('@/assets/images/yellow-star.png') // 已完成的星星
                  : require('@/assets/images/grey-star.png') // 未完成的星星
              }
              style={[
                styles.star,
                // 防止空值樣式，應始終有預設的動畫樣式
                useAnimatedStyle(() => ({
                  transform: star.completed
                    ? [{ scale: starScale.value }]
                    : [{ scale: 1 }],
                })),
              ]}
            />
            <CoolText text={1223} style={{ marginTop: 14 }} fontWeight="bold"/>
          </View>
        ))}
      </View>
      <View style={styles.progressBarBackground}>
        <Animated.View style={[styles.progressBarFill, animatedStyle]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  progressBarBackground: {
    width: '100%',
    height: 6,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#717171',
    borderRadius: 10,
  },
  starContainer: {
    position: 'absolute',
    top: -34, // 調整星星的位置
    left: 0,
    right: 0,
    height: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  starWrapper: {
    position: 'absolute',
    top: 0,
  },
  star: {
    width: 30,
    height: 30,
  },
  button: {
    fontSize: 18,
    color: 'blue',
    marginTop: 10,
  },
});

export default ProgressBarWithStars;
