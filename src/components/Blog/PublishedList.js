import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CustomText } from '../common';

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
});

export default PublishedList;
