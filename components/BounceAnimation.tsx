import { ReactNode } from 'react';
import { TouchableOpacity } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

type BounceAnimationProps = {
  className?: string;
  children: ReactNode;
  scaleValue?: number;
  onPress: () => void;
};

const BounceAnimation = ({
  className,
  children,
  scaleValue = 0.8,
  onPress,
}: BounceAnimationProps) => {
  // 控制縮放值的共享變量
  const scale = useSharedValue(1);

  // 設置動畫樣式
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  // 當按下時，放大，帶有彈跳效果
  const handlePressIn = () => {
    scale.value = withSpring(scaleValue, {
      damping: 5, // 控制阻尼，數值越小，彈跳幅度越大
      stiffness: 100, // 剛度，數值越大，恢復原始大小越快
    });
  };

  // 當釋放時，縮小回到原始大小
  const handlePressOut = () => {
    scale.value = withSpring(1, {
      damping: 5,
      stiffness: 100,
    });
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => {
        setTimeout(() => {
          onPress();
        }, 200);
      }}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View style={animatedStyle} className={className}>
        {children}
      </Animated.View>
    </TouchableOpacity>
  );
};

export default BounceAnimation;
