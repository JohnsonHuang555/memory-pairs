import { Text } from 'react-native';
import AwesomeButton from 'react-native-really-awesome-button';

type CoolButtonProps = {
  text: string;
  width?: number;
  fontSize?: number;
  onClick: () => void;
  backgroundColor?: string;
  textColor?: string;
};

const CoolButton = ({
  text,
  width = 200,
  fontSize = 18,
  onClick,
  backgroundColor,
  textColor = '#FFF',
}: CoolButtonProps) => {
  return (
    <AwesomeButton
      raiseLevel={6}
      borderRadius={12}
      width={width}
      onPress={onClick}
      backgroundColor={backgroundColor}
    >
      <Text
        style={{ fontSize, color: textColor, fontFamily: 'GenSenRounded2TWB' }}
      >
        {text}
      </Text>
    </AwesomeButton>
  );
};

export default CoolButton;
