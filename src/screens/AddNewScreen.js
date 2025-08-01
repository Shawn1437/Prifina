
import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, FlatList, TextInput, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { colors, spacing } from '../styles';
import { CustomText, CustomButton, KnowledgeCard } from '../components/common';
import { Pin, Mic, Upload, Camera, Tag } from 'lucide-react-native';

const mockQuestions = [
  {
    id: '1',
    title: "How can I improve my startup's product-market fit?",
    description: 'Product-market fit requires continuous iteration based on customer feedback. Start by identifying your core value proposition and validate it with real users. Focus on retention metrics rather than just acquisition - if users aren\'t coming back, you haven\'t achieved PMF yet. The key is to build something people want so badly they tell their friends about it. This means deeply understanding your target customer\'s pain points and creating a solution that\'s 10x better than existing alternatives.',
    pinned: true,
    timeAgo: '2 hours ago',
    knowledgeAdded: false,
  },
  {
    id: '2',
    title: 'What are the key metrics for SaaS businesses?',
    description: 'The most critical SaaS metrics include Monthly Recurring Revenue (MRR), Customer Acquisition Cost (CAC), Customer Lifetime Value (CLV), and churn rate. Track your MRR growth rate month-over-month, ensuring it\'s accelerating. Your CLV should be at least 3x your CAC for a healthy business model. Monitor both gross and net revenue retention - aim for net retention above 100%. Also track activation metrics, time to value, and expansion revenue from existing customers. Weekly cohort analysis helps identify trends early.',
    pinned: true,
    timeAgo: '1 day ago',
    knowledgeAdded: true,
  },
  {
    id: '3',
    title: 'How do I pitch to investors effectively?',
    description: 'A compelling investor pitch tells a story: problem, solution, market opportunity, traction, business model, competition, team, and financials. Start with a hook that captures attention immediately. Clearly articulate the pain point you\'re solving and why it matters now. Show impressive traction metrics and growth trajectory. Explain your go-to-market strategy and unit economics. Address competition honestly but position your unique advantages. Highlight your team\'s domain expertise and execution track record. End with a clear ask and use of funds.',
    pinned: true,
    timeAgo: '2 days ago',
    knowledgeAdded: false,
  },
];

const TAGS = [
  'Startups', 'SaaS', 'Product Management', 'Fundraising', 'Growth', 'Strategy'
];

