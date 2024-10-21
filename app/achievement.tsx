import { useState } from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';

import CoolButton from '@/components/CoolButton';
import CoolText from '@/components/CoolText';
import MainContainer from '@/components/MainContainer';

const achievements = [
  {
    id: '1',
    title: '初次挑戰',
    description: '完成第一關',
    completed: true,
    received: false,
  },
  {
    id: '2',
    title: '星級達人 Ⅳ',
    description: '連續完成三場遊戲',
    completed: false,
    received: true,
  },
  {
    id: '3',
    title: '限時高手',
    description: '在30秒內完成遊戲',
    completed: true,
    received: true,
  },
  // 更多成就資料...
];

export default function AchievementPage() {
  const [showShopModal, setShowShopModal] = useState(false);

  const renderItem = ({ item }: any) => (
    <View style={styles.achievementItem}>
      <View style={{ width: 120 }}>
        <CoolText
          style={styles.title}
          text={item.title}
          className="text-[#834B4B]"
          fontWeight="medium"
        />
        <CoolText
          style={styles.description}
          text={item.description}
          fontWeight="regular"
        />
      </View>
      <View className="flex-row items-center">
        <Image
          source={require('@/assets/images/coin.png')}
          style={{ width: 26, height: 26, marginRight: 2 }}
        />
        <CoolText
          text={4000}
          fontWeight="bold"
          className="text-[#834B4B]"
          style={{ fontSize: 20 }}
        />
      </View>
      <CoolButton
        text="收取"
        disabled={item.received}
        onClick={() => {}}
        height={39}
        fontSize={16}
        width={70}
        raiseLevel={item.received ? 0 : 2}
        borderRadius={8}
        backgroundColor={item.received ? '#D6D1D1' : '#834B4B'}
      />
    </View>
  );
  return (
    <MainContainer title="成就" showLeftIcon>
      <FlatList
        data={achievements}
        keyExtractor={item => item.id}
        renderItem={renderItem}
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
  },
  title: {
    fontSize: 18,
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#555',
  },
});
