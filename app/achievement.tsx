import { FlatList, StyleSheet, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import Toast from 'react-native-toast-message';

import CoolButton from '@/components/CoolButton';
import CoolText from '@/components/CoolText';
import MainContainer from '@/components/MainContainer';
import { allAchievements } from '@/constants/AllAchievements';
import { Achievement } from '@/models/Achievement';
import usePlayerStore from '@/stores/PlayerStore';

import { Image } from 'expo-image';

export default function AchievementPage() {
  const { playerAchievements, receiveAchievementRewards } = usePlayerStore();

  const renderItem = ({
    received,
    title,
    description,
    rewards,
    id,
    completed,
  }: Achievement) => (
    <Animated.View
      entering={FadeIn.delay(id * 50)}
      exiting={FadeOut.duration(100)}
      style={styles.achievementItem}
    >
      <View style={{ width: 130 }}>
        <CoolText
          style={styles.title}
          text={title}
          className="text-[#834B4B]"
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
        style={{ flex: 1, marginLeft: 8, marginRight: 8 }}
      >
        <Image
          source={require('@/assets/images/coin.png')}
          style={{ width: 26, height: 26, marginRight: 2 }}
        />
        <CoolText
          text={rewards}
          fontWeight="bold"
          className="text-[#834B4B]"
          style={{ fontSize: 20 }}
        />
      </View>
      <CoolButton
        text={received ? '已收取' : '收取'}
        disabled={received || !completed}
        onClick={() => {
          Toast.show({
            type: 'info',
            text1: `💰 獲得 ${rewards} 金幣`,
            visibilityTime: 2000,
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
    </Animated.View>
  );

  return (
    <MainContainer title="成就" showLeftIcon>
      <FlatList
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
        keyExtractor={item => String(item.id)}
        renderItem={v => renderItem(v.item)}
        style={{ marginBottom: 30 }}
      />
    </MainContainer>
  );
}

const styles = StyleSheet.create({
  achievementItem: {
    padding: 12,
    marginVertical: 6,
    marginHorizontal: 4,
    borderRadius: 12,
    backgroundColor: '#FFF1E5',
    borderWidth: 4,
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
