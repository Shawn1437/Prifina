/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FeedScreen from '../screens/Feed/FeedScreen';
import BlogScreen from '../screens/Blog/BlogScreen';
import AddNewScreen from '../screens/AddNew/AddNewScreen';
import UsageScreen from '../screens/Usage/UsageScreen';
import ImproveScreen from '../screens/Improve/ImproveScreen';
import Icon from 'react-native-vector-icons/Feather';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator 
      screenOptions={{ 
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#E5E5E5',
          paddingVertical: 8,
          paddingHorizontal: 16,
          height: 60,
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#666',
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '500',
        },
      }}
    >
      <Tab.Screen
        name="Feeds"
        component={FeedScreen}
        options={{
          tabBarLabel: 'Feeds',
          tabBarIcon: ({ color }) => (
            <Icon name="radio" size={20} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="AddNew"
        component={AddNewScreen}
        options={{
          tabBarLabel: 'Add New',
          tabBarIcon: ({ color }) => (
            <Icon name="plus" size={20} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Blog"
        component={BlogScreen}
        options={{
          tabBarLabel: 'Blog',
          tabBarIcon: ({ color }) => (
            <Icon name="file-text" size={20} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Usage"
        component={UsageScreen}
        options={{
          tabBarLabel: 'Usage',
          tabBarIcon: ({ color }) => (
            <Icon name="bar-chart-2" size={20} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Improve"
        component={ImproveScreen}
        options={{
          tabBarLabel: 'Improve',
          tabBarIcon: ({ color }) => (
            <Icon name="settings" size={20} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
