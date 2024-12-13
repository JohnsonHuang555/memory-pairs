import { useCallback, useState } from 'react';
import { ActivityIndicator, StyleSheet, Switch, View } from 'react-native';

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
    setIsMusicOn();
  };

  const handleSoundPress = () => {
    setIsSoundOn();
  };

  return (
    <MainContainer title="設定" showLeftIcon showRuleIcon>
      {!isLoading ? (
        <>
          <View>
            <View
              className="mb-4 flex-row justify-between"
              style={{ marginVertical: 10, width: '100%' }}
            >
              <View className="flex-row items-center">
                <Image
                  source={require('@/assets/images/icons/music.png')}
                  style={{ width: 30, height: 30 }}
                />
                <CoolText text="音樂" style={styles.title} />
              </View>
              <Switch
                trackColor={{ false: '#C7C1BC', true: '#e3ccc3' }}
                thumbColor={isMusicOn ? '#834B4B' : '#f4f3f4'}
                onValueChange={handleMusicPress}
                value={isMusicOn}
                style={{ transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }] }}
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
                <CoolText text="音效" style={styles.title} />
              </View>
              <Switch
                trackColor={{ false: '#C7C1BC', true: '#e3ccc3' }}
                thumbColor={isSoundOn ? '#834B4B' : '#f4f3f4'}
                onValueChange={handleSoundPress}
                value={isSoundOn}
                style={{ transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }] }}
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
            <View className="mb-4 flex-row flex-wrap justify-between">
              {allPlayerBehavior.map((item, index) => {
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
                  case 4:
                    val = playerBehaviorStatistics.maxRank;
                    break;
                  case 5:
                    val = playerBehaviorStatistics.maxScore;
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
                          marginBottom: 4,
                          borderRadius: 10,
                        }}
                      />
                      <CoolText
                        text={item.title}
                        fontWeight="medium"
                        style={{
                          color: '#834B4B',
                          marginBottom: 10,
                          fontSize: 16,
                        }}
                      />
                      <CoolText
                        text={val || '---'}
                        fontWeight="medium"
                        style={{
                          color: '#D14343',
                          marginBottom: 6,
                          fontSize: val >= 10000000 ? 14 : 16,
                        }}
                      />
                    </View>
                  </View>
                );
              })}
              <View>
                <View
                  className="flex-row items-center"
                  style={{ marginTop: 12, marginBottom: 10 }}
                >
                  <CoolText
                    text="配對成功率:"
                    fontWeight="medium"
                    style={{ fontSize: 20, color: '#834B4B', marginRight: 8 }}
                  />
                  <CoolText
                    text={
                      playerBehaviorStatistics.matchCount > 0 &&
                      playerBehaviorStatistics.flipCount > 0
                        ? (
                            (playerBehaviorStatistics.matchCount /
                              playerBehaviorStatistics.flipCount) *
                            100
                          ).toFixed(2)
                        : 0
                    }
                    fontWeight="bold"
                    style={{ fontSize: 20, color: '#D14343', marginRight: 4 }}
                  />
                  <CoolText
                    text="%"
                    fontWeight="bold"
                    style={{ fontSize: 20, color: '#D14343' }}
                  />
                </View>
                <CoolText
                  text="計算公式: (配對次數 / 翻牌次數) x 100%"
                  style={{ fontSize: 12, color: '#834B4B' }}
                />
              </View>
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
    color: '#834B4B',
    marginLeft: 8,
  },
});
