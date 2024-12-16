import { useEffect, useMemo, useState } from 'react';
import { View } from 'react-native';
import Animated, {
  BounceIn,
  Easing,
  FadeIn,
  FadeOut,
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
import UseItemsModal from '@/components/modals/UseItemsModal';
import useLevelInfo, { gameMatchCount } from '@/hooks/useLevelInfo';
import { Card } from '@/models/Card';
import { ItemType } from '@/models/Item';
import useGameStore from '@/stores/GameStore';
import useLevelStore from '@/stores/LevelStore';
import usePlayerStore from '@/stores/PlayerStore';

import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';

const ANGLE = 10;
const TIME = 100;
const EASING = Easing.elastic(1.5);

const ColumnWidth: { [key: string]: string } = {
  2: '46%',
  3: '31%',
  4: '23%',
  5: '18%',
};

const ColumnMarginBottom: { [key: string]: number } = {
  2: 20,
  3: 16,
  4: 12,
  5: 10,
};

const PlayingScreen = () => {
  const { theme } = useLocalSearchParams();
  const { replace } = useRouter();

  const { levelInfo } = useLevelInfo();
  const { passGame, addFlipCount, themeList } = usePlayerStore();
  const { updateLevel, levels } = useLevelStore();
  const [showGameOverModal, setShowGameOverModal] = useState(false);
  const [showGamePassModal, setShowGamePassModal] = useState(false);
  const [showPauseGameModal, setShowPauseGameModal] = useState(false);
  const [showUseItemsModal, setUseItemsModal] = useState(false);

  const [timeLeft, setTimeLeft] = useState(levelInfo?.timer || 0);
  const [isRunning, setIsRunning] = useState(false);
  const [displayedScore, setDisplayedScore] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);

  // 使用先看牌的道具
  const [itemViewFirst, setItemViewFirst] = useState(false);

  const currentAllStars = useMemo(
    () =>
      themeList.reduce((acc, current) => {
        acc += current.starsOfLevel.reduce((a, c) => {
          a += c.stars;
          return a;
        }, 0);
        return acc;
      }, 0),
    [themeList],
  );

  const currentPassLevelCount = useMemo(
    () =>
      themeList.reduce((acc, current) => {
        acc += current.starsOfLevel.length || 0;
        return acc;
      }, 0),
    [themeList],
  );

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
    needUpdatePlayerInfo,
    finalCalculateScore,
    useItems,
    disableGame,
    setAutoPairsItemEffect,
  } = useGameStore();

  // 使用 useSharedValue 定義動畫數值
  const scoreAnimatedValue = useSharedValue(0);
  const remainedTimeAnimatedValue = useSharedValue(timeLeft);
  const timerRotationValue = useSharedValue<number>(0);

  if (!levelInfo) return null;

  const usedAddTime = useMemo(
    () => useItems.find(item => item.type === ItemType.AddTime),
    [useItems],
  );
  const usedViewFirst = useMemo(
    () => useItems.find(item => item.type === ItemType.ViewFirst),
    [useItems],
  );
  const usedAutoPairs = useMemo(
    () => useItems.find(item => item.type === ItemType.AutoPairs),
    [useItems],
  );

  useEffect(() => {
    if (combo > maxCombo) {
      setMaxCombo(combo);
    }
  }, [combo]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayedScore(Math.floor(scoreAnimatedValue.value));
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
    if (isCompleteGame) return;
    if (usedAddTime || usedViewFirst || usedAutoPairs) {
      setTimeout(() => {
        setUseItemsModal(true);
      }, 100);
    }
    generateCards(levelInfo);
  }, [useItems, levelInfo]);

  // 驅動動畫，將數值從 0 變到 score
  useEffect(() => {
    scoreAnimatedValue.value = withTiming(score, { duration: 500 }, () => {
      if (needUpdatePlayerInfo) {
        // 更新成績
        runOnJS(updateLevel)(levelInfo.id, stars);

        let coins = 0;
        if (stars === 1) {
          coins = levelInfo.star1Coins;
        } else if (stars === 2) {
          coins = levelInfo.star2Coins;
        } else {
          coins = levelInfo.star3Coins;
        }

        // 寫入手機
        runOnJS(passGame)({
          themeType: Number(theme),
          levelInfo,
          maxCombo,
          score,
          lastLevelId: levels.length,
          stars,
          coins,
          currentPassLevelCount,
          currentAllStars: stars + currentAllStars,
        });
      }
    });
  }, [score, stars, needUpdatePlayerInfo]);

  // 遊戲過關
  useEffect(() => {
    if (isCompleteGame) {
      // 更新玩家統計資料
      remainedTimeAnimatedValue.value = timeLeft;
      stopTimer();

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
      timerRotationValue.value = withSequence(
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
    transform: [{ rotateZ: `${timerRotationValue.value}deg` }],
  }));

  const startTimer = () => {
    if (isRunning) return;
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  const handleFlip = (card: Card) => {
    if (showUseItemsModal) return;
    startTimer();
    onFlip(card.id);
    checkIsMatch(card);
    // 翻牌加一
    addFlipCount();
  };

  return (
    <>
      <UseItemsModal
        usedAddTime={!!usedAddTime}
        usedViewFirst={!!usedViewFirst}
        usedAutoPairs={!!usedAutoPairs}
        show={showUseItemsModal}
        onClose={() => {
          setUseItemsModal(false);
          if (usedAddTime) {
            setTimeLeft(state => state + usedAddTime.value);
          }
          if (usedViewFirst) {
            setItemViewFirst(true);
          }
          if (usedAutoPairs) {
            setAutoPairsItemEffect(usedAutoPairs.value);
          }
        }}
      />
      <GameOverModal
        show={showGameOverModal}
        onRouteChange={() => {
          setShowGameOverModal(false);
          replace(`/levels/${theme}`);
        }}
      />
      <GamePassModal
        isLastLevel={levels.length === levelInfo.id}
        show={showGamePassModal}
        onRouteChange={() => {
          setShowPauseGameModal(false);
          replace(`/levels/${theme}`);
        }}
      />
      <PauseGameModal
        show={showPauseGameModal}
        onResume={() => {
          // 遊戲開始後才要繼續倒數
          if (levelInfo.timer !== timeLeft) {
            startTimer();
          }
          setShowPauseGameModal(false);
        }}
        onRouteChange={() => {
          setShowPauseGameModal(false);
          setTimeout(() => {
            replace(`/levels/${theme}`);
          }, 300);
        }}
      />
      <MainContainer
        title={`Level ${levelInfo.id}`}
        leftChildren={
          <BounceAnimation
            onPress={() => {
              if (isCompleteGame) return;
              stopTimer();
              setShowPauseGameModal(true);
            }}
          >
            <Image
              source={require('@/assets/images/icons/pause.png')}
              style={{ width: 40, height: 40 }}
            />
          </BounceAnimation>
        }
      >
        <Animated.View
          entering={FadeIn.delay(300)}
          exiting={FadeOut.duration(100)}
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
                text={displayedScore}
                className="text-2xl text-[#D14343]"
                fontWeight="bold"
              />
            </View>
            <View className="flex-row items-center">
              <Animated.View style={animatedStyle}>
                <Image
                  source={require('@/assets/images/icons/timer-outline.png')}
                  style={{ width: 28, height: 28 }}
                />
              </Animated.View>
              <View
                className="items-end"
                style={{ width: timeLeft >= 100 ? 55 : 40 }}
              >
                <CoolText
                  text={timeLeft}
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
            style={{ marginBottom: 6 }}
          >
            {cards.map(card => (
              <View
                className="aspect-square"
                style={{
                  width: ColumnWidth[String(levelInfo.columns)] as any,
                  marginBottom: ColumnMarginBottom[levelInfo.columns],
                }}
                key={card.id}
              >
                <FlipCard
                  onFlip={handleFlip}
                  card={card}
                  type={levelInfo.type}
                  theme={levelInfo.theme}
                  columns={levelInfo.columns}
                  updateCard={updateCard}
                  disabled={isCompleteGame || disableGame}
                  itemViewFirst={itemViewFirst}
                  itemViewFirstValue={usedViewFirst?.value}
                  itemAutoPairs={!!usedAutoPairs}
                />
              </View>
            ))}
          </View>
        </Animated.View>
        <View className="flex-row items-center justify-between">
          <Animated.View entering={FadeIn.delay(300)}>
            <CoolText
              text={`提示：${gameMatchCount[levelInfo.matchCount]}`}
              style={{ fontSize: 20, color: '#834B4B' }}
              fontWeight="bold"
            />
          </Animated.View>
          {/* combo */}
          {combo > 0 && (
            <View className="items-center">
              <Animated.Text
                entering={BounceIn.duration(500)}
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  fontFamily: 'GenSenRounded2TWB',
                  color: '#D14343',
                }}
              >
                {combo} Combo
              </Animated.Text>
            </View>
          )}
        </View>
      </MainContainer>
    </>
  );
};

export default PlayingScreen;
