import { useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import CoolText from '@/components/CoolText';
import MainContainer from '@/components/MainContainer';
import { allItems } from '@/constants/AllItems';
import { PlayerItem } from '@/models/Item';
import usePlayerStore from '@/stores/PlayerStore';

import { Image } from 'expo-image';
import { useFocusEffect } from 'expo-router';

const ShopScreen = () => {
  const { coins, items, updatePlayerItem } = usePlayerStore();
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

  // const renderItem = ({quantity, level, maxLevel}: PlayerItem) => (
    // <View style={styles.achievementItem}>
    //   <View className="rounded-xl">
    //     <View style={styles.item}>
    //       <CoolText
    //         text={quantity || 0}
    //         style={{ fontSize: 16, color: '#FFF' }}
    //       />
    //     </View>
    //     <View style={styles.level}>
    //       <CoolText
    //         text={level === maxLevel ? 'Max' : `Lv. ${level || 1}`}
    //         style={{ fontSize: 14, color: '#FFF' }}
    //       />
    //     </View>
    //     {getItemIcon(item.type)}
    //   </View>
    //   <View
    //     className="flex-row items-center"
    //     style={{ flex: 1, marginHorizontal: 4 }}
    //   >
    //     <Image
    //       source={require('@/assets/images/icons/coin-2.png')}
    //       style={{ width: 22, height: 22, marginRight: 4 }}
    //     />
    //     <CoolText
    //       text={1000}
    //       fontWeight="bold"
    //       className="text-[#834B4B]"
    //       style={{ fontSize: 20 }}
    //     />
    //   </View>
    //   <CoolButton
    //     text={received ? '已收取' : '收取'}
    //     disabled={received || !completed}
    //     onClick={() => {
    //       Toast.show({
    //         type: 'info',
    //         text1: `💰 獲得 ${rewards} 金幣`,
    //         visibilityTime: 2000,
    //       });
    //       receiveAchievementRewards(id, rewards);
    //     }}
    //     height={39}
    //     fontSize={16}
    //     width={80}
    //     raiseLevel={received || !completed ? 0 : 2}
    //     borderRadius={8}
    //     backgroundColor={received || !completed ? '#D6D1D1' : '#834B4B'}
    //   />
    // </View>
  // );

  return (
    <MainContainer title="商店" showLeftIcon showQuestionIcon>
      {!isLoading ? (
        <Animated.View entering={FadeIn} exiting={FadeOut}>
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
          </View>
          {/* <FlatList
            showsVerticalScrollIndicator={false}
            data={allItems.map(achievement => {
              const currentItem = items.find(i => i.type === item.type);

              return {
                ...achievement,
                completed: playerAchievement?.completed || false,
                received: playerAchievement?.received || false,
              };
            })}
            keyExtractor={item => String(item.id)}
            renderItem={v => renderItem(v.item)}
          /> */}
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
};

export default ShopScreen;

const styles = StyleSheet.create({
  achievementItem: {
    padding: 12,
    width: '100%',
    marginVertical: 6,
    borderRadius: 12,
    backgroundColor: '#FFF1E5',
    borderWidth: 2,
    borderColor: '#C08A76',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#555',
    lineHeight: 18,
  },
});
