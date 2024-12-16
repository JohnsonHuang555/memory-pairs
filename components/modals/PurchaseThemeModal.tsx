import { useMemo, useRef, useState } from 'react';
import { View } from 'react-native';

import CoolButton from '../CoolButton';
import CoolText from '../CoolText';
import BaseModal from './BaseModal';
import { allLevels } from '@/constants/AllLevels';
import { Theme } from '@/models/Theme';
import useAudioStore from '@/stores/AudioStore';
import usePlayerStore from '@/stores/PlayerStore';

import { Image } from 'expo-image';

type PurchaseThemeModalProps = {
  selectedTheme?: Theme;
  show: boolean;
  onClose: () => void;
  onPurchase: (id: number) => void;
};

const PurchaseThemeModal = ({
  selectedTheme,
  show,
  onClose,
  onPurchase,
}: PurchaseThemeModalProps) => {
  const modalRef = useRef<any>(null);
  const { coins, isSoundOn } = usePlayerStore();
  const playSound = useAudioStore(state => state.playSound);
  const [showCoinNotEnoughText, setShowCoinNotEnoughText] = useState(false);

  const levelsCount = useMemo(() => {
    return allLevels.filter(l => l.theme === selectedTheme?.type).length;
  }, [selectedTheme]);

  return (
    <BaseModal
      title="購買主題"
      show={show}
      width={70}
      onClose={() => {
        setShowCoinNotEnoughText(false);
        onClose();
      }}
      ref={modalRef}
    >
      <View
        className="flex-col"
        style={{ marginTop: 10, marginBottom: 20, gap: 16, width: '80%' }}
      >
        <View className="flex-row items-center justify-between">
          <CoolText
            text="主題"
            fontWeight="medium"
            style={{ fontSize: 18, color: '#717171' }}
          />
          <CoolText
            text={selectedTheme?.title || ''}
            fontWeight="medium"
            style={{ fontSize: 20, color: '#834B4B' }}
          />
        </View>
        <View className="flex-row items-center justify-between">
          <CoolText
            text="關卡數"
            fontWeight="medium"
            style={{ fontSize: 18, color: '#717171' }}
          />
          <CoolText
            text={levelsCount}
            fontWeight="medium"
            style={{ fontSize: 20, color: '#834B4B' }}
          />
        </View>
        <View className="flex-row items-center justify-between">
          <CoolText
            text="價錢"
            fontWeight="medium"
            style={{ fontSize: 18, color: '#717171' }}
          />
          <View className="flex-row items-center">
            <Image
              source={require('@/assets/images/icons/coin-2.png')}
              style={{ width: 20, height: 20, marginRight: 8 }}
            />
            <CoolText
              text={selectedTheme?.price || 0}
              fontWeight="medium"
              style={{ fontSize: 20, color: '#834B4B' }}
            />
          </View>
        </View>
      </View>
      {showCoinNotEnoughText && (
        <CoolText
          text="金幣不足 !"
          fontWeight="bold"
          style={{ fontSize: 16, marginBottom: 20, color: '#D14343' }}
        />
      )}
      <View className="flex-row" style={{ gap: 12 }}>
        <CoolButton
          width={100}
          height={50}
          text="取消"
          backgroundColor="#C1C1C1"
          onClick={() => modalRef.current.close()}
          fontSize={18}
        />
        <CoolButton
          width={100}
          height={50}
          text="購買"
          backgroundColor="#834B4B"
          onClick={() => {
            if (selectedTheme?.price && coins < selectedTheme.price) {
              if (isSoundOn) {
                playSound('cancel');
              }
              setShowCoinNotEnoughText(true);
              return;
            }
            if (selectedTheme) {
              if (isSoundOn) {
                playSound('buy');
              }
              onPurchase(selectedTheme.id);
              modalRef.current.close();
            }
          }}
          fontSize={18}
        />
      </View>
    </BaseModal>
  );
};

export default PurchaseThemeModal;
