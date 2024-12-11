import { StyleSheet, TouchableOpacity, View } from 'react-native';

import CoolText from './CoolText';
import { Entypo, MaterialIcons } from '@expo/vector-icons';

const TabBar = ({ state, descriptors, navigation }: any) => {
  const primaryColor = '#834B4B';
  const greyColor = '#8E8E8E';

  const icons: any = {
    achievement: (props: any) => (
      <Entypo name="trophy" size={28} color={greyColor} {...props} />
    ),
    leaderboard: (props: any) => (
      <MaterialIcons
        name="leaderboard"
        size={28}
        color={greyColor}
        {...props}
      />
    ),
    settings: (props: any) => (
      <MaterialIcons name="settings" size={28} color={greyColor} {...props} />
    ),
    shop: (props: any) => (
      <Entypo name="shop" size={28} color={greyColor} {...props} />
    ),
    themes: (props: any) => (
      <Entypo name="game-controller" size={28} color={greyColor} {...props} />
    ),
  };

  return (
    <View style={styles.tabbar}>
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        // if ([''])

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            setTimeout(() => {
              navigation.navigate(route.name, route.params);
            }, 100);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.key}
            style={styles.tabbarItem}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
          >
            {icons[route.name]({
              color: isFocused ? primaryColor : greyColor,
            })}
            <CoolText
              text={label}
              fontWeight={isFocused ? 'bold' : 'medium'}
              style={{
                color: isFocused ? primaryColor : greyColor,
                fontSize: 12,
              }}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default TabBar;

const styles = StyleSheet.create({
  tabbar: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 40,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    borderRadius: 25,
    borderCurve: 'continuous',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
    shadowOpacity: 0.1,
  },
  tabbarItem: {
    paddingVertical: 12,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
});
