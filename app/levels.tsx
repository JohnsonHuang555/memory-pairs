import { useState } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';

import CoolText from '@/components/CoolText';
import MainContainer from '@/components/MainContainer';
import LevelSelectModal from '@/components/modals/LevelSelectModal';
import { PrimaryTextColor, cn, getOrdinalSuffix } from '@/utils';

import { useRouter } from 'expo-router';

const levels = [
  {
    level: 1,
    title: '紅色',
    isLock: false,
  },
  {
    level: 2,
    title: '橘色',
    isLock: true,
  },
  {
    level: 3,
    title: '黃色',
    isLock: true,
  },
  {
    level: 4,
    title: '綠色',
    isLock: true,
  },
  {
    level: 5,
    title: '綠色',
    isLock: true,
  },
  {
    level: 6,
    title: '綠色',
    isLock: true,
  },
  {
    level: 7,
    title: '綠色',
    isLock: true,
  },
  {
    level: 8,
    title: '綠色',
    isLock: true,
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
      <MainContainer title="關卡" showLeftIcon showQuestionIcon>
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
              activeOpacity={!item.isLock ? 0.8 : 1}
              key={item.level}
              onPress={() => {
                if (!item.isLock) {
                  toggleModal();
                }
              }}
              className="mb-5 aspect-square w-[22%] rounded-xl bg-[#C08A76] p-2"
              style={[
                !item.isLock
                  ? { backgroundColor: '#C08A76' }
                  : { backgroundColor: '#B3A9A5' },
                {
                  shadowOffset: {
                    width: 2,
                    height: 8,
                  },
                  shadowOpacity: 0.2,
                },
              ]}
            >
              <View
                className="items-center justify-center"
                style={{ width: '100%', height: '100%' }}
              >
                {!item.isLock ? (
                  <>
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
                  </>
                ) : (
                  <Image
                    source={require('@/assets/images/lock.png')}
                    style={{ width: 40, height: 40 }}
                  />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </MainContainer>
    </>
  );
}
