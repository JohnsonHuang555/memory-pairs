import { useState } from 'react';
import { Image, View } from 'react-native';

import BounceAnimation from '@/components/BounceAnimation';
import CoolText from '@/components/CoolText';
import SettingsModal from '@/components/modals/SettingsModal';
import ShopModal from '@/components/modals/ShopModal';
import usePlayerStore from '@/stores/PlayerStore';

import { router, useRouter } from 'expo-router';

export default function HomeScreen() {
  const { coins } = usePlayerStore();
  const [showShopModal, setShowShopModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const { push } = useRouter();

  return (
    <>
      <ShopModal show={showShopModal} onClose={() => setShowShopModal(false)} />
      <SettingsModal
        show={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
      />
      <View className="items-end" style={{ width: '80%', marginBottom: 30 }}>
        <View className="flex-row items-center">
          <Image
            source={require('@/assets/images/coin.png')}
            style={{ width: 32, height: 32, marginRight: 8 }}
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
        style={{ width: 260, height: 100, marginBottom: 80 }}
        resizeMode="contain"
      />
      <View className="items-center">
        <CoolText
          text="1"
          className="mb-4 text-[65px] shadow-sm"
          fontWeight="regular"
        />
        <CoolText text="Now Level" className="mb-20 text-2xl" />
        <BounceAnimation
          onPress={() => router.push('/levels')}
          className="h-[110px] w-[110px] items-center justify-center rounded-full bg-[#E3803E]"
        >
          <Image
            source={require('@/assets/images/play.png')}
            style={{ width: 80, height: 80 }}
            className="ml-4 shadow shadow-white"
          />
        </BounceAnimation>
        <View className="mt-20 flex-row items-center gap-16">
          <BounceAnimation onPress={() => setShowShopModal(true)}>
            <Image
              source={require('@/assets/images/shop.png')}
              style={{ width: 40, height: 40 }}
            />
          </BounceAnimation>
          <BounceAnimation onPress={() => push('/achievement')}>
            <Image
              source={require('@/assets/images/trophy.png')}
              style={{ width: 36, height: 36 }}
            />
          </BounceAnimation>
          <BounceAnimation onPress={() => setShowSettingsModal(true)}>
            <Image
              source={require('@/assets/images/settings.png')}
              style={{ width: 42, height: 42 }}
            />
          </BounceAnimation>
        </View>
      </View>
    </>
  );
}
