import { Image, Text, View } from 'react-native';

import { cn, getOrdinalSuffix } from '@/utils';
import Ionicons from '@expo/vector-icons/Ionicons';

import { useRouter } from 'expo-router';

const levels = [
  {
    id: 1,
    rank: 1,
    title: '紅色',
    color: 'bg-red-700'
  },
  {
    id: 2,
    rank: 1,
    title: '橘色',
    color: 'bg-orange-700'
  },
  {
    id: 3,
    rank: 1,
    title: '黃色',
    color: 'bg-yellow-700'
  },
  {
    id: 4,
    rank: 1,
    title: '綠色',
    color: 'bg-green-700'
  },
];

export default function ColorsPage() {
  const { push, back } = useRouter();

  return (
    <View className="h-[85%] w-[90%]">
      <View className="mb-10 flex-row items-center justify-between">
        <Ionicons name="arrow-back-outline" size={36} onPress={back} />
        <Text className="text-2xl">關卡選擇</Text>
        <Text className="w-9" />
      </View>
      <View className="flex flex-row flex-wrap gap-3">
        {levels.map(level => (
          <View key={level.id} className="w-[31%] rounded-md border p-2">
            <View className={cn("mb-3 h-[80px] rounded-md", level.color)} />
            <View className="flex-row items-center justify-between">
              <Text className="mb-2 text-2xl">{level.title}</Text>
              {/* <Image
              source={require('@/assets/images/leaderboard.png')}
              style={{ width: 20, height: 20 }}
              resizeMode="contain"
            /> */}
              <Text className="ml-1 text-lg">
                {getOrdinalSuffix(level.rank)}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
