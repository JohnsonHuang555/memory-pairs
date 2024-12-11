import { useEffect } from 'react';
import { ImageBackground, View } from 'react-native';
import 'react-native-reanimated';
import Toast from 'react-native-toast-message';

import '../global.css';

import { useAssets } from 'expo-asset';
import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [assets] = useAssets([
    require('@/assets/images/background.png'),
    require('@/assets/images/questions/grass/grass-1.png'),
    require('@/assets/images/questions/grass/grass-2.png'),
    require('@/assets/images/questions/grass/grass-3.png'),
    require('@/assets/images/questions/grass/grass-4.png'),
    require('@/assets/images/questions/grass/grass-5.png'),
    require('@/assets/images/questions/grass/grass-6.png'),
    require('@/assets/images/questions/grass/grass-7.png'),
    require('@/assets/images/questions/grass/grass-8.png'),
    require('@/assets/images/questions/grass/grass-9.png'),
    require('@/assets/images/questions/grass/grass-10.png'),
    require('@/assets/images/questions/grass/grass-11.png'),
    require('@/assets/images/questions/grass/grass-12.png'),
    require('@/assets/images/questions/grass/grass-13.png'),
    require('@/assets/images/questions/grass/grass-14.png'),
    require('@/assets/images/questions/grass/grass-15.png'),
    require('@/assets/images/questions/grass/grass-16.png'),
    require('@/assets/images/questions/grass/grass-17.png'),
    require('@/assets/images/questions/grass/grass-18.png'),
    require('@/assets/images/questions/grass/grass-19.png'),
  ]);

  const [loaded] = useFonts({
    GenSenRounded2TWB: require('../assets/fonts/GenSenRounded2TW-B.otf'), // 粗體
    GenSenRounded2TWEL: require('../assets/fonts/GenSenRounded2TW-EL.otf'), // 很細
    GenSenRounded2TWH: require('../assets/fonts/GenSenRounded2TW-H.otf'), // 很粗
    GenSenRounded2TWL: require('../assets/fonts/GenSenRounded2TW-L.otf'), // light
    GenSenRounded2TWM: require('../assets/fonts/GenSenRounded2TW-M.otf'), // medium
    GenSenRounded2TWR: require('../assets/fonts/GenSenRounded2TW-R.otf'), // regular
  });

  useEffect(() => {
    if (loaded && assets) {
      SplashScreen.hideAsync();
    }
  }, [loaded, assets]);

  if (!loaded || !assets) {
    return null;
  }

  return (
    <>
      <View style={{ backgroundColor: '#fff', flex: 1 }}>
        <ImageBackground
          source={require('@/assets/images/background.png')}
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
      <Toast />
    </>
  );
}
