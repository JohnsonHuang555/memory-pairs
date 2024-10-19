import { Text } from 'react-native';

type CoolButtonProps = {
  text: string | number;
  className?: string;
  fontWeight?: 'bold' | 'thin' | 'light' | 'medium' | 'regular';
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
}: CoolButtonProps) => {
  return (
    <Text
      style={{ fontFamily: fontWeightObj[fontWeight] }}
      className={className}
    >
      {text}
    </Text>
  );
};

export default CoolText;
