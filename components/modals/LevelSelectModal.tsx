import { Image, StyleSheet, View } from 'react-native';

import BounceAnimation from '../BounceAnimation';
import CoolButton from '../CoolButton';
import CoolText from '../CoolText';
import BaseModal from './BaseModal';
import useLevelInfo, { gameMatchCount, gameTheme } from '@/hooks/useLevelInfo';

import { useRouter } from 'expo-router';

type LevelSelectModalProps = {
  show: boolean;
  onClose: () => void;
};

const LevelSelectModal = ({ show, onClose }: LevelSelectModalProps) => {
  const { push } = useRouter();
  const { levelInfo } = useLevelInfo();

  if (!levelInfo) return null;

  return (
    <BaseModal
      title={`Level ${levelInfo?.id}`}
      show={show}
      width={90}
      onClose={onClose}
    >
      <View className="mb-6 flex-row" style={{ gap: 4 }}>
        <Image
          source={require('@/assets/images/grey-star.png')}
          style={{
            width: 65,
            height: 65,
            marginTop: 24,
            transform: [{ rotate: '-25deg' }],
          }}
        />
        <Image
          source={require('@/assets/images/grey-star.png')}
          style={{ width: 75, height: 75 }}
        />
        <Image
          source={require('@/assets/images/grey-star.png')}
          style={{
            width: 65,
            height: 65,
            marginTop: 24,
            transform: [{ rotate: '25deg' }],
          }}
        />
      </View>
      <View className="items-center" style={{ marginBottom: 28 }}>
        <CoolText
          text="關卡"
          fontWeight="medium"
          className="mb-4"
          style={{ fontSize: 18, color: '#717171' }}
        />
        <CoolText
          text={`${gameTheme[levelInfo.theme]}, ${gameMatchCount[levelInfo.matchCount]}`}
          fontWeight="medium"
          style={{ fontSize: 22, color: '#834B4B' }}
        />
      </View>
      <View className="items-center" style={{ marginBottom: 28 }}>
        <CoolText
          text="使用道具"
          fontWeight="medium"
          className="mb-6"
          style={{ fontSize: 18, color: '#717171' }}
        />
        <View className="flex-row" style={{ gap: 16 }}>
          <BounceAnimation scaleValue={1.1}>
            <View className="rounded-xl border" style={styles.itemsContainer}>
              <View style={styles.item}>
                <CoolText
                  text={2}
                  className="text-white"
                  style={{ fontSize: 16 }}
                />
              </View>
              <Image
                source={require('@/assets/images/timer.png')}
                style={{ width: 50, height: 50 }}
              />
            </View>
          </BounceAnimation>
          <BounceAnimation scaleValue={1.1}>
            <View className="rounded-xl border" style={styles.itemsContainer}>
              <View style={styles.item}>
                <CoolText
                  text={2}
                  className="text-white"
                  style={{ fontSize: 16 }}
                />
              </View>
              <Image
                source={require('@/assets/images/eye.png')}
                style={{ width: 50, height: 50 }}
              />
            </View>
          </BounceAnimation>
          <BounceAnimation scaleValue={1.1}>
            <View className="rounded-xl border" style={styles.itemsContainer}>
              <View style={styles.item}>
                <CoolText
                  text={2}
                  className="text-white"
                  style={{ fontSize: 16 }}
                />
              </View>
              <Image
                source={require('@/assets/images/paris.png')}
                style={{ width: 50, height: 50 }}
              />
            </View>
          </BounceAnimation>
        </View>
      </View>
      <CoolButton
        width={150}
        height={50}
        fontSize={20}
        text="挑戰"
        backgroundColor="#834B4B"
        onClick={() => push('/playing')}
      />
    </BaseModal>
  );
};

export default LevelSelectModal;

const styles = StyleSheet.create({
  itemsContainer: {
    borderColor: '#C08A76',
    borderWidth: 3,
    backgroundColor: '#FFFCF0',
    padding: 4,
    position: 'relative',
  },
  item: {
    position: 'absolute',
    right: -13,
    top: -13,
    width: 26,
    height: 26,
    backgroundColor: '#C94343',
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
