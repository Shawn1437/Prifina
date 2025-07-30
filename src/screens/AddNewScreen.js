
import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, FlatList, TextInput, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { colors, spacing } from '../styles';
import { CustomText, CustomButton, KnowledgeCard } from '../components/common';

const mockQuestions = [
  {
    id: '1',
    title: "How can I improve my startup's product-market fit?",
    description: 'Product-market fit requires continuous iteration based on customer feedback. Sta...',
    pinned: true,
    timeAgo: '2 hours ago',
    knowledgeAdded: false,
  },
  {
    id: '2',
    title: 'What are the key metrics for SaaS businesses?',
    description: 'The most critical SaaS metrics include Monthly Recurring Revenue (MRR), ...',
    pinned: true,
    timeAgo: '1 day ago',
    knowledgeAdded: true,
  },
  {
    id: '3',
    title: 'How do I pitch to investors effectively?',
    description: 'A compelling investor pitch tells a story: problem, solution, market opportunity, ...',
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

  const handleAddKnowledge = (id) => {
    setActiveTab('New Entry');
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
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      {activeTab === 'Pinned' && (
        <FlatList
          data={mockQuestions}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={{ paddingVertical: spacing.md, paddingBottom: 80 }}
          showsVerticalScrollIndicator={false}
        />
      )}
      {activeTab === 'New Entry' && (
        <>
          <ScrollView contentContainerStyle={[styles.formContainer, { backgroundColor: '#fff', borderRadius: 12 }]} keyboardShouldPersistTaps="handled">
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
      <CustomText style={styles.voiceMicIcon}>🎤</CustomText>
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
      <CustomText style={styles.fileIcon}>⬆️</CustomText>
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
      <CustomText style={styles.cameraIcon}>📷</CustomText>
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
            <View style={{ height: 140 }} />
          </ScrollView>
          <View style={styles.bottomEntryBar}>
            <View style={styles.inputTypeBar}>
              {['Text', 'Voice', 'File', 'Camera'].map(type => (
                <TouchableOpacity
                  key={type}
                  style={[styles.inputTypeButton, inputType === type && styles.inputTypeButtonActive]}
                  onPress={() => setInputType(type)}
                >
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    // Removed marginTop to avoid extra space at the top
  },
  formContainer: {
    padding: 16,
    paddingBottom: 80, // reduced to avoid excessive bottom space
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
    paddingVertical: 8,
    borderRadius: 8,
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
    color: '#222',
    fontWeight: '700',
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
    fontSize: 20,
    color: '#9CA3AF',
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
    fontSize: 20,
    color: '#3B82F6',
    marginBottom: 10,
  },
  filePrompt: {
    color: '#9CA3AF',
    fontSize: 15,
    marginBottom: 16,
  },
  fileSelectBtn: {
    backgroundColor: '#3B82F6',
    borderRadius: 20,
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
    fontSize: 25,
    color: '#60A5FA',
    marginBottom: 10,
  },
  cameraPrompt: {
    color: '#9CA3AF',
    fontSize: 15,
    marginBottom: 16,
  },
  cameraBtn: {
    backgroundColor: '#2563EB',
    borderRadius: 20,
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
