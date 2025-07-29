import React, { useState, useCallback } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing } from '../styles';
import { CustomText } from '../components/common';
import { FeedPost } from '../components/feed';
import { mockPosts } from '../data';
import FeedTabBar from '../components/common/FeedTabBar';

const FeedScreen = () => {
  const [posts, setPosts] = useState(mockPosts);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState('Live Feed');

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const handlePostPress = post => {
    console.log('Post pressed:', post.title);
  };

  const handleBookmarkPress = postId => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId
          ? { ...post, isBookmarked: !post.isBookmarked }
          : post,
      ),
    );
  };

  const handleHeartPress = (postId, isActive) => {
    console.log('Heart pressed:', postId, isActive);
  };

  const handleThumbsUpPress = (postId, isActive) => {
    console.log('Thumbs up pressed:', postId, isActive);
  };

  const renderPost = ({ item }) => (
    <FeedPost
      post={item}
      onPress={handlePostPress}
      onBookmarkPress={handleBookmarkPress}
      onHeartPress={handleHeartPress}
      onThumbsUpPress={handleThumbsUpPress}
    />
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary}
            colors={[colors.primary]}
          />
        }
        showsVerticalScrollIndicator={false}
      />
      {/* Stick FeedTabBar to the bottom above navigation tabs */}
      <View style={styles.tabBarContainer}>
        <FeedTabBar activeTab={activeTab} setActiveTab={setActiveTab} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContainer: {
    paddingVertical: spacing.sm,
  },
  tabBarContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 60, // Adjust this value to match your bottom tab bar height
    backgroundColor: 'transparent',
    zIndex: 10,
  },
});

export default FeedScreen;
