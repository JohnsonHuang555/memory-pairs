import { useState } from 'react';
import {
  Image,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';

import LevelSelectModal from '@/components/modals/LevelSelectModal';
import { cn, getOrdinalSuffix } from '@/utils';
import Ionicons from '@expo/vector-icons/Ionicons';

import { useRouter } from 'expo-router';

const levels = [
  {
    id: 1,
    rank: 1,
    title: '紅色',
    color: 'bg-red-700',
  },
  {
    id: 2,
    rank: 1,
    title: '橘色',
    color: 'bg-orange-700',
  },
  {
    id: 3,
    rank: 1,
    title: '黃色',
    color: 'bg-yellow-700',
  },
  {
    id: 4,
    rank: 1,
    title: '綠色',
    color: 'bg-green-700',
  },
];

export default function ColorsPage() {
  const [showLevelModal, setShowLevelModal] = useState(false);
  const { push, back } = useRouter();

  const toggleModal = () => {
    setShowLevelModal(!showLevelModal);
  };

  return (
    <>
      <LevelSelectModal
        show={showLevelModal}
        onClose={() => setShowLevelModal(false)}
      />
      <View className="h-[85%] w-[90%]">
        <View className="mb-10 flex-row items-center justify-between">
          <TouchableOpacity onPress={back} activeOpacity={1}>
            <Ionicons name="arrow-back-outline" size={36} />
          </TouchableOpacity>
          <Text className="text-2xl">關卡選擇</Text>
          <Text className="w-9" />
        </View>
        <View className="flex flex-row flex-wrap gap-3">
          {levels.map(level => (
            <TouchableOpacity
              activeOpacity={1}
              key={level.id}
              className="w-[31%] rounded-md border border-gray-400 p-2"
              onPress={toggleModal}
            >
              <>
                <View className={cn('mb-3 h-[80px] rounded-md', level.color)} />
                <View className="flex-row items-center justify-between">
                  <Text className="mb-2 text-xl">{level.title}</Text>
                  {/* <Image
              source={require('@/assets/images/leaderboard.png')}
              style={{ width: 20, height: 20 }}
              resizeMode="contain"
            /> */}
                  <Text className="ml-1 text-lg">
                    {getOrdinalSuffix(level.rank)}
                  </Text>
                </View>
              </>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </>
  );
}
