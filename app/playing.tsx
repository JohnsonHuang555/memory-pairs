import { useEffect, useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import CoolText from '@/components/CoolText';
import FadeInOutText from '@/components/FadeInOutText';
import FlipCard from '@/components/FlipCard';
import MainContainer from '@/components/MainContainer';
import ProgressBarWithStars from '@/components/ProgressBarWithStars';

// const testData = [
//   {
//     id: '1',
//     value: '1',
//   },
//   {
//     id: '1',
//     value: '1',
//   }
// ]

const testData = Array.from({ length: 24 }, (_, i) => i + 1);

const PlayingPage = () => {
  const [timeLeft, setTimeLeft] = useState(60); // 初始時間 60 秒
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer: any;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1); // 每秒減少 1
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(timer); // 倒數到 0 時停止
    }
    return () => clearInterval(timer); // 清除計時器避免內存洩漏
  }, [isRunning, timeLeft]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  // const resetTimer = () => {
  //   setIsRunning(false);
  //   setTimeLeft(60); // 重設為 60 秒
  // };

  return (
    <MainContainer title="Level 1" showPauseIcon>
      <View className="items-center" style={{ marginBottom: 8 }}>
        <View style={{ width: '90%' }}>
          <ProgressBarWithStars />
        </View>
      </View>
      {/* 分數 */}
      <View
        className="flex-row items-center justify-between"
        style={{ marginBottom: 16 }}
      >
        <CoolText
          text="分數: 99"
          className="ml-2 text-2xl text-[#834B4B]"
          fontWeight="medium"
        />
        <View className="flex-row items-center">
          <Image
            source={require('@/assets/images/timer-outline.png')}
            style={{ width: 30, height: 30 }}
          />
          <CoolText
            text={timeLeft}
            className="ml-2 text-[#834B4B]"
            style={{ fontSize: 24 }}
            fontWeight="medium"
          />
        </View>
      </View>
      {/* 牌組 */}
      <View
        className="flex-row flex-wrap justify-between"
        style={{ marginBottom: 4 }}
      >
        {testData.map(t => (
          <View className="mb-4 aspect-square w-[22%]" key={t}>
            <FlipCard onFlip={startTimer} />
          </View>
        ))}
      </View>
      {/* combo */}
      <View className="items-center">
        <FadeInOutText text="1 Combo" showText={true} />
      </View>
    </MainContainer>
  );
};

export default PlayingPage;
