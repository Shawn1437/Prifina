
import React from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { colors } from '../styles';
import { CustomText } from '../components/common';

const metrics = [
  {
    label: 'Total Interactions',
    value: '1,247',
    change: '+23%',
  },
  {
    label: 'Unique Users',
    value: '342',
    change: '+15%',
  },
  {
    label: 'Avg Session',
    value: '4.2m',
    change: '',
  },
  {
    label: 'Total Reactions',
    value: '89',
    change: '+8%',
  },
];

const dailyData = [28, 34, 19, 31, 25, 22, 29];
const dailyLabels = ['Today', 'Yesterday', '2', '3', '4', '5', '6'];

const UsageScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 20 }} showsVerticalScrollIndicator={false}>
        <View style={styles.metricsRow}>
          {metrics.map((m, i) => (
            <View key={m.label} style={styles.metricCard}>
              <View style={styles.metricHeader}>
                {m.change ? (
                  <CustomText style={styles.metricChange}>{m.change}</CustomText>
                ) : <View style={{ height: 18 }} />}
              </View>
              <CustomText style={styles.metricValue}>{m.value}</CustomText>
              <CustomText style={styles.metricLabel}>{m.label}</CustomText>
            </View>
          ))}
        </View>
        <View style={styles.chartCard}>
          <CustomText style={styles.chartTitle}>Daily Interactions (Last 7 Days)</CustomText>
          <View style={styles.barChart}>
            {dailyData.map((val, idx) => (
              <View key={idx} style={styles.barItem}>
                <View style={[styles.bar, { height: val * 2 }]} />
                <CustomText style={styles.barValue}>{val}</CustomText>
                <CustomText style={styles.barLabel}>{dailyLabels[idx]}</CustomText>
              </View>
            ))}
          </View>

        </View>

        {/* Interaction Quality Card */}
        <View style={styles.qualityCard}>
          <CustomText style={styles.qualityTitle}>Interaction Quality</CustomText>
          {/* First bar after title */}
          <View style={styles.qualityBarBg}>
            <View style={[styles.qualityBar, { width: '78%' }]} />
          </View>
          <View style={styles.qualityRowSingle}>
            <CustomText style={styles.qualityLabelSingle}>Based on Knowledge (78%)</CustomText>
          </View>
          <View style={styles.qualityBarBg}>
            <View style={[styles.qualityBar, { width: '15%', backgroundColor: '#B0B3B9' }]} />
          </View>
          <View style={styles.qualityRowSingle}>
            <CustomText style={styles.qualityLabelSingle}>Summary Only (15%)</CustomText>
          </View>
          <View style={styles.qualityBarBg}>
            <View style={[styles.qualityBar, { width: '7%', backgroundColor: '#E5E7EB' }]} />
          </View>
          <View style={styles.qualityRowSingle}>
            <CustomText style={styles.qualityLabelSingle}>General Fallback (7%)</CustomText>
          </View>
        </View>

        {/* Most Common Discussion Topics Card */}
        <View style={styles.topicsCard}>
          <CustomText style={styles.topicsTitle}>Most Common Discussion Topics</CustomText>
          <View style={styles.topicItem}>
            <View style={styles.topicTextBlock}>
              <CustomText style={styles.topicTitle}>Startup Validation & Product-Market Fit</CustomText>
              <CustomText style={styles.topicSub}>23 discussions</CustomText>
            </View>
            <View style={styles.topicPercent}><CustomText style={styles.topicPercentText}>92%</CustomText></View>
          </View>
          <View style={styles.topicItem}>
            <View style={styles.topicTextBlock}>
              <CustomText style={styles.topicTitle}>SaaS Metrics & Growth Tracking</CustomText>
              <CustomText style={styles.topicSub}>18 discussions</CustomText>
            </View>
            <View style={styles.topicPercent}><CustomText style={styles.topicPercentText}>95%</CustomText></View>
          </View>
          <View style={styles.topicItem}>
            <View style={styles.topicTextBlock}>
              <CustomText style={styles.topicTitle}>Fundraising & Investor Relations</CustomText>
              <CustomText style={styles.topicSub}>15 discussions</CustomText>
            </View>
            <View style={styles.topicPercent}><CustomText style={styles.topicPercentText}>88%</CustomText></View>
          </View>
          <View style={styles.topicItem}>
            <View style={styles.topicTextBlock}>
              <CustomText style={styles.topicTitle}>Technical Team Building</CustomText>
              <CustomText style={styles.topicSub}>12 discussions</CustomText>
            </View>
            <View style={styles.topicPercent}><CustomText style={styles.topicPercentText}>90%</CustomText></View>
          </View>
          <View style={styles.topicItem}>
            <View style={styles.topicTextBlock}>
              <CustomText style={styles.topicTitle}>Business Model Development</CustomText>
              <CustomText style={styles.topicSub}>11 discussions</CustomText>
            </View>
            <View style={styles.topicPercent}><CustomText style={styles.topicPercentText}>93%</CustomText></View>
          </View>
        </View>


        {/* Reactions Breakdown Card */}
        <View style={styles.reactionsCard}>
          <CustomText style={styles.reactionsTitle}>Reactions Breakdown</CustomText>
          <View style={styles.reactionsRow}>
            <View style={styles.reactionBox}>
              <CustomText style={styles.reactionEmoji}>🧠</CustomText>
              <CustomText style={styles.reactionCount}>34</CustomText>
              <CustomText style={styles.reactionLabel}>Insightful</CustomText>
            </View>
            <View style={styles.reactionBox}>
              <CustomText style={styles.reactionEmoji}>👍</CustomText>
              <CustomText style={styles.reactionCount}>28</CustomText>
              <CustomText style={styles.reactionLabel}>Helpful</CustomText>
            </View>
            <View style={styles.reactionBox}>
              <CustomText style={styles.reactionEmoji}>❤️</CustomText>
              <CustomText style={styles.reactionCount}>15</CustomText>
              <CustomText style={styles.reactionLabel}>Appreciated</CustomText>
            </View>
            <View style={styles.reactionBox}>
              <CustomText style={styles.reactionEmoji}>💡</CustomText>
              <CustomText style={styles.reactionCount}>12</CustomText>
              <CustomText style={styles.reactionLabel}>Inspiring</CustomText>
            </View>
          </View>
        </View>

        {/* Most Saved Sessions Card */}
        <View style={styles.sessionsCard}>
          <CustomText style={styles.sessionsTitle}>Most Saved Sessions</CustomText>
          <View style={styles.sessionItem}>
            <CustomText style={styles.sessionTitle}>Startup Fundraising Deep Dive</CustomText>
            <View style={styles.sessionMetaRow}>
              <CustomText style={styles.sessionMeta}>12 saves</CustomText>
              <CustomText style={styles.sessionMeta}>23 reactions</CustomText>
            </View>
          </View>
          <View style={styles.sessionItem}>
            <CustomText style={styles.sessionTitle}>Product-Market Fit Workshop</CustomText>
            <View style={styles.sessionMetaRow}>
              <CustomText style={styles.sessionMeta}>8 saves</CustomText>
              <CustomText style={styles.sessionMeta}>18 reactions</CustomText>
            </View>
          </View>
          <View style={styles.sessionItem}>
            <CustomText style={styles.sessionTitle}>SaaS Metrics Masterclass</CustomText>
            <View style={styles.sessionMetaRow}>
              <CustomText style={styles.sessionMeta}>7 saves</CustomText>
              <CustomText style={styles.sessionMeta}>15 reactions</CustomText>
            </View>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    marginTop:10
  },
  metricsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  metricCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F0F1F3',
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 8,
  },
  metricChange: {
    color: colors.primary,
    fontWeight: '600',
    fontSize: 13,
    backgroundColor: '#F4F8FF',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    alignSelf: 'flex-end',
  },
  metricValue: {
    fontWeight: 'bold',
    fontSize: 24,
    color: colors.textPrimary,
    marginBottom: 2,
  },
  metricLabel: {
    color: colors.textSecondary,
    fontSize: 14,
    marginBottom: 2,
  },
  chartCard: {
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
  chartTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 16,
    color: colors.textPrimary,
  },
  barChart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 80,
    marginBottom: 8,
    marginTop: 40,
  },
  barItem: {
    alignItems: 'center',
    flex: 1,
    minWidth: 44,
  },
  bar: {
    width: 18,
    backgroundColor: '#374151',
    borderRadius: 6,
    marginBottom: 6,
  },
  barValue: {
    fontSize: 12,
    color: colors.textPrimary,
    fontWeight: 'bold',
    marginBottom: 2,
    textAlign: 'center',
    minWidth: 44,
  },
  barLabel: {
    fontSize: 10,
    color: colors.textSecondary,
    textAlign: 'center',
    flexWrap: 'nowrap',
    minWidth: 44,
  },
  qualityCard: {
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
  qualityTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 16,
    color: colors.textPrimary,
  },
  qualityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  qualityRowSingle: {
    marginBottom: 10,
    marginTop: 2,
  },
  qualityLabel: {
    color: colors.textSecondary,
    fontSize: 14,
    flex: 1,
    marginRight: 10,
  },
  qualityLabelSingle: {
    color: colors.textSecondary,
    fontSize: 14,
    textAlign: 'left',
    marginLeft: 2,
  },
  qualityBarBg: {
    flex: 2,
    height: 8,
    backgroundColor: '#ECEEF2',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 8,
  },
  qualityBar: {
    height: 8,
    backgroundColor: '#374151',
    borderRadius: 6,
  },
  topicsCard: {
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
  topicsTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 16,
    color: colors.textPrimary,
  },
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
    color: colors.textPrimary,
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
    paddingVertical: 12,
    marginBottom: 10,
  },
  reactionEmoji: {
    fontSize: 2,
    marginBottom: 4,
  },
  reactionCount: {
    fontWeight: 'bold',
    fontSize: 16,
    color: colors.textPrimary,
    marginBottom: 2,
  },
  reactionLabel: {
    color: colors.textSecondary,
    fontSize: 13,
  },
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
    color: colors.textPrimary,
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
    color: colors.textPrimary,
    marginBottom: 6,
  },
  sessionMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  sessionMeta: {
    color: colors.textSecondary,
    fontSize: 13,
    marginRight: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  topicItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  topicTextBlock: {
    flex: 1,
  },
  topicTitle: {
    fontWeight: '500',
    fontSize: 15,
    color: colors.textPrimary,
  },
  topicSub: {
    color: colors.textSecondary,
    fontSize: 13,
    marginTop: 2,
  },
  topicPercent: {
    backgroundColor: '#ECEEF2',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginLeft: 12,
    minWidth: 38,
    alignItems: 'center',
  },
  topicPercentText: {
    color: colors.textSecondary,
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default UsageScreen;
