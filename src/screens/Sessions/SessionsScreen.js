import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  ScrollView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { sessionsData, dummyData } from '@src/constants/db';

const SessionsScreen = ({ navigation }) => {
  const [selectedSession, setSelectedSession] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [expandedSessions, setExpandedSessions] = useState(new Set());

  const handleSessionPress = (item) => {
    const newExpanded = new Set(expandedSessions);
    if (newExpanded.has(item.id)) {
      newExpanded.delete(item.id);
    } else {
      newExpanded.add(item.id);
    }
    setExpandedSessions(newExpanded);
  };

  const handleViewFullContent = () => {
    setModalVisible(false);
    Alert.alert(
      'Session Details',
      `Opening detailed view for: ${selectedSession.title}`,
      [
        {
          text: 'View Full Content',
          onPress: () => {
            Alert.alert('Full Content', `This would show the complete content for "${selectedSession.title}" including all messages, reactions, and detailed information.`);
          }
        },
        {
          text: 'Cancel',
          style: 'cancel'
        }
      ]
    );
  };

  const getSessionDetails = (sessionId) => {
    return sessionsData.find(item => item.id === sessionId);
  };

  const renderSessionCard = ({ item }) => {
    const isExpanded = expandedSessions.has(item.id);
    const sessionDetails = getSessionDetails(item.id);

    return (
      <TouchableOpacity 
        style={styles.card}
        onPress={() => handleSessionPress(item)}
        activeOpacity={0.7}
      >
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          {item.pinned && (
            <Icon name="bookmark" size={16} color="#007AFF" style={styles.pinIcon} />
          )}
        </View>
        
        <View style={styles.cardMeta}>
          <View style={styles.metaItem}>
            <Icon name="message-circle" size={14} color="#666" />
            <Text style={styles.metaText}>{item.messages} messages</Text>
          </View>
          <View style={styles.metaItem}>
            <Icon name="clock" size={14} color="#666" />
            <Text style={styles.metaText}>{item.time}</Text>
          </View>
        </View>
        
        <View style={styles.reactions}>
          <View style={styles.reactionItem}>
            <Text style={styles.brainIcon}>🧠</Text>
            <Text style={styles.reactionCount}>{item.reactions.brain}</Text>
          </View>
          <View style={styles.reactionItem}>
            <Text style={styles.thumbIcon}>👍</Text>
            <Text style={styles.reactionCount}>{item.reactions.thumb}</Text>
          </View>
          {item.reactions.lightbulb && (
            <View style={styles.reactionItem}>
              <Text style={styles.lightbulbIcon}>💡</Text>
              <Text style={styles.reactionCount}>{item.reactions.lightbulb}</Text>
            </View>
          )}
        </View>

        {/* Nested Card - Show/Hide based on click */}
        {isExpanded && sessionDetails && (
          <View style={styles.nestedCard}>
            <View style={styles.nestedCardHeader}>
              <Text style={styles.nestedCardTitle}>{sessionDetails.heading}</Text>
              <Icon name="bookmark" size={16} color="#007AFF" style={styles.nestedPinIcon} />
            </View>
            <Text style={styles.nestedCardContent}>
              {sessionDetails.desc1}
            </Text>
            {sessionDetails.desc2 && (
              <Text style={styles.nestedCardContent}>
                {'\n'}{sessionDetails.desc2}
              </Text>
            )}
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={sessionsData}
        keyExtractor={item => item.id}
        renderItem={renderSessionCard}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />

      {/* Modal for Session Details */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Session Details</Text>
              <TouchableOpacity 
                onPress={() => setModalVisible(false)}
                style={styles.closeButton}
              >
                <Icon name="x" size={24} color="#666" />
              </TouchableOpacity>
            </View>
            
            {selectedSession && (
              <ScrollView style={styles.modalBody}>
                <View style={styles.detailCard}>
                  <View style={styles.detailHeader}>
                    <Text style={styles.detailTitle}>{selectedSession.title}</Text>
                    {selectedSession.pinned && (
                      <Icon name="bookmark" size={16} color="#007AFF" />
                    )}
                  </View>
                  
                  <View style={styles.detailMeta}>
                    <View style={styles.metaItem}>
                      <Icon name="message-circle" size={14} color="#666" />
                      <Text style={styles.metaText}>{selectedSession.messages} messages</Text>
                    </View>
                    <View style={styles.metaItem}>
                      <Icon name="clock" size={14} color="#666" />
                      <Text style={styles.metaText}>{selectedSession.time}</Text>
                    </View>
                  </View>
                  
                  <View style={styles.detailReactions}>
                    <View style={styles.reactionItem}>
                      <Text style={styles.brainIcon}>🧠</Text>
                      <Text style={styles.reactionCount}>{selectedSession.reactions.brain}</Text>
                    </View>
                    <View style={styles.reactionItem}>
                      <Text style={styles.thumbIcon}>👍</Text>
                      <Text style={styles.reactionCount}>{selectedSession.reactions.thumb}</Text>
                    </View>
                    {selectedSession.reactions.lightbulb && (
                      <View style={styles.reactionItem}>
                        <Text style={styles.lightbulbIcon}>💡</Text>
                        <Text style={styles.reactionCount}>{selectedSession.reactions.lightbulb}</Text>
                      </View>
                    )}
                  </View>
                  
                  <Text style={styles.detailDescription}>
                    This session contains detailed discussions and insights about {selectedSession.title.toLowerCase()}. 
                    Click below to view the complete content including all messages, reactions, and detailed information.
                  </Text>
                </View>
                
                <TouchableOpacity 
                  style={styles.viewFullButton}
                  onPress={handleViewFullContent}
                >
                  <Text style={styles.viewFullButtonText}>View Full Content</Text>
                  <Icon name="arrow-right" size={16} color="#fff" />
                </TouchableOpacity>
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    flex: 1,
    marginRight: 8,
  },
  pinIcon: {
    marginTop: 2,
  },
  cardMeta: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  metaText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  reactions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  reactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  brainIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  thumbIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  lightbulbIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  reactionCount: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  // Nested Card Styles
  nestedCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    marginTop: 8,
  },
  nestedCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  nestedCardTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    flex: 1,
    marginRight: 8,
    marginBottom: 10,
  },
  nestedPinIcon: {
    marginTop: 1,
  },
  nestedCardContent: {
    fontSize: 18,
    color: '#666',
    lineHeight: 20,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    margin: 20,
    maxHeight: '80%',
    width: '90%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
  closeButton: {
    padding: 4,
  },
  modalBody: {
    padding: 20,
  },
  detailCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  detailHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  detailTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    flex: 1,
    marginRight: 8,
  },
  detailMeta: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  detailReactions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  detailDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  viewFullButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewFullButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SessionsScreen; 