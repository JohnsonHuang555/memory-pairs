import { Text } from 'react-native';

type CoolButtonProps = {
  text: string;
  className?: string;
  fontFamily?: 'bold' | 'thin' | 'light' | 'medium' | 'regular';
};

const fontFamilyObj = {
  bold: 'GenSenRounded2TWB',
  thin: 'GenSenRounded2TWEL',
  light: 'GenSenRounded2TWL',
  medium: 'GenSenRounded2TWM',
  regular: 'GenSenRounded2TWR',
};

const CoolText = ({
  text,
  className,
  fontFamily = 'regular',
}: CoolButtonProps) => {
  return (
    <Text
      style={{ fontFamily: fontFamilyObj[fontFamily] }}
      className={className}
    >
      {text}
    </Text>
  );
};

export default CoolText;
