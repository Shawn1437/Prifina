import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { dummyData } from '@src/constants/db';

const PinnedCard = ({ item, onAddKnowledge }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.titleContainer}>
          <TouchableOpacity 
            style={styles.expandButton}
            onPress={() => setIsExpanded(!isExpanded)}
          >
            <Icon 
              name={isExpanded ? "chevron-up" : "chevron-down"} 
              size={16} 
              color="#666" 
            />
          </TouchableOpacity>
          <Text style={styles.title}>{item.question}</Text>
        </View>
        <Icon name="bookmark" size={18} color="#007AFF" />
      </View>

      {isExpanded && (
        <View style={styles.expandedContent}>
          <Text style={styles.description}>{item.desc}</Text>
          <Text style={styles.description}>{item.desc1}</Text>
          <Text style={styles.description}>{item.desc2}</Text>
        </View>
      )}

      <View style={styles.cardFooter}>
        <Text style={styles.timestamp}>{item.time}</Text>
        <TouchableOpacity 
          style={styles.addKnowledgeButton}
          onPress={() => onAddKnowledge(item)}
        >
          <Icon name="plus" size={14} color="#007AFF" />
          <Text style={styles.addKnowledgeText}>Add Knowledge</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const PinnedScreen = () => {
  const pinnedData = dummyData.filter(item => item.pinned);

  const handleAddKnowledge = (item) => {
    // Handle adding knowledge logic here
    console.log('Adding knowledge for:', item.question);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <FlatList
          data={pinnedData}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <PinnedCard item={item} onAddKnowledge={handleAddKnowledge} />
          )}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
  },
  listContainer: {
    padding: 16,
  },
  card: {
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 12,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  expandButton: {
    marginRight: 8,
    padding: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
    lineHeight: 22,
  },
  expandedContent: {
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 8,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timestamp: {
    fontSize: 12,
    color: '#999',
  },
  addKnowledgeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 4,
  },
  addKnowledgeText: {
    fontSize: 12,
    color: '#007AFF',
    fontWeight: '500',
  },
});

export default PinnedScreen; 