import { ReactNode, useCallback } from 'react';
import {
  Alert,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import CoolText from '../CoolText';
import BaseModal from './BaseModal';

type OpenURLButtonProps = {
  url: string;
  children: ReactNode;
};

const OpenURLButton = ({ url, children }: OpenURLButtonProps) => {
  const handlePress = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);

  return (
    <TouchableOpacity activeOpacity={1} onPress={handlePress}>
      {children}
    </TouchableOpacity>
  );
};

type InfoModalProps = {
  show: boolean;
  onClose: () => void;
};

const InfoModal = ({ show, onClose }: InfoModalProps) => {
  return (
    <BaseModal title="關於遊戲" show={show} width={85} onClose={onClose}>
      <View style={{ marginVertical: 4, width: '100%' }}>
        <View className="mb-4">
          <View className="items-center">
            <CoolText
              text="-- 版權與授權 --"
              style={{ fontSize: 20, color: '#834B4B', marginBottom: 12 }}
              fontWeight="bold"
            />
          </View>
          <ScrollView style={{ maxHeight: 300 }}>
            <View style={{ gap: 12 }}>
              <View className="flex-row" style={{ borderWidth: 2 }}>
                <Text>
                  <OpenURLButton url="https://www.pixellove.com/free-icons/line/simple/?ref=svgrepo.com">
                    <CoolText text="Pixellove" style={styles.fontContent} />
                  </OpenURLButton>
                </Text>
                {/* <CoolText
                  text="- Vectors and icons by"
                  style={styles.fontContent}
                />

                <CoolText
                  text=" in CC Attribution License via SVG Repo"
                  style={styles.fontContent}
                /> */}
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </BaseModal>
  );
};

export default InfoModal;

const styles = StyleSheet.create({
  fontContent: {
    fontSize: 16,
    color: '#834B4B',
    lineHeight: 22,
  },
});
