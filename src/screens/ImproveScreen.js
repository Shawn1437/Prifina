import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { colors, spacing } from '../styles';
import { CustomText, CustomButton } from '../components/common';

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
  const [showHidden, setShowHidden] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        {/* Improve Tips Content */}
        {activeTab === 'Improve Tips' && (
          <ScrollView style={styles.tipsContainer} contentContainerStyle={{paddingBottom: 24}}>
            {/* Tips Tab Bar */}
            <View style={{marginBottom: 18, marginTop: 8}}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.tipsTabBar}
              >
                {TABS.map(tab => (
                  <View
                    key={tab.key}
                    style={[styles.tipsTabBtn, activeTipsTab === tab.key && styles.tipsTabBtnActive]}
                    onTouchEnd={() => setActiveTipsTab(tab.key)}
                  >
                    <CustomText style={activeTipsTab === tab.key ? styles.tipsTabTextActive : styles.tipsTabText}>{tab.label}</CustomText>
                  </View>
                ))}
              </ScrollView>
            </View>
            {/* Tips Cards */}
            {tips.map((tip, idx) => (
              <View key={idx} style={styles.tipCard}>
                <View style={styles.tipCardContent}>
                  <View style={styles.tipIconWrap}>
                    <CustomText style={styles.tipIcon}>
                      {tip.icon === 'upload' && '⤴️'}
                      {tip.icon === 'photo' && '🖼️'}
                      {tip.icon === 'chat' && '💬'}
                      {tip.icon === 'edit' && '✍️'}
                      {tip.icon === 'target' && '🎯'}
                    </CustomText>
                  </View>
                  <CustomText style={styles.tipTitle}>{tip.title}</CustomText>
                  <CustomText style={styles.tipDesc}>{tip.desc}</CustomText>
                  <View style={styles.tipFooter}>
                    <CustomText style={styles.tipTag}>{tip.tag}</CustomText>
                    <View style={styles.tipActionBtn}>
                      <CustomText style={styles.tipActionText}>{tip.action} →</CustomText>
                    </View>
                  </View>
                </View>
                <CustomText style={styles.tipClose}>✕</CustomText>
              </View>
            ))}
            {/* Hidden Suggestions Section */}
            <View
              style={styles.hiddenSectionContainer}
              onTouchEnd={() => setShowHidden(v => !v)}
            >
              <CustomText style={styles.hiddenSectionText}>Hidden Suggestions</CustomText>
              <View style={styles.hiddenEyeWrap}>
                <CustomText style={styles.hiddenSectionEye}>👁️</CustomText>
                {showHidden && <View style={styles.hiddenEyeSlash} />}
              </View>
            </View>
            {showHidden && (
              <View style={styles.hiddenCardsWrap}>
                <View style={styles.hiddenCard}>
                  <CustomText style={styles.hiddenCardTitle}>Enable weekly email summaries</CustomText>
                  <CustomText style={styles.hiddenCardDesc}>Get insights about your AI twin's performance delivered to your inbox</CustomText>
                  <View style={styles.hiddenCardFooter}>
                    <CustomText style={styles.hiddenCardTag}>Notifications</CustomText>
                    <CustomText style={styles.hiddenCardRestore}>Restore</CustomText>
                  </View>
                </View>
                <View style={styles.hiddenCard}>
                  <CustomText style={styles.hiddenCardTitle}>Connect your calendar</CustomText>
                  <CustomText style={styles.hiddenCardDesc}>Auto-generate knowledge from your meeting notes and presentations</CustomText>
                  <View style={styles.hiddenCardFooter}>
                    <CustomText style={styles.hiddenCardTag}>Integrations</CustomText>
                    <CustomText style={styles.hiddenCardRestore}>Restore</CustomText>
                  </View>
                </View>
              </View>
            )}
          </ScrollView>
        )}
        {/* Smart Recommendations Cards */}
        {activeTab === 'Smart Recommendations' && (
          <ScrollView style={styles.tipsContainer} contentContainerStyle={{paddingBottom: 24}}>
            <View style={styles.recommendCardUrgent}>
              <View style={{width: '100%'}}>
                <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 8}}>
                  <View style={styles.recommendCardIconWrap}>
                    <CustomText style={styles.recommendCardIcon}>💬</CustomText>
                  </View>
                  <View style={{flex: 1}} />
                  <View style={styles.recommendCardUrgentBadge}><CustomText style={styles.recommendCardUrgentBadgeText}>Urgent</CustomText></View>
                </View>
                <CustomText style={styles.recommendCardTitle}>2 questions had low match scores</CustomText>
                <CustomText style={styles.recommendCardDesc}>Recent questions about "team hiring" and "product roadmaps" could use better responses</CustomText>
                <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 8, justifyContent: 'space-between'}}>
                  <CustomText style={styles.recommendCardAction}>Improve now →</CustomText>
                  <View style={styles.recommendCardActionsRow}>
                    <CustomText style={styles.recommendCardActionIcon}>🗑️</CustomText>
                    <CustomText style={styles.recommendCardActionIcon}>🔖</CustomText>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.recommendCard}>
              <View style={{width: '100%'}}>
                <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 8}}>
                  <View style={styles.recommendCardIconWrap}><CustomText style={styles.recommendCardIcon}>📈</CustomText></View>
                </View>
                <CustomText style={styles.recommendCardTitle}>AI in education is trending</CustomText>
                <CustomText style={styles.recommendCardDesc}>This aligns with your expertise. Want to write about it?</CustomText>
                <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 8, justifyContent: 'space-between'}}>
                  <CustomText style={styles.recommendCardAction}>Create post →</CustomText>
                  <View style={styles.recommendCardActionsRow}>
                    <CustomText style={styles.recommendCardActionIcon}>🗑️</CustomText>
                    <CustomText style={styles.recommendCardActionIcon}>🔖</CustomText>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.recommendCard}>
              <View style={{width: '100%'}}>
                <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 8}}>
                  <View style={styles.recommendCardIconWrap}><CustomText style={styles.recommendCardIcon}>🎯</CustomText></View>
                </View>
                <CustomText style={styles.recommendCardTitle}>Session saved 10x this week</CustomText>
                <CustomText style={styles.recommendCardDesc}>Your "Startup Fundraising" session is popular. Consider highlighting it.</CustomText>
                <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 8, justifyContent: 'space-between'}}>
                  <CustomText style={styles.recommendCardAction}>Highlight →</CustomText>
                  <View style={styles.recommendCardActionsRow}>
                    <CustomText style={styles.recommendCardActionIcon}>🗑️</CustomText>
                    <CustomText style={styles.recommendCardActionIcon}>🔖</CustomText>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        )}
      </View>
      {/* Tab Bar for Improve Tips/Smart Recommendations (fixed at bottom) */}
      <View style={styles.bottomButtonContainer}>
        <View style={styles.segmentedContainer}>
          <View
            style={[styles.segmentedBtn, activeTab === 'Improve Tips' && styles.segmentedBtnActive]}
            onTouchEnd={() => setActiveTab('Improve Tips')}
          >
            <CustomText style={activeTab === 'Improve Tips' ? styles.segmentedBtnTextActive : styles.segmentedBtnText}>Improve Tips</CustomText>
          </View>
          <View
            style={[styles.segmentedBtn, activeTab === 'Smart Recommendations' && styles.segmentedBtnActive]}
            onTouchEnd={() => setActiveTab('Smart Recommendations')}
          >
            <CustomText style={activeTab === 'Smart Recommendations' ? styles.segmentedBtnTextActive : styles.segmentedBtnText}>Smart Recommendations</CustomText>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  recommendCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 12,
    marginBottom: 18,
    shadowColor: '#1A1A1A',
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 1,
    borderWidth: 1,
    borderColor: '#E6E8EC',
    position: 'relative',
    
  },
  recommendCardUrgent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFF6F6',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 12,
    marginBottom: 18,
    shadowColor: '#1A1A1A',
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 1,
    borderWidth: 1,
    borderColor: '#FFD6D6',
    position: 'relative',
    marginTop: 10,
  },
  recommendCardIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F4F5F7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    borderWidth: 1,
    borderColor: '#E6E8EC',
  },
  recommendCardIcon: {
    fontSize: 24,
    color: colors.textSecondary,
  },
  recommendCardTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 6,
    color: colors.textPrimary,
  },
  recommendCardDesc: {
    color: colors.textSecondary,
    fontSize: 14,
    marginBottom: 12,
  },
  recommendCardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  recommendCardAction: {
    color: '#7B61FF',
    fontWeight: '500',
    fontSize: 14,
  },
  recommendCardActionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  recommendCardActionIcon: {
    fontSize: 18,
    color: colors.textSecondary,
    marginLeft: 12,
    opacity: 0.7,
  },
  recommendCardUrgentBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: '#FF4D4F',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 2,
    zIndex: 2,
  },
  recommendCardUrgentBadgeText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
    letterSpacing: 0.2,
  },
  hiddenEyeWrap: {
    position: 'relative',
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hiddenEyeSlash: {
    position: 'absolute',
    left: -2,
    top: 13,
    width: 32,
    height: 2.5,
    backgroundColor: colors.textSecondary,
    opacity: 0.7,
    transform: [{ rotate: '-28deg' }],
    borderRadius: 1.5,
  },
  hiddenCardsWrap: {
    marginTop: 0,
    marginBottom: 10,
    marginHorizontal: 8,
  },
  hiddenCard: {
    backgroundColor: '#F8F9FB',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#F0F1F3',
    padding: 18,
    marginBottom: 14,
  },
  hiddenCardTitle: {
    fontWeight: 'bold',
    fontSize: 15,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  hiddenCardDesc: {
    color: colors.textSecondary,
    fontSize: 14,
    marginBottom: 14,
  },
  hiddenCardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  hiddenCardTag: {
    color: '#7B61FF',
    fontSize: 13,
    fontWeight: '500',
  },
  hiddenCardRestore: {
    color: '#7B61FF',
    fontWeight: '500',
    fontSize: 14,
    backgroundColor: 'transparent',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  hiddenSectionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.background,
    borderRadius: 14,
    paddingVertical: 18,
    paddingHorizontal: 18,
    marginHorizontal: 8,
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#F0F1F3',
  },
  hiddenSectionText: {
    color: colors.textSecondary,
    fontWeight: '600',
    fontSize: 16,
  },
  hiddenSectionEye: {
    fontSize: 22,
    color: colors.textSecondary,
    opacity: 0.7,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    marginTop: 0,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  title: {
    marginBottom: spacing.md,
  },
  description: {
    textAlign: 'center',
    color: colors.textSecondary,
  },
  bottomButtonContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    marginBottom: -20, // Add a little margin at the bottom
  },
  segmentedContainer: {
    flexDirection: 'row',
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
    marginTop: 0,
  },
  tipsContainer: {
    flex: 1,
    paddingHorizontal: 0,
    marginTop: 0,
  },
  tipsTabBar: {
    flexDirection: 'row',
    backgroundColor: colors.background,
    borderRadius: 20,
    padding: 4,
    marginHorizontal: 8,
    marginBottom: 5,
    marginTop: 6,
  },
  tipsTabBtn: {
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 14,
    marginRight: 8,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: '#E6E8EC',
  },
  tipsTabBtnActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    shadowColor: 'transparent',
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  tipsTabText: {
    color: colors.textSecondary,
    fontWeight: '500',
    fontSize: 15,
  },
  tipsTabTextActive: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  tipCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 12,
    marginBottom: 14,
    shadowColor: '#1A1A1A',
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 1,
    borderWidth: 1,
    borderColor: '#E6E8EC',
    position: 'relative',
  },
  tipCardContent: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  tipIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F4F5F7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    borderWidth: 1,
    borderColor: '#E6E8EC',
    marginBottom: 12, // Add margin below icon
  },
  tipIcon: {
    fontSize: 26,
    color: colors.textSecondary,
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 6,
    color: colors.textPrimary,
  },
  tipDesc: {
    color: colors.textSecondary,
    fontSize: 14,
    marginBottom: 12,
  },
  tipFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 18, // Add gap from content to footer
  },
  tipTag: {
    color: '#7B61FF',
    fontSize: 13,
    fontWeight: '500',
    backgroundColor: 'transparent',
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  tipActionBtn: {
    backgroundColor: '#F4F8FF',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 90,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E6E8EC',
  },
  tipActionText: {
    color: '#7B61FF',
    fontWeight: '500',
    fontSize: 15,
    letterSpacing: 0.1,
  },
  tipClose: {
    position: 'absolute',
    top: 14,
    right: 14,
    color: colors.textSecondary,
    fontSize: 18,
    opacity: 0.5,
  },
  segmentedBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentedBtnActive: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
    
    
  },
  segmentedBtnText: {
    color: colors.textSecondary,
    fontWeight: '500',
    fontSize: 15,
  },
  segmentedBtnTextActive: {
    color: colors.textPrimary,
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export default ImproveScreen;
