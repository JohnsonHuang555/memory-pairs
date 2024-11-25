import { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import CoolButton from '../CoolButton';
import CoolText from '../CoolText';
import BaseModal from './BaseModal';
import usePlayerStore from '@/stores/PlayerStore';
import { savePlayerData } from '@/utils/firebase/leaderboard';

type WelcomeModalProps = {
  show: boolean;
  onClose: () => void;
};

const WelcomeModal = ({ show, onClose }: WelcomeModalProps) => {
  const [playerName, setPlayerName] = useState('');
  const { updatePlayerInfo } = usePlayerStore();

  const handleInputChange = (value: string) => {
    setPlayerName(value);
  };

  const handleSubmit = async () => {
    const id = await savePlayerData(playerName, 0);
    if (id) {
      updatePlayerInfo(playerName, id);
      onClose();
    }
  };

  return (
    <BaseModal
      title="歡迎來玩"
      show={show}
      width={85}
      onClose={onClose}
      disabledBackdropPress
    >
      <View className="items-center" style={{ marginVertical: 4 }}>
        <View className="items-center">
          <CoolText
            text="-- 遊戲簡介 --"
            style={{ fontSize: 20, color: '#834B4B', marginBottom: 12 }}
            fontWeight="bold"
          />
        </View>
        <CoolText
          text="記憶極限是一款挑戰玩家記憶能力的翻牌遊戲。"
          style={[styles.content, { marginBottom: 12 }]}
        />
        <CoolText
          text="玩家需要在倒數計時內找出配對的卡片組，並依照不同的關卡主題挑戰更高的分數和星級。"
          style={styles.content}
        />
        <View style={{ marginVertical: 30 }}>
          <View className="flex-row justify-between">
            <CoolText
              text="玩家名稱"
              style={{ fontSize: 16, color: '#834B4B' }}
              fontWeight="medium"
            />
            <CoolText
              text={`${playerName.length}/10`}
              style={{ fontSize: 16, color: '#834B4B' }}
              fontWeight="medium"
            />
          </View>
          <TextInput
            style={{
              height: 40,
              width: 250,
              borderColor: 'gray',
              borderRadius: 8,
              borderWidth: 1,
              paddingHorizontal: 12,
              marginTop: 12,
              fontSize: 18,
            }}
            maxLength={10}
            onChangeText={handleInputChange}
            value={playerName}
            placeholder="請輸入玩家名稱"
          />
        </View>
        <CoolButton
          width={150}
          height={50}
          fontSize={20}
          text="確定"
          backgroundColor="#834B4B"
          onClick={() => {
            if (playerName) {
              handleSubmit();
            }
          }}
        />
      </View>
    </BaseModal>
  );
};

export default WelcomeModal;

const styles = StyleSheet.create({
  content: {
    fontSize: 16,
    color: '#834B4B',
    lineHeight: 22,
  },
});
