import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { CustomText } from '../common';
import { Upload, Camera, MessageSquare, PenTool, Target, MoveRight } from 'lucide-react-native';
import { colors } from '../../styles';

const ICON_MAP = {
  upload: Upload,
  photo: Camera,
  chat: MessageSquare,
  edit: PenTool,
  target: Target,
};

const TipCard = ({ icon, title, desc, tag, action, onClose, onAction }) => {
  const IconComponent = ICON_MAP[icon];

  return (
    <View style={styles.card}>
      <View style={styles.content}>
        <View style={styles.iconWrap}>
          {IconComponent && <IconComponent size={26} color={colors.textSecondary} />}
        </View>
        <CustomText style={styles.title}>{title}</CustomText>
        <CustomText style={styles.description}>{desc}</CustomText>
        <View style={styles.footer}>
          <CustomText style={styles.tag}>{tag}</CustomText>
          <TouchableOpacity style={styles.actionBtn} onPress={onAction}>
            <View style={styles.actionContent}>
              <CustomText style={styles.actionText}>{action}</CustomText>
              <MoveRight size={16} color={colors.primary} style={styles.actionIcon} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
        <CustomText style={styles.closeText}>✕</CustomText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 12,
    marginBottom: 14,
    shadowColor: '#1A1A1A',
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 1,
    borderWidth: 1,
    borderColor: '#E6E8EC',
    position: 'relative',
    borderLeftWidth: 4,
    borderLeftColor: '#7B8493',
  },
  content: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F4F5F7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    borderWidth: 1,
    borderColor: '#E6E8EC',
    marginBottom: 12,
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
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 18,
  },
  tag: {
    color: '#7B61FF',
    fontSize: 13,
    fontWeight: '500',
    backgroundColor: 'transparent',
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  actionBtn: {
    backgroundColor: colors.tagsbg,
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 3,
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 90,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E6E8EC',
  },
  actionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    color: colors.primary,
    fontWeight: '500',
    fontSize: 13,
    letterSpacing: 0.1,
  },
  actionIcon: {
    marginLeft: 4,
  },
  closeBtn: {
    position: 'absolute',
    top: 14,
    right: 14,
  },
  closeText: {
    color: colors.textSecondary,
    fontSize: 18,
    opacity: 0.5,
  },
});

export default TipCard;
