import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { colors } from '../styles';
import { BottomTabSwitcher } from '../components/common';
import DraftsList from '../components/Blog/DraftsList';
import PublishedList from '../components/Blog/PublishedList';
import SettingsCard from '../components/Blog/SettingsCard';

const mockDrafts = [
  {
    id: '1',
    title: 'The Future of AI in Startup Operations',
    subtitle: 'Trending topic: AI in business',
    timeAgo: '2 hours ago',
    content: 'As AI continues to evolve, startups are finding innovative ways to leverage these technologies to streamline operations and accelerate growth...',
    tags: ['AI', 'Startups', 'Operations'],
    type: 'Thought Leadership',
    status: 'draft',
  },
  {
    id: '2',
    title: 'Building Product-Market Fit: Lessons from 100+ Startups',
    subtitle: 'New knowledge added',
    timeAgo: '1 day ago',
    content: 'After analyzing patterns from successful and failed startups, several key principles emerge for achieving true product-market fit...',
    tags: ['Product Management', 'Startups'],
    type: 'Analytical',
    status: 'draft',
  },
  {
    id: '3',
    title: 'The Metrics That Matter for SaaS Growth',
    subtitle: 'Pinned interaction insights',
    timeAgo: '3 days ago',
    content: 'While vanity metrics can make you feel good, focusing on the right KPIs is crucial for sustainable SaaS business growth...',
    tags: ['SaaS', 'Growth', 'Metrics'],
    type: 'Educational',
    status: 'draft',
  },
];

const mockPublished = [
  {
    id: '1',
    title: 'Why Most Startups Fail at Fundraising',
    timeAgo: '1 week ago',
  },
  {
    id: '2',
    title: 'The Rise of No-Code Solutions in 2024',
    timeAgo: '2 weeks ago',
  },
];

const BlogScreen = () => {
  const [activeTab, setActiveTab] = useState('Drafts');
  // Settings state
  const [enableBlogging, setEnableBlogging] = useState(true);
  const [autoDraft, setAutoDraft] = useState('Weekly');
  const [sendDraftsEmail, setSendDraftsEmail] = useState(true);
  const [writingStyle, setWritingStyle] = useState('Conversational');
  const [targetAudience, setTargetAudience] = useState('Startup Founders');
  const [perspective, setPerspective] = useState('Lessons learned');

  return (
    <SafeAreaView style={styles.container}>
      {activeTab === 'Settings' ? (
        <ScrollView contentContainerStyle={{ paddingBottom: 20,marginHorizontal:16 ,paddingTop: 16 }} showsVerticalScrollIndicator={false}>
          <SettingsCard
            enableBlogging={enableBlogging}
            setEnableBlogging={setEnableBlogging}
            autoDraft={autoDraft}
            setAutoDraft={setAutoDraft}
            sendDraftsEmail={sendDraftsEmail}
            setSendDraftsEmail={setSendDraftsEmail}
            writingStyle={writingStyle}
            setWritingStyle={setWritingStyle}
            targetAudience={targetAudience}
            setTargetAudience={setTargetAudience}
            perspective={perspective}
            setPerspective={setPerspective}
            styles={styles}
          />
        </ScrollView>
      ) : (
        <ScrollView contentContainerStyle={{ paddingBottom: 90 }} showsVerticalScrollIndicator={false}>
          {activeTab === 'Drafts' && (
            <DraftsList drafts={mockDrafts} styles={styles} />
          )}
          {activeTab === 'Published' && (
            <PublishedList published={mockPublished} styles={styles} />
          )}
        </ScrollView>
      )}
      <BottomTabSwitcher
        tabs={['Drafts', 'Published', 'Settings']}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    marginTop: 0,
  },
});

export default BlogScreen;
