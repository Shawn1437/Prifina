import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CustomText } from '../common';

const TopicsCard = ({ topics }) => (
  <View style={styles.topicsCard}>
    <CustomText style={styles.topicsTitle}>Most Common Discussion Topics</CustomText>
    {topics.map((topic, idx) => (
      <View key={idx} style={styles.topicItem}>
        <View style={styles.topicTextBlock}>
          <CustomText style={styles.topicTitle}>{topic.title}</CustomText>
          <CustomText style={styles.topicSub}>{topic.sub}</CustomText>
        </View>
        <View style={styles.topicPercent}><CustomText style={styles.topicPercentText}>{topic.percent}</CustomText></View>
      </View>
    ))}
  </View>
);

const styles = StyleSheet.create({
  topicsCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 18,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F0F1F3',
  },
  topicsTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 16,
    color: '#222',
  },
  topicItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  topicTextBlock: {
    flex: 1,
  },
  topicTitle: {
    fontWeight: '500',
    fontSize: 15,
    color: '#222',
  },
  topicSub: {
    color: '#888',
    fontSize: 13,
    marginTop: 2,
  },
  topicPercent: {
    backgroundColor: '#ECEEF2',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginLeft: 12,
    minWidth: 38,
    alignItems: 'center',
  },
  topicPercentText: {
    color: '#888',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default TopicsCard;
