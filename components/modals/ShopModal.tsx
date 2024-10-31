import { Image, StyleSheet, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

import CoolButton from '../CoolButton';
import CoolText from '../CoolText';
import BaseModal from './BaseModal';
import { allItems } from '@/constants/AllItems';
import { Item } from '@/models/Item';
import usePlayerStore from '@/stores/PlayerStore';

type ShopModalProps = {
  show: boolean;
  onClose: () => void;
};

const ShopModal = ({ show, onClose }: ShopModalProps) => {
  const { coins, items } = usePlayerStore();

  const getItemInfo = (type: Item) => {
    const item = items.find(i => i.type === type);
    if (!item) return;
    let name = '';
    switch (type) {
      case Item.AddTime:
        if (item?.level === 1) {
          name = `加時 5 秒`;
        } else {
          name = `加時 ${5 + item.level * 3} 秒`;
        }
        break;
      case Item.ViewFirst:
        if (item?.level === 1) {
          name = `先看 1 秒`;
        } else {
          name = `先看 ${1 + item.level * 1} 秒`;
        }
        break;
      case Item.AutoPairs:
        if (item?.level === 1) {
          name = `配對 1 組`;
        } else {
          name = `配對 ${1 + item.level * 1} 組`;
        }
        break;
    }

    return {
      quantity: item.quantity,
      level: item.level,
      name,
    };
  };

  const getItemIcon = (type: Item) => {
    switch (type) {
      case Item.AddTime:
        return (
          <Image
            source={require('@/assets/images/timer.png')}
            style={{ width: 50, height: 50 }}
          />
        );
      case Item.ViewFirst:
        return (
          <Image
            source={require('@/assets/images/eye.png')}
            style={{ width: 50, height: 50 }}
          />
        );
      case Item.AutoPairs:
        return (
          <Image
            source={require('@/assets/images/paris.png')}
            style={{ width: 50, height: 50 }}
          />
        );
    }
  };

  return (
    <BaseModal title="商店" show={show} width={100} onClose={onClose}>
      <View
        className="flex-row items-center justify-between"
        style={{ width: '100%', marginBottom: 26 }}
      >
        <CoolText text="道具" style={styles.text} fontWeight="medium" />
        <View className="flex-row items-center">
          <Image
            source={require('@/assets/images/coin.png')}
            style={{ width: 32, height: 32, marginRight: 2 }}
          />
          <CoolText text={coins} style={styles.text} fontWeight="medium" />
        </View>
      </View>
      <View
        className="flex-row items-center justify-between"
        style={{ width: '100%', gap: 10 }}
      >
        {allItems.map(item => (
          <View className="items-center" key={item.type}>
            <View className="rounded-xl" style={styles.itemsContainer}>
              <View style={styles.item}>
                <CoolText
                  text={getItemInfo(item.type)?.quantity || 0}
                  className="text-white"
                  style={{ fontSize: 16 }}
                />
              </View>
              <View style={styles.level}>
                <CoolText
                  text={`Lv. ${getItemInfo(item.type)?.level || 1}`}
                  className="text-white"
                  style={{ fontSize: 14 }}
                />
              </View>
              {getItemIcon(item.type)}
            </View>
            <CoolText
              text={getItemInfo(item.type)?.name || ''}
              className="text-[#834B4B]"
              style={{ fontSize: 16, marginBottom: 20 }}
              fontWeight="medium"
            />
            <View className="mb-4">
              <CoolButton
                width={90}
                text={`用 ${item.upgradeGold} 金`}
                subText="升級"
                backgroundColor="#E3803E"
                onClick={onClose}
                fontSize={14}
              />
            </View>
            <CoolButton
              width={90}
              text={`用 ${item.purchaseGold} 金`}
              subText="購買"
              backgroundColor="#834B4B"
              onClick={onClose}
              fontSize={14}
            />
          </View>
        ))}
        <Animated.View
          entering={FadeIn}
          className="absolute bottom-0 bg-[#fff]"
          style={{
            width: '110%',
            position: 'absolute',
            bottom: -150,
            left: -15,
            backgroundColor: '#FFF1E5',
            borderRadius: 12,
            padding: 16,
          }}
        >
          <CoolText
            text="確定要使用 500 購買道具加時 5 秒嗎?"
            className="text-[#834B4B]"
            style={{ fontSize: 16, marginBottom: 16 }}
            fontWeight="medium"
          />
          <View className="flex-row justify-end" style={{ gap: 8 }}>
            <CoolButton
              width={80}
              height={40}
              text="取消"
              backgroundColor="#8E8E8E"
              onClick={onClose}
              fontSize={14}
            />
            <CoolButton
              width={80}
              height={40}
              text="購買"
              backgroundColor="#E3803E"
              onClick={onClose}
              fontSize={14}
            />
          </View>
        </Animated.View>
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
    height: 20,
    backgroundColor: '#C08A76',
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
});
