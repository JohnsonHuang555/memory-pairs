import { useState } from 'react';
import { Dimensions, Image, TouchableOpacity, View } from 'react-native';

import BounceAnimation from '@/components/BounceAnimation';
import CoolText from '@/components/CoolText';
import LevelSelectModal from '@/components/modals/LevelSelectModal';
import { PrimaryTextColor, cn, getOrdinalSuffix } from '@/utils';

import { useRouter } from 'expo-router';

const levels = [
  {
    level: 1,
    title: '紅色',
  },
  {
    level: 2,
    title: '橘色',
  },
  {
    level: 3,
    title: '黃色',
  },
  {
    level: 4,
    title: '綠色',
  },
  {
    level: 5,
    title: '綠色',
  },
  {
    level: 6,
    title: '綠色',
  },
  {
    level: 7,
    title: '綠色',
  },
  {
    level: 8,
    title: '綠色',
  },
];

export default function LevelsPage() {
  const [showLevelModal, setShowLevelModal] = useState(false);
  const { push, back } = useRouter();

  const toggleModal = () => {
    setShowLevelModal(!showLevelModal);
  };

  return (
    <>
      <LevelSelectModal
        level={1}
        theme={'顏色'}
        show={showLevelModal}
        onClose={() => setShowLevelModal(false)}
      />
      <View className="h-[85%] w-[90%]">
        <View className="mb-6 flex-row items-center justify-between">
          <BounceAnimation onPress={back} className="w-10">
            <Image
              source={require('@/assets/images/left-arrow.png')}
              style={{ width: 40, height: 40 }}
            />
          </BounceAnimation>
          <CoolText
            text="關卡"
            className="text-3xl text-[#834B4B]"
            fontWeight="bold"
          />
          <BounceAnimation onPress={back} className="w-10">
            <Image
              source={require('@/assets/images/question.png')}
              style={{ width: 32, height: 32 }}
            />
          </BounceAnimation>
        </View>
        <View className="mb-6 flex-row items-center justify-end">
          <Image
            source={require('@/assets/images/yellow-star.png')}
            style={{ width: 26, height: 26 }}
          />
          <CoolText
            text="0/10"
            className="ml-2 text-2xl text-[#834B4B]"
            fontWeight="medium"
          />
        </View>
        <View className="flex-row flex-wrap justify-between">
          {levels.map(item => (
            <TouchableOpacity
              activeOpacity={0.8}
              key={item.level}
              onPress={toggleModal}
              className="mb-5 aspect-square w-[22%] items-center justify-center rounded-xl bg-[#C08A76] p-2 shadow"
            >
              <CoolText
                text={item.level}
                className="my-2 text-[28px] text-white"
                fontWeight="medium"
              />
              <View className="flex-row">
                <Image
                  source={require('@/assets/images/grey-star.png')}
                  style={{ width: 20, height: 20 }}
                />
                <Image
                  source={require('@/assets/images/grey-star.png')}
                  style={{ width: 20, height: 20 }}
                />
                <Image
                  source={require('@/assets/images/grey-star.png')}
                  style={{ width: 20, height: 20 }}
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </>
  );
}
