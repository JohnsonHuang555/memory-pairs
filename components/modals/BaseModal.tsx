import { ReactNode } from 'react';
import { View } from 'react-native';
import Modal from 'react-native-modal';
import Toast from 'react-native-toast-message';

import CoolText from '../CoolText';

type BaseModalProps = {
  title: string;
  show: boolean;
  width: number;
  children: ReactNode;
  onClose?: () => void;
  disabledBackdropPress?: boolean;
};

const BaseModal = ({
  title,
  show,
  width,
  children,
  onClose,
  disabledBackdropPress,
}: BaseModalProps) => {
  return (
    <Modal
      isVisible={show}
      onBackdropPress={() => {
        if (disabledBackdropPress) return;
        if (onClose) {
          onClose();
        }
      }}
      className="items-center"
      backdropTransitionOutTiming={0}
    >
      <Toast />
      <View
        className="relative items-center justify-center"
        style={{
          backgroundColor: '#FFF1E5',
          width: `${width}%`,
          borderColor: '#C08A76',
          borderWidth: 6,
          padding: 20,
          borderRadius: 20,
        }}
      >
        <View
          className="items-center justify-center p-2"
          style={{
            width: 150,
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            position: 'absolute',
            top: -40,
            backgroundColor: '#C08A76',
          }}
        >
          <CoolText
            text={title}
            className="text-white"
            fontWeight="medium"
            style={{ fontSize: 22, marginTop: 2 }}
          />
        </View>
        {children}
      </View>
    </Modal>
  );
};

export default BaseModal;
