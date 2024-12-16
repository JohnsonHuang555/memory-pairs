import { Audio } from 'expo-av';
import { create } from 'zustand';

type SoundKey = 'cancel' | 'confirm' | 'common' | 'buy' | 'correct';

type AudioState = {
  sounds: any;
  loadSound: (key: SoundKey, file: any) => void;
  playSound: (key: SoundKey) => void;
  stopSound: (key: SoundKey) => void;
  unloadSound: (key: SoundKey) => void;
  unloadAllSounds: () => void;
};

const useAudioStore = create<AudioState>((set, get) => ({
  sounds: {}, // 用於存儲音效實例的對象

  // 加載音效
  loadSound: async (key, file) => {
    const { sounds } = get();
    if (sounds[key]) {
      console.log(`音效 "${key}" 已經加載`);
      return;
    }

    try {
      const { sound } = await Audio.Sound.createAsync(file);
      set(state => ({
        sounds: {
          ...state.sounds,
          [key]: sound,
        },
      }));
      console.log(`音效 "${key}" 加載成功`);
    } catch (error) {
      console.error(`加載音效 "${key}" 失敗:`, error);
    }
  },

  // 播放音效
  playSound: async key => {
    const { sounds } = get();
    const sound = sounds[key];
    if (sound) {
      await sound.stopAsync();
      await sound.setPositionAsync(0);
      await sound.playAsync();
    } else {
      console.log(`音效 "${key}" 未找到`);
    }
  },

  // 停止音效
  stopSound: async key => {
    const { sounds } = get();
    const sound = sounds[key];
    if (sound) {
      await sound.stopAsync();
    }
  },

  // 卸載音效
  unloadSound: async key => {
    const { sounds } = get();
    const sound = sounds[key];
    if (sound) {
      await sound.unloadAsync();
      set(state => {
        const newSounds = { ...state.sounds };
        delete newSounds[key];
        return { sounds: newSounds };
      });
      console.log(`音效 "${key}" 已卸載`);
    }
  },

  // 卸載所有音效
  unloadAllSounds: async () => {
    const { sounds } = get();
    for (const key in sounds) {
      await sounds[key].unloadAsync();
    }
    set({ sounds: {} });
    console.log('所有音效已卸載');
  },
}));

export default useAudioStore;
