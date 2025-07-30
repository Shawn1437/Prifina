import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const FeedCard = ({ item }) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{item.question}</Text>
          <Text style={styles.desc}>{item.desc}</Text>
          <Text style={styles.desc1}>{item.desc1}</Text>
          <Text style={styles.desc2}>{item.desc2}</Text>
        </View>
        {item.pinned && <Icon name="bookmark" size={18} color="#444" />}
      </View>

      <View style={styles.footer}>
        <Text style={styles.reactions}>
          🧠 {item.reactions.brain} 👍 {item.reactions.thumb}
        </Text>
        <Text style={styles.meta}>{item.time}</Text>
      </View>
    </View>
  );
};

export default FeedCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 6,
    color: '#111',
  },
  desc: {
    fontSize: 15,
    color: '#555',
    marginBottom: 12,
  },
  desc1: {
    fontSize: 15,
    color: '#555',
    marginBottom: 12,
  },
  desc2: {
    fontSize: 15,
    color: '#555',
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  meta: {
    color: '#666',
    fontSize: 12,
  },
  reactions: {
    fontSize: 12,
    color: '#666',
  },
});
