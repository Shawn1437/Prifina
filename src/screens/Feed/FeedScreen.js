import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import FeedCard from './FeedCard';
import SessionsScreen from '../Sessions/SessionsScreen';
import TabNavigator from '@src/components/TabNavigator';
import { dummyData } from '@src/constants/db';

const FeedScreen = () => {
  const [activeTab, setActiveTab] = useState('sessions');

  const handleTabChange = tab => {
    setActiveTab(tab);
  };

  const renderLiveFeed = () => (
    <FlatList
      data={dummyData}
      keyExtractor={item => item.id}
      renderItem={({ item }) => <FeedCard item={item} />}
      contentContainerStyle={styles.listContainer}
      showsVerticalScrollIndicator={false}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {activeTab === 'sessions' ? <SessionsScreen /> : renderLiveFeed()}
      </View>
      <TabNavigator activeTab={activeTab} onTabChange={handleTabChange} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
  },
  content: {
    flex: 1,
  },
  listContainer: {
    padding: 16,
  },
});

export default FeedScreen;
