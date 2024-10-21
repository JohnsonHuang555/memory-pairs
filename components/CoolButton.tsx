import { View } from 'react-native';
import AwesomeButton from 'react-native-really-awesome-button';

import CoolText from './CoolText';

type CoolButtonProps = {
  prefix?: any;
  text: string;
  subText?: string;
  width?: number | null;
  fontSize?: number;
  onClick: () => void;
  backgroundColor?: string;
  textColor?: string;
  fontWeight?: 'bold' | 'thin' | 'light' | 'medium' | 'regular';
};

const CoolButton = ({
  prefix,
  text,
  subText,
  width = null,
  fontSize = 24,
  onClick,
  backgroundColor,
  textColor = '#FFF',
  fontWeight,
}: CoolButtonProps) => {
  return (
    <AwesomeButton
      raiseLevel={6}
      borderRadius={12}
      width={width}
      onPress={onClick}
      backgroundColor={backgroundColor}
    >
      {prefix}
      <View className="items-center">
        <CoolText
          style={{
            fontSize,
            color: textColor,
          }}
          text={text}
          fontWeight={fontWeight}
        />
        {subText && (
          <CoolText
            style={{
              fontSize,
              color: textColor,
              marginTop: 4,
            }}
            text={subText}
            fontWeight="bold"
          />
        )}
      </View>
    </AwesomeButton>
  );
};

export default CoolButton;
