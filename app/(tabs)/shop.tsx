import { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import Toast from 'react-native-toast-message';

import CoolText from '@/components/CoolText';
import MainContainer from '@/components/MainContainer';
import PurchaseItemModal from '@/components/modals/PurchaseItemModal';
import PurchaseThemeModal from '@/components/modals/PurchaseThemeModal';
import { allItems } from '@/constants/AllItems';
import { allThemes } from '@/constants/AllThemes';
import { ItemType, PlayerItem } from '@/models/Item';
import { Theme } from '@/models/Theme';
import usePlayerStore from '@/stores/PlayerStore';
import { MaterialIcons } from '@expo/vector-icons';

import { Image } from 'expo-image';
import { useFocusEffect } from 'expo-router';

export type SelectedItem = Omit<PlayerItem, 'quantity'> & {
  name: string;
  description: string;
  quantity: number;
};

const ShopScreen = () => {
  const {
    coins,
    items,
    updatePlayerItem,
    purchaseThemeIds,
    updatePurchaseThemeIds,
  } = usePlayerStore();
  const [isLoading, setLoading] = useState(false);
  const [showPurchaseItemModal, setShowPurchaseItemModal] = useState(false);
  const [showPurchaseThemeModal, setShowPurchaseThemeModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<SelectedItem>();
  const [selectedTheme, setSelectedTheme] = useState<Theme>();

  useFocusEffect(
    useCallback(() => {
      setTimeout(() => {
        setLoading(false);
      }, 300);
      // Return a cleanup function if necessary
      return () => {
        setLoading(true);
      };
    }, []),
  );

  const getItemInfo = useCallback(
    (item: PlayerItem) => {
      let name = '';
      let description = '';
      switch (item.type) {
        case ItemType.AddTime:
          if (item?.level === 1) {
            name = `加時 10 秒`;
          } else {
            name = `加時 ${5 + item.level * 5} 秒`;
          }
          description = '增加關卡剩餘時間';
          break;
        case ItemType.ViewFirst:
          if (item?.level === 1) {
            name = `先看 1 秒`;
          } else {
            name = `先看 ${item.level * 1} 秒`;
          }
          description = '關卡開始前觀看牌底';
          break;
        case ItemType.AutoPairs:
          if (item?.level === 1) {
            name = `配對 1 組`;
          } else {
            name = `配對 ${item.level * 1} 組`;
          }
          description = '關卡開始後自動完成配對';
          break;
      }

      return {
        quantity: item.quantity,
        level: item.level,
        maxLevel: item.maxLevel,
        name,
        description,
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
            style={{ width: 60, height: 60 }}
          />
        );
      case ItemType.ViewFirst:
        return (
          <Image
            source={require('@/assets/images/icons/eye.png')}
            style={{ width: 60, height: 60 }}
          />
        );
      case ItemType.AutoPairs:
        return (
          <Image
            source={require('@/assets/images/icons/paris.png')}
            style={{ width: 60, height: 60 }}
          />
        );
    }
  };

  return (
    <MainContainer title="商店" showLeftIcon showQuestionIcon>
      <PurchaseItemModal
        show={showPurchaseItemModal}
        selectedItem={selectedItem}
        onClose={() => {
          setSelectedItem(undefined);
          setShowPurchaseItemModal(false)
        }}
        onPurchase={type => {
          Toast.show({
            type: 'success',
            visibilityTime: 1000,
            text1: '✅ 購買成功',
          });
          updatePlayerItem(type, 'purchase');
          setSelectedItem(undefined);
          setShowPurchaseItemModal(false);
        }}
        onUpgrade={type => {
          Toast.show({
            type: 'success',
            visibilityTime: 1000,
            text1: '⬆️ 升級成功',
          });
          updatePlayerItem(type, 'upgrade');
          setSelectedItem(undefined);
          setShowPurchaseItemModal(false);
        }}
      />
      <PurchaseThemeModal
        selectedTheme={selectedTheme}
        show={showPurchaseThemeModal}
        onClose={() => {
          setSelectedTheme(undefined);
          setShowPurchaseThemeModal(false)
        }}
        onPurchase={id => {
          Toast.show({
            type: 'success',
            visibilityTime: 1000,
            text1: '✅ 購買成功',
          });
          updatePurchaseThemeIds(id);
          setSelectedTheme(undefined);
          setShowPurchaseThemeModal(false);
        }}
      />
      {!isLoading ? (
        <Animated.View entering={FadeIn} exiting={FadeOut}>
          <View
            className="mb-6 flex-row items-center justify-end"
            style={{ gap: 16 }}
          >
            <View className="flex-row items-center">
              <Image
                source={require('@/assets/images/icons/coin-2.png')}
                style={{ width: 22, height: 22, marginRight: 6 }}
              />
              <CoolText
                text={coins}
                fontWeight="medium"
                style={{ fontSize: 20, color: '#834B4B' }}
              />
            </View>
          </View>
          <View
            style={{
              height: Dimensions.get('window').height - 280,
            }}
          >
            <View style={{ marginBottom: 20 }}>
              <CoolText
                text="道具"
                fontWeight="medium"
                style={{ fontSize: 20, color: '#834B4B', marginBottom: 16 }}
              />
              <View className="flex-row justify-between">
                {allItems.map(item => {
                  const currentItem = items.find(i => i.type === item.type);
                  if (!currentItem) return null;

                  const { quantity, level, maxLevel, name, description } =
                    getItemInfo(currentItem);

                  return (
                    <View
                      className="w-[31%] rounded-xl"
                      key={item.type}
                      style={[
                        {
                          height: 130,
                          backgroundColor: '#FFF',
                          shadowOffset: {
                            width: 0,
                            height: 4,
                          },
                          shadowOpacity: 0.2,
                        },
                      ]}
                    >
                      <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => {
                          setSelectedItem({
                            ...item,
                            level,
                            name: name || '',
                            description: description || '',
                            quantity,
                          });
                          setShowPurchaseItemModal(true);
                        }}
                      >
                        <View
                          className="items-center justify-center p-2"
                          style={{ width: '100%', height: '100%' }}
                        >
                          <View style={styles.itemQuantity}>
                            <CoolText
                              text={quantity || 0}
                              style={{ fontSize: 16, color: '#FFF' }}
                            />
                          </View>
                          {getItemIcon(item.type)}
                          <CoolText
                            text={
                              level >= maxLevel ? 'Max' : `Lv. ${level || 1}`
                            }
                            style={{
                              fontSize: 14,
                              marginVertical: 8,
                              color: '#D14343',
                            }}
                            fontWeight="bold"
                          />
                          <CoolText
                            text={name}
                            fontWeight="medium"
                            style={{
                              color: '#834B4B',
                              fontSize: 16,
                            }}
                          />
                        </View>
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </View>
            </View>
            <View style={{ marginBottom: 20 }}>
              <CoolText
                text="主題"
                fontWeight="medium"
                style={{ fontSize: 20, color: '#834B4B', marginBottom: 16 }}
              />
              <View className="flex-row justify-between">
                {allThemes
                  .filter(t => t.price)
                  .map(theme => {
                    const alreadyPurchase = purchaseThemeIds.find(
                      id => id === theme.id,
                    );

                    return (
                      <View
                        className="w-[31%] rounded-xl"
                        key={theme.type}
                        style={[
                          {
                            height: 130,
                            backgroundColor: '#FFF',
                            shadowOffset: {
                              width: 0,
                              height: 4,
                            },
                            shadowOpacity: 0.2,
                          },
                        ]}
                      >
                        <TouchableOpacity
                          activeOpacity={alreadyPurchase ? 1 : 0.7}
                          onPress={() => {
                            if (alreadyPurchase) return;
                            setSelectedTheme(theme);
                            setShowPurchaseThemeModal(true);
                          }}
                        >
                          <View
                            className="items-center justify-center p-2"
                            style={{ width: '100%', height: '100%' }}
                          >
                            <Image
                              source={theme.image}
                              style={{
                                width: 60,
                                height: 60,
                              }}
                            />
                            <CoolText
                              text={`$ ${String(theme.price)}`}
                              style={{
                                fontSize: 16,
                                marginVertical: 8,
                                color: '#D14343',
                              }}
                              fontWeight="bold"
                            />
                            <CoolText
                              text={theme.title}
                              fontWeight="medium"
                              style={{
                                color: '#834B4B',
                                fontSize: 16,
                              }}
                            />
                          </View>
                          {alreadyPurchase && (
                            <View
                              style={{
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                                borderRadius: 10,
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}
                            >
                              <MaterialIcons
                                name="check-circle"
                                color="#FFF"
                                size={30}
                              />
                              <CoolText
                                text="已購買"
                                fontWeight="medium"
                                style={{
                                  color: '#FFF',
                                  fontSize: 16,
                                  marginTop: 10,
                                }}
                              />
                            </View>
                          )}
                        </TouchableOpacity>
                      </View>
                    );
                  })}
              </View>
            </View>
          </View>
        </Animated.View>
      ) : (
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <ActivityIndicator size="large" />
        </View>
      )}
    </MainContainer>
  );
};

export default ShopScreen;

const styles = StyleSheet.create({
  itemQuantity: {
    position: 'absolute',
    right: -8,
    top: -8,
    width: 26,
    height: 26,
    backgroundColor: '#C94343',
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
