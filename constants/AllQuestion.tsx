import { Image } from 'expo-image';

export const imageList: { [key: string]: React.ReactNode } = {
  cat: (
    <Image
      source={require('@/assets/images/questions/cat.png')}
      style={{ width: 50, height: 50 }}
    />
  ),
  dog: (
    <Image
      source={require('@/assets/images/questions/dog.png')}
      style={{ width: 50, height: 50 }}
    />
  ),
  elephant: (
    <Image
      source={require('@/assets/images/questions/elephant.png')}
      style={{ width: 50, height: 50 }}
    />
  ),
  goat: (
    <Image
      source={require('@/assets/images/questions/goat.png')}
      style={{ width: 50, height: 50 }}
    />
  ),
  horse: (
    <Image
      source={require('@/assets/images/questions/horse.png')}
      style={{ width: 50, height: 50 }}
    />
  ),
  rabbit: (
    <Image
      source={require('@/assets/images/questions/rabbit.png')}
      style={{ width: 50, height: 50 }}
    />
  ),
};