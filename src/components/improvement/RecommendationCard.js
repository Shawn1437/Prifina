import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { CustomText } from '../common';
import { MessageSquare, TrendingUp, Target, MoveRight, Bookmark, Trash2 } from 'lucide-react-native';
import { colors } from '../../styles';

const ICON_MAP = {
  urgent: MessageSquare,
  trending: TrendingUp,
  target: Target,
};

const RecommendationCard = ({ 
  title, 
  desc, 
  urgent = false, 
  icon, 
  action, 
  onAction, 
  onBookmark, 
  onDelete 
}) => {
  const IconComponent = ICON_MAP[icon];

  return (
    <View style={urgent ? styles.cardUrgent : styles.card}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.iconWrap}>
            {IconComponent && <IconComponent size={24} color={colors.textSecondary} />}
          </View>
          {urgent && (
            <View style={styles.urgentBadge}>
              <CustomText style={styles.urgentBadgeText}>Urgent</CustomText>
            </View>
          )}
        </View>
        <CustomText style={styles.title}>{title}</CustomText>
        <CustomText style={styles.description}>{desc}</CustomText>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.actionContainer} onPress={onAction}>
            <CustomText style={styles.actionText}>{action}</CustomText>
            <MoveRight size={18} color={colors.primary} style={styles.actionIcon} />
          </TouchableOpacity>
          <View style={styles.actionsRow}>
            <TouchableOpacity onPress={onBookmark}>
              <Bookmark size={18} color={colors.textSecondary} style={styles.secondaryAction} />
            </TouchableOpacity>
            <TouchableOpacity onPress={onDelete}>
              <Trash2 size={18} color={colors.textSecondary} style={styles.secondaryAction} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 12,
    marginBottom: 15,
    shadowColor: '#1A1A1A',
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 1,
    borderWidth: 1,
    borderColor: '#E6E8EC',
    position: 'relative',
  },
  cardUrgent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFF6F6',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 12,
    marginBottom: 15,
    shadowColor: '#1A1A1A',
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 1,
    borderWidth: 1,
    borderColor: '#FFD6D6',
    position: 'relative',
    marginTop: 20,
  },
  content: {
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  iconWrap: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  urgentBadge: {
    position: 'absolute',
    top: -4,
    right: 0,
    backgroundColor: '#FF4D4F',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 2,
    zIndex: 2,
  },
  urgentBadgeText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
    letterSpacing: 0.2,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 6,
    color: colors.textPrimary,
  },
  description: {
    color: colors.textSecondary,
    fontSize: 14,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    justifyContent: 'space-between',
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    color: colors.primary,
    fontWeight: '500',
    fontSize: 16,
  },
  actionIcon: {
    marginLeft: 4,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  secondaryAction: {
    marginLeft: 12,
  },
});

export default RecommendationCard;
