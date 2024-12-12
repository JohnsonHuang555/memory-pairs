import { useCallback, useState } from 'react';
import { ActivityIndicator, Dimensions, View } from 'react-native';
import { FlatList, StyleSheet } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import Toast from 'react-native-toast-message';

import CoolButton from '@/components/CoolButton';
import CoolText from '@/components/CoolText';
import MainContainer from '@/components/MainContainer';
import { allAchievements } from '@/constants/AllAchievements';
import { Achievement } from '@/models/Achievement';
import usePlayerStore from '@/stores/PlayerStore';

import { Image } from 'expo-image';
import { useFocusEffect } from 'expo-router';

const AchievementScreen = () => {
  const { playerAchievements, receiveAchievementRewards } = usePlayerStore();
  const [isLoading, setLoading] = useState(true);

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

  const renderItem = ({
    received,
    title,
    description,
    rewards,
    id,
    completed,
  }: Achievement) => (
    <View style={styles.achievementItem}>
      <View style={{ width: 150 }}>
        <CoolText
          style={styles.title}
          text={title}
          fontWeight="medium"
        />
        <CoolText
          style={styles.description}
          text={description}
          fontWeight="regular"
        />
      </View>
      <View
        className="flex-row items-center"
        style={{ flex: 1, marginHorizontal: 4 }}
      >
        <Image
          source={require('@/assets/images/icons/coin-2.png')}
          style={{ width: 22, height: 22, marginRight: 4 }}
        />
        <CoolText
          text={1000}
          fontWeight="bold"
          className="text-[#834B4B]"
          style={{ fontSize: 20 }}
        />
      </View>
      <CoolButton
        text={!completed ? '未達成' : received ? '已收取' : '收取'}
        disabled={received || !completed}
        onClick={() => {
          Toast.show({
            type: 'info',
            text1: `💰 獲得 ${rewards} 金幣`,
            visibilityTime: 2000,
            text1Style: { fontSize: 14 },
          });
          receiveAchievementRewards(id, rewards);
        }}
        height={39}
        fontSize={16}
        width={80}
        raiseLevel={received || !completed ? 0 : 2}
        borderRadius={8}
        backgroundColor={received || !completed ? '#D6D1D1' : '#834B4B'}
      />
    </View>
  );

  return (
    <MainContainer title="成就" showLeftIcon showRuleIcon>
      {!isLoading ? (
        <Animated.View
          entering={FadeIn}
          exiting={FadeOut}
          style={{ height: Dimensions.get('window').height - 230 }}
        >
          <FlatList
            bounces={false}
            overScrollMode="never"
            showsVerticalScrollIndicator={false}
            data={allAchievements.map(achievement => {
              const playerAchievement = playerAchievements.find(
                p => p.id === achievement.id,
              );

              return {
                ...achievement,
                completed: playerAchievement?.completed || false,
                received: playerAchievement?.received || false,
              };
            })}
            keyExtractor={item => item.id}
            renderItem={v => renderItem(v.item)}
          />
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

export default AchievementScreen;

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
     color: '#834B4B',
  },
  description: {
    fontSize: 14,
    color: '#555',
    lineHeight: 18,
  },
});
