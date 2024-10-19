import {
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Modal from 'react-native-modal';

import CoolButton from '../CoolButton';

type LevelSelectModalProps = {
  show: boolean;
  onClose: () => void;
};

const LevelSelectModal = ({ show, onClose }: LevelSelectModalProps) => {
  return (
    <Modal isVisible={show}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View className="flex-1 items-center justify-center">
          <View className="items-center justify-center rounded-md bg-white">
            <Text className="mb-2 text-xl" style={{ marginTop: 10 }}>
              確定選擇此關卡
            </Text>
            <View>
            <CoolButton width={150} text="中文關卡" onClick={() => {}} />
            <CoolButton width={150} text="中文關卡" onClick={() => {}} />
            </View>
            {/* <TouchableOpacity onPress={onClose}>
              <Text>123</Text>
            </TouchableOpacity> */}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default LevelSelectModal;
