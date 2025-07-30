import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, spacing } from '../../styles';
import CustomText from './CustomText';
import CustomButton from './CustomButton';
import { Bookmark } from 'lucide-react-native';

const KnowledgeCard = ({
  title,
  description,
  pinned,
  timeAgo,
  knowledgeAdded,
  onAddKnowledge,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <CustomText variant="postTitle" style={styles.title} numberOfLines={2}>
          {title}
        </CustomText>
        {pinned && (
          <Bookmark
            size={20}
            color={colors.primary}
            fill={colors.primary}
            style={styles.pinIcon}
          />
        )}
      </View>
      <CustomText variant="postContent" style={styles.description} numberOfLines={2}>
        {description}
      </CustomText>
      <View style={styles.footer}>
        <CustomText variant="timestamp" style={styles.timeAgo}>
          {timeAgo}
        </CustomText>
        {knowledgeAdded ? (
          <View style={styles.knowledgeAddedBox}>
            <CustomText variant="caption" style={styles.knowledgeAddedText}>
              Knowledge Added
            </CustomText>
          </View>
        ) : (
          <CustomButton
            title="+ Add Knowledge"
            onPress={onAddKnowledge}
            variant="outline"
            size="small"
            style={styles.addButton}
            textStyle={styles.addButtonText}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.lg,
    marginVertical: spacing.sm,
    marginHorizontal: spacing.cardMargin,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  title: {
    flex: 1,
    marginRight: spacing.sm,
  },
  pinIcon: {
    marginLeft: spacing.sm,
    marginTop: 2,
  },
  description: {
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  timeAgo: {
    color: colors.textSecondary,
  },
  knowledgeAddedBox: {
    backgroundColor: colors.secondary,
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  knowledgeAddedText: {
    color: colors.white,
    fontWeight: '600',
    fontSize: 13,
  },
  addButton: {
    minWidth: 120,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
    height: 32,
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
});

export default KnowledgeCard; 