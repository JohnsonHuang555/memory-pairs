import { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import CoolText from '@/components/CoolText';
import FlipCard from '@/components/FlipCard';
import MainContainer from '@/components/MainContainer';

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

const testData = Array.from({ length: 16 }, (_, i) => i + 1);

const PlayingPage = () => {
  return (
    <MainContainer title="Level 1" showPauseIcon>
      <View className="mt-10 flex-row items-center justify-between">
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
            text="99"
            className="ml-2 text-[#834B4B]"
            style={{ fontSize: 24 }}
            fontWeight="medium"
          />
        </View>
      </View>
      <View className="flex-row flex-wrap justify-between">
        {testData.map(t => (
          <View className="aspect-square w-[22%] mb-4" key={t}>
            <FlipCard />
          </View>
        ))}
      </View>
    </MainContainer>
  );
};

export default PlayingPage;

const styles = StyleSheet.create({
  card: {
    position: 'absolute',
    backgroundColor: 'skyblue',
    justifyContent: 'center',
    alignItems: 'center',
    backfaceVisibility: 'hidden', // 隱藏背面
  },
  cardBack: {
    backgroundColor: 'tomato',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
});
