import { ReactNode, useState } from 'react';
import { Image, View } from 'react-native';

import BounceAnimation from './BounceAnimation';
import CoolText from './CoolText';
import GameRulesModal from './modals/GameRulesModal';
import PauseGameModal from './modals/PauseGameMdoal';

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
  const { push } = useRouter();
  const [showPauseGameModal, setPauseGameModal] = useState(false);
  const [showGameRuleModal, setGameRuleModal] = useState(false);

  return (
    <View style={{ height: '85%', width: '90%' }}>
      <PauseGameModal
        show={showPauseGameModal}
        onClose={() => setPauseGameModal(false)}
      />
      <GameRulesModal
        show={showGameRuleModal}
        onClose={() => setGameRuleModal(false)}
      />
      <View className="mb-6 flex-row items-center justify-between">
        {showLeftIcon && (
          <View style={{ width: 40 }}>
            <BounceAnimation onPress={() => push('/')}>
              <Image
                source={require('@/assets/images/left-arrow.png')}
                style={{ width: 40, height: 40 }}
              />
            </BounceAnimation>
          </View>
        )}
        {showPauseIcon && (
          <View style={{ width: 40 }}>
            <BounceAnimation onPress={() => setPauseGameModal(true)}>
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
          style={{ fontSize: 24 }}
        />
        <View style={{ width: 40 }}>
          {showQuestionIcon && (
            <BounceAnimation onPress={() => setGameRuleModal(true)}>
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
