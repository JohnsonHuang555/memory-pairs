import { View } from 'react-native';
import Toast from 'react-native-toast-message';

import CoolButton from '../CoolButton';
import CoolText from '../CoolText';
import BaseModal from './BaseModal';
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

  return (
    <BaseModal title="主題" show={show} width={75} onClose={onClose}>
      <View className="items-center">
        <CoolText
          text={`確定要購買 <${selectedTheme?.title}>主題 ?`}
          fontWeight="medium"
          style={{ fontSize: 18, marginBottom: 20, color: '#834B4B' }}
        />
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
                Toast.show({
                  type: 'error',
                  visibilityTime: 1000,
                  text1: '💰 金幣不足',
                });
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
