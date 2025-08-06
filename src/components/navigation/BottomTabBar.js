import React from 'react';
import { View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Radio,
  Plus,
  BookText,
  Activity,
  Settings,
} from 'lucide-react-native';
import { colors, spacing } from '../../styles';
import { CustomText } from '../common';

const BottomTabBar = ({ state, descriptors, navigation }) => {
  const insets = useSafeAreaInsets();

  const getTabIcon = (routeName, isFocused) => {
    const iconColor = isFocused ? colors.primary : colors.gray;
    const iconSize = 24;

    switch (routeName) {
      case 'Feeds':
        return <Radio size={iconSize} color={iconColor} />;
      case 'AddNew':
        return <Plus size={iconSize} color={iconColor} />;
      case 'Blog':
        return <BookText size={iconSize} color={iconColor} />;
      case 'Usage':
        return <Activity size={iconSize} color={iconColor} />;
      case 'Improve':
        return <Settings size={iconSize} color={iconColor} />;
      default:
        return <Radio size={iconSize} color={iconColor} />;
    }
  };

  const getTabLabel = routeName => {
    switch (routeName) {
      case 'AddNew':
        return 'Add New';
      default:
        return routeName;
    }
  };

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : getTabLabel(route.name);

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
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
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tab}
            activeOpacity={0.7}
          >
            {getTabIcon(route.name, isFocused)}
            <CustomText
              variant="tabLabel"
              color={isFocused ? colors.primary : colors.gray}
              style={styles.tabLabel}
            >
              {label}
            </CustomText>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.lightGray,
    paddingTop: spacing.sm,
    ...Platform.select({
      ios: {
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  tabLabel: {
    marginTop: spacing.xs,
    textAlign: 'center',
  },
});

export default BottomTabBar;
