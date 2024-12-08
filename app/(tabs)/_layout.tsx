import { View } from 'react-native';
import Toast from 'react-native-toast-message';

import TabBar from '@/components/TabBar';

import { Tabs } from 'expo-router';

const MainLayout = () => {
  return (
    <View style={{ flex: 1, width: '100%', height: '100%' }}>
      <Tabs
        screenOptions={{
          sceneStyle: { backgroundColor: 'transparent' },
        }}
        tabBar={props => <TabBar {...props} />}
      >
        <Tabs.Screen
          name="themes"
          options={{ title: '主題', headerShown: false }}
        />
        <Tabs.Screen
          name="achievement"
          options={{ title: '成就', headerShown: false }}
        />
        <Tabs.Screen
          name="leaderboard"
          options={{ title: '排行', headerShown: false }}
        />
        <Tabs.Screen
          name="shop"
          options={{ title: '商店', headerShown: false }}
        />
        <Tabs.Screen
          name="settings"
          options={{ title: '設定', headerShown: false }}
        />
      </Tabs>
      <Toast />
    </View>
  );
};

export default MainLayout;
