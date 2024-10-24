import { useEffect, useState } from 'react';
import { Image, View } from 'react-native';

import CoolText from '@/components/CoolText';
import FadeInOutText from '@/components/FadeInOutText';
import FlipCard from '@/components/FlipCard';
import MainContainer from '@/components/MainContainer';
import ProgressBarWithStars from '@/components/ProgressBarWithStars';
import useLevelInfo from '@/hooks/useLevelInfo';
import { Card } from '@/models/Card';
import useGameStore from '@/stores/GameState';

const PlayingPage = () => {
  const [timeLeft, setTimeLeft] = useState(60); // 初始時間 60 秒
  const [isRunning, setIsRunning] = useState(false);
  const { levelInfo } = useLevelInfo();
  const {
    generateCards,
    cards,
    onFlip,
    checkIsMatch,
    selectedCards,
    updateCard,
  } = useGameStore();

  console.log(cards, 'ccc')

  if (!levelInfo) return null;

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

  useEffect(() => {
    generateCards(levelInfo);
  }, []);

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

  const handleFlip = (card: Card) => {
    // startTimer();
    onFlip(card.id);
    checkIsMatch(card);
  };

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
            style={{ width: 28, height: 28 }}
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
        {cards.map(card => (
          <View className="mb-4 aspect-square w-[22%]" key={card.id}>
            <FlipCard
              onFlip={handleFlip}
              card={card}
              type={levelInfo.type}
              theme={levelInfo.theme}
              updateCard={updateCard}
            />
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
