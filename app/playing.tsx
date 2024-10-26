import { useEffect, useState } from 'react';
import { Image, View } from 'react-native';
import { useSharedValue, withTiming } from 'react-native-reanimated';

import CoolText from '@/components/CoolText';
import FadeInOutText from '@/components/FadeInOutText';
import FlipCard from '@/components/FlipCard';
import MainContainer from '@/components/MainContainer';
import ProgressBarWithStars from '@/components/ProgressBarWithStars';
import GameOverModal from '@/components/modals/GameOverModal';
import useLevelInfo from '@/hooks/useLevelInfo';
import { Card } from '@/models/Card';
import useGameStore from '@/stores/GameState';

const PlayingPage = () => {
  const { levelInfo } = useLevelInfo();
  const [showGameOverModal, setShowOverModal] = useState(false);
  const [timeLeft, setTimeLeft] = useState(levelInfo?.timer || 0);
  const [isRunning, setIsRunning] = useState(false);
  const {
    generateCards,
    cards,
    onFlip,
    checkIsMatch,
    updateCard,
    score,
    combo,
  } = useGameStore();

  // 使用 useSharedValue 定義動畫數值
  const animatedValue = useSharedValue(0);
  const [displayedValue, setDisplayedValue] = useState(0);

  if (!levelInfo) return null;

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayedValue(Math.floor(animatedValue.value));
    }, 50); // 每 50 毫秒更新畫面

    return () => clearInterval(interval);
  }, [animatedValue]);

  useEffect(() => {
    let timer: any;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1); // 每秒減少 1
      }, 1000);
    } else if (timeLeft === 0) {
      setShowOverModal(true);
      clearInterval(timer); // 倒數到 0 時停止
    }
    return () => clearInterval(timer); // 清除計時器避免內存洩漏
  }, [isRunning, timeLeft]);

  useEffect(() => {
    generateCards(levelInfo);
  }, []);

  // 驅動動畫，將數值從 0 變到 score
  useEffect(() => {
    animatedValue.value = withTiming(score, { duration: 1000 });
  }, [score]);

  const startTimer = () => {
    if (isRunning) return;
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
    startTimer();
    onFlip(card.id);
    checkIsMatch(card);
  };

  return (
    <>
      <GameOverModal
        show={showGameOverModal}
        onClose={() => setShowOverModal(false)}
      />
      <MainContainer
        title={`Level ${levelInfo.id}`}
        showPauseIcon
        onPause={stopTimer}
        onResume={startTimer}
      >
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
          <View className="flex-row items-center">
            <CoolText
              text="分數:"
              className="mr-3 text-2xl text-[#834B4B]"
              fontWeight="medium"
            />
            <CoolText
              text={displayedValue}
              className="text-2xl text-[#D14343]"
              fontWeight="bold"
            />
          </View>
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
        {combo > 0 && (
          <View className="items-center">
            <FadeInOutText text="1 Combo" showText={true} />
          </View>
        )}
      </MainContainer>
    </>
  );
};

export default PlayingPage;
