import { StyleSheet, View } from 'react-native';

import CoolText from '../CoolText';
import BaseModal from './BaseModal';

type GameRulesProps = {
  show: boolean;
  onClose: () => void;
};

const GameRulesModal = ({ show, onClose }: GameRulesProps) => {
  return (
    <BaseModal title="遊戲規則" show={show} width={100} onClose={onClose}>
      <View
        className="items-center justify-between"
        style={{ marginVertical: 10 }}
      >
        <View className="mb-4 justify-between">
          <View className="items-center">
            <CoolText
              text="玩法"
              style={{ fontSize: 20, color: '#834B4B', marginBottom: 12 }}
              fontWeight="bold"
            />
          </View>
          <CoolText
            text="- 每次翻到相同卡片，成功配對即得分"
            style={styles.rule}
          />
          <CoolText
            text="- 計時結束或完成所有配對即遊戲結束"
            style={styles.rule}
          />
          <CoolText
            text="- 過關即可開啟下一個關卡"
            style={styles.rule}
          />
        </View>
        <View className="justify-start">
          <View className="items-center">
            <CoolText
              text="計分"
              style={{ fontSize: 20, color: '#834B4B', marginBottom: 12 }}
              fontWeight="bold"
            />
          </View>
          <CoolText
            text="- 成功配對一組卡片，獲得 30 分"
            style={styles.rule}
          />
          <CoolText
            text="- 遊戲結束時每剩餘 1 秒額外獲得 1 分"
            style={styles.rule}
          />
          <CoolText
            text="- 連續成功配對可觸發 Combo"
            style={styles.rule}
          />
          <CoolText
            text="- 每 Combo 額外獲得 30 分"
            style={styles.rule}
          />
        </View>
      </View>
    </BaseModal>
  );
};

export default GameRulesModal;

const styles = StyleSheet.create({
  rule: {
    fontSize: 16,
    color: '#834B4B',
    lineHeight: 22,
  },
  title: {
    fontSize: 24,
  },
});
