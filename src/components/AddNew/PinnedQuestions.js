import React from 'react';
import { View, FlatList } from 'react-native';
import { Pin } from 'lucide-react-native';
import { CustomText, KnowledgeCard } from '../common';

const PinnedQuestions = ({ pinnedQuestions, onAddKnowledge, onUnpin, styles }) => {
  if (!pinnedQuestions.length) {
    return (
      <View style={styles.emptyContainer}>
        <View style={styles.emptyIconContainer}>
          <Pin size={48} color="#C1C7CD" />
        </View>
        <CustomText style={styles.emptyTitle}>No Pinned Interactions</CustomText>
        <CustomText style={styles.emptyDescription}>
          Pin interactions from the Feeds tab to improve{"\n"}your AI twin's responses
        </CustomText>
      </View>
    );
  }
  return (
    <FlatList
      data={pinnedQuestions}
      renderItem={({ item }) => (
        <KnowledgeCard
          title={item.title}
          description={item.description}
          pinned={item.pinned}
          timeAgo={item.timeAgo}
          knowledgeAdded={item.knowledgeAdded}
          onAddKnowledge={() => onAddKnowledge(item.id)}
          onUnpin={() => onUnpin(item.id)}
        />
      )}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default PinnedQuestions;
