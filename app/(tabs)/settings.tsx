import { useCallback, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';

import CoolSwitch from '@/components/CoolSwitch';
import CoolText from '@/components/CoolText';
import MainContainer from '@/components/MainContainer';
import usePlayerStore from '@/stores/PlayerStore';

import { Image } from 'expo-image';
import { useFocusEffect } from 'expo-router';

const SettingsScreen = () => {
  const { isMusicOn, isSoundOn, setIsMusicOn, setIsSoundOn } = usePlayerStore();
  const [isLoading, setLoading] = useState(false);
  const isMusicOnValue = useSharedValue(isMusicOn);
  const isSoundOnValue = useSharedValue(isSoundOn);

  useFocusEffect(
    useCallback(() => {
      setTimeout(() => {
        setLoading(false);
      }, 300);
      // Return a cleanup function if necessary
      return () => {
        setLoading(true);
      };
    }, []),
  );

  const handleMusicPress = () => {
    isMusicOnValue.value = !isMusicOnValue.value;
    setIsMusicOn();
  };

  const handleSoundPress = () => {
    isSoundOnValue.value = !isSoundOnValue.value;
    setIsSoundOn();
  };

  return (
    <MainContainer title="設定" showLeftIcon showQuestionIcon>
      {!isLoading ? (
        <View>
          <CoolText
            text="基本"
            fontWeight="medium"
            style={{ fontSize: 20, color: '#834B4B', marginBottom: 6 }}
          />
          <View
            className="mb-4 flex-row justify-between"
            style={{ marginVertical: 10, width: '100%' }}
          >
            <View className="flex-row items-center">
              <Image
                source={require('@/assets/images/icons/music.png')}
                style={{ width: 30, height: 30 }}
              />
              <CoolText
                text="音樂"
                className="ml-2 text-[#834B4B]"
                style={styles.title}
              />
            </View>
            <CoolSwitch
              value={isMusicOnValue}
              onPress={handleMusicPress}
              style={{ width: 80 }}
            />
          </View>
          <View className="flex-row justify-between" style={{ width: '100%' }}>
            <View className="flex-row items-center">
              <Image
                source={require('@/assets/images/icons/sound.png')}
                style={{ width: 30, height: 30 }}
              />
              <CoolText
                text="音效"
                className="ml-2 text-[#834B4B]"
                style={styles.title}
              />
            </View>
            <CoolSwitch
              value={isSoundOnValue}
              onPress={handleSoundPress}
              style={{ width: 80 }}
            />
          </View>
        </View>
      ) : (
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <ActivityIndicator size="large" />
        </View>
      )}
    </MainContainer>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
  },
});
