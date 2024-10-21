import { Image, StyleSheet, View } from 'react-native';

import CoolButton from '../CoolButton';
import CoolText from '../CoolText';
import BaseModal from './BaseModal';

type ShopModalProps = {
  show: boolean;
  onClose: () => void;
};

const ShopModal = ({ show, onClose }: ShopModalProps) => {
  return (
    <BaseModal title="商店" show={show} width={100} onClose={onClose}>
      <View
        className="flex-row items-center justify-between"
        style={{ width: '100%', marginBottom: 20 }}
      >
        <CoolText text="道具" style={styles.text} />
        <View className="flex-row items-center">
          <Image
            source={require('@/assets/images/coin.png')}
            style={{ width: 30, height: 30, marginRight: 4 }}
          />
          <CoolText text="1000" style={styles.text} fontWeight="medium" />
        </View>
      </View>
      <View
        className="flex-row items-center justify-between"
        style={{ width: '100%', gap: 10, marginBottom: 20 }}
      >
        <View className="items-center">
          <View className="rounded-xl" style={styles.itemsContainer}>
            <View style={styles.item}>
              <CoolText
                text={2}
                className="text-white"
                style={{ fontSize: 16 }}
              />
            </View>
            <View style={styles.level}>
              <CoolText
                text="Lv.1"
                className="text-white"
                style={{ fontSize: 16 }}
              />
            </View>
            <Image
              source={require('@/assets/images/timer.png')}
              style={{ width: 50, height: 50 }}
            />
          </View>
          <CoolText
            text="加時 5 秒"
            className="text-[#834B4B]"
            style={{ fontSize: 16, marginBottom: 20 }}
            fontWeight="medium"
          />
          <View className="mb-4">
            <CoolButton
              width={90}
              text="使用 800"
              subText="升級"
              backgroundColor="#E3803E"
              onClick={onClose}
              fontSize={14}
            />
          </View>

          <CoolButton
            width={90}
            text="使用 200"
            subText="購買"
            backgroundColor="#834B4B"
            onClick={onClose}
            fontSize={14}
          />
        </View>
        <View className="items-center">
          <View className="rounded-xl" style={styles.itemsContainer}>
            <View style={styles.item}>
              <CoolText
                text={2}
                className="text-white"
                style={{ fontSize: 16 }}
              />
            </View>
            <View style={styles.level}>
              <CoolText
                text="Lv.1"
                className="text-white"
                style={{ fontSize: 16 }}
              />
            </View>
            <Image
              source={require('@/assets/images/eye.png')}
              style={{ width: 50, height: 50 }}
            />
          </View>
          <CoolText
            text="先看 2 秒"
            className="text-[#834B4B]"
            style={{ fontSize: 16, marginBottom: 20 }}
            fontWeight="medium"
          />
          <View className="mb-4">
            <CoolButton
              width={90}
              text="使用 800"
              subText="升級"
              backgroundColor="#E3803E"
              onClick={onClose}
              fontSize={14}
            />
          </View>

          <CoolButton
            width={90}
            text="使用 300"
            subText="購買"
            backgroundColor="#834B4B"
            onClick={onClose}
            fontSize={14}
          />
        </View>
        <View className="items-center">
          <View className="rounded-xl" style={styles.itemsContainer}>
            <View style={styles.item}>
              <CoolText
                text={2}
                className="text-white"
                style={{ fontSize: 16 }}
              />
            </View>
            <View style={styles.level}>
              <CoolText
                text="Lv.1"
                className="text-white"
                style={{ fontSize: 16 }}
              />
            </View>
            <Image
              source={require('@/assets/images/paris.png')}
              style={{ width: 50, height: 50 }}
            />
          </View>
          <CoolText
            text="配對 2 組"
            className="text-[#834B4B]"
            style={{ fontSize: 16, marginBottom: 20 }}
            fontWeight="medium"
          />
          <View className="mb-4">
            <CoolButton
              width={90}
              text="使用 800"
              subText="升級"
              backgroundColor="#E3803E"
              onClick={onClose}
              fontSize={14}
            />
          </View>
          <CoolButton
            width={90}
            text="使用 500"
            subText="購買"
            backgroundColor="#834B4B"
            onClick={onClose}
            fontSize={14}
          />
        </View>
      </View>
      <View
        className="flex-row items-center justify-center"
        style={{ width: '100%' }}
      >
        <CoolButton
          prefix={
            <Image
            source={require('@/assets/images/video-play.png')}
            style={{ width: 24, height: 24, marginRight: 4 }}
          />
          }
          width={200}
          text="觀看廣告隨機獲得"
          backgroundColor="#C94343"
          onClick={()=>{}}
          fontSize={18}
        />
      </View>
    </BaseModal>
  );
};

export default ShopModal;

const styles = StyleSheet.create({
  text: {
    color: '#834B4B',
    fontSize: 24,
  },
  itemsContainer: {
    borderColor: '#C08A76',
    borderWidth: 3,
    backgroundColor: '#FFFCF0',
    padding: 7,
    position: 'relative',
    marginBottom: 20,
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
  level: {
    position: 'absolute',
    right: -13,
    bottom: -13,
    width: 40,
    height: 26,
    backgroundColor: '#C08A76',
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
});
