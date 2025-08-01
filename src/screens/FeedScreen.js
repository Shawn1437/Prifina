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
        style={styles.sessionCard}
      >
        {/* Session header */}
        <View style={styles.sessionHeader}>
          <CustomText style={styles.sessionTitle}>{item.title}</CustomText>
          {item.isPinned && (
            <Pin size={18} color="#3B82F6" style={styles.pinIconContainer} />
          )}
        </View>
        {/* Session meta */}
        <View style={styles.sessionMeta}>
          <View style={styles.messagesContainer}>
            <MessageSquare size={13} color="#888" style={styles.messageIcon} />
            <CustomText style={styles.sessionMetaText}>{item.messages} messages</CustomText>
          </View>
          <View style={styles.timeContainer}>
            <Clock4 size={13} color="#888" style={styles.clockIcon} />
            <CustomText style={styles.sessionMetaText}>{item.time}</CustomText>
          </View>
        </View>
        {/* Session stats */}
        <View style={[styles.sessionStats, expanded ? styles.sessionStatsExpanded : styles.sessionStatsCollapsed]}>
          <View style={styles.sessionStatContainer}>
            <CustomText style={styles.sessionStatEmoji}>🧠</CustomText>
            <CustomText style={styles.sessionStatCount}>{item.hearts}</CustomText>
          </View>
          <View style={styles.sessionStatContainer}>
            <CustomText style={styles.sessionStatEmoji}>👍</CustomText>
            <CustomText style={styles.sessionStatCount}>{item.thumbsUp}</CustomText>
          </View>
        </View>
        {/* Expanded detailed card */}
        {expanded && (
          <View style={styles.expandedCard}>
            <View style={styles.expandedCardHeader}>
              <CustomText style={styles.expandedCardTitle}>When should I start fundraising?</CustomText>
              <Pin size={16} color="#3B82F6" style={styles.expandedCardPinContainer} />
            </View>
            <CustomText style={styles.expandedCardContent}>
              Start fundraising when you have clear traction and a compelling growth story. Ideally, you should begin the process 6-9 months before you actually need the money. This gives you time to build relationships with investors and negotiate from a position of strength.\n\nKey indicators you're ready: consistent month-over-month growth, product-market fit signals, a clear path to scale, and 12-18 months of runway remaining. Don't fundraise too early when you're still figuring out your business model.
            </CustomText>
            <CustomText style={styles.expandedCardTime}>2 hours ago</CustomText>
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
  // Session card styles
  sessionCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    marginHorizontal: spacing.md,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
    borderWidth: 1,
    borderColor: '#F2F2F2',
    position: 'relative',
  },
  sessionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  sessionTitle: {
    fontWeight: 'bold',
    fontSize: 17,
    flex: 1,
  },
  pinIcon: {
    fontSize: 18,
    color: '#3B82F6',
    marginLeft: 8,
  },
  pinIconContainer: {
    marginLeft: 8,
  },
  sessionMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    marginTop: 2,
  },
  sessionMetaText: {
    color: '#888',
    fontSize: 13,
    marginRight: 12,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  messagesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  messageIcon: {
    marginRight: 4,
  },
  clockIcon: {
    marginRight: 4,
  },
  sessionStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sessionStatsExpanded: {
    marginBottom: 10,
  },
  sessionStatsCollapsed: {
    marginBottom: 0,
  },
  sessionStatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  sessionStatContainer: {
    backgroundColor: '#F0F0F0',
    borderRadius: 22,
    paddingHorizontal: 8,
    paddingVertical: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  sessionStatEmoji: {
    fontSize: 12,
    marginRight: 4,
  },
  sessionStatCount: {
    fontSize: 13,
    color: '#888',
    fontWeight: '600',
  },
  // Expanded card styles
  expandedCard: {
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
  },
  expandedCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  expandedCardTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    flex: 1,
  },
  expandedCardPin: {
    fontSize: 16,
    color: '#3B82F6',
    marginLeft: 8,
  },
  expandedCardPinContainer: {
    marginLeft: 8,
  },
  expandedCardContent: {
    color: '#222',
    fontSize: 14,
    marginBottom: 8,
  },
  expandedCardTime: {
    color: '#B0B3B9',
    fontSize: 13,
    textAlign: 'right',
    marginTop: 8,
  },

  // ...existing code...
});

export default FeedScreen;
