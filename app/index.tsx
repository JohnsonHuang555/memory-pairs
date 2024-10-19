import { Image, TouchableOpacity, View } from 'react-native';
import CoolText from '@/components/CoolText';

import { router } from 'expo-router';

export default function HomeScreen() {
  return (
    <>
      <Image
        source={require('@/assets/images/logo.png')}
        style={{ width: 250, height: 100 }}
        resizeMode="contain"
        className="-mt-4 mb-16"
      />
      <View className="items-center">
        <CoolText
          text="24"
          className="mb-4 text-[60px] shadow-sm"
          fontFamily="regular"
        />
        <CoolText text="Now Level" className="mb-24 text-2xl" />
        <TouchableOpacity activeOpacity={0.7}>
          <View className="h-[110px] w-[110px] items-center justify-center rounded-full bg-[#E3803E]">
            <Image
              source={require('@/assets/images/play.png')}
              style={{ width: 80, height: 80 }}
              className="ml-4 shadow shadow-white"
            />
          </View>
        </TouchableOpacity>
        <View className="mt-28 flex-row gap-16">
          <TouchableOpacity activeOpacity={0.7}>
            <Image
              source={require('@/assets/images/shop.png')}
              style={{ width: 40, height: 40 }}
            />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7}>
            <Image
              source={require('@/assets/images/trophy.png')}
              style={{ width: 40, height: 40 }}
            />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7}>
            <Image
              source={require('@/assets/images/settings.png')}
              style={{ width: 40, height: 40 }}
            />
          </TouchableOpacity>
        </View>
        {/* <CoolButton
          text="顏色關卡"
          onClick={() => router.push('/colors')}
          icon="color-palette"
        />
        <CoolButton
          text="中文關卡"
          onClick={() => {}}
          icon="extension-puzzle"
        /> */}
      </View>
    </>
  );
}
