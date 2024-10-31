import { useEffect, useState } from 'react';
import { Image, View } from 'react-native';
import Animated, {
  BounceIn,
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import BounceAnimation from '@/components/BounceAnimation';
import CoolText from '@/components/CoolText';
import FlipCard from '@/components/FlipCard';
import MainContainer from '@/components/MainContainer';
import ProgressBarWithStars from '@/components/ProgressBarWithStars';
import GameOverModal from '@/components/modals/GameOverModal';
import GamePassModal from '@/components/modals/GamePassModal';
import PauseGameModal from '@/components/modals/PauseGameModal';
import useLevelInfo from '@/hooks/useLevelInfo';
import { Card } from '@/models/Card';
import useGameStore from '@/stores/GameStore';
import useLevelStore from '@/stores/LevelStore';
import usePlayerStore from '@/stores/PlayerStore';

const ANGLE = 10;
const TIME = 100;
const EASING = Easing.elastic(1.5);

const PlayingPage = () => {
  const { levelInfo } = useLevelInfo();
  const { updateCurrentLevelId, setStarsOfLevel } = usePlayerStore();
  const { updateLevel } = useLevelStore();
  const [showGameOverModal, setShowGameOverModal] = useState(false);
  const [showGamePassModal, setShowGamePassModal] = useState(false);
  const [showPauseGameModal, setPauseGameModal] = useState(false);

  const [timeLeft, setTimeLeft] = useState(levelInfo?.timer || 0);
  const [isRunning, setIsRunning] = useState(false);
  const [displayedValue, setDisplayedValue] = useState(0);

  const {
    generateCards,
    cards,
    onFlip,
    checkIsMatch,
    updateCard,
    score,
    combo,
    isCompleteGame,
    stars,
    finalCalculateScore,
  } = useGameStore();

  // 使用 useSharedValue 定義動畫數值
  const scoreAnimatedValue = useSharedValue(0);
  const remainedTimeAnimatedValue = useSharedValue(0);
  const timerRotation = useSharedValue<number>(0);

  if (!levelInfo) return null;

  // timer
  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayedValue(Math.floor(scoreAnimatedValue.value));
    }, 50); // 每 50 毫秒更新畫面

    return () => clearInterval(interval);
  }, [scoreAnimatedValue]);

  // 倒數計時
  useEffect(() => {
    let timer: any;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1); // 每秒減少 1
      }, 1000);
    } else if (timeLeft === 0 && !isCompleteGame) {
      // game over
      setShowGameOverModal(true);
      clearInterval(timer); // 倒數到 0 時停止
    }
    return () => clearInterval(timer); // 清除計時器避免內存洩漏
  }, [isRunning, timeLeft]);

  // create game
  useEffect(() => {
    generateCards(levelInfo);
  }, []);

  // 驅動動畫，將數值從 0 變到 score
  useEffect(() => {
    scoreAnimatedValue.value = withTiming(score, { duration: 500 }, () => {
      if (isCompleteGame && remainedTimeAnimatedValue.value === 0) {
        // 更新成績
        runOnJS(updateLevel)(levelInfo.id, stars);

        // 寫入手機
        runOnJS(updateCurrentLevelId)(levelInfo.id);

        let coins = 0;
        if (stars === 1) {
          coins = levelInfo.star1Coins;
        } else if (stars === 2) {
          coins = levelInfo.star1Coins;
        } else {
          coins = levelInfo.star3Coins;
        }
        runOnJS(setStarsOfLevel)(levelInfo.id, stars, coins);
      }
    });
  }, [score]);

  // 遊戲過關
  useEffect(() => {
    if (isCompleteGame) {
      stopTimer();
      remainedTimeAnimatedValue.value = timeLeft;

      const interval = setInterval(() => {
        setTimeLeft(Math.floor(remainedTimeAnimatedValue.value));
      }, 50); // 每 50 毫秒更新畫面

      // 驅動動畫，將剩餘時間變到 0
      setTimeout(() => {
        remainedTimeAnimatedValue.value = withTiming(
          0,
          { duration: 500 },
          () => {
            runOnJS(clearInterval)(interval);
            runOnJS(finalCalculateScore)(timeLeft);
          },
        );
      }, 1000);

      setTimeout(() => {
        setShowGamePassModal(true);
      }, 2500);
    }
  }, [isCompleteGame]);

  // 時間快到動畫
  useEffect(() => {
    if (timeLeft <= 10 && timeLeft > 0 && !isCompleteGame) {
      timerRotation.value = withSequence(
        // deviate left to start from -ANGLE
        withTiming(-ANGLE, { duration: TIME / 2, easing: EASING }),
        // wobble between -ANGLE and ANGLE 7 times
        withRepeat(
          withTiming(ANGLE, {
            duration: TIME,
            easing: EASING,
          }),
          7,
          true,
        ),
        // go back to 0 at the end
        withTiming(0, { duration: TIME / 2, easing: EASING }),
      );
    }
  }, [timeLeft]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotateZ: `${timerRotation.value}deg` }],
  }));

  const startTimer = () => {
    if (isRunning) return;
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  const handleFlip = (card: Card) => {
    startTimer();
    onFlip(card.id);
    checkIsMatch(card);
  };

  return (
    <>
      <GameOverModal
        show={showGameOverModal}
        onClose={() => setShowGameOverModal(false)}
      />
      <GamePassModal
        show={showGamePassModal}
        onClose={() => setShowGamePassModal(false)}
      />
      <PauseGameModal
        show={showPauseGameModal}
        onResume={() => {
          startTimer();
          setPauseGameModal(false);
        }}
      />
      <MainContainer
        title={`Level ${levelInfo.id}`}
        leftChildren={
          <BounceAnimation
            onPress={() => {
              if (isCompleteGame) return;
              stopTimer();
              setPauseGameModal(true);
            }}
          >
            <Image
              source={require('@/assets/images/pause.png')}
              style={{ width: 40, height: 40 }}
            />
          </BounceAnimation>
        }
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
            <Animated.View style={animatedStyle}>
              <Image
                source={require('@/assets/images/timer-outline.png')}
                style={{ width: 28, height: 28 }}
              />
            </Animated.View>
            <View className="items-end" style={{ width: 35 }}>
              <CoolText
                text={timeLeft}
                className="ml-2"
                style={{
                  fontSize: 24,
                  color: timeLeft <= 10 ? '#D14343' : '#834B4B',
                }}
                fontWeight="medium"
              />
            </View>
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
                disabled={isCompleteGame}
              />
            </View>
          ))}
        </View>
        {/* combo */}
        {combo > 0 && (
          <View className="items-center">
            <Animated.Text
              entering={BounceIn.duration(500)}
              style={{
                fontSize: 24,
                fontWeight: 'bold',
                fontFamily: 'GenSenRounded2TWB',
                color: '#D14343',
              }}
            >
              {combo} Combo
            </Animated.Text>
          </View>
        )}
      </MainContainer>
    </>
  );
};

export default PlayingPage;
