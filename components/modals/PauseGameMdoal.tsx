import { Image, StyleSheet, View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';

import BounceAnimation from '../BounceAnimation';
import CoolSwitch from '../CoolSwitch';
import CoolText from '../CoolText';
import BaseModal from './BaseModal';

import { useRouter } from 'expo-router';

type PauseGameModalProps = {
  show: boolean;
  onClose: () => void;
};

const PauseGameModal = ({ show, onClose }: PauseGameModalProps) => {
  const isMusicOn = useSharedValue(false);
  const isSoundOn = useSharedValue(false);
  const { push, replace } = useRouter();

  const handleMusicPress = () => {
    isMusicOn.value = !isMusicOn.value;
  };

  const handleSoundPress = () => {
    isSoundOn.value = !isSoundOn.value;
  };

  return (
    <BaseModal title="暫停" show={show} width={75} onClose={onClose}>
      <View
        className="mb-4 flex-row justify-between"
        style={{ marginTop: 12, width: '100%' }}
      >
        <View className="flex-row items-center">
          <Image
            source={require('@/assets/images/music.png')}
            style={{ width: 30, height: 30 }}
          />
          <CoolText
            text="音樂"
            className="ml-2 text-[#834B4B]"
            style={styles.title}
          />
        </View>
        <CoolSwitch
          value={isMusicOn}
          onPress={handleMusicPress}
          style={{ width: 80 }}
        />
      </View>
      <View
        className="flex-row justify-between"
        style={{ marginBottom: 40, width: '100%' }}
      >
        <View className="flex-row items-center">
          <Image
            source={require('@/assets/images/sound.png')}
            style={{ width: 30, height: 30 }}
          />
          <CoolText
            text="音效"
            className="ml-2 text-[#834B4B]"
            style={styles.title}
          />
        </View>
        <CoolSwitch
          value={isSoundOn}
          onPress={handleSoundPress}
          style={{ width: 80 }}
        />
      </View>
      <View className="flex-row justify-between" style={{ width: '100%' }}>
        <BounceAnimation onPress={() => push('/levels')}>
          <View className="rounded-full border" style={styles.actions}>
            <Image
              source={require('@/assets/images/levels.png')}
              style={{ width: 30, height: 30 }}
            />
          </View>
        </BounceAnimation>
        <BounceAnimation onPress={() => replace('/playing')}>
          <View className="rounded-full border" style={styles.actions}>
            <Image
              source={require('@/assets/images/replay.png')}
              style={{ width: 30, height: 30 }}
            />
          </View>
        </BounceAnimation>
        <BounceAnimation onPress={onClose}>
          <View
            className="items-center justify-center rounded-full border"
            style={[styles.actions, { width: 60, height: 60 }]}
          >
            <Image
              source={require('@/assets/images/game-play.png')}
              style={{
                width: 30,
                height: 30,
                position: 'absolute',
                left: 15,
              }}
            />
          </View>
        </BounceAnimation>
      </View>
    </BaseModal>
  );
};

export default PauseGameModal;

const styles = StyleSheet.create({
  actions: {
    padding: 12,
    borderColor: '#834B4B',
    backgroundColor: '#FFFCF0',
    borderWidth: 3,
  },
  title: {
    fontSize: 24,
  },
});
