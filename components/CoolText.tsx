import { StyleProp, Text, TextStyle } from 'react-native';

type CoolButtonProps = {
  text: string | number;
  className?: string;
  fontWeight?: 'bold' | 'thin' | 'light' | 'medium' | 'regular';
  style?: StyleProp<TextStyle>;
};

const fontWeightObj = {
  bold: 'GenSenRounded2TWB',
  thin: 'GenSenRounded2TWEL',
  light: 'GenSenRounded2TWL',
  medium: 'GenSenRounded2TWM',
  regular: 'GenSenRounded2TWR',
};

const CoolText = ({
  text,
  className,
  fontWeight = 'regular',
  style,
}: CoolButtonProps) => {
  return (
    <Text
      style={[style, { fontFamily: fontWeightObj[fontWeight] }]}
      className={className}
    >
      {text}
    </Text>
  );
};

export default CoolText;
