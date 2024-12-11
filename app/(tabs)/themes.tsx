import { useCallback, useMemo, useState } from 'react';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import CoolText from '@/components/CoolText';
import MainContainer from '@/components/MainContainer';
import { Theme } from '@/models/Theme';
import usePlayerStore from '@/stores/PlayerStore';
import useThemeStore from '@/stores/ThemeStore';
import { MaterialIcons } from '@expo/vector-icons';

import { Image } from 'expo-image';
import { useFocusEffect, useRouter } from 'expo-router';

export default function ThemesScreen() {
  const { coins, themeList, purchaseThemeIds } = usePlayerStore();
  const { themes } = useThemeStore();
  const [isLoading, setLoading] = useState(true);
  const { push } = useRouter();

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

  const sortedArray = themes.sort((a, b) => {
    const getPriority = (item: Theme) => {
      if (!('unlockStars' in item) && !('price' in item)) return 0;
      if ('unlockStars' in item) return 1;
      if ('price' in item) return 2;
    };

    const priorityA = getPriority(a) as any;
    const priorityB = getPriority(b) as any;

    if (priorityA !== priorityB) {
      return priorityA - priorityB;
    }

    return a.id - b.id;
  });

  const getLockInfo = (theme: Theme) => {
    const isAlreadyPurchase = purchaseThemeIds.find(id => id === theme.id);
    if (theme.price && !isAlreadyPurchase) {
      return (
        <View
          className="flex-row items-center justify-center"
          style={{ marginTop: 4 }}
        >
          <Image
            source={require('@/assets/images/icons/coin-2.png')}
            style={{ width: 20, height: 20, marginRight: 4 }}
          />
          <CoolText
            text={theme.price}
            fontWeight="medium"
            style={{ color: '#FFF', fontSize: 20 }}
          />
        </View>
      );
    }
    if (theme.unlockStars && totalStars < theme.unlockStars) {
      return (
        <View
          className="flex-row items-center justify-center"
          style={{ marginTop: 4 }}
        >
          <Image
            source={require('@/assets/images/icons/yellow-star.png')}
            style={{ width: 20, height: 20, marginRight: 4 }}
          />
          <CoolText
            text={theme.unlockStars}
            fontWeight="medium"
            style={{ color: '#FFF', fontSize: 20 }}
          />
        </View>
      );
    }
    return null;
  };

  const isLock = (theme: Theme) => {
    const isAlreadyPurchase = purchaseThemeIds.find(id => id === theme.id);
    if (theme.price && !isAlreadyPurchase) {
      return true;
    }
    if (theme.unlockStars && totalStars < theme.unlockStars) {
      return true;
    }
    return false;
  };

  return (
    <MainContainer title="主題" showLeftIcon showQuestionIcon>
      {!isLoading ? (
        <Animated.View entering={FadeIn} exiting={FadeOut}>
          <View
            className="mb-6 flex-row items-center justify-end"
            style={{ gap: 16 }}
          >
            <View className="flex-row items-center">
              <Image
                source={require('@/assets/images/icons/coin-2.png')}
                style={{ width: 22, height: 22, marginRight: 6 }}
              />
              <CoolText
                text={coins}
                fontWeight="medium"
                style={{ fontSize: 20, color: '#834B4B' }}
              />
            </View>
            <View className="flex-row items-center">
              <Image
                source={require('@/assets/images/icons/yellow-star.png')}
                style={{ width: 26, height: 26, marginRight: 4 }}
              />
              <CoolText
                text={totalStars}
                fontWeight="medium"
                style={{ fontSize: 20, color: '#834B4B' }}
              />
            </View>
          </View>
          <View className="mb-4 flex-row flex-wrap justify-between">
            {sortedArray.map(theme => (
              <View
                key={theme.id}
                className="mb-5 w-[30%] rounded-xl"
                style={[
                  { backgroundColor: '#FFF', height: 110 },
                  {
                    shadowOffset: {
                      width: 0,
                      height: 4,
                    },
                    shadowOpacity: 0.2,
                  },
                ]}
              >
                <TouchableOpacity
                  activeOpacity={!isLock(theme) ? 0.7 : 1}
                  onPress={() => {
                    if (!isLock(theme)) {
                      push(`/levels/${theme.type}`);
                    }
                  }}
                >
                  <View
                    className="items-center justify-center p-2"
                    style={{ width: '100%', height: '100%' }}
                  >
                    <Image
                      source={theme.image}
                      style={{
                        width: 60,
                        height: 60,
                        marginTop: 8,
                        marginBottom: 8,
                        borderRadius: 10,
                      }}
                    />
                    <CoolText
                      text={theme.title}
                      fontWeight="medium"
                      style={{
                        color: '#834B4B',
                        marginBottom: 6,
                        fontSize: 16,
                      }}
                    />
                  </View>
                </TouchableOpacity>
                {isLock(theme) && (
                  <View
                    style={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      borderRadius: 10,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    }}
                  >
                    <MaterialIcons name="lock" color="#FFF" size={40} />
                    {getLockInfo(theme)}
                  </View>
                )}
              </View>
            ))}
          </View>
        </Animated.View>
      ) : (
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <ActivityIndicator size="large" />
        </View>
      )}
    </MainContainer>
  );
}
