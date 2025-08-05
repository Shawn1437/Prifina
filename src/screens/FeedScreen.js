import React, { useState, useCallback } from 'react';
import { Modal, TouchableOpacity, Pressable } from 'react-native';
import {
  View,
  FlatList,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Pin, Clock4, MessageSquare } from 'lucide-react-native';
import { colors, spacing } from '../styles';
import { CustomText } from '../components/common';
import { FeedPost } from '../components/feed';
import { mockPosts } from '../data';
import SessionCard from '../components/feed/SessionCard';

// Example mock data for sessions
const mockSessions = [
  {
    id: 'session1',
    title: 'Startup Fundraising Strategy',
    messages: 6,
    time: '12m',
    isPinned: true,
    hearts: 8,
    thumbsUp: 4,
  },
  {
    id: 'session2',
    title: 'Product Management Fundamentals',
    messages: 4,
    time: '8m',
    isPinned: false,
    hearts: 6,
    thumbsUp: 2,
  },
];


const FeedScreen = () => {
  const [posts, setPosts] = useState(mockPosts);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState('Live Feed');
  const [expandedSessionIds, setExpandedSessionIds] = useState([]);

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
  )

  // Render for sessions cards (custom layout based on screenshot)
  const renderSession = ({ item }) => {
    const expanded = expandedSessionIds.includes(item.id);
    const toggleExpand = () => {
      setExpandedSessionIds(prev =>
        prev.includes(item.id)
          ? prev.filter(id => id !== item.id)
          : [...prev, item.id]
      );
    };
    return (
      <SessionCard
        session={item}
        expanded={expanded}
        onToggleExpand={toggleExpand}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {activeTab === 'Live Feed' && (
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
      )}
      {activeTab === 'Sessions' && (
        <FlatList
          data={mockSessions}
          renderItem={renderSession}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}



      {/* Segmented Tab Bar at the bottom (like ImproveScreen) */}
      <View style={styles.bottomButtonContainer}>
        <View style={styles.segmentedContainer}>
          <View
            style={[styles.segmentedBtn, activeTab === 'Live Feed' && styles.segmentedBtnActive]}
            onTouchEnd={() => setActiveTab('Live Feed')}
          >
            <CustomText style={activeTab === 'Live Feed' ? styles.segmentedBtnTextActive : styles.segmentedBtnText}>Live Feed</CustomText>
          </View>
          <View
            style={[styles.segmentedBtn, activeTab === 'Sessions' && styles.segmentedBtnActive]}
            onTouchEnd={() => setActiveTab('Sessions')}
          >
            <CustomText style={activeTab === 'Sessions' ? styles.segmentedBtnTextActive : styles.segmentedBtnText}>Sessions</CustomText>
          </View>
        </View>
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
  bottomButtonContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    marginBottom: -20, // Add a little margin at the bottom
  },
  segmentedContainer: {
    flexDirection: 'row',
    backgroundColor: '#F4F5F7',
    borderRadius: 12,
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
  },
  segmentedBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentedBtnActive: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  segmentedBtnText: {
    color: colors.textSecondary,
    fontWeight: '500',
    fontSize: 15,
  },
  segmentedBtnTextActive: {
    color: colors.textPrimary,
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export default FeedScreen;
