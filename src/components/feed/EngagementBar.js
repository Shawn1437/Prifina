import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Heart, ThumbsUp } from 'lucide-react-native';
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
        <Heart
          size={18}
          color={isHeartActive ? colors.heart : colors.gray}
          fill={isHeartActive ? colors.heart : 'transparent'}
        />
        <CustomText
          variant="caption"
          color={isHeartActive ? colors.heart : colors.gray}
          style={styles.engagementCount}
        >
          {formatEngagementCount(hearts)}
        </CustomText>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.engagementButton}
        onPress={onThumbsUpPress}
        activeOpacity={0.7}
      >
        <ThumbsUp
          size={18}
          color={isThumbsUpActive ? colors.thumbsUp : colors.gray}
          fill={isThumbsUpActive ? colors.thumbsUp : 'transparent'}
        />
        <CustomText
          variant="caption"
          color={isThumbsUpActive ? colors.thumbsUp : colors.gray}
          style={styles.engagementCount}
        >
          {formatEngagementCount(thumbsUp)}
        </CustomText>
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
    marginRight: spacing.lg,
  },
  engagementCount: {
    marginLeft: spacing.xs,
  },
});

export default EngagementBar;
