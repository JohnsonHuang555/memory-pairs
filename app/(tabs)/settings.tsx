import { useCallback, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';

import CoolSwitch from '@/components/CoolSwitch';
import CoolText from '@/components/CoolText';
import MainContainer from '@/components/MainContainer';
import { allPlayerBehavior } from '@/constants/AllPlayerBehavior';
import usePlayerStore from '@/stores/PlayerStore';

import { Image } from 'expo-image';
import { useFocusEffect } from 'expo-router';

const SettingsScreen = () => {
  const {
    isMusicOn,
    isSoundOn,
    setIsMusicOn,
    setIsSoundOn,
    playerBehaviorStatistics,
  } = usePlayerStore();
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
    <MainContainer title="設定" showLeftIcon showRuleIcon>
      {!isLoading ? (
        <>
          <View>
            {/* <CoolText
              text="設定"
              fontWeight="medium"
              style={{ fontSize: 20, color: '#834B4B', marginBottom: 6 }}
            /> */}
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
            <View
              className="flex-row justify-between"
              style={{ width: '100%' }}
            >
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
          <View
            style={{
              borderWidth: 1,
              marginVertical: 30,
              borderColor: '#D6D1D1',
            }}
          />
          <View>
            <CoolText
              text="統計"
              fontWeight="medium"
              style={{ fontSize: 20, color: '#834B4B', marginBottom: 12 }}
            />
            <View className="mb-4 flex-row flex-wrap justify-between">
              {allPlayerBehavior.map((item, index) => {
                console.log(playerBehaviorStatistics)
                let val = 0;
                // 依照 behavior 順序顯示次數 順邊變動會有資料錯誤風險
                switch (index) {
                  case 0:
                    val = playerBehaviorStatistics.flipCount;
                    break;
                  case 1:
                    val = playerBehaviorStatistics.matchCount;
                    break;
                  case 2:
                    val = playerBehaviorStatistics.gamePassCount;
                    break;
                  case 3:
                    val = playerBehaviorStatistics.maxCombo;
                    break;
                }
                return (
                  <View
                    key={item.id}
                    className="mb-5 w-[30%] rounded-xl"
                    style={[
                      { backgroundColor: '#FFF', height: 130 },
                      {
                        shadowOffset: {
                          width: 0,
                          height: 4,
                        },
                        shadowOpacity: 0.2,
                      },
                    ]}
                  >
                    <View
                      className="items-center justify-center p-2"
                      style={{ width: '100%', height: '100%' }}
                    >
                      <Image
                        source={item.image}
                        style={{
                          width: 60,
                          height: 60,
                          marginTop: 8,
                          marginBottom: 8,
                          borderRadius: 10,
                        }}
                      />
                      <CoolText
                        text={item.title}
                        fontWeight="medium"
                        style={{
                          color: '#834B4B',
                          marginBottom: 8,
                          fontSize: 16,
                        }}
                      />
                      <CoolText
                        text={val}
                        fontWeight="medium"
                        style={{
                          color: '#D14343',
                          marginBottom: 6,
                          fontSize: val >= 10000000 ? 15 : 17,
                        }}
                      />
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        </>
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
