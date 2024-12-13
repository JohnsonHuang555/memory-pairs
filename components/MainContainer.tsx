import { ReactNode, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import BounceAnimation from './BounceAnimation';
import CoolText from './CoolText';
import GameRulesModal from './modals/GameRulesModal';
import useAudioStore from '@/stores/AudioStore';
import usePlayerStore from '@/stores/PlayerStore';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

import { useRouter, useSegments } from 'expo-router';

type MainContainerProps = {
  title: string;
  showLeftIcon?: boolean;
  showRuleIcon?: boolean;
  children: ReactNode;
  leftChildren?: ReactNode;
};

const MainContainer = ({
  showLeftIcon,
  showRuleIcon,
  children,
  title,
  leftChildren,
}: MainContainerProps) => {
  const { back, replace } = useRouter();
  const segments = useSegments();
  const [showGameRuleModal, setGameRuleModal] = useState(false);
  const playSound = useAudioStore(state => state.playSound);
  const { isSoundOn } = usePlayerStore();

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
                onPressIn={() => {
                  if (isSoundOn) {
                    playSound('cancel');
                  }
                }}
                onPress={() => {
                  if (segments.includes('(tabs)')) {
                    replace('/');
                  } else {
                    back();
                  }
                }}
              >
                <MaterialIcons
                  name="arrow-back-ios-new"
                  size={30}
                  color="#834B4B"
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
            {showRuleIcon && (
              <BounceAnimation
                onPressIn={() => {
                  if (isSoundOn) {
                    playSound('common');
                  }
                }}
                onPress={() => {
                  setGameRuleModal(true);
                }}
              >
                <MaterialCommunityIcons
                  name="file-document-outline"
                  size={30}
                  color="#834B4B"
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
