import { useMemo } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import CoolText from '@/components/CoolText';
import MainContainer from '@/components/MainContainer';
import { itemsPerPage } from '@/stores/LevelStore';
import usePlayerStore from '@/stores/PlayerStore';
import useThemeStore from '@/stores/ThemeStore';

import { Image } from 'expo-image';
import { useRouter } from 'expo-router';

export default function ThemesScreen() {
  const { coins, themeList } = usePlayerStore();
  const { currentPage, themes } = useThemeStore();
  const { push } = useRouter();

  const totalStars = useMemo(
    () =>
      themeList
        .map(t => t.starsOfLevel)
        .reduce((acc, current) => {
          acc += current.reduce((a, c) => {
            a += c.stars;
            return a;
          }, 0);
          return acc;
        }, 0),
    [],
  );

  // 根據 currentPage 計算對應的關卡
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentThemes = useMemo(
    () => themes.slice(startIdx, startIdx + itemsPerPage),
    [startIdx],
  );

  return (
    <>
      <MainContainer title="主題" showLeftIcon showQuestionIcon>
        <View
          className="mb-6 flex-row items-center justify-end"
          style={{ gap: 16 }}
        >
          <View className="flex-row items-center">
            <Image
              source={require('@/assets/images/icons/coin-2.png')}
              style={{ width: 24, height: 24, marginRight: 6 }}
            />
            <CoolText
              text={coins}
              className="text-2xl text-[#834B4B]"
              fontWeight="medium"
            />
          </View>
          <View className="flex-row items-center">
            <Image
              source={require('@/assets/images/icons/yellow-star.png')}
              style={{ width: 26, height: 26, marginRight: 4 }}
            />
            <CoolText
              text={totalStars}
              className="text-2xl text-[#834B4B]"
              fontWeight="medium"
            />
          </View>
        </View>
        <View className="mb-4 flex-row flex-wrap justify-between">
          {currentThemes.map(theme => (
            <Animated.View
              key={theme.id}
              entering={FadeIn.delay(100)}
              exiting={FadeOut.duration(100)}
              className="mb-5 aspect-square w-[30%] rounded-xl p-2"
              style={[
                { backgroundColor: '#FFF' },
                {
                  shadowOffset: {
                    width: 0,
                    height: 4,
                  },
                  shadowOpacity: 0.2,
                  borderWidth: 1,
                  borderColor: '#ebebeb',
                },
              ]}
            >
              <TouchableOpacity
                activeOpacity={true ? 0.7 : 1}
                onPress={() => {
                  // if (!true) {
                  push(`/levels/${theme.type}`);
                  // }
                }}
              >
                <View
                  className="items-center justify-center"
                  style={{ width: '100%', height: '100%' }}
                >
                  <Image
                    source={theme.image}
                    style={{
                      width: '70%',
                      height: '70%',
                      marginTop: 10,
                      marginBottom: 8,
                    }}
                  />
                  <CoolText
                    text={theme.title}
                    fontWeight="medium"
                    style={{ marginBottom: 10, color: '#834B4B', fontSize: 16 }}
                  />
                </View>
              </TouchableOpacity>
              <View
                style={{
                  position: 'absolute',
                  top: 6,
                  left: 0,
                  paddingVertical: 4,
                  paddingHorizontal: 4,
                  borderBottomRightRadius: 4,
                  borderTopRightRadius: 4,
                  backgroundColor: 'rgba(0, 0, 0, 0.6)',
                }}
              >
                <CoolText
                  text={`100/100`}
                  style={{ color: '#FFF', fontSize: 16 }}
                />
              </View>
            </Animated.View>
          ))}
        </View>
        {/* <View className="flex-row justify-between">
          <View>
            {currentPage > 1 && (
              <CoolButton
                prefix={
                  <Image
                    source={require('@/assets/images/icons/arrow-left-2.png')}
                    style={{ width: 24, height: 24 }}
                  />
                }
                height={50}
                width={50}
                backgroundColor="#919191"
                onClick={() => updateCurrentPage(-1)}
              />
            )}
          </View>
          {themes.length > 20 * currentPage && (
            <CoolButton
              prefix={
                <Image
                  source={require('@/assets/images/icons/arrow-right-2.png')}
                  style={{ width: 24, height: 24 }}
                />
              }
              height={50}
              width={50}
              backgroundColor="#919191"
              onClick={() => updateCurrentPage(1)}
            />
          )}
        </View> */}
      </MainContainer>
    </>
  );
}
