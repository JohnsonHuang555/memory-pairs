import { Image, StyleSheet, View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';

import CoolButton from '../CoolButton';
import CoolSwitch from '../CoolSwitch';
import CoolText from '../CoolText';
import BaseModal from './BaseModal';

type SettingsModalProps = {
  show: boolean;
  onClose: () => void;
};

const SettingsModal = ({ show, onClose }: SettingsModalProps) => {
  const isMusicOn = useSharedValue(false);
  const isSoundOn = useSharedValue(false);

  const handleMusicPress = () => {
    isMusicOn.value = !isMusicOn.value;
  };

  const handleSoundPress = () => {
    isSoundOn.value = !isSoundOn.value;
  };

  return (
    <BaseModal title="設定" show={show} width={75} onClose={onClose}>
      <View
        className="mb-4 flex-row justify-between"
        style={{ marginVertical: 10, width: '100%' }}
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
        style={{ width: '100%' }}
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
      {/* <CoolButton
        width={100}
        height={50}
        text="關閉"
        backgroundColor="#834B4B"
        onClick={onClose}
      /> */}
    </BaseModal>
  );
};

export default SettingsModal;

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
