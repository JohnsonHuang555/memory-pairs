import { useEffect } from 'react';
import { Image, View } from 'react-native';
import Modal from 'react-native-modal';

type UseItemsModalProps = {
  usedAddTime: boolean;
  usedViewFirst: boolean;
  usedAutoPairs: boolean;
  show: boolean;
  onClose: () => void;
};

const UseItemsModal = ({
  usedAddTime,
  usedViewFirst,
  usedAutoPairs,
  show,
  onClose,
}: UseItemsModalProps) => {
  useEffect(() => {
    setTimeout(() => {
      // onClose();
    }, 2000);
  }, []);

  return (
    <Modal
      isVisible={show}
      onBackdropPress={() => {
        return;
      }}
      className="items-center"
      backdropTransitionOutTiming={0}
      animationIn="bounceIn"
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
