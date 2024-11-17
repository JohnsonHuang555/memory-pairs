import { StyleSheet, View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';

import CoolSwitch from '../CoolSwitch';
import CoolText from '../CoolText';
import BaseModal from './BaseModal';
import GamePlayButton from './buttons/GamePlayButton';
import GoLevelsButton from './buttons/GoLevelsButton';
import ReplayButton from './buttons/ReplayButton';

import { Image } from 'expo-image';
import usePlayerStore from '@/stores/PlayerStore';

type PauseGameModalProps = {
  show: boolean;
  onResume: () => void;
};

const PauseGameModal = ({ show, onResume }: PauseGameModalProps) => {
  const { isMusicOn, isSoundOn, setIsMusicOn, setIsSoundOn } = usePlayerStore();
  const isMusicOnValue = useSharedValue(isMusicOn);
  const isSoundOnValue = useSharedValue(isSoundOn);

  const handleMusicPress = () => {
    isMusicOnValue.value = !isMusicOnValue.value;
    setIsMusicOn();
  };

  const handleSoundPress = () => {
    isSoundOnValue.value = !isSoundOnValue.value;
    setIsSoundOn();
  };

  return (
    <BaseModal title="暫停" show={show} width={65} disabledBackdropPress>
      <View
        className="mb-4 flex-row justify-between"
        style={{ marginTop: 12, width: '100%' }}
      >
        <View className="flex-row items-center">
          <Image
            source={require('@/assets/images/icons/music.png')}
            style={{ width: 30, height: 30 }}
          />
          <CoolText
            text="音樂"
            className="ml-2 text-[#834B4B]"
            style={styles.title}
          />
        </View>
        <CoolSwitch
          value={isMusicOnValue}
          onPress={handleMusicPress}
          style={{ width: 80 }}
        />
      </View>
      <View
        className="flex-row justify-between"
        style={{ marginBottom: 20, width: '100%' }}
      >
        <View className="flex-row items-center">
          <Image
            source={require('@/assets/images/icons/sound.png')}
            style={{ width: 30, height: 30 }}
          />
          <CoolText
            text="音效"
            className="ml-2 text-[#834B4B]"
            style={styles.title}
          />
        </View>
        <CoolSwitch
          value={isSoundOnValue}
          onPress={handleSoundPress}
          style={{ width: 80 }}
        />
      </View>
      <View className="flex-row justify-between" style={{ width: '100%' }}>
        <GoLevelsButton />
        <ReplayButton />
        <GamePlayButton onResume={onResume} />
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
