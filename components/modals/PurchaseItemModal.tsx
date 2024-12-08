import React from 'react';
import { View } from 'react-native';

import CoolButton from '../CoolButton';
import CoolText from '../CoolText';
import BaseModal from './BaseModal';
import { SelectedItem } from '@/app/(tabs)/shop';
import { ItemType } from '@/models/Item';

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
        <View className="flex-row" style={{ gap: 20 }}>
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
              if (selectedItem) {
                onUpgrade(selectedItem.type);
              }
            }}
            fontSize={14}
          />
          <CoolButton
            width={110}
            text={`用 ${selectedItem?.purchaseGold} 金`}
            subText="購買"
            backgroundColor="#834B4B"
            onClick={() => {
              if (selectedItem) {
                onPurchase(selectedItem.type);
              }
            }}
            fontSize={14}
          />
        </View>
      </View>
    </BaseModal>
  );
};

export default PurchaseItemModal;
