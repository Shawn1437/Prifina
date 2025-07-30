import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Switch, TextInput } from 'react-native';
import { colors, spacing } from '../styles';
import { CustomText, CustomButton } from '../components/common';

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
          {/* General Settings Card */}
          <View style={styles.settingsCard}>
            <CustomText style={styles.settingsTitle}>General Settings</CustomText>
            <View style={styles.settingsRow}>
              <CustomText style={styles.settingsLabel}>Enable Blogging</CustomText>
              <Switch
                value={enableBlogging}
                onValueChange={setEnableBlogging}
                trackColor={{ false: '#ccc', true: colors.primary }}
                thumbColor={enableBlogging ? colors.primary : '#f4f3f4'}
              />
            </View>
            <View style={styles.settingsRow}>
              <CustomText style={styles.settingsLabel}>Auto-Generate Drafts</CustomText>
              <View style={styles.autoDraftGroup}>
                {['Daily', 'Weekly', 'Off'].map(option => (
                  <TouchableOpacity
                    key={option}
                    style={[styles.autoDraftBtn, autoDraft === option && styles.autoDraftBtnActive]}
                    onPress={() => setAutoDraft(option)}
                  >
                    <CustomText style={[styles.autoDraftBtnText, autoDraft === option && styles.autoDraftBtnTextActive]}>{option}</CustomText>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.settingsRow}>
              <CustomText style={styles.settingsLabel}>Send Drafts via Email</CustomText>
              <Switch
                value={sendDraftsEmail}
                onValueChange={setSendDraftsEmail}
                trackColor={{ false: '#ccc', true: colors.primary }}
                thumbColor={sendDraftsEmail ? colors.primary : '#f4f3f4'}
              />
            </View>
          </View>
          {/* Writing Instructions Card */}
          <View style={styles.settingsCard}>
            <CustomText style={styles.settingsTitle}>Writing Instructions</CustomText>
            <CustomText style={styles.inputLabel}>Writing Style</CustomText>
            <TextInput
              style={styles.input}
              value={writingStyle}
              onChangeText={setWritingStyle}
              placeholder="Writing Style"
              placeholderTextColor="#aaa"
            />
            <CustomText style={styles.inputLabel}>Target Audience</CustomText>
            <TextInput
              style={styles.input}
              value={targetAudience}
              onChangeText={setTargetAudience}
              placeholder="Target Audience"
              placeholderTextColor="#aaa"
            />
            <CustomText style={styles.inputLabel}>Perspective to Highlight</CustomText>
            <TextInput
              style={styles.input}
              value={perspective}
              onChangeText={setPerspective}
              placeholder="Perspective to Highlight"
              placeholderTextColor="#aaa"
            />
          </View>
          {/* Tracked Topics Card */}
          <View style={[styles.trackedCard, { marginBottom: 60 }]}> 
            <View style={styles.trackedHeader}>
              <CustomText style={styles.trackedTitle}>Tracked Topics</CustomText>
              <TouchableOpacity style={styles.trackedAddBtn}>
                <CustomText style={styles.trackedAddBtnText}>+</CustomText>
              </TouchableOpacity>
            </View>
            <View style={styles.topicCard}>
              <CustomText style={styles.topicTitle}>AI & Technology</CustomText>
              <CustomText style={styles.topicMeta}>Sources: news, research</CustomText>
              <CustomText style={styles.topicMeta}>Style: Thought Leadership</CustomText>
            </View>
            <View style={styles.topicCard}>
              <CustomText style={styles.topicTitle}>Startup Growth</CustomText>
              <CustomText style={styles.topicMeta}>Sources: news, social</CustomText>
              <CustomText style={styles.topicMeta}>Style: Practical</CustomText>
            </View>
          </View>
 
         
        </ScrollView>
      ) : (
        <ScrollView contentContainerStyle={{ paddingBottom: 120 }} showsVerticalScrollIndicator={false}>
          {activeTab === 'Drafts' && (
            <View style={styles.draftsList}>
              {mockDrafts.map((item, idx) => (
                <View
                  key={item.id}
                  style={[
                    styles.card,
                    { marginHorizontal: 16 },
                    idx === 0 && { marginTop: 20 },
                    idx === mockDrafts.length - 1 && { marginBottom: 40 }
                  ]}
                >
                  <CustomText style={styles.title}>{item.title}</CustomText>
                  <CustomText style={styles.subtitle}>{item.subtitle}</CustomText>
                  <CustomText style={styles.timeAgo}>{item.timeAgo}</CustomText>
                  <CustomText style={styles.content}>{item.content}</CustomText>
                  <View style={styles.tagsRow}>
                    {item.tags.map((tag) => (
                      <View key={tag} style={styles.tag}><CustomText style={styles.tagText}>{tag}</CustomText></View>
                    ))}
                  </View>
                  <CustomText style={styles.type}>{item.type}</CustomText>
                  <View style={styles.cardActions}>
                    <CustomButton title="Edit" style={styles.editBtn} textStyle={{ color: '#000', fontWeight: 'bold' }} />
                    <CustomButton title="Publish" style={styles.publishBtn} textStyle={{ color: '#fff', fontWeight: 'bold' }} />
                    <CustomButton title="Delete" style={styles.deleteBtn} textStyle={{ color: '#000', fontWeight: 'bold' }} />
                  </View>
                </View>
              ))}
            </View>
          )}
          {activeTab === 'Published' && (
            <View style={styles.draftsList}>
              <View style={[styles.publishedCard, { marginHorizontal: 16, marginTop: 20 }]}> 
                <CustomText style={styles.publishedTitle}>Why Most Startups Fail at Fundraising</CustomText>
                <CustomText style={styles.publishedTime}>1 week ago</CustomText>
                <View style={styles.publishedActions}>
                  <TouchableOpacity style={styles.linkBtn}><CustomText style={styles.linkBtnText}>Copy Link</CustomText></TouchableOpacity>
                  <TouchableOpacity style={styles.unpublishBtn}><CustomText style={styles.unpublishBtnText}>Unpublish</CustomText></TouchableOpacity>
                </View>
              </View>
              <View style={[styles.publishedCard, { marginHorizontal: 16, marginBottom: 40 }]}> 
                <CustomText style={styles.publishedTitle}>The Rise of No-Code Solutions in 2024</CustomText>
                <CustomText style={styles.publishedTime}>2 weeks ago</CustomText>
                <View style={styles.publishedActions}>
                  <TouchableOpacity style={styles.linkBtn}><CustomText style={styles.linkBtnText}>Copy Link</CustomText></TouchableOpacity>
                  <TouchableOpacity style={styles.unpublishBtn}><CustomText style={styles.unpublishBtnText}>Unpublish</CustomText></TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        </ScrollView>
      )}
      {/* Sticky Bottom Tab Bar */}
      <View style={styles.bottomButtonContainer}>
        <View style={styles.segmentedContainer}>
          <View
            style={[styles.segmentedBtn, activeTab === 'Drafts' && styles.segmentedBtnActive]}
            onTouchEnd={() => setActiveTab('Drafts')}
          >
            <CustomText style={activeTab === 'Drafts' ? styles.segmentedBtnTextActive : styles.segmentedBtnText}>Drafts</CustomText>
          </View>
          <View
            style={[styles.segmentedBtn, activeTab === 'Published' && styles.segmentedBtnActive]}
            onTouchEnd={() => setActiveTab('Published')}
          >
            <CustomText style={activeTab === 'Published' ? styles.segmentedBtnTextActive : styles.segmentedBtnText}>Published</CustomText>
          </View>
          <View
            style={[styles.segmentedBtn, activeTab === 'Settings' && styles.segmentedBtnActive]}
            onTouchEnd={() => setActiveTab('Settings')}
          >
            <CustomText style={activeTab === 'Settings' ? styles.segmentedBtnTextActive : styles.segmentedBtnText}>Settings</CustomText>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    // marginTop:40 // removed to avoid extra top space
  },
  settingsCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 18,
    marginBottom: 18,
    marginHorizontal: 24,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F0F1F3',
  },
  settingsTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 16,
    color: colors.textPrimary,
  },
  settingsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  settingsLabel: {
    fontSize: 16,
    color: colors.textPrimary,
    fontWeight: '500',
  },
  segmentedGroup: {
    flexDirection: 'row',
    backgroundColor: '#ECEEF2',
    borderRadius: 20,
    padding: 3,
    gap: 4,
  },
  segmentedBtn: {
    paddingHorizontal: 18,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: 'transparent',
    marginHorizontal: 0,
  },
  segmentedBtnActive: {
    backgroundColor: colors.primary,
    shadowColor: colors.primary,
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  segmentedBtnText: {
    color: '#B0B3B9',
    fontSize: 14,
    fontWeight: '500',
  },
  segmentedBtnTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  autoDraftGroup: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    borderRadius: 20,
    padding: 0,
    gap: 8,
  },
  autoDraftBtn: {
    paddingHorizontal: 18,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#F4F6FA',
    minWidth: 54,
    alignItems: 'center',
    justifyContent: 'center',
  },
  autoDraftBtnActive: {
    backgroundColor: '#2563EB',
  },
  autoDraftBtnText: {
    color: '#6B7280',
    fontSize: 14,
    fontWeight: '500',
  },
  autoDraftBtnTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  
  inputLabel: {
    marginTop: 12,
    marginBottom: 6,
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    padding: 13,
    fontSize: 15,
    color: colors.textPrimary,
    backgroundColor: '#FAFAFA',
    marginBottom: 10,
  },
  // Tracked Topics Styles
  trackedCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 18,
    marginBottom: 40,
    marginHorizontal: 24,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F0F1F3',
  },
  trackedHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  trackedTitle: {
    fontWeight: 'bold',
    fontSize: 17,
    color: colors.textPrimary,
  },
  trackedAddBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#F4F5F7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  trackedAddBtnText: {
    color: colors.primary,
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: -2,
  },
  topicCard: {
    backgroundColor: '#F7F8FA',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
  },
  topicTitle: {
    fontWeight: 'bold',
    fontSize: 15,
    color: colors.textPrimary,
    marginBottom: 2,
  },
  topicMeta: {
    color: colors.textSecondary,
    fontSize: 13,
    marginBottom: 1,
  },
 
  trackedCard: {
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
  trackedHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  trackedTitle: {
    fontWeight: 'bold',
    fontSize: 17,
    color: colors.textPrimary,
  },
  trackedAddBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#F4F5F7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  trackedAddBtnText: {
    color: colors.primary,
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: -2,
  },
  topicCard: {
    backgroundColor: '#F7F8FA',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
  },
  topicTitle: {
    fontWeight: 'bold',
    fontSize: 15,
    color: colors.textPrimary,
    marginBottom: 2,
  },
  topicMeta: {
    color: colors.textSecondary,
    fontSize: 13,
    marginBottom: 1,
  },
  publishedCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  publishedTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 2,
    color: colors.textPrimary,
  },
  publishedTime: {
    color: colors.textSecondary,
    fontSize: 13,
    marginBottom: 12,
  },
  publishedActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  linkBtn: {
    backgroundColor: '#F4F8FF',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginRight: 8,
  },
  linkBtnText: {
    color: colors.primary,
    fontWeight: '500',
  },
  unpublishBtn: {
    backgroundColor: '#F4F5F7',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  unpublishBtnText: {
    color: colors.textSecondary,
    fontWeight: '500',
  },
  // SETTINGS STYLES
  settingsCard: {
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
  settingsTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 16,
    color: colors.textPrimary,
  },
  settingsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  settingsLabel: {
    fontSize: 16,
    color: colors.textPrimary,
    fontWeight: '500',
  },
  segmentedGroup: {
    flexDirection: 'row',
    backgroundColor: '#ECEEF2',
    borderRadius: 20,
    padding: 3,
    gap: 4,
  },
  segmentedBtn: {
    paddingHorizontal: 18,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: 'transparent',
    marginHorizontal: 0,
  },
  segmentedBtnActive: {
    backgroundColor: colors.primary,
    shadowColor: colors.primary,
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  segmentedBtnText: {
    color: '#B0B3B9',
    fontSize: 14,
    fontWeight: '500',
  },
  segmentedBtnTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  inputLabel: {
    marginTop: 12,
    marginBottom: 6,
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    padding: 13,
    fontSize: 15,
    color: colors.textPrimary,
    backgroundColor: '#FAFAFA',
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 17,
    marginBottom: 2,
    color: colors.textPrimary,
  },
  subtitle: {
    color: colors.primary,
    fontSize: 13,
    marginBottom: 2,
  },
  timeAgo: {
    color: colors.textSecondary,
    fontSize: 12,
    marginBottom: 8,
    textAlign: 'right',
  },
  content: {
    color: colors.textPrimary,
    fontSize: 15,
    marginBottom: 8,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  tag: {
    backgroundColor: '#F4F5F7',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginRight: 6,
    marginBottom: 4,
  },
  tagText: {
    color: colors.textSecondary,
    fontSize: 12,
  },
  type: {
    color: colors.textSecondary,
    fontStyle: 'italic',
    fontSize: 13,
    marginBottom: 8,
    textAlign: 'right',
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  editBtn: {
    flex: 1,
    marginRight: 8,
    backgroundColor: '#F4F5F7',
  },
  publishBtn: {
    flex: 2,
    marginRight: 8,
    backgroundColor: colors.primary,
  },
  deleteBtn: {
    flex: 1,
    backgroundColor: '#F4F5F7',
  },
  bottomButtonContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    marginBottom: -20,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 20,
  },
  segmentedContainer: {
    flexDirection: 'row',
    backgroundColor: '#F4F5F7',
    borderRadius: 12,
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
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

export default BlogScreen;
