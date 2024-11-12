import { useState } from 'react';
import { View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

import BounceAnimation from '@/components/BounceAnimation';
import CoolText from '@/components/CoolText';
import SettingsModal from '@/components/modals/SettingsModal';
import ShopModal from '@/components/modals/ShopModal';
import usePlayerStore from '@/stores/PlayerStore';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Image } from 'expo-image';
import { router, useRouter } from 'expo-router';

export default function HomeScreen() {
  const { coins, currentLevelId } = usePlayerStore();
  const [showShopModal, setShowShopModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const { push } = useRouter();

  return (
    <Animated.View className="items-center" entering={FadeIn.delay(300)}>
      <ShopModal show={showShopModal} onClose={() => setShowShopModal(false)} />
      <SettingsModal
        show={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
      />
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
        style={{ width: 260, height: 100, marginBottom: 80 }}
        contentFit="contain"
      />
      <View className="items-center">
        <CoolText
          text={currentLevelId}
          className="mb-4 text-[65px] shadow-sm"
          fontWeight="regular"
        />
        <CoolText text="Now Level" className="mb-20 text-2xl" />
        <BounceAnimation
          scaleValue={0.9}
          onPress={() => router.push('/levels')}
          className="h-[110px] w-[110px] items-center justify-center rounded-full bg-[#E3803E]"
        >
          <Image
            source={require('@/assets/images/icons/play.png')}
            style={{ width: 80, height: 80, marginLeft: 12 }}
            className="shadow shadow-white"
          />
        </BounceAnimation>
        <View className="mt-20 flex-row items-center gap-16">
          <BounceAnimation onPress={() => setShowShopModal(true)}>
            <Image
              source={require('@/assets/images/icons/shop.png')}
              style={{ width: 40, height: 40 }}
            />
          </BounceAnimation>
          <BounceAnimation onPress={() => push('/achievement')}>
            <Image
              source={require('@/assets/images/icons/trophy.png')}
              style={{ width: 36, height: 36 }}
            />
          </BounceAnimation>
          <BounceAnimation
            onPress={() => {
              AsyncStorage.clear();
              setShowSettingsModal(true);
            }}
          >
            <Image
              source={require('@/assets/images/icons/settings.png')}
              style={{ width: 42, height: 42 }}
            />
          </BounceAnimation>
        </View>
      </View>
    </Animated.View>
  );
}
