import React, { useState, useCallback } from 'react';
import { Modal, TouchableOpacity, Pressable } from 'react-native';
import {
  View,
  FlatList,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing } from '../styles';
import { CustomText } from '../components/common';
import { FeedPost } from '../components/feed';
import { mockPosts } from '../data';
import { CustomButton } from '../components/common';

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
  );

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
      <TouchableOpacity
        activeOpacity={0.95}
        onPress={toggleExpand}
        style={{
          backgroundColor: '#fff',
          borderRadius: 12,
          padding: 16,
          marginBottom: 12,
          shadowColor: '#000',
          shadowOpacity: 0.04,
          shadowRadius: 4,
          shadowOffset: { width: 0, height: 2 },
          elevation: 1,
          borderWidth: 1,
          borderColor: '#F2F2F2',
          position: 'relative',
        }}
      >
        {/* Session header */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2 }}>
          <CustomText style={{ fontWeight: 'bold', fontSize: 17, flex: 1 }}>{item.title}</CustomText>
          {item.isPinned && (
            <CustomText style={{ fontSize: 18, color: '#3B82F6', marginLeft: 8 }}>📌</CustomText>
          )}
        </View>
        {/* Session meta */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4, marginTop: 2 }}>
          <CustomText style={{ color: '#888', fontSize: 13, marginRight: 12 }}>{item.messages} messages</CustomText>
          <CustomText style={{ color: '#888', fontSize: 13 }}>⏰ {item.time}</CustomText>
        </View>
        {/* Session stats */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: expanded ? 10 : 0 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 16 }}>
            <CustomText style={{ fontSize: 16, marginRight: 4 }}>🧠</CustomText>
            <CustomText style={{ fontSize: 14, color: '#222' }}>{item.hearts}</CustomText>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <CustomText style={{ fontSize: 16, marginRight: 4 }}>👍</CustomText>
            <CustomText style={{ fontSize: 14, color: '#222' }}>{item.thumbsUp}</CustomText>
          </View>
        </View>
        {/* Expanded detailed card */}
        {expanded && (
          <View
            style={{
              backgroundColor: '#F7F8FA',
              borderRadius: 14,
              padding: 18,
              marginTop: 10,
              shadowColor: '#000',
              shadowOpacity: 0.04,
              shadowRadius: 4,
              shadowOffset: { width: 0, height: 2 },
              elevation: 1,
              borderWidth: 1,
              borderColor: '#E6E8EC',
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2 }}>
              <CustomText style={{ fontWeight: 'bold', fontSize: 16, flex: 1 }}>When should I start fundraising?</CustomText>
              <CustomText style={{ fontSize: 16, color: '#3B82F6', marginLeft: 8 }}>📌</CustomText>
            </View>
            <CustomText style={{ color: '#222', fontSize: 14, marginBottom: 8 }}>
              Start fundraising when you have clear traction and a compelling growth story. Ideally, you should begin the process 6-9 months before you actually need the money. This gives you time to build relationships with investors and negotiate from a position of strength.\n\nKey indicators you're ready: consistent month-over-month growth, product-market fit signals, a clear path to scale, and 12-18 months of runway remaining. Don't fundraise too early when you're still figuring out your business model.
            </CustomText>
            <CustomText style={{ color: '#B0B3B9', fontSize: 13, textAlign: 'right', marginTop: 8 }}>2 hours ago</CustomText>
          </View>
        )}
      </TouchableOpacity>
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

  // ...existing code...
});

export default FeedScreen;
