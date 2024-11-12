import { ReactNode, useState } from 'react';
import { View } from 'react-native';

import BounceAnimation from './BounceAnimation';
import CoolText from './CoolText';
import GameRulesModal from './modals/GameRulesModal';

import { Image } from 'expo-image';
import { useRouter } from 'expo-router';

type MainContainerProps = {
  title: string;
  showLeftIcon?: boolean;
  showQuestionIcon?: boolean;
  children: ReactNode;
  leftChildren?: ReactNode;
};

const MainContainer = ({
  showLeftIcon,
  showQuestionIcon,
  children,
  title,
  leftChildren,
}: MainContainerProps) => {
  const { push } = useRouter();
  const [showGameRuleModal, setGameRuleModal] = useState(false);

  return (
    <View style={{ height: '85%', width: '90%' }}>
      <GameRulesModal
        show={showGameRuleModal}
        onClose={() => setGameRuleModal(false)}
      />
      <View className="mb-6 flex-row items-center justify-between">
        <View style={{ width: 40 }}>
          {leftChildren}
          {showLeftIcon && (
            <BounceAnimation onPress={() => push('/')}>
              <Image
                source={require('@/assets/images/icons/left-arrow.png')}
                style={{ width: 40, height: 40 }}
              />
            </BounceAnimation>
          )}
        </View>
        <CoolText
          text={title}
          className="text-3xl text-[#834B4B]"
          fontWeight="bold"
          style={{ fontSize: 24 }}
        />
        <View style={{ width: 40, alignItems: 'flex-end' }}>
          {showQuestionIcon && (
            <BounceAnimation onPress={() => setGameRuleModal(true)}>
              <Image
                source={require('@/assets/images/icons/question.png')}
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
