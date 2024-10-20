import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Modal from 'react-native-modal';

import CoolButton from '../CoolButton';
import CoolText from '../CoolText';

type LevelSelectModalProps = {
  level: number;
  theme: string;
  show: boolean;
  onClose: () => void;
};

const LevelSelectModal = ({
  level,
  show,
  theme,
  onClose,
}: LevelSelectModalProps) => {
  return (
    <Modal isVisible={show} onBackdropPress={onClose} className="border">
      <View className="flex-1 items-center justify-center">
        <View
          className="relative items-center justify-center"
          style={{
            backgroundColor: '#FFF1E5',
            width: 300,
            borderColor: '#C08A76',
            borderWidth: 6,
            padding: 20,
            borderRadius: 20,
          }}
        >
          <View
            className="items-center justify-center bg-[#C08A76] p-2"
            style={{
              width: 150,
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
              position: 'absolute',
              top: -43,
            }}
          >
            <CoolText text={`Level ${level}`} className="text-2xl text-white" />
          </View>
          <View className="mb-6 flex-row" style={{ gap: 4 }}>
            <Image
              source={require('@/assets/images/grey-star.png')}
              style={{
                width: 60,
                height: 60,
                marginTop: 24,
                transform: [{ rotate: '-25deg' }],
              }}
            />
            <Image
              source={require('@/assets/images/grey-star.png')}
              style={{ width: 70, height: 70 }}
            />
            <Image
              source={require('@/assets/images/grey-star.png')}
              style={{
                width: 60,
                height: 60,
                marginTop: 24,
                transform: [{ rotate: '25deg' }],
              }}
            />
          </View>
          <View className="items-center" style={{ marginBottom: 24 }}>
            <CoolText
              text="主題"
              fontWeight="medium"
              className="mb-4"
              style={{ fontSize: 18, color: '#717171' }}
            />
            <CoolText
              text={`${theme}, 兩個一組`}
              fontWeight="medium"
              style={{ fontSize: 24, color: '#834B4B' }}
            />
          </View>
          <View className="items-center" style={{ marginBottom: 30 }}>
            <CoolText
              text="使用道具"
              fontWeight="medium"
              className="mb-6"
              style={{ fontSize: 18, color: '#717171' }}
            />
            <View className="flex-row" style={{ gap: 12 }}>
              <View className="rounded-xl border" style={styles.itemsContainer}>
                <View style={styles.item}>
                  <CoolText
                    text={2}
                    className="text-white"
                    style={{ fontSize: 16 }}
                  />
                </View>
                <Image
                  source={require('@/assets/images/timer.png')}
                  style={{ width: 50, height: 50 }}
                />
              </View>
              <View className="rounded-xl border" style={styles.itemsContainer}>
                <View style={styles.item}>
                  <CoolText
                    text={2}
                    className="text-white"
                    style={{ fontSize: 16 }}
                  />
                </View>
                <Image
                  source={require('@/assets/images/eye.png')}
                  style={{ width: 50, height: 50 }}
                />
              </View>
              <View className="rounded-xl border" style={styles.itemsContainer}>
                <View style={styles.item}>
                  <CoolText
                    text={2}
                    className="text-white"
                    style={{ fontSize: 16 }}
                  />
                </View>
                <Image
                  source={require('@/assets/images/paris.png')}
                  style={{ width: 50, height: 50 }}
                />
              </View>
            </View>
          </View>
          <CoolButton
            width={150}
            text="挑戰"
            backgroundColor="#834B4B"
            onClick={() => {}}
          />
        </View>
      </View>
    </Modal>
  );
};

export default LevelSelectModal;

const styles = StyleSheet.create({
  itemsContainer: {
    borderColor: '#C08A76',
    borderWidth: 3,
    backgroundColor: '#FFFCF0',
    padding: 4,
    position: 'relative',
  },
  item: {
    position: 'absolute',
    right: -13,
    top: -13,
    width: 26,
    height: 26,
    backgroundColor: '#C94343',
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
