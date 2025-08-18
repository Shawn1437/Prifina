import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Pin } from 'lucide-react-native';
import { colors, spacing } from '../../styles';
import { CustomText } from '../common';
import EngagementBar from './EngagementBar';
import { truncateText, getTimeAgo } from '../../utils';

const FeedPost = ({
  post,
  onPress,
  onBookmarkPress,
  onHeartPress,
  onThumbsUpPress,
}) => {
  const [isHeartActive, setIsHeartActive] = useState(false);
  const [isThumbsUpActive, setIsThumbsUpActive] = useState(false);
  const [heartCount, setHeartCount] = useState(post.engagements.hearts);
  const [thumbsUpCount, setThumbsUpCount] = useState(post.engagements.thumbsUp);

  const handleHeartPress = () => {
    const newState = !isHeartActive;
    setIsHeartActive(newState);
    setHeartCount(prev => (newState ? prev + 1 : prev - 1));
    onHeartPress && onHeartPress(post.id, newState);
  };

  const handleThumbsUpPress = () => {
    const newState = !isThumbsUpActive;
    setIsThumbsUpActive(newState);
    setThumbsUpCount(prev => (newState ? prev + 1 : prev - 1));
    onThumbsUpPress && onThumbsUpPress(post.id, newState);
  };

  const handleBookmarkPress = () => {
    onBookmarkPress && onBookmarkPress(post.id);
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress && onPress(post)}
      activeOpacity={0.95}
    >
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <CustomText variant="timestamp" style={styles.timestamp}>
            {getTimeAgo(post.timestamp)}
          </CustomText>
        </View>
        <TouchableOpacity
          onPress={handleBookmarkPress}
          style={styles.bookmarkButton}
        >
          <Pin
            size={20}
            color={post.isBookmarked ? colors.primary : colors.gray}
            fill={post.isBookmarked ? colors.primary : 'transparent'}
          />
        </TouchableOpacity>
      </View>

      <CustomText variant="postTitle" style={styles.title}>
        {post.title}
      </CustomText>

      <CustomText variant="postContent" style={styles.content}>
        {truncateText(post.content, 200)}
      </CustomText>

      <EngagementBar
        hearts={heartCount}
        thumbsUp={thumbsUpCount}
        onHeartPress={handleHeartPress}
        onThumbsUpPress={handleThumbsUpPress}
        isHeartActive={isHeartActive}
        isThumbsUpActive={isThumbsUpActive}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    padding: spacing.postPadding,
    marginHorizontal: spacing.cardMargin,
    marginVertical: spacing.sm,
    borderRadius: 12,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  headerContent: {
    flex: 1,
  },
  timestamp: {
    color: colors.textSecondary,
  },
  bookmarkButton: {
    padding: spacing.xs,
  },
  title: {
    marginBottom: spacing.sm,
  },
  content: {
    lineHeight: 22,
    color: colors.textPrimary,
  },
});

export default FeedPost;
