import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, spacing } from '../../styles';
import { CustomText } from '../common';
import { formatEngagementCount } from '../../utils';

const EngagementBar = ({
  hearts,
  thumbsUp,
  onHeartPress,
  onThumbsUpPress,
  isHeartActive = false,
  isThumbsUpActive = false,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.engagementButton}
        onPress={onHeartPress}
        activeOpacity={0.7}
      >
        <View style={styles.iconContainer}>
          <CustomText style={styles.emojiIcon}>🧠</CustomText>
          <CustomText
            variant="caption"
            color={isHeartActive ? colors.heart : colors.textSecondary}
            style={styles.engagementCount}
          >
            {formatEngagementCount(hearts)}
          </CustomText>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.engagementButton}
        onPress={onThumbsUpPress}
        activeOpacity={0.7}
      >
        <View style={styles.iconContainer}>
          <CustomText style={styles.emojiIcon}>👍</CustomText>
          <CustomText
            variant="caption"
            color={isThumbsUpActive ? colors.thumbsUp : colors.textSecondary}
            style={styles.engagementCount}
          >
            {formatEngagementCount(thumbsUp)}
          </CustomText>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.md,
  },
  engagementButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  engagementCount: {
    marginLeft: spacing.xs,
    fontSize: 13,
    fontWeight: '600',
  },
  iconContainer: {
    backgroundColor: '#F0F0F0',
    borderRadius: 22,
    paddingHorizontal: 10,
    paddingVertical: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emojiIcon: {
    fontSize: 14,
  },
});

export default EngagementBar;
