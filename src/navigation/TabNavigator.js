import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabBar } from '../components/navigation';
import FeedScreen from '../screens/FeedScreen';
import AddNewScreen from '../screens/AddNewScreen';
import BlogScreen from '../screens/BlogScreen';
import UsageScreen from '../screens/UsageScreen';
import ImproveScreen from '../screens/ImproveScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={props => <BottomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Feeds"
    >
      <Tab.Screen
        name="Feeds"
        component={FeedScreen}
        options={{
          tabBarLabel: 'Feeds',
        }}
      />
      <Tab.Screen
        name="AddNew"
        component={AddNewScreen}
        options={{
          tabBarLabel: 'Add New',
        }}
      />
      <Tab.Screen
        name="Blog"
        component={BlogScreen}
        options={{
          tabBarLabel: 'Blog',
        }}
      />
      <Tab.Screen
        name="Usage"
        component={UsageScreen}
        options={{
          tabBarLabel: 'Usage',
        }}
      />
      <Tab.Screen
        name="Improve"
        component={ImproveScreen}
        options={{
          tabBarLabel: 'Improve',
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
