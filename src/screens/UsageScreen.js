import React from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { colors } from '../styles';
import { CustomText } from '../components/common';
import MetricsRow from '../components/Usage/MetricsRow';
import ChartCard from '../components/Usage/ChartCard';
import QualityCard from '../components/Usage/QualityCard';
import TopicsCard from '../components/Usage/TopicsCard';
import ReactionsCard from '../components/Usage/ReactionsCard';
import SessionsCard from '../components/Usage/SessionsCard';

const metrics = [
  {
    label: 'Total Interactions',
    value: '1,247',
    change: '+23%',
    icon: 'MessageSquare',
  },
  {
    label: 'Unique Users',
    value: '342',
    change: '+15%',
    icon: 'Users',
  },
  {
    label: 'Avg Session',
    value: '4.2m',
    change: '',
    icon: 'Clock',
  },
  {
    label: 'Total Reactions',
    value: '89',
    change: '+8%',
    icon: 'Heart',
  },
];

const dailyData = [28, 34, 19, 31, 25, 22, 29];
const dailyLabels = ['Today', 'Yesterday', '2', '3', '4', '5', '6'];

const topics = [
  { title: 'Startup Validation & Product-Market Fit', sub: '23 discussions', percent: '92%' },
  { title: 'SaaS Metrics & Growth Tracking', sub: '18 discussions', percent: '95%' },
  { title: 'Fundraising & Investor Relations', sub: '15 discussions', percent: '88%' },
  { title: 'Technical Team Building', sub: '12 discussions', percent: '90%' },
  { title: 'Business Model Development', sub: '11 discussions', percent: '93%' },
];

const reactions = [
  { emoji: '🧠', count: 34, label: 'Insightful' },
  { emoji: '👍', count: 28, label: 'Helpful' },
  { emoji: '❤️', count: 15, label: 'Appreciated' },
  { emoji: '💡', count: 12, label: 'Inspiring' },
];

const sessions = [
  { title: 'Startup Fundraising Deep Dive', saves: 12, reactions: 23 },
  { title: 'Product-Market Fit Workshop', saves: 8, reactions: 18 },
  { title: 'SaaS Metrics Masterclass', saves: 7, reactions: 15 },
];

const UsageScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 20 }} showsVerticalScrollIndicator={false}>
        <MetricsRow metrics={metrics} />
        <ChartCard dailyData={dailyData} dailyLabels={dailyLabels} />
        <QualityCard />
        <TopicsCard topics={topics} />
        <ReactionsCard reactions={reactions} />
        <SessionsCard sessions={sessions} />
      </ScrollView>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    marginTop:30
  },
});

export default UsageScreen;
