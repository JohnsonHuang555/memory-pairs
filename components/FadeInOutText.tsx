import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

type FadeInOutTextProps = {
  showText: boolean;
  text: string;
};

const FadeInOutText = ({ showText, text }: FadeInOutTextProps) => {
  const opacity = useSharedValue(0); // 透明度初始為 0 (隱藏)
  const scale = useSharedValue(0.5); // 縮放初始值

  const fadeIn = () => {
    // 淡入效果，透明度從 0 漸變到 1
    opacity.value = withTiming(1, { duration: 500 });
    scale.value = withSequence(
      withSpring(1.2, { damping: 4, stiffness: 100 }), // 彈跳放大
      withSpring(1, { damping: 4, stiffness: 80 }), // 回到原始大小
    );
  };

  const fadeOut = () => {
    // 淡出效果，透明度從 1 漸變到 0
    opacity.value = withTiming(0, { duration: 500 });
    scale.value = withTiming(0.5, { duration: 500 }); // 縮小至 0.5
  };

  // 動態樣式，控制透明度
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ scale: scale.value }],
    };
  });

  useEffect(() => {
    if (showText) {
      fadeIn(); // 頁面加載時自動淡入
    } else {
      fadeOut();
    }
  }, [showText]);

  return (
    <Animated.Text style={[styles.text, animatedStyle]}>{text}</Animated.Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'GenSenRounded2TWB',
    color: '#D14343',
  },
});

export default FadeInOutText;
