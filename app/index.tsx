import { useEffect, useState } from 'react';
import { View } from 'react-native';
import Animated, { FadeIn, ZoomIn } from 'react-native-reanimated';

import BounceAnimation from '@/components/BounceAnimation';
import CoolText from '@/components/CoolText';
import AchievementModal from '@/components/modals/AchievementModal';
import GameRulesModal from '@/components/modals/GameRulesModal';
import SettingsModal from '@/components/modals/SettingsModal';
import ShopModal from '@/components/modals/ShopModal';
import useLevelStore, { itemsPerPage } from '@/stores/LevelStore';
import usePlayerStore from '@/stores/PlayerStore';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Image } from 'expo-image';
import { router, useRouter } from 'expo-router';

export default function HomeScreen() {
  const { coins, currentLevelId } = usePlayerStore();
  const { setDefaultCurrentPage } = useLevelStore();
  const [showShopModal, setShowShopModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showGameRulesModal, setShowGameRulesModal] = useState(false);
  const [showAchievementModal, setShowAchievementModal] = useState(false);
  const { push } = useRouter();

  useEffect(() => {
    if (currentLevelId) {
      const page = Math.ceil(currentLevelId / itemsPerPage);
      setDefaultCurrentPage(page);
    }
  }, [currentLevelId]);

  return (
    <>
      <ShopModal show={showShopModal} onClose={() => setShowShopModal(false)} />
      <SettingsModal
        show={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
      />
      <GameRulesModal
        show={showGameRulesModal}
        onClose={() => setShowGameRulesModal(false)}
      />
      <AchievementModal
        show={showAchievementModal}
        onClose={() => setShowAchievementModal(false)}
      />
      <Animated.View className="items-center" entering={FadeIn.delay(300)}>
        <View
          className="flex-row justify-end"
          style={{ width: '80%', marginBottom: 30 }}
        >
          <Image
            source={require('@/assets/images/icons/coin.png')}
            style={{ width: 32, height: 32, marginRight: 4 }}
          />
          <CoolText
            text={coins}
            className="text-3xl text-[#834B4B]"
            fontWeight="medium"
          />
        </View>
        <Image
          source={require('@/assets/images/logo.png')}
          style={{ width: 260, height: 100, marginBottom: 60 }}
          contentFit="contain"
        />
        <View className="items-center">
          <CoolText
            text={currentLevelId}
            className="mb-4 text-[65px] shadow-sm"
            fontWeight="regular"
          />
          <CoolText
            text="Now Level"
            className="text-2xl"
            style={{ marginBottom: 60 }}
          />
          <Animated.View
            entering={ZoomIn.delay(200)}
            style={{ marginBottom: 60 }}
          >
            <BounceAnimation
              scaleValue={0.9}
              onPress={() => router.push('/levels')}
              className="h-[110px] w-[110px] items-center justify-center rounded-full bg-[#E3803E]"
            >
              <Image
                source={require('@/assets/images/icons/play.png')}
                style={{
                  width: 80,
                  height: 80,
                  marginLeft: 12,
                }}
              />
            </BounceAnimation>
          </Animated.View>
          <View
            className="flex-row items-center"
            style={{ marginBottom: 30, gap: 46 }}
          >
            <Animated.View entering={FadeIn.delay(500)}>
              <BounceAnimation onPress={() => setShowShopModal(true)}>
                <Image
                  source={require('@/assets/images/icons/shop.png')}
                  style={{ width: 44, height: 44 }}
                />
              </BounceAnimation>
            </Animated.View>
            <Animated.View entering={FadeIn.delay(500)}>
              <BounceAnimation onPress={() => setShowAchievementModal(true)}>
                <Image
                  source={require('@/assets/images/icons/trophy.png')}
                  style={{ width: 38, height: 38 }}
                />
              </BounceAnimation>
            </Animated.View>
            <Animated.View entering={FadeIn.delay(500)}>
              <BounceAnimation
                onPress={() => {
                  setShowAchievementModal(true);
                }}
              >
                <Image
                  source={require('@/assets/images/icons/leaderboard.png')}
                  style={{ width: 44, height: 44 }}
                />
              </BounceAnimation>
            </Animated.View>
          </View>
          <View className="flex-row items-center" style={{ gap: 46 }}>
            <Animated.View entering={FadeIn.delay(500)}>
              <BounceAnimation onPress={() => {}}>
                <Image
                  source={require('@/assets/images/icons/info-circle.png')}
                  style={{ width: 44, height: 44 }}
                />
              </BounceAnimation>
            </Animated.View>
            <Animated.View entering={FadeIn.delay(500)}>
              <BounceAnimation
                onPress={() => {
                  setShowGameRulesModal(true);
                }}
              >
                <Image
                  source={require('@/assets/images/icons/question-circle.png')}
                  style={{ width: 44, height: 44 }}
                />
              </BounceAnimation>
            </Animated.View>
            <Animated.View entering={FadeIn.delay(500)}>
              <BounceAnimation
                onPress={() => {
                  // AsyncStorage.clear();
                  setShowSettingsModal(true);
                }}
              >
                <Image
                  source={require('@/assets/images/icons/settings.png')}
                  style={{ width: 44, height: 44 }}
                />
              </BounceAnimation>
            </Animated.View>
          </View>
        </View>
      </Animated.View>
    </>
  );
}
