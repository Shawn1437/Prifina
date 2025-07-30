import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import SessionsScreen from './Sessions/SessionsScreen';
import TabNavigator from '@src/components/TabNavigator';
import BottomNavigation from '@src/components/BottomNavigation';

const MainScreen = () => {
  const [activeTab, setActiveTab] = useState('sessions');
  const [activeNav, setActiveNav] = useState('feeds');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleNavChange = (nav) => {
    setActiveNav(nav);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {activeTab === 'sessions' && <SessionsScreen />}
        {/* Add LiveFeed screen here when needed */}
      </View>
      
      <TabNavigator activeTab={activeTab} onTabChange={handleTabChange} />
      <BottomNavigation activeTab={activeNav} onTabChange={handleNavChange} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  content: {
    flex: 1,
  },
});

export default MainScreen; 