import { useEffect, useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { FadeIn, ZoomIn } from 'react-native-reanimated';

import BounceAnimation from '@/components/BounceAnimation';
import CoolText from '@/components/CoolText';
import InfoModal from '@/components/modals/InfoModal';
import WelcomeModal from '@/components/modals/WelcomeModal';
import usePlayerStore from '@/stores/PlayerStore';
import { getOrdinalSuffix } from '@/utils';
import { fetchRankByScore } from '@/utils/firebase/leaderboard';
import { Octicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Image } from 'expo-image';
import { router } from 'expo-router';

export default function HomeScreen() {
  const { coins, name, themeList } = usePlayerStore();
  const [myRank, setMyRank] = useState<number>();

  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);

  const totalScore = useMemo(
    () =>
      themeList
        .map(t => t.starsOfLevel)
        .reduce((acc, current) => {
          acc += current.reduce((a, c) => {
            a += c.score;
            return a;
          }, 0);
          return acc;
        }, 0),
    [],
  );

  useEffect(() => {
    if (!name) {
      setShowWelcomeModal(true);
    }
  }, [name]);

  useEffect(() => {
    const getMyRank = async () => {
      // 取得當前排名
      const myRank = await fetchRankByScore(totalScore);
      setMyRank(myRank);
    };
    if (totalScore > 0) {
      getMyRank();
    }
  }, [totalScore]);

  return (
    <>
      <WelcomeModal
        show={showWelcomeModal}
        onClose={() => setShowWelcomeModal(false)}
      />
      <InfoModal show={showInfoModal} onClose={() => setShowInfoModal(false)} />
      <Animated.View className="items-center" entering={FadeIn.delay(300)}>
        <View
          className="flex-row items-start justify-between"
          style={{ width: '80%', position: 'fixed', top: -50 }}
        >
          <BounceAnimation
            onPress={() => {
              AsyncStorage.clear();
              setShowInfoModal(true);
            }}
          >
            <Octicons name="question" size={30} color="#834B4B" />
          </BounceAnimation>
          <View className="flex-row items-center">
            <Image
              source={require('@/assets/images/icons/coin-2.png')}
              style={{ width: 28, height: 28, marginRight: 8 }}
            />
            <CoolText
              text={coins}
              className="text-3xl text-[#834B4B]"
              fontWeight="medium"
            />
          </View>
        </View>
        <Image
          source={require('@/assets/images/logo.png')}
          style={{
            width: 280,
            height: 70,
            marginBottom: 90,
          }}
          contentFit="contain"
        />
        <View style={{ marginBottom: 80 }} className="items-center">
          <CoolText text="排名" style={{ marginBottom: 16, fontSize: 20 }} />
          <View className="mb-4 flex-row items-end">
            <CoolText
              text={myRank || '---'}
              className="shadow-sm"
              fontWeight="regular"
              style={{ fontSize: 65 }}
            />
            <CoolText
              text={getOrdinalSuffix(myRank || 0)}
              className="shadow-sm"
              fontWeight="regular"
              style={{ fontSize: 24, marginBottom: 5 }}
            />
          </View>
        </View>
        <Animated.View
          entering={ZoomIn.delay(200)}
          style={{ marginBottom: 20 }}
        >
          <BounceAnimation
            scaleValue={0.9}
            onPress={() => {
              router.push('/themes');
            }}
            className="h-[130px] w-[130px] items-center justify-center rounded-full bg-[#E3803E]"
          >
            <Image
              source={require('@/assets/images/icons/play.png')}
              style={{
                width: 100,
                height: 100,
                marginLeft: 15,
                shadowOffset: { height: 4, width: 0 },
                shadowOpacity: 0.5,
                shadowColor: '#FFF',
              }}
            />
          </BounceAnimation>
        </Animated.View>
        {/* <Animated.View
          entering={FadeIn.delay(500)}
          className="flex-row items-center"
          style={{ gap: 16 }}
        >
          <BounceAnimation onPress={() => setShowShopModal(true)}>
            <View style={styles.actions}>
              <Image
                source={require('@/assets/images/icons/shop.png')}
                style={{ width: 40, height: 40 }}
              />
            </View>
          </BounceAnimation>
          <BounceAnimation onPress={() => setShowAchievementModal(true)}>
            <View style={styles.actions}>
              <Image
                source={require('@/assets/images/icons/trophy.png')}
                style={{ width: 34, height: 34 }}
              />
            </View>
          </BounceAnimation>
          <BounceAnimation
            onPress={() => {
              setShowLeaderboardModal(true);
            }}
          >
            <View style={styles.actions}>
              <Image
                source={require('@/assets/images/icons/leaderboard.png')}
                style={{ width: 46, height: 46 }}
              />
            </View>
          </BounceAnimation>
          <BounceAnimation
            onPress={() => {
              // AsyncStorage.clear();
              setShowSettingsModal(true);
            }}
          >
            <View style={styles.actions}>
              <Image
                source={require('@/assets/images/icons/settings.png')}
                style={{ width: 38, height: 38 }}
              />
            </View>
          </BounceAnimation>
        </Animated.View> */}
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  actions: {
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
