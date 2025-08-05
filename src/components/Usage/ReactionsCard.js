import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CustomText } from '../common';

const ReactionsCard = ({ reactions }) => (
  <View style={styles.reactionsCard}>
    <CustomText style={styles.reactionsTitle}>Reactions Breakdown</CustomText>
    <View style={styles.reactionsRow}>
      {reactions.map((reaction, idx) => (
        <View key={idx} style={styles.reactionBox}>
          <CustomText style={styles.reactionEmoji}>{reaction.emoji}</CustomText>
          <CustomText style={styles.reactionCount}>{reaction.count}</CustomText>
          <CustomText style={styles.reactionLabel}>{reaction.label}</CustomText>
        </View>
      ))}
    </View>
  </View>
);

const styles = StyleSheet.create({
  reactionsCard: {
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
  reactionsTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 16,
    color: '#222',
  },
  reactionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 0,
  },
  reactionBox: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '23%',
    backgroundColor: '#F8F9FB',
    borderRadius: 12,
    paddingVertical: 18,
    minHeight: 80,
    marginBottom: 10,
  },
  reactionEmoji: {
    fontSize: 22,
    marginBottom: 8,
    textAlign: 'center',
    width: '100%',
  },
  reactionCount: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#222',
    marginBottom: 2,
  },
  reactionLabel: {
    color: '#888',
    fontSize: 13,
  },
});

export default ReactionsCard;
