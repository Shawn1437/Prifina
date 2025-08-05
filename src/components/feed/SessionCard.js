import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Pin, Clock4, MessageSquare } from 'lucide-react-native';
import { colors, spacing } from '../../styles';
import { CustomText } from '../common';

const SessionCard = ({
  session,
  expanded,
  onToggleExpand,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.95}
      onPress={onToggleExpand}
      style={styles.sessionCard}
    >
      {/* Session header */}
      <View style={styles.sessionHeader}>
        <CustomText style={styles.sessionTitle}>{session.title}</CustomText>
        {session.isPinned && (
          <Pin size={18} color="#3B82F6" style={styles.pinIconContainer} />
        )}
      </View>
      {/* Session meta */}
      <View style={styles.sessionMeta}>
        <View style={styles.messagesContainer}>
          <MessageSquare size={13} color="#888" style={styles.messageIcon} />
          <CustomText style={styles.sessionMetaText}>{session.messages} messages</CustomText>
        </View>
        <View style={styles.timeContainer}>
          <Clock4 size={13} color="#888" style={styles.clockIcon} />
          <CustomText style={styles.sessionMetaText}>{session.time}</CustomText>
        </View>
      </View>
      {/* Session stats */}
      <View style={[styles.sessionStats, expanded ? styles.sessionStatsExpanded : styles.sessionStatsCollapsed]}>
        <View style={styles.sessionStatContainer}>
          <CustomText style={styles.sessionStatEmoji}>🧠</CustomText>
          <CustomText style={styles.sessionStatCount}>{session.hearts}</CustomText>
        </View>
        <View style={styles.sessionStatContainer}>
          <CustomText style={styles.sessionStatEmoji}>👍</CustomText>
          <CustomText style={styles.sessionStatCount}>{session.thumbsUp}</CustomText>
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

const styles = StyleSheet.create({
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
});

export default SessionCard;
