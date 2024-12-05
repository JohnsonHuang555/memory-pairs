import { ReactNode, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import BounceAnimation from './BounceAnimation';
import CoolText from './CoolText';
import GameRulesModal from './modals/GameRulesModal';

import { Image } from 'expo-image';
import { useRouter, useSegments } from 'expo-router';

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
  const { back, replace } = useRouter();
  const segments = useSegments();
  const [showGameRuleModal, setGameRuleModal] = useState(false);

  return (
    <View style={styles.container}>
      <GameRulesModal
        show={showGameRuleModal}
        onClose={() => setGameRuleModal(false)}
      />
      <View style={{ height: '85%', width: '90%' }}>
        <View className="mb-6 flex-row items-center justify-between">
          <View style={{ width: 40 }}>
            {leftChildren}
            {showLeftIcon && (
              <BounceAnimation
                onPress={() => {
                  if (segments.includes('(tabs)')) {
                    replace('/');
                  } else {
                    back();
                  }
                }}
              >
                <Image
                  source={require('@/assets/images/icons/left-arrow.png')}
                  style={{ width: 40, height: 40 }}
                />
              </BounceAnimation>
            )}
          </View>
          <CoolText
            text={title}
            className="text-[#834B4B]"
            fontWeight="medium"
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
    </View>
  );
};

export default MainContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
