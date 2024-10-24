import { useEffect, useState } from 'react';
import { ImageBackground, View } from 'react-native';
import 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import '../global.css';

import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    GenSenRounded2TWB: require('../assets/fonts/GenSenRounded2TW-B.otf'), // 粗體
    GenSenRounded2TWEL: require('../assets/fonts/GenSenRounded2TW-EL.otf'), // 很細
    GenSenRounded2TWH: require('../assets/fonts/GenSenRounded2TW-H.otf'), // 很粗
    GenSenRounded2TWL: require('../assets/fonts/GenSenRounded2TW-L.otf'), // light
    GenSenRounded2TWM: require('../assets/fonts/GenSenRounded2TW-M.otf'), // medium
    GenSenRounded2TWR: require('../assets/fonts/GenSenRounded2TW-R.otf'), // regular
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <View className="flex-1">
      <ImageBackground
        source={require('@/assets/images/background.webp')}
        resizeMode="cover"
        imageStyle={{ opacity: 0.5 }}
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Slot />
      </ImageBackground>
    </View>
  );
}
