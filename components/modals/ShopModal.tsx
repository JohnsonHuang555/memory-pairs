import { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import Toast from 'react-native-toast-message';

import CoolButton from '../CoolButton';
import CoolText from '../CoolText';
import BaseModal from './BaseModal';
import { allItems } from '@/constants/AllItems';
import { ItemType, PlayerItem } from '@/models/Item';
import usePlayerStore from '@/stores/PlayerStore';

import { Image } from 'expo-image';

type ShopModalProps = {
  show: boolean;
  onClose: () => void;
};

type SelectedItem = {
  type: ItemType;
  price: number;
  action: 'purchase' | 'upgrade';
  name: string;
};

const ShopModal = ({ show, onClose }: ShopModalProps) => {
  const { coins, items, updatePlayerItem } = usePlayerStore();
  const [selectedItem, setSelectedItem] = useState<SelectedItem>();

  const getItemInfo = useCallback(
    (item: PlayerItem) => {
      let name = '';
      switch (item.type) {
        case ItemType.AddTime:
          if (item?.level === 1) {
            name = `加時 10 秒`;
          } else {
            name = `加時 ${5 + item.level * 5} 秒`;
          }
          break;
        case ItemType.ViewFirst:
          if (item?.level === 1) {
            name = `先看 1 秒`;
          } else {
            name = `先看 ${item.level * 1} 秒`;
          }
          break;
        case ItemType.AutoPairs:
          if (item?.level === 1) {
            name = `配對 1 組`;
          } else {
            name = `配對 ${item.level * 1} 組`;
          }
          break;
      }

      return {
        quantity: item.quantity,
        level: item.level,
        maxLevel: item.maxLevel,
        name,
      };
    },
    [items],
  );

  const getItemIcon = (type: ItemType) => {
    switch (type) {
      case ItemType.AddTime:
        return (
          <Image
            source={require('@/assets/images/icons/timer.png')}
            style={{ width: 50, height: 50 }}
          />
        );
      case ItemType.ViewFirst:
        return (
          <Image
            source={require('@/assets/images/icons/eye.png')}
            style={{ width: 50, height: 50 }}
          />
        );
      case ItemType.AutoPairs:
        return (
          <Image
            source={require('@/assets/images/icons/paris.png')}
            style={{ width: 50, height: 50 }}
          />
        );
    }
  };

  return (
    <BaseModal
      title="商店"
      show={show}
      width={90}
      onClose={() => {
        setSelectedItem(undefined);
        onClose();
      }}
    >
      <View
        className="flex-row items-center justify-between"
        style={{ width: '100%', marginBottom: 26 }}
      >
        <CoolText text="道具" style={styles.text} fontWeight="medium" />
        <View className="flex-row items-center">
          <Image
            source={require('@/assets/images/icons/coin-2.png')}
            style={{ width: 24, height: 24, marginRight: 4 }}
          />
          <CoolText text={coins} style={styles.text} fontWeight="medium" />
        </View>
      </View>
      <View
        className="flex-row items-center justify-between"
        style={{ width: '100%', gap: 10 }}
      >
        {allItems.map(item => {
          const currentItem = items.find(i => i.type === item.type);
          if (!currentItem)
            return <View className="items-center" key={item.type} />;

          const { quantity, level, maxLevel, name } = getItemInfo(currentItem);

          return (
            <View className="items-center" key={item.type}>
              <View className="rounded-xl" style={styles.itemsContainer}>
                <View style={styles.item}>
                  <CoolText
                    text={quantity || 0}
                    style={{ fontSize: 16, color: '#FFF' }}
                  />
                </View>
                <View style={styles.level}>
                  <CoolText
                    text={level === maxLevel ? 'Max' : `Lv. ${level || 1}`}
                    style={{ fontSize: 14, color: '#FFF' }}
                  />
                </View>
                {getItemIcon(item.type)}
              </View>
              <CoolText
                text={name || ''}
                className="text-[#834B4B]"
                style={{ fontSize: 16, marginBottom: 20 }}
                fontWeight="medium"
              />
              <View className="mb-4">
                <CoolButton
                  width={90}
                  text={`用 ${item.upgradeGold} 金`}
                  subText="升級"
                  backgroundColor={level === maxLevel ? '#C1C1C1' : '#E3803E'}
                  disabled={level === maxLevel}
                  onClick={() => {
                    setSelectedItem({
                      type: item.type,
                      action: 'upgrade',
                      price: item.upgradeGold,
                      name: name || '',
                    });
                  }}
                  fontSize={14}
                />
              </View>
              <CoolButton
                width={90}
                text={`用 ${item.purchaseGold} 金`}
                subText="購買"
                backgroundColor="#834B4B"
                onClick={() => {
                  setSelectedItem({
                    type: item.type,
                    action: 'purchase',
                    price: item.purchaseGold,
                    name: getItemInfo(currentItem).name || '',
                  });
                }}
                fontSize={14}
              />
            </View>
          );
        })}
        {selectedItem && (
          <Animated.View
            entering={FadeIn}
            className="absolute bottom-0 bg-[#fff]"
            style={{
              width: '115%',
              position: 'absolute',
              bottom: -150,
              left: -20,
              backgroundColor: '#FFF1E5',
              borderRadius: 12,
              padding: 16,
              borderColor: '#C08A76',
              borderWidth: 3,
            }}
          >
            <CoolText
              text={`確定使用 ${selectedItem.price} 金購買道具 <${selectedItem.name}> 嗎?`}
              className="text-[#834B4B]"
              style={{ fontSize: 16, marginBottom: 16 }}
              fontWeight="medium"
            />
            <View className="flex-row justify-between">
              <View className="flex-1 justify-center">
                {coins < selectedItem.price && (
                  <CoolText
                    text="金幣不足！"
                    fontWeight="bold"
                    className="text-[#D14343]"
                  />
                )}
              </View>
              <View className="flex-row" style={{ gap: 8 }}>
                <CoolButton
                  width={80}
                  height={40}
                  text="取消"
                  backgroundColor="#8E8E8E"
                  onClick={() => setSelectedItem(undefined)}
                  fontSize={14}
                />
                <CoolButton
                  width={80}
                  height={40}
                  disabled={coins < selectedItem.price}
                  text={selectedItem.action === 'purchase' ? '購買' : '升級'}
                  backgroundColor={
                    selectedItem.action === 'purchase' ? '#834B4B' : '#E3803E'
                  }
                  onClick={() => {
                    Toast.show({
                      type: 'success',
                      visibilityTime: 1000,
                      text1:
                        selectedItem.action === 'purchase'
                          ? '✅ 購買成功'
                          : '⬆️ 升級成功',
                    });
                    updatePlayerItem(selectedItem.type, selectedItem.action);
                    setSelectedItem(undefined);
                  }}
                  fontSize={14}
                />
              </View>
            </View>
          </Animated.View>
        )}
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
    width: 45,
    height: 20,
    backgroundColor: '#C08A76',
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
});
