import { StyleSheet, View } from 'react-native';

import CoolText from '../CoolText';
import BaseModal from './BaseModal';

type GameRulesModalProps = {
  show: boolean;
  onClose: () => void;
};

const GameRulesModal = ({ show, onClose }: GameRulesModalProps) => {
  return (
    <BaseModal title="遊戲規則" show={show} width={85} onClose={onClose}>
      <View
        className="items-center"
        style={{ marginVertical: 4 }}
      >
        <View className="mb-4">
          <View className="items-center">
            <CoolText
              text="-- 玩法 --"
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
          <CoolText text="- 過關即可開啟下一個關卡" style={styles.rule} />
          <CoolText text="- 每十個關卡為挑戰關卡，難度提升" style={styles.rule} />
        </View>
        <View className="mb-4">
          <View className="items-center">
            <CoolText
              text="-- 計分 --"
              style={{ fontSize: 20, color: '#834B4B', marginBottom: 12 }}
              fontWeight="bold"
            />
          </View>
          <CoolText text="- 成功配對一組卡片，獲得 30 分" style={styles.rule} />
          <CoolText
            text="- 遊戲結束時每剩餘 1 秒額外獲得 5 分"
            style={styles.rule}
          />
          <CoolText text="- 連續成功配對可觸發 Combo" style={styles.rule} />
          <CoolText text="- 每 Combo 額外獲得 30 分" style={styles.rule} />
        </View>
        <View className="justify-start">
          <View className="items-center">
            <CoolText
              text="-- 道具 --"
              style={{ fontSize: 20, color: '#834B4B', marginBottom: 12 }}
              fontWeight="bold"
            />
          </View>
          <CoolText text="- 加時 - 增加關卡剩餘時間" style={styles.rule} />
          <CoolText text="- 提前查看 - 關卡開始前觀看牌底" style={styles.rule} />
          <CoolText text="- 隨機配對 - 關卡開始後自動完成配對" style={styles.rule} />
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
