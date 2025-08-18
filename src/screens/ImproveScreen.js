import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { colors, spacing } from '../styles';
import { BottomTabSwitcher } from '../components/common';
import { 
  ImproveTabs, 
  TipCard, 
  HiddenSuggestionsSection, 
  RecommendationCard 
} from '../components/improvement';

const TABS = [
  { key: 'all', label: 'All' },
  { key: 'beginner', label: 'Beginner' },
  { key: 'content', label: 'Content' },
  { key: 'blogging', label: 'Blogging' },
  { key: 'features', label: 'Features' },
];

const tips = [
  {
    icon: 'upload',
    title: 'Add your first document',
    desc: `Upload a document or note to quickly boost your AI twin's knowledge base. This is one of the fastest ways to improve response quality. Supported formats include PDF, Word documents, text files, and images with text.`,
    tag: 'Content Improvement',
    action: 'Upload now',
  },
  {
    icon: 'photo',
    title: 'Try photo upload',
    desc: `Speed up knowledge entry by taking photos of notes, whiteboards, or documents. The AI can extract text from images and add it to your knowledge base automatically. Perfect for capturing meeting notes, whiteboard sessions, or handwritten content.`,
    tag: 'Feature Discovery',
    action: 'Try it',
  },
  {
    icon: 'chat',
    title: 'Pin and refine 2 sessions',
    desc: `Improve your twin's responses by adding knowledge to low-scoring interactions. When you pin conversations that didn't go well, you can add specific knowledge to help your AI twin handle similar questions better in the future.`,
    tag: 'Content Improvement',
    action: 'View sessions',
  },
  {
    icon: 'edit',
    title: 'Write your first blog post',
    desc: `Review the AI-generated draft about startup trends and publish your expertise. Your AI twin has created a draft based on your recent conversations and knowledge. Review, edit, and publish to start building your thought leadership.`,
    tag: 'Blogging',
    action: 'Review draft',
  },
  {
    icon: 'target',
    title: 'Update your public profile',
    desc: `Add a bio and expertise areas to help people discover your AI twin`,
    tag: 'Audience Engagement',
    action: 'Edit profile',
  },
];

const ImproveScreen = () => {
  const [activeTab, setActiveTab] = useState('Improve Tips');
  const [activeTipsTab, setActiveTipsTab] = useState('all');
  const [showHidden, setShowHidden] = useState(true);

  const handleTipAction = (tipIndex) => {
    console.log('Tip action clicked:', tipIndex);
  };

  const handleTipClose = (tipIndex) => {
    console.log('Tip closed:', tipIndex);
  };

  const handleRecommendationAction = (action) => {
    console.log('Recommendation action:', action);
  };

  const handleBookmark = (cardIndex) => {
    console.log('Bookmarked:', cardIndex);
  };

  const handleDelete = (cardIndex) => {
    console.log('Deleted:', cardIndex);
  };

  const smartRecommendations = [
    {
      title: '2 questions had low match scores',
      desc: 'Recent questions about "team hiring" and "product roadmaps" could use better responses',
      urgent: true,
      icon: 'urgent',
      action: 'Improve now',
    },
    {
      title: 'AI in education is trending',
      desc: 'This aligns with your expertise. Want to write about it?',
      icon: 'trending',
      action: 'Create post',
    },
    {
      title: 'Session saved 10x this week',
      desc: 'Your "Startup Fundraising" session is popular. Consider highlighting it.',
      icon: 'target',
      action: 'Highlight',
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        {/* Improve Tips Content */}
        {activeTab === 'Improve Tips' && (
          <ScrollView style={styles.tipsContainer} contentContainerStyle={{ paddingBottom: 120 }}>
            <ImproveTabs 
              tabs={TABS} 
              activeTab={activeTipsTab} 
              onTabChange={setActiveTipsTab} 
            />
            {tips.map((tip, idx) => (
              <TipCard
                key={idx}
                icon={tip.icon}
                title={tip.title}
                desc={tip.desc}
                tag={tip.tag}
                action={tip.action}
                onAction={() => handleTipAction(idx)}
                onClose={() => handleTipClose(idx)}
              />
            ))}
            <HiddenSuggestionsSection
              visible={showHidden}
              onToggle={() => setShowHidden(v => !v)}
            />
          </ScrollView>
        )}
        {/* Smart Recommendations Content */}
        {activeTab === 'Smart Recommendations' && (
          <ScrollView style={styles.tipsContainer} contentContainerStyle={{ paddingBottom: 90 }}>
            {smartRecommendations.map((recommendation, idx) => (
              <RecommendationCard
                key={idx}
                title={recommendation.title}
                desc={recommendation.desc}
                urgent={recommendation.urgent}
                icon={recommendation.icon}
                action={recommendation.action}
                onAction={() => handleRecommendationAction(recommendation.action)}
                onBookmark={() => handleBookmark(idx)}
                onDelete={() => handleDelete(idx)}
              />
            ))}
          </ScrollView>
        )}
      </View>
      <BottomTabSwitcher
        tabs={['Improve Tips', 'Smart Recommendations']}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  tipsContainer: {
    flex: 1,
    paddingHorizontal: 0,
    marginTop: 0,
  },
});

export default ImproveScreen;
