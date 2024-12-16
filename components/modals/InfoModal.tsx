import { ReactNode, useCallback } from 'react';
import {
  Alert,
  Linking,
  ScrollView,
  StyleSheet,
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
          <ScrollView style={{ maxHeight: 400 }}>
            <View style={{ marginBottom: 12 }}>
              <CoolText text="背景圖片" style={styles.fontContent} />
              <View className="flex-row">
                <CoolText
                  text="Design by"
                  style={[styles.fontContent, { marginRight: 4 }]}
                />
                <OpenURLButton url="www.freepik.com">
                  <CoolText text="Freepik" style={styles.fontContent} />
                </OpenURLButton>
              </View>
            </View>
            <View style={{ marginBottom: 12 }}>
              <CoolText text="傢俱關卡圖片" style={styles.fontContent} />
              <View className="flex-row">
                <CoolText
                  text="Design by"
                  style={[styles.fontContent, { marginRight: 4 }]}
                />
                <OpenURLButton url="https://dribbble.com/limastd?ref=svgrepo.com">
                  <CoolText text="Lima Studio" style={styles.fontContent} />
                </OpenURLButton>
              </View>
            </View>
            <View style={{ marginBottom: 12 }}>
              <CoolText text="智慧手錶關卡圖片" style={styles.fontContent} />
              <View className="flex-row">
                <CoolText
                  text="Design by"
                  style={[styles.fontContent, { marginRight: 4 }]}
                />
                <OpenURLButton url="https://www.dreamstime.com/sasalok_info?ref=svgrepo.com">
                  <CoolText
                    text="Sukho Kittiboonkul"
                    style={styles.fontContent}
                  />
                </OpenURLButton>
              </View>
            </View>
            <View style={{ marginBottom: 12 }}>
              <CoolText text="郵件關卡圖片" style={styles.fontContent} />
              <View className="flex-row">
                <CoolText
                  text="Design by"
                  style={[styles.fontContent, { marginRight: 4 }]}
                />
                <OpenURLButton url="http://www.ibrandify.com/?ref=svgrepo.com">
                  <CoolText text="Ibrandify" style={styles.fontContent} />
                </OpenURLButton>
              </View>
            </View>
            <View style={{ marginBottom: 12 }}>
              <CoolText text="摺紙關卡圖片" style={styles.fontContent} />
              <View className="flex-row">
                <CoolText
                  text="Design by"
                  style={[styles.fontContent, { marginRight: 4 }]}
                />
                <OpenURLButton url="https://dribbble.com/limastd?ref=svgrepo.com">
                  <CoolText text="Lima Studio" style={styles.fontContent} />
                </OpenURLButton>
              </View>
            </View>
            <View style={{ marginBottom: 12 }}>
              <CoolText text="城市建築關卡圖片" style={styles.fontContent} />
              <View className="flex-row">
                <CoolText
                  text="Design by"
                  style={[styles.fontContent, { marginRight: 4 }]}
                />
                <OpenURLButton url="https://dribbble.com/ppangg?ref=svgrepo.com">
                  <CoolText
                    text="Manthana Chaiwong"
                    style={styles.fontContent}
                  />
                </OpenURLButton>
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
