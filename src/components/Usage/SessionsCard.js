import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CustomText } from '../common';

const SessionsCard = ({ sessions }) => (
  <View style={styles.sessionsCard}>
    <CustomText style={styles.sessionsTitle}>Most Saved Sessions</CustomText>
    {sessions.map((session, idx) => (
      <View key={idx} style={styles.sessionItem}>
        <CustomText style={styles.sessionTitle}>{session.title}</CustomText>
        <View style={styles.sessionMetaRow}>
          <CustomText style={styles.sessionMeta}>{session.saves} saves</CustomText>
          <CustomText style={styles.sessionMeta}>{session.reactions} reactions</CustomText>
        </View>
      </View>
    ))}
  </View>
);

const styles = StyleSheet.create({
  sessionsCard: {
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
  sessionsTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 16,
    color: '#222',
  },
  sessionItem: {
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F1F3',
    paddingBottom: 10,
  },
  sessionTitle: {
    fontWeight: '500',
    fontSize: 15,
    color: '#222',
    marginBottom: 6,
  },
  sessionMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  sessionMeta: {
    color: '#888',
    fontSize: 13,
    marginRight: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default SessionsCard;
