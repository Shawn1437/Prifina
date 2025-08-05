import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CustomText, CustomButton } from '../common';
import { CreditCard, Send, Trash2 } from 'lucide-react-native';

const DraftsList = ({ drafts }) => (
  <View style={styles.draftsList}>
    {drafts.map((item, idx) => (
      <View
        key={item.id}
        style={[
          styles.card,
          { marginHorizontal: 16 },
          idx === 0 && { marginTop: 20 },
          idx === drafts.length - 1 && { marginBottom: 20 }
        ]}
      >
        <CustomText style={styles.title}>{item.title}</CustomText>
        <CustomText style={styles.subtitle}>{item.subtitle}</CustomText>
        <CustomText style={styles.timeAgo}>{item.timeAgo}</CustomText>
        <CustomText style={styles.content}>{item.content}</CustomText>
        <View style={styles.tagsRow}>
          {item.tags.map((tag) => (
            <View key={tag} style={styles.tag}><CustomText style={styles.tagText}>{tag}</CustomText></View>
          ))}
        </View>
        <CustomText style={styles.type}>{item.type}</CustomText>
        <View style={styles.cardActions}>
          <CustomButton
            style={styles.editBtn}
            textStyle={styles.editBtnText}
            title={null}
            children={
              <View style={styles.iconTextRow}>
                <CreditCard size={18} color="#8E8E93" style={styles.iconMarginRight} />
                <CustomText style={styles.editBtnText}>Edit</CustomText>
              </View>
            }
          />
          <CustomButton
            style={styles.publishBtn}
            textStyle={styles.publishBtnText}
            title={null}
            children={
              <View style={styles.iconTextRow}>
                <Send size={18} color="#fff" style={styles.iconMarginRight} />
                <CustomText style={styles.publishBtnText}>Publish</CustomText>
              </View>
            }
          />
          <View style={styles.deleteBtn}>
            <Trash2 size={20} color="#EF4444" />
          </View>
        </View>
      </View>
    ))}
  </View>
);

const styles = StyleSheet.create({
  draftsList: {
    // Add vertical padding if needed
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
    marginTop: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 17,
    marginBottom: 2,
    color: '#222',
  },
  subtitle: {
    color: '#888',
    fontSize: 13,
    marginBottom: 2,
  },
  timeAgo: {
    color: '#B0B3B9',
    fontSize: 12,
    marginBottom: 8,
    textAlign: 'right',
  },
  content: {
    color: '#222',
    fontSize: 15,
    marginBottom: 8,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  tag: {
    backgroundColor: '#E0E7FF',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginRight: 6,
    marginBottom: 4,
  },
  tagText: {
    color: '#2563EB',
    fontSize: 12,
  },
  type: {
    color: '#888',
    fontStyle: 'italic',
    fontSize: 13,
    marginBottom: 8,
    textAlign: 'right',
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  editBtn: {
    padding: 10,
    marginRight: 8,
    backgroundColor: '#F4F5F7',
  },
  editBtnText: {
    color: '#8E8E93',
    fontWeight: '600',
  },
  publishBtn: {
    flex: 2,
    marginRight: 8,
    backgroundColor: '#2563EB',
  },
  publishBtnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  iconTextRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconMarginRight: {
    marginRight: 6,
  },
  deleteBtn: {
    backgroundColor: '#F4F5F7',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
});

export default DraftsList;
