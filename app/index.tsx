import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';

import CoolButton from '@/components/CoolButton';

import { router } from 'expo-router';

export default function HomeScreen() {
  return (
    <>
      <Image
        source={require('@/assets/images/logo.webp')}
        style={{ width: 250, height: 100 }}
        resizeMode="contain"
        className="-mt-32 mb-16 border"
      />
      <View className="gap-6 border">
        <CoolButton
          text="顏色關卡"
          onClick={() => router.push('/colors')}
          icon="color-palette"
        />
        <CoolButton
          text="中文關卡"
          onClick={() => {}}
          icon="extension-puzzle"
        />
      </View>
    </>
  );
}
