import { useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';

import BounceAnimation from '../BounceAnimation';
import CoolButton from '../CoolButton';
import CoolText from '../CoolText';
import BaseModal from './BaseModal';
import useLevelInfo, { gameMatchCount, gameTheme } from '@/hooks/useLevelInfo';
import { ItemType, UseItem } from '@/models/Item';
import useGameStore from '@/stores/GameStore';
import useLevelStore from '@/stores/LevelStore';
import usePlayerStore from '@/stores/PlayerStore';

import { useRouter } from 'expo-router';

type LevelSelectModalProps = {
  show: boolean;
  onClose: () => void;
};

const LevelSelectModal = ({ show, onClose }: LevelSelectModalProps) => {
  const { replace } = useRouter();
  const { setShowLevelModal } = useLevelStore();
  const { levelInfo } = useLevelInfo();
  const { items, updatePlayerItem } = usePlayerStore();
  const { setUseItems } = useGameStore();

  const [selectedItems, setSelectedItems] = useState<UseItem[]>([]);
  if (!levelInfo) return null;

  const { id, stars } = levelInfo;

  const getItemIcon = (type: ItemType) => {
    switch (type) {
      case ItemType.AddTime:
        return (
          <Image
            source={require('@/assets/images/timer.png')}
            style={{ width: 50, height: 50 }}
          />
        );
      case ItemType.ViewFirst:
        return (
          <Image
            source={require('@/assets/images/eye.png')}
            style={{ width: 50, height: 50 }}
          />
        );
      case ItemType.AutoPairs:
        return (
          <Image
            source={require('@/assets/images/paris.png')}
            style={{ width: 50, height: 50 }}
          />
        );
    }
  };

  return (
    <BaseModal
      title={`Level ${id}`}
      show={show}
      width={90}
      onClose={() => {
        setSelectedItems([]);
        onClose();
      }}
    >
      <View className="mb-6 flex-row" style={{ gap: 4 }}>
        {stars > 0 ? (
          <Image
            source={require('@/assets/images/yellow-star.png')}
            style={{
              width: 65,
              height: 65,
              marginTop: 24,
              transform: [{ rotate: '-25deg' }],
            }}
          />
        ) : (
          <Image
            source={require('@/assets/images/grey-star.png')}
            style={{
              width: 65,
              height: 65,
              marginTop: 24,
              transform: [{ rotate: '-25deg' }],
            }}
          />
        )}
        {stars > 1 ? (
          <Image
            source={require('@/assets/images/yellow-star.png')}
            style={{ width: 75, height: 75 }}
          />
        ) : (
          <Image
            source={require('@/assets/images/grey-star.png')}
            style={{ width: 75, height: 75 }}
          />
        )}
        {stars > 2 ? (
          <Image
            source={require('@/assets/images/yellow-star.png')}
            style={{
              width: 65,
              height: 65,
              marginTop: 24,
              transform: [{ rotate: '25deg' }],
            }}
          />
        ) : (
          <Image
            source={require('@/assets/images/grey-star.png')}
            style={{
              width: 65,
              height: 65,
              marginTop: 24,
              transform: [{ rotate: '25deg' }],
            }}
          />
        )}
      </View>
      <View className="items-center" style={{ marginBottom: 28 }}>
        <CoolText
          text="關卡"
          fontWeight="medium"
          className="mb-4"
          style={{ fontSize: 18, color: '#717171' }}
        />
        <CoolText
          text={`${gameTheme[levelInfo.theme]}, ${gameMatchCount[levelInfo.matchCount]}`}
          fontWeight="medium"
          style={{ fontSize: 22, color: '#834B4B' }}
        />
      </View>
      <View className="items-center" style={{ marginBottom: 28 }}>
        <CoolText
          text="使用道具"
          fontWeight="medium"
          className="mb-6"
          style={{ fontSize: 18, color: '#717171' }}
        />
        <View className="flex-row" style={{ gap: 16 }}>
          {items.map(item => {
            const currentType = selectedItems.find(
              selected => selected.type === item.type,
            );
            return (
              <BounceAnimation
                scaleValue={1.1}
                key={item.type}
                onPress={() => {
                  if (item.quantity > 0) {
                    if (currentType) {
                      setSelectedItems(state =>
                        state.filter(s => s.type !== item.type),
                      );
                    } else {
                      let value = 0;
                      switch (item.type) {
                        case ItemType.AddTime:
                          value = 5 + item.level * 5;
                          break;
                        case ItemType.ViewFirst:
                        case ItemType.AutoPairs:
                          value = item.level * 1;
                          break;
                      }

                      setSelectedItems(state => [
                        ...state,
                        { type: item.type, value },
                      ]);
                    }
                  }
                }}
              >
                <View
                  className="rounded-xl border"
                  style={[
                    styles.itemsContainer,
                    {
                      backgroundColor: currentType ? '#FCECAA' : '#FFFCF0',
                    },
                  ]}
                >
                  <View
                    style={[
                      styles.item,
                      {
                        backgroundColor: currentType ? '#78AD27' : '#C94343',
                      },
                    ]}
                  >
                    {currentType ? (
                      <Image
                        source={require('@/assets/images/check.png')}
                        style={{ width: 20, height: 20 }}
                      />
                    ) : (
                      <CoolText
                        text={item.quantity}
                        className="text-white"
                        style={{ fontSize: 16 }}
                      />
                    )}
                  </View>
                  {getItemIcon(item.type)}
                </View>
              </BounceAnimation>
            );
          })}
        </View>
      </View>
      <CoolButton
        width={150}
        height={50}
        fontSize={20}
        text="挑戰"
        backgroundColor="#834B4B"
        onClick={() => {
          if (selectedItems.length > 0) {
            selectedItems.forEach(selectedItem => {
              updatePlayerItem(selectedItem.type, 'use');
            });
          }
          setSelectedItems([]);
          setShowLevelModal(false);
          setUseItems(selectedItems);
          setTimeout(() => {
            replace('/playing');
          }, 200);
        }}
      />
    </BaseModal>
  );
};

export default LevelSelectModal;

const styles = StyleSheet.create({
  itemsContainer: {
    borderColor: '#C08A76',
    borderWidth: 3,
    padding: 4,
    position: 'relative',
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
});
