import { Image, View } from 'react-native';

import BounceAnimation from '@/components/BounceAnimation';
import CoolText from '@/components/CoolText';

import { router } from 'expo-router';

export default function HomeScreen() {
  return (
    <>
      <Image
        source={require('@/assets/images/logo.png')}
        style={{ width: 260, height: 100 }}
        resizeMode="contain"
        className="-mt-4 mb-16"
      />
      <View className="items-center">
        <CoolText
          text="1"
          className="mb-4 text-[60px] shadow-sm"
          fontWeight="regular"
        />
        <CoolText text="Now Level" className="mb-24 text-2xl" />
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
        <View className="mt-28 flex-row items-center gap-16">
          <BounceAnimation>
            <Image
              source={require('@/assets/images/shop.png')}
              style={{ width: 40, height: 40 }}
            />
          </BounceAnimation>
          <BounceAnimation>
            <Image
              source={require('@/assets/images/trophy.png')}
              style={{ width: 36, height: 36 }}
            />
          </BounceAnimation>
          <BounceAnimation>
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