const AddNewScreen = () => {
  const [activeTab, setActiveTab] = useState('Pinned');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [inputType, setInputType] = useState('Text');
  const [pinnedQuestions, setPinnedQuestions] = useState(mockQuestions);

  const handleAddKnowledge = (id) => {
    setActiveTab('New Entry');
  };

  const handleUnpin = (id) => {
    setPinnedQuestions(prev => prev.filter(item => item.id !== id));
  };

  const handleTagPress = (tag) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const renderItem = ({ item }) => (
    <KnowledgeCard
      title={item.title}
      description={item.description}
      pinned={item.pinned}
      timeAgo={item.timeAgo}
      knowledgeAdded={item.knowledgeAdded}
      onAddKnowledge={() => handleAddKnowledge(item.id)}
      onUnpin={() => handleUnpin(item.id)}
    />
  );

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <View style={styles.content}>
        {activeTab === 'Pinned' && (
          <>
            {pinnedQuestions.length > 0 ? (
              <FlatList
                data={pinnedQuestions}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
              />
            ) : (
              <View style={styles.emptyContainer}>
                <View style={styles.emptyIconContainer}>
                  <Pin size={48} color="#C1C7CD" />
                </View>
                <CustomText style={styles.emptyTitle}>No Pinned Interactions</CustomText>
                <CustomText style={styles.emptyDescription}>
                  Pin interactions from the Feeds tab to improve{'\n'}your AI twin's responses
                </CustomText>
              </View>
            )}
          </>
        )}
        {activeTab === 'New Entry' && (
          <>
            <ScrollView 
              contentContainerStyle={styles.formContainer} 
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
            <CustomText style={styles.label}>Title (Optional)</CustomText>
            <TextInput
              style={styles.input}
              placeholder="Brief title for this knowledge..."
              placeholderTextColor="#B0B0B0"
              value={title}
              onChangeText={setTitle}
            />
{inputType === 'Voice' ? (
  <View style={styles.voiceContainer}>
    <CustomText style={styles.voiceLabel}>Voice Recording</CustomText>
    <View style={styles.voiceBox}>
      <Mic size={48} color="#9CA3AF" style={styles.voiceMicIcon} />
      <CustomText style={styles.voicePrompt}>Tap to start recording</CustomText>
      <TouchableOpacity style={styles.voiceRecordBtn}>
        <CustomText style={styles.voiceRecordBtnText}>Start Recording</CustomText>
      </TouchableOpacity>
    </View>
  </View>
) : inputType === 'File' ? (
  <View style={styles.fileContainer}>
    <CustomText style={styles.fileLabel}>File Upload</CustomText>
    <View style={styles.fileBox}>
      <Upload size={48} color="#9CA3AF" style={styles.fileIcon} />
      <CustomText style={styles.filePrompt}>Tap to select files</CustomText>
      <TouchableOpacity style={styles.fileSelectBtn}>
        <CustomText style={styles.fileSelectBtnText}>Select Files</CustomText>
      </TouchableOpacity>
    </View>
  </View>
) : inputType === 'Camera' ? (
  <View style={styles.cameraContainer}>
    <CustomText style={styles.cameraLabel}>Camera Capture</CustomText>
    <View style={styles.cameraBox}>
      <Camera size={48} color="#9CA3AF" style={styles.cameraIcon} />
      <CustomText style={styles.cameraPrompt}>Tap to take photo</CustomText>
      <TouchableOpacity style={styles.cameraBtn}>
        <CustomText style={styles.cameraBtnText}>Take Photo</CustomText>
      </TouchableOpacity>
    </View>
  </View>
) : (
  <>
    <CustomText style={styles.label}>Knowledge Content</CustomText>
    <TextInput
      style={[styles.input, styles.textArea]}
      placeholder="Share your insights, experience, or expertise..."
      placeholderTextColor="#B0B0B0"
      value={content}
      onChangeText={setContent}
      multiline
      numberOfLines={5}
    />
  </>
)}

 
            <CustomText style={styles.label}>Tags</CustomText>
            <View style={styles.tagsContainer}>
              {TAGS.map(tag => (
                <TouchableOpacity
                  key={tag}
                  style={[styles.tag, selectedTags.includes(tag) && styles.tagSelected]}
                  onPress={() => handleTagPress(tag)}
                >
                  <CustomText style={[styles.tagText, selectedTags.includes(tag) && styles.tagTextSelected]}>{tag}</CustomText>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.spacer} />
          </ScrollView>
          <View style={styles.bottomEntryBar}>
            <View style={styles.inputTypeBar}>
              {[
                { type: 'Text', icon: Tag },
                { type: 'Voice', icon: Mic },
                { type: 'File', icon: Upload },
                { type: 'Camera', icon: Camera }
              ].map(({ type, icon: Icon }) => (
                <TouchableOpacity
                  key={type}
                  style={[styles.inputTypeButton, inputType === type && styles.inputTypeButtonActive]}
                  onPress={() => setInputType(type)}
                >
                  <Icon 
                    size={20} 
                    color={inputType === type ? '#3B82F6' : '#B0B0B0'} 
                    style={styles.inputTypeIcon}
                  />
                  <CustomText style={[styles.inputTypeText, inputType === type && styles.inputTypeTextActive]}>{type}</CustomText>
                </TouchableOpacity>
              ))}
            </View>
            <CustomButton
              title="Save to AI Twin"
              onPress={() => {}}
              style={styles.saveButton}
              textStyle={styles.saveButtonText}
              disabled
            />
          </View>
        </>
      )}
      {/* Segmented Tab Bar at the bottom (like ImproveScreen) */}
      <View style={styles.bottomButtonContainer}>
        <View style={styles.segmentedContainer}>
          <View
            style={[styles.segmentedBtn, activeTab === 'Pinned' && styles.segmentedBtnActive]}
            onTouchEnd={() => setActiveTab('Pinned')}
          >
            <CustomText style={activeTab === 'Pinned' ? styles.segmentedBtnTextActive : styles.segmentedBtnText}>Pinned</CustomText>
          </View>
          <View
            style={[styles.segmentedBtn, activeTab === 'New Entry' && styles.segmentedBtnActive]}
            onTouchEnd={() => setActiveTab('New Entry')}
          >
            <CustomText style={activeTab === 'New Entry' ? styles.segmentedBtnTextActive : styles.segmentedBtnText}>New Entry</CustomText>
          </View>
        </View>
      </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginTop: 10,
  },
  content: {
    flex: 1,
    paddingTop: spacing.lg, // Add more top padding to prevent content from hiding under notch
  },
  listContent: {
    paddingVertical: spacing.md,
    paddingBottom: 140, // Space for bottom tabs
    paddingHorizontal: spacing.sm,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: spacing.xl * 3,
    paddingHorizontal: spacing.lg,
  },
  emptyIconContainer: {
    marginBottom: spacing.lg,
  },
  emptyTitle: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '800',
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  emptyDescription: {
    color: colors.textSecondary,
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
  },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    margin: spacing.md,
    padding: spacing.md,
    paddingBottom: 160, // Space for bottom elements
  },
  label: {
    fontWeight: '600',
    fontSize: 14,
    marginBottom: 6,
    marginTop: 12,
    color: '#222',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 12,
    fontSize: 15,
    backgroundColor: '#FAFAFA',
    marginBottom: 10,
    color: '#222',
  },
  textArea: {
    minHeight: 90,
    textAlignVertical: 'top',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 8,
  },
  spacer: {
    height: 140,
  },
  tag: {
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  tagSelected: {
    backgroundColor: '#E0E7FF',
  },
  tagText: {
    color: '#6B7280',
    fontSize: 13,
  },
  tagTextSelected: {
    color: '#3730A3',
    fontWeight: 'bold',
  },
  inputTypeBar: {
    flexDirection: 'row',
    backgroundColor: '#F7F8FA',
    borderRadius: 10,
    marginTop: 18,
    marginBottom: 10,
    padding: 4,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputTypeButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 8,
    flexDirection: 'row',
  },
  inputTypeIcon: {
    paddingHorizontal: 14,
  },
  inputTypeButtonActive: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  inputTypeText: {
    color: '#B0B0B0',
    fontWeight: '500',
    fontSize: 15,
  },
  inputTypeTextActive: {
    color: '#3B82F6',
    fontWeight: '600',
    fontSize: 15,
  },
  bottomEntryBar: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 18,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 60,
    zIndex: 15,
  },
  saveButton: {
    marginTop: 10,
    marginBottom: 24,
    backgroundColor: '#E5E7EB',
    borderRadius: 8,
    paddingVertical: 14,
  },
  saveButtonText: {
    color: '#A1A1AA',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  bottomButtonContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    marginBottom: -20, // Add a little margin at the bottom (matches ImproveScreen)
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
  voiceContainer: {
    marginBottom: 16,
  },
  voiceLabel: {
    fontWeight: '600',
    fontSize: 15,
    color: '#222',
    marginBottom: 8,
  },
  voiceBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderStyle: 'dashed',
    padding: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  voiceMicIcon: {
    marginBottom: 10,
  },
  voicePrompt: {
    color: '#9CA3AF',
    fontSize: 15,
    marginBottom: 16,
  },
  voiceRecordBtn: {
    backgroundColor: '#F44F4F',
    borderRadius: 20,
    paddingHorizontal: 28,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  voiceRecordBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
   fileContainer: {
    marginBottom: 16,
  },
  fileLabel: {
    fontWeight: '600',
    fontSize: 15,
    color: '#222',
    marginBottom: 8,
  },
  fileBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderStyle: 'dashed',
    padding: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fileIcon: {
    marginBottom: 10,
  },
  filePrompt: {
    color: '#9CA3AF',
    fontSize: 15,
    marginBottom: 16,
  },
  fileSelectBtn: {
    backgroundColor: '#3B82F6',
    borderRadius: 10,
    paddingHorizontal: 28,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fileSelectBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  // ...existing code...
  cameraContainer: {
    marginBottom: 16,
  },
  cameraLabel: {
    fontWeight: '600',
    fontSize: 15,
    color: '#222',
    marginBottom: 8,
  },
  cameraBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderStyle: 'dashed',
    padding: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraIcon: {
    marginBottom: 8,
  },
  cameraPrompt: {
    color: '#9CA3AF',
    fontSize: 15,
    marginBottom: 16,
  },
  cameraBtn: {
    backgroundColor: '#3B82F6',
    borderRadius: 10,
    paddingHorizontal: 28,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export default AddNewScreen;
