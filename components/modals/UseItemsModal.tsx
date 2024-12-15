import { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Modal, StyleSheet } from 'react-native';

import { Image } from 'expo-image';

type UseItemsModalProps = {
  usedAddTime: boolean;
  usedViewFirst: boolean;
  usedAutoPairs: boolean;
  show: boolean;
  onClose: () => void;
};

const { width, height } = Dimensions.get('window');

const UseItemsModal = ({
  usedAddTime,
  usedViewFirst,
  usedAutoPairs,
  show,
  onClose,
}: UseItemsModalProps) => {
  const slideAnimX = useRef(new Animated.Value(width)).current; // 水平方向滑動
  const slideAnimY = useRef(new Animated.Value(height)).current; // 垂直方向滑動
  const overlayOpacity = useRef(new Animated.Value(0)).current;
  const [modalHeight, setModalHeight] = useState(0);

  useEffect(() => {
    if (show && modalHeight) {
      Animated.parallel([
        // 水平從右滑入
        Animated.timing(slideAnimX, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        // 垂直滑入居中
        Animated.timing(slideAnimY, {
          toValue: (height - modalHeight) / 2, // 垂直居中
          duration: 300,
          useNativeDriver: true,
        }),
        // 遮罩淡入
        Animated.timing(overlayOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [show, modalHeight]);

  useEffect(() => {
    setTimeout(() => {
      Animated.parallel([
        // 水平滑出
        Animated.timing(slideAnimX, {
          toValue: -width, // 滑出螢幕
          duration: 300,
          useNativeDriver: true,
        }),
        // 遮罩淡出
        Animated.timing(overlayOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        onClose();
      });
    }, 1500);
  }, []);

  return (
    <Modal
      visible={show}
      transparent={true}
      animationType="none"
      onRequestClose={() => {
        return;
      }}
    >
      <Animated.View
        style={[
          styles.modalOverlay,
          { opacity: overlayOpacity }, // 遮罩透明度動畫
        ]}
      />
      <Animated.View
        className="flex-row items-center justify-center"
        style={[
          {
            position: 'absolute',
            width: '100%', // 彈窗寬度
            height: 130, // 彈窗高度
            backgroundColor: '#FFF1E5',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 2,
            gap: 20,
          },
          {
            transform: [
              { translateX: slideAnimX }, // 水平動畫
              { translateY: slideAnimY }, // 垂直動畫
            ],
          },
        ]}
        onLayout={event => {
          // Capture modal height on first render
          const { height } = event.nativeEvent.layout;
          setModalHeight(height);
        }}
      >
        {usedAddTime && (
          <Image
            source={require('@/assets/images/icons/timer.png')}
            style={{ width: 60, height: 60 }}
          />
        )}
        {usedViewFirst && (
          <Image
            source={require('@/assets/images/icons/eye.png')}
            style={{ width: 60, height: 60 }}
          />
        )}
        {usedAutoPairs && (
          <Image
            source={require('@/assets/images/icons/paris.png')}
            style={{ width: 60, height: 60 }}
          />
        )}
      </Animated.View>
    </Modal>
  );
};

export default UseItemsModal;

const styles = StyleSheet.create({
  modalOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 半透明遮罩
    zIndex: 1,
  },
});
