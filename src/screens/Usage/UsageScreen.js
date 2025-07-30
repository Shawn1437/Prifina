import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const UsageScreen = () => {
  const renderStatCard = (icon, value, label, trend) => (
    <View style={styles.statCard}>
      <View style={styles.statHeader}>
        <Text style={styles.statIcon}>{icon}</Text>
        {trend && (
          <View style={styles.trendContainer}>
            <Text style={styles.trendIcon}>↗</Text>
            <Text style={styles.trendText}>{trend}</Text>
          </View>
        )}
      </View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );

  const renderChartBar = (value, height, label) => (
    <View style={styles.chartBarContainer}>
      <View style={[styles.chartBar, { height: height }]} />
      <Text style={styles.chartBarLabel}>{label}</Text>
      <Text style={styles.chartBarValue}>{value}</Text>
    </View>
  );

  const renderProgressBar = (label, percentage, color) => (
    <View style={styles.progressContainer}>
      <View style={styles.progressHeader}>
        <Text style={styles.progressLabel}>{label}</Text>
        <Text style={styles.progressPercentage}>{percentage}%</Text>
      </View>
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${percentage}%`, backgroundColor: color }]} />
      </View>
    </View>
  );

  const renderReactionCard = (icon, count, label, color) => (
    <View style={styles.reactionCard}>
      <Text style={[styles.reactionIcon, { color }]}>{icon}</Text>
      <Text style={styles.reactionCount}>{count}</Text>
      <Text style={styles.reactionLabel}>{label}</Text>
    </View>
  );

  const renderSavedSession = (title, saves, reactions) => (
    <View style={styles.savedSessionCard}>
      <Text style={styles.sessionTitle}>{title}</Text>
      <View style={styles.sessionStats}>
        <View style={styles.sessionStat}>
          <Text style={styles.sessionStatIcon}>🔖</Text>
          <Text style={styles.sessionStatText}>{saves} saves</Text>
        </View>
        <View style={styles.sessionStat}>
          <Text style={styles.sessionStatIcon}>❤️</Text>
          <Text style={styles.sessionStatText}>{reactions} reactions</Text>
        </View>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Statistics Cards */}
      <View style={styles.statsContainer}>
        {renderStatCard('💬', '1,247', 'Total Interactions', '+23%')}
        {renderStatCard('👥', '342', 'Unique Users', '+15%')}
        {renderStatCard('⏰', '4.2m', 'Avg Session')}
        {renderStatCard('❤️', '89', 'Total Reactions', '+8%')}
      </View>

      {/* Daily Interactions Chart */}
      <View style={styles.chartCard}>
        <Text style={styles.chartTitle}>Daily Interactions (Last 7 Days)</Text>
        <View style={styles.chartContainer}>
          {renderChartBar('28', 56, 'Today')}
          {renderChartBar('34', 68, 'Yesterday')}
          {renderChartBar('19', 38, '2 days ago')}
          {renderChartBar('31', 62, '3 days ago')}
          {renderChartBar('25', 50, '4 days ago')}
          {renderChartBar('22', 44, '5 days ago')}
          {renderChartBar('29', 58, '6 days ago')}
        </View>
      </View>

      {/* Interaction Quality */}
      <View style={styles.chartCard}>
        <Text style={styles.chartTitle}>Interaction Quality</Text>
        {renderProgressBar('Based on Knowledge', 78, '#4CAF50')}
        {renderProgressBar('Summary Only', 15, '#FF9800')}
        {renderProgressBar('General Fallback', 7, '#F44336')}
      </View>

      {/* Most Common Discussion Topics */}
      <View style={styles.chartCard}>
        <Text style={styles.chartTitle}>Most Common Discussion Topics</Text>
        <View style={styles.topicItem}>
          <Text style={styles.topicTitle}>Startup Validation & Product-Market Fit</Text>
          <Text style={styles.topicCount}>23 discussions</Text>
          <View style={styles.topicTag}>
            <Text style={styles.topicTagText}>92%</Text>
          </View>
        </View>
        <View style={styles.topicItem}>
          <Text style={styles.topicTitle}>SaaS Metrics & Growth Tracking</Text>
          <Text style={styles.topicCount}>18 discussions</Text>
          <View style={styles.topicTag}>
            <Text style={styles.topicTagText}>95%</Text>
          </View>
        </View>
        <View style={styles.topicItem}>
          <Text style={styles.topicTitle}>Fundraising & Investor Relations</Text>
          <Text style={styles.topicCount}>15 discussions</Text>
          <View style={styles.topicTag}>
            <Text style={styles.topicTagText}>88%</Text>
          </View>
        </View>
      </View>

      {/* Business Model Development */}
      <View style={styles.chartCard}>
        <View style={styles.businessModelHeader}>
          <View>
            <Text style={styles.businessModelTitle}>Business Model Development</Text>
            <Text style={styles.businessModelCount}>11 discussions</Text>
          </View>
          <View style={styles.businessModelTag}>
            <Text style={styles.businessModelTagText}>93%</Text>
          </View>
        </View>
      </View>

      {/* Reactions Breakdown */}
      <View style={styles.chartCard}>
        <Text style={styles.chartTitle}>Reactions Breakdown</Text>
        <View style={styles.reactionsContainer}>
          {renderReactionCard('🧠', '34', 'Insightful', '#E91E63')}
          {renderReactionCard('👍', '28', 'Helpful', '#FFC107')}
          {renderReactionCard('❤️', '15', 'Appreciated', '#F44336')}
          {renderReactionCard('💡', '12', 'Inspiring', '#FF9800')}
        </View>
      </View>

      {/* Most Saved Sessions */}
      <View style={styles.chartCard}>
        <Text style={styles.chartTitle}>Most Saved Sessions</Text>
        {renderSavedSession('Startup Fundraising Deep Dive', '12', '23')}
        {renderSavedSession('Product-Market Fit Workshop', '8', '18')}
        {renderSavedSession('SaaS Metrics Masterclass', '7', '15')}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    padding: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    width: (width - 48) / 2,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statIcon: {
    fontSize: 24,
  },
  trendContainer: {
    backgroundColor: '#F0F0F0',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  trendIcon: {
    fontSize: 12,
    color: '#4CAF50',
    marginRight: 2,
  },
  trendText: {
    fontSize: 10,
    color: '#4CAF50',
    fontWeight: '600',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  chartCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 120,
  },
  chartBarContainer: {
    alignItems: 'center',
    flex: 1,
  },
  chartBar: {
    width: 20,
    backgroundColor: '#666',
    borderRadius: 10,
    marginBottom: 8,
  },
  chartBarLabel: {
    fontSize: 10,
    color: '#666',
    textAlign: 'center',
  },
  chartBarValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 14,
    color: '#333',
  },
  progressPercentage: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#F0F0F0',
    borderRadius: 4,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  topicItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  topicTitle: {
    fontSize: 14,
    color: '#333',
    flex: 1,
    marginRight: 8,
  },
  topicCount: {
    fontSize: 12,
    color: '#666',
    marginRight: 8,
  },
  topicTag: {
    backgroundColor: '#E3F2FD',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  topicTagText: {
    fontSize: 10,
    color: '#1976D2',
    fontWeight: '600',
  },
  businessModelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  businessModelTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  businessModelCount: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  businessModelTag: {
    backgroundColor: '#E8F5E8',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  businessModelTagText: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  reactionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  reactionCard: {
    alignItems: 'center',
    flex: 1,
  },
  reactionIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  reactionCount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  reactionLabel: {
    fontSize: 12,
    color: '#666',
  },
  savedSessionCard: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  sessionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  sessionStats: {
    flexDirection: 'row',
  },
  sessionStat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  sessionStatIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  sessionStatText: {
    fontSize: 12,
    color: '#666',
  },
});

export default UsageScreen; 