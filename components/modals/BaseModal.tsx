import {
  ReactNode,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {
  Animated,
  Dimensions,
  Keyboard,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import CoolText from '../CoolText';

const { height } = Dimensions.get('window');

type BaseModalProps = {
  title: string;
  show: boolean;
  width: number;
  children: ReactNode;
  onClose?: () => void;
  disabledBackdropPress?: boolean;
};

const BaseModal = forwardRef(
  (
    {
      title,
      show,
      width,
      children,
      onClose,
      disabledBackdropPress,
    }: BaseModalProps,
    ref,
  ) => {
    const slideAnim = useRef(new Animated.Value(height)).current;
    const overlayOpacity = useRef(new Animated.Value(0)).current; // 遮罩層的透明度初始為 0
    const [modalHeight, setModalHeight] = useState(0);

    useImperativeHandle(ref, () => {
      return {
        close(callback?: any) {
          Animated.parallel([
            Animated.timing(slideAnim, {
              toValue: height + 100, // 對話框滑出畫面
              duration: 300,
              useNativeDriver: true,
            }),
            Animated.timing(overlayOpacity, {
              toValue: 0, // 遮罩層淡出
              duration: 300,
              useNativeDriver: true,
            }),
          ]).start(() => {
            if (callback) {
              callback();
              return;
            }
            if (onClose) {
              onClose();
            }
          });
        },
      };
    }, []);

    useEffect(() => {
      if (show && modalHeight) {
        Animated.parallel([
          Animated.timing(slideAnim, {
            toValue: (height - modalHeight) / 2, // 對話框滑入畫面
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(overlayOpacity, {
            toValue: 1, // 遮罩層淡入
            duration: 300,
            useNativeDriver: true,
          }),
        ]).start();
      }
    }, [show, modalHeight]);

    const closeModal = () => {
      if (disabledBackdropPress) {
        Keyboard.dismiss();
        return;
      }
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: height + 100, // 對話框滑出畫面
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(overlayOpacity, {
          toValue: 0, // 遮罩層淡出
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        if (onClose) {
          onClose();
        }
      });
    };

    return (
      <Modal
        visible={show}
        transparent={true}
        animationType="none"
        onRequestClose={closeModal} // Android back button close
      >
        {/* Overlay */}
        <TouchableWithoutFeedback onPress={closeModal}>
          <Animated.View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <Animated.View
          className="items-center justify-center"
          style={[
            {
              backgroundColor: '#FFF1E5',
              width: `${width}%`,
              borderColor: '#C08A76',
              borderWidth: 6,
              padding: 20,
              borderRadius: 20,
              position: 'absolute',
              alignSelf: 'center',
              alignItems: 'center',
            },
            { transform: [{ translateY: slideAnim }] },
          ]}
          onLayout={event => {
            // Capture modal height on first render
            const { height } = event.nativeEvent.layout;
            setModalHeight(height);
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
              fontWeight="medium"
              style={{ fontSize: 22, marginTop: 2, color: '#FFF' }}
            />
          </View>
          {children}
        </Animated.View>
      </Modal>
    );
  },
);

export default BaseModal;

const styles = StyleSheet.create({
  modalOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
