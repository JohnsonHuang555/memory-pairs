import { FlatList, StyleSheet, View } from 'react-native';
import Toast from 'react-native-toast-message';

import CoolButton from '../CoolButton';
import CoolText from '../CoolText';
import BaseModal from './BaseModal';
import { allAchievements } from '@/constants/AllAchievements';
import { Achievement } from '@/models/Achievement';
import usePlayerStore from '@/stores/PlayerStore';

import { Image } from 'expo-image';

type AchievementModalProps = {
  show: boolean;
  onClose: () => void;
};

const AchievementModal = ({ show, onClose }: AchievementModalProps) => {
  const { playerAchievements, receiveAchievementRewards } = usePlayerStore();

  const renderItem = ({
    received,
    title,
    description,
    rewards,
    id,
    completed,
  }: Achievement) => (
    <View style={styles.achievementItem}>
      <View style={{ width: 110}}>
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
        style={{ flex: 1, marginLeft: 4, marginRight: 4 }}
      >
        <Image
          source={require('@/assets/images/icons/coin.png')}
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
    </View>
  );

  return (
    <BaseModal title="成就" show={show} width={90} onClose={onClose}>
      <View style={{ height: 500 }}>
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
        />
      </View>
    </BaseModal>
  );
};

export default AchievementModal;

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
