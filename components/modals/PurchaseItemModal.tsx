import React from 'react';
import { View } from 'react-native';
import Toast from 'react-native-toast-message';

import CoolButton from '../CoolButton';
import CoolText from '../CoolText';
import BaseModal from './BaseModal';
import { SelectedItem } from '@/app/(tabs)/shop';
import { ItemType } from '@/models/Item';
import usePlayerStore from '@/stores/PlayerStore';

type PurchaseItemModalProps = {
  selectedItem?: SelectedItem;
  show: boolean;
  onClose: () => void;
  onPurchase: (itemType: ItemType) => void;
  onUpgrade: (itemType: ItemType) => void;
};

const PurchaseItemModal = ({
  selectedItem,
  show,
  onClose,
  onPurchase,
  onUpgrade,
}: PurchaseItemModalProps) => {
  const { coins } = usePlayerStore();

  return (
    <BaseModal
      title={selectedItem?.name || ''}
      show={show}
      width={75}
      onClose={onClose}
    >
      <View className="items-center">
        <CoolText
          text="道具效果"
          style={{ fontSize: 16, marginBottom: 16, color: '#834B4B' }}
        />
        <CoolText
          text={selectedItem?.description || ''}
          fontWeight="medium"
          style={{ fontSize: 18, marginBottom: 20, color: '#834B4B' }}
        />
        <View className="flex-row" style={{ gap: 12 }}>
          <CoolButton
            width={110}
            text={`用 ${selectedItem?.upgradeGold} 金`}
            subText="升級"
            backgroundColor={
              selectedItem?.level === selectedItem?.maxLevel
                ? '#C1C1C1'
                : '#E3803E'
            }
            onClick={() => {
              if (selectedItem && coins < selectedItem.upgradeGold) {
                Toast.show({
                  type: 'error',
                  visibilityTime: 1000,
                  text1: '💰 金幣不足',
                });
                return;
              }

              if (selectedItem && selectedItem.level < selectedItem.maxLevel) {
                onUpgrade(selectedItem.type);
              }
            }}
            disabled={selectedItem?.level === selectedItem?.maxLevel}
            fontSize={14}
          />
          <CoolButton
            width={110}
            text={`用 ${selectedItem?.purchaseGold} 金`}
            subText="購買"
            backgroundColor={
              (selectedItem?.quantity || 0) === 99 ? '#C1C1C1' : '#834B4B'
            }
            onClick={() => {
              if (selectedItem && coins < selectedItem.purchaseGold) {
                Toast.show({
                  type: 'error',
                  visibilityTime: 1000,
                  text1: '💰 金幣不足',
                });
                return;
              }

              if (selectedItem && selectedItem.quantity) {
                onPurchase(selectedItem.type);
              }
            }}
            disabled={(selectedItem?.quantity || 0) === 99}
            fontSize={14}
          />
        </View>
      </View>
    </BaseModal>
  );
};

export default PurchaseItemModal;
