import { ReactNode } from 'react';
import { Image, View } from 'react-native';

import BounceAnimation from './BounceAnimation';
import CoolText from './CoolText';

import { useRouter } from 'expo-router';

type MainContainerProps = {
  title: string;
  showLeftIcon?: boolean;
  showPauseIcon?: boolean;
  showQuestionIcon?: boolean;
  children: ReactNode;
};

const MainContainer = ({
  showLeftIcon,
  showPauseIcon,
  showQuestionIcon,
  children,
  title,
}: MainContainerProps) => {
  const { push, back } = useRouter();

  return (
    <View className="h-[85%] w-[90%]">
      <View className="mb-6 flex-row items-center justify-between">
        {showLeftIcon && (
          <View className="w-10">
            <BounceAnimation onPress={back}>
              <Image
                source={require('@/assets/images/left-arrow.png')}
                style={{ width: 40, height: 40 }}
              />
            </BounceAnimation>
          </View>
        )}
        {showPauseIcon && (
          <View className="w-10">
            <BounceAnimation onPress={() => {}}>
              <Image
                source={require('@/assets/images/pause.png')}
                style={{ width: 40, height: 40 }}
              />
            </BounceAnimation>
          </View>
        )}
        <CoolText
          text={title}
          className="text-3xl text-[#834B4B]"
          fontWeight="bold"
        />
        <View className="w-10">
          {showQuestionIcon && (
            <BounceAnimation onPress={back}>
              <Image
                source={require('@/assets/images/question.png')}
                style={{ width: 32, height: 32 }}
              />
            </BounceAnimation>
          )}
        </View>
      </View>
      {children}
    </View>
  );
};

export default MainContainer;
