import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { CustomText } from '../common';
import { Link, EyeOff } from 'lucide-react-native';
import { colors } from '../../styles';

const PublishedList = ({ published }) => (
  <View style={styles.draftsList}>
    {published.map((item, idx) => (
      <View
        key={item.id}
        style={[
          styles.publishedCard,
          { marginHorizontal: 16 },
          idx === 0 && { marginTop: 20 },
          idx === published.length - 1 && { marginBottom: 40 }
        ]}
      >
        <CustomText style={styles.publishedTitle}>{item.title}</CustomText>
        <CustomText style={styles.publishedTime}>{item.timeAgo}</CustomText>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.linkBtn}>
            <Link size={18} color="#3B82F6" style={{ marginRight: 6 }} />
            <CustomText style={styles.linkBtnText}>Copy Link</CustomText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.unpublishBtn}>
            <EyeOff size={18} color="#7B8493" style={{ marginRight: 6 }} />
            <CustomText style={styles.unpublishBtnText}>Unpublish</CustomText>
          </TouchableOpacity>
        </View>
      </View>
    ))}
  </View>
);
 
const styles = StyleSheet.create({
  draftsList: {
    // Add vertical padding if needed
  },
  publishedCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  publishedTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 2,
    color: '#222',
  },
  publishedTime: {
    color: '#888',
    fontSize: 13,
    marginBottom: 12,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
  },
  linkBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.tagsbg,
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 14,
    marginRight: 8,
  },
  linkBtnText: {
    color: colors.tagsText,
    fontWeight: '500',
    fontSize: 15,
  },
  unpublishBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F4F7FE',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 14,
  },
  unpublishBtnText: {
    color: '#7B8493',
    fontWeight: '500',
    fontSize: 15,
  },
});

export default PublishedList;
