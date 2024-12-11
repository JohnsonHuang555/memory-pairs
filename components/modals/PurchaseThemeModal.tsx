import { useMemo, useState } from 'react';
import { View } from 'react-native';
import Toast from 'react-native-toast-message';

import CoolButton from '../CoolButton';
import CoolText from '../CoolText';
import BaseModal from './BaseModal';
import { allLevels } from '@/constants/AllLevels';
import { Theme } from '@/models/Theme';
import usePlayerStore from '@/stores/PlayerStore';

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
  const { coins } = usePlayerStore();
  const [showCoinNotEnoughText, setShowCoinNotEnoughText] = useState(false);

  const levelsCount = useMemo(() => {
    return allLevels.filter(l => l.theme === selectedTheme?.type).length;
  }, [selectedTheme]);

  return (
    <BaseModal
      title="購買主題"
      show={show}
      width={75}
      onClose={() => {
        setShowCoinNotEnoughText(false);
        onClose();
      }}
    >
      <View className="items-center">
        <View className="flex-col" style={{ marginBottom: 20, gap: 16 }}>
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
            width={110}
            height={50}
            text="取消"
            backgroundColor="#C1C1C1"
            onClick={onClose}
            fontSize={18}
          />
          <CoolButton
            width={110}
            height={50}
            text="購買"
            backgroundColor="#834B4B"
            onClick={() => {
              if (!selectedTheme) return;
              if (selectedTheme?.price && coins < selectedTheme.price) {
                setShowCoinNotEnoughText(true);
                return;
              }
              onPurchase(selectedTheme.id);
            }}
            fontSize={18}
          />
        </View>
      </View>
    </BaseModal>
  );
};

export default PurchaseThemeModal;
