import { Text } from 'react-native';
import AwesomeButton from 'react-native-really-awesome-button';

import { Ionicons } from '@expo/vector-icons';

type CoolButtonProps = {
  icon?: any;
  text: string;
  width?: number;
  iconSize?: number;
  fontSize?: number;
  onClick: () => void;
};

const CoolButton = ({
  icon,
  text,
  width = 200,
  iconSize = 24,
  fontSize = 18,
  onClick,
}: CoolButtonProps) => {
  return (
    <AwesomeButton raiseLevel={6} width={width} onPress={onClick}>
      <Ionicons name={icon} size={iconSize} />
      <Text
        style={{ fontSize, marginLeft: 8, fontFamily: 'GenSenRounded2TWB' }}
      >
        {text}
      </Text>
    </AwesomeButton>
  );
};

export default CoolButton;
