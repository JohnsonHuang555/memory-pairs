import { useEffect } from 'react';
import { View } from 'react-native';
import Modal from 'react-native-modal';

import { Image } from 'expo-image';

type UseItemsModalProps = {
  usedAddTime: boolean;
  usedViewFirst: boolean;
  usedAutoPairs: boolean;
  show: boolean;
  onClose: () => void;
  onModalHide: () => void;
};

const UseItemsModal = ({
  usedAddTime,
  usedViewFirst,
  usedAutoPairs,
  show,
  onClose,
  onModalHide,
}: UseItemsModalProps) => {
  useEffect(() => {
    setTimeout(() => {
      onClose();
    }, 1500);
  }, []);

  return (
    <Modal
      isVisible={show}
      onBackdropPress={() => {
        return;
      }}
      className="items-center"
      backdropTransitionOutTiming={0}
      animationIn="slideInRight"
      animationOut="slideOutLeft"
      onModalHide={onModalHide}
    >
      <View
        className="flex-row items-center justify-center"
        style={{
          backgroundColor: '#FFF1E5',
          width: '120%',
          paddingTop: 40,
          paddingBottom: 40,
          gap: 40,
        }}
      >
        {usedAddTime && (
          <Image
            source={require('@/assets/images/timer.png')}
            style={{ width: 60, height: 60 }}
          />
        )}
        {usedViewFirst && (
          <Image
            source={require('@/assets/images/eye.png')}
            style={{ width: 60, height: 60 }}
          />
        )}
        {usedAutoPairs && (
          <Image
            source={require('@/assets/images/paris.png')}
            style={{ width: 60, height: 60 }}
          />
        )}
      </View>
    </Modal>
  );
};

export default UseItemsModal;
