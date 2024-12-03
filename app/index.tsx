import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { FadeIn, ZoomIn } from 'react-native-reanimated';

import BounceAnimation from '@/components/BounceAnimation';
import CoolText from '@/components/CoolText';
import AchievementModal from '@/components/modals/AchievementModal';
import GameRulesModal from '@/components/modals/GameRulesModal';
import InfoModal from '@/components/modals/InfoModal';
import LeaderboardModal from '@/components/modals/LeaderboardModal';
import SettingsModal from '@/components/modals/SettingsModal';
import ShopModal from '@/components/modals/ShopModal';
import WelcomeModal from '@/components/modals/WelcomeModal';
import useLevelStore, { itemsPerPage } from '@/stores/LevelStore';
import usePlayerStore from '@/stores/PlayerStore';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Image } from 'expo-image';
import { router } from 'expo-router';

export default function HomeScreen() {
  const { coins, name } = usePlayerStore();
  const { setDefaultCurrentPage } = useLevelStore();

  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [showShopModal, setShowShopModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showGameRulesModal, setShowGameRulesModal] = useState(false);
  const [showAchievementModal, setShowAchievementModal] = useState(false);
  const [showLeaderboardModal, setShowLeaderboardModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);

  // useEffect(() => {
  //   if (currentLevelId) {
  //     const page = Math.ceil(currentLevelId / itemsPerPage);
  //     setDefaultCurrentPage(page);
  //   }
  // }, [currentLevelId]);

  useEffect(() => {
    if (!name) {
      setShowWelcomeModal(true);
    }
  }, [name]);

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
      <LeaderboardModal
        show={showLeaderboardModal}
        onClose={() => setShowLeaderboardModal(false)}
      />
      <WelcomeModal
        show={showWelcomeModal}
        onClose={() => setShowWelcomeModal(false)}
      />
      <InfoModal show={showInfoModal} onClose={() => setShowInfoModal(false)} />
      <Animated.View className="items-center" entering={FadeIn.delay(300)}>
        <View
          className="flex-row items-start justify-between"
          style={{ width: '80%', position: 'fixed', top: -60 }}
        >
          <View className="flex-row">
            <Image
              source={require('@/assets/images/icons/coin-2.png')}
              style={{ width: 30, height: 30, marginRight: 8 }}
            />
            <CoolText
              text={coins}
              className="text-3xl text-[#834B4B]"
              fontWeight="medium"
            />
          </View>
          <BounceAnimation
            onPress={() => {
              setShowInfoModal(true);
            }}
          >
            <Image
              source={require('@/assets/images/icons/info-circle.png')}
              style={{ width: 32, height: 32 }}
            />
          </BounceAnimation>
        </View>
        <Image
          source={require('@/assets/images/logo.png')}
          style={{ width: 280, height: 70, marginBottom: 160 }}
          contentFit="contain"
        />
        <Animated.View
          entering={ZoomIn.delay(200)}
          style={{ marginBottom: 120 }}
        >
          <BounceAnimation
            scaleValue={0.9}
            onPress={() => {
              router.push('/themes');
            }}
            className="h-[120px] w-[120px] items-center justify-center rounded-full bg-[#E3803E]"
          >
            <Image
              source={require('@/assets/images/icons/play.png')}
              style={{
                width: 90,
                height: 90,
                marginLeft: 15,
              }}
            />
          </BounceAnimation>
        </Animated.View>
        <Animated.View
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
        </Animated.View>
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
