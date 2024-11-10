import { View } from 'react-native';
import AwesomeButton from 'react-native-really-awesome-button';

import CoolText from './CoolText';

type CoolButtonProps = {
  prefix?: any;
  text?: string;
  subText?: string;
  width?: number | null;
  height?: number;
  fontSize?: number;
  onClick: () => void;
  backgroundColor?: string;
  textColor?: string;
  fontWeight?: 'bold' | 'thin' | 'light' | 'medium' | 'regular';
  disabled?: boolean;
  raiseLevel?: number;
  borderRadius?: number;
};

const CoolButton = ({
  prefix,
  text,
  subText,
  width = null,
  height,
  fontSize = 22,
  onClick,
  backgroundColor = '#834B4B',
  textColor = '#FFF',
  fontWeight,
  disabled = false,
  raiseLevel = 4,
  borderRadius = 12,
}: CoolButtonProps) => {
  return (
    <AwesomeButton
      raiseLevel={raiseLevel}
      borderRadius={borderRadius}
      width={width}
      height={height}
      onPressOut={onClick}
      backgroundColor={backgroundColor}
      disabled={disabled}
    >
      {prefix}
      {text && <View className="items-center">
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
              marginTop: 6,
            }}
            text={subText}
            fontWeight="bold"
          />
        )}
      </View>}
    </AwesomeButton>
  );
};

export default CoolButton;
