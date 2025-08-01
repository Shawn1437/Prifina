import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, spacing } from '../../styles';
import CustomText from './CustomText';
import CustomButton from './CustomButton';
import { Pin, Plus, ChevronDown, ChevronUp } from 'lucide-react-native';

const KnowledgeCard = ({
  title,
  description,
  pinned,
  timeAgo,
  knowledgeAdded,
  onAddKnowledge,
  onUnpin,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleCardPress = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <TouchableOpacity style={styles.card} onPress={handleCardPress} activeOpacity={0.7}>
      <View style={styles.header}>
        <CustomText variant="postTitle" style={styles.title} numberOfLines={2}>
          {title}
        </CustomText>
        <View style={styles.iconContainer}>
          {isExpanded ? (
            <ChevronUp size={20} color={colors.textSecondary} style={styles.chevronIcon} />
          ) : (
            <ChevronDown size={20} color={colors.textSecondary} style={styles.chevronIcon} />
          )}
          {pinned && (
            <TouchableOpacity onPress={(e) => {
              e.stopPropagation();
              onUnpin();
            }} style={styles.pinContainer}>
              <Pin
                size={20}
                color={colors.primary}
                fill={colors.primary}
                style={styles.pinIcon}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <CustomText 
        variant="postContent" 
        style={styles.description} 
        numberOfLines={isExpanded ? undefined : 2}
      >
        {description}
      </CustomText>
      <View style={[styles.footer, knowledgeAdded && styles.footerWithKnowledge]}>
        <CustomText variant="timestamp" style={styles.timeAgo}>
          {timeAgo}
        </CustomText>
        {knowledgeAdded && (
          <View style={styles.knowledgeAddedBox}>
            <CustomText variant="caption" style={styles.knowledgeAddedText}>
              Knowledge Added
            </CustomText>
          </View>
        )}
      </View>
      {!knowledgeAdded && (
        <TouchableOpacity 
          style={styles.addKnowledgeButton} 
          onPress={(e) => {
            e.stopPropagation();
            onAddKnowledge();
          }}
        >
          <Plus size={16} color="#4285F4" style={styles.plusIcon} />
          <CustomText style={styles.addKnowledgeButtonText}>Add Knowledge</CustomText>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
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
  iconContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  chevronIcon: {
    marginBottom: spacing.xs,
    marginLeft: spacing.sm,
  },
  pinContainer: {
    padding: spacing.xs,
    borderRadius: 4,
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
    marginBottom: spacing.md,
  },
  footerWithKnowledge: {
    marginBottom: 0,
  },
  timeAgo: {
    color: colors.textSecondary,
  },
  knowledgeAddedBox: {
    backgroundColor: '#4CAF50',
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  knowledgeAddedText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 12,
  },
  addKnowledgeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E8F0FE',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 16,
    width: '100%',
  },
  plusIcon: {
    marginRight: 8,
  },
  addKnowledgeButtonText: {
    color: '#4285F4',
    fontSize: 15,
    fontWeight: '600',
  },
});

export default KnowledgeCard; 