import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  ScrollView,
  SafeAreaView,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { dummyData } from '@src/constants/db';

const PinnedCard = ({ item, onAddKnowledge }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.titleContainer}>
          <TouchableOpacity 
            style={styles.expandButton}
            onPress={() => setIsExpanded(!isExpanded)}
          >
            <Icon 
              name={isExpanded ? "chevron-up" : "chevron-down"} 
              size={16} 
              color="#666" 
            />
          </TouchableOpacity>
          <Text style={styles.title}>{item.question}</Text>
        </View>
        <Icon name="bookmark" size={18} color="#007AFF" />
      </View>

      {isExpanded && (
        <View style={styles.expandedContent}>
          <Text style={styles.description}>{item.desc}</Text>
          <Text style={styles.description}>{item.desc1}</Text>    
        </View>
      )}

      <View style={styles.cardFooter}>
        <Text style={styles.timestamp}>{item.time}</Text>
        <TouchableOpacity 
          style={styles.addKnowledgeButton}
          onPress={() => onAddKnowledge(item)}
        >
          <Icon name="plus" size={14} color="#007AFF" />
          <Text style={styles.addKnowledgeText}>Add Knowledge</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const NewEntryForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [inputMethod, setInputMethod] = useState('text');

  const tags = ['Startups', 'SaaS', 'Product Management', 'Fundraising', 'Growth', 'Strategy'];
  const inputMethods = [
    { key: 'text', icon: 'tag', label: 'Text' },
    { key: 'voice', icon: 'mic', label: 'Voice' },
    { key: 'file', icon: 'upload', label: 'File' },
    { key: 'camera', icon: 'camera', label: 'Camera' }
  ];

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const isSaveDisabled = !title.trim() && !content.trim();

  const renderInputMethodContent = () => {
    switch (inputMethod) {
      case 'voice':
        return (
          <View style={styles.inputSection}>
            <Text style={styles.label}>Voice Recording</Text>
            <View style={styles.voiceContainer}>
              <Icon name="mic" size={48} color="#666" style={styles.voiceIcon} />
              <Text style={styles.voiceText}>Tap to start recording</Text>
              <TouchableOpacity style={styles.recordButtonVoice}>
                <Text style={styles.recordButtonText}>Start Recording</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      
      case 'camera':
        return (
          <View style={styles.inputSection}>
            <Text style={styles.label}>Camera Capture</Text>
            <View style={styles.cameraContainer}>
              <Icon name="camera" size={48} color="#666" style={styles.cameraIcon} />
              <Text style={styles.cameraText}>Tap to take photo</Text>
              <TouchableOpacity style={styles.cameraButton}>
                <Text style={styles.cameraButtonText}>Take Photo</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      
      case 'file':
        return (
          <View style={styles.inputSection}>
            <Text style={styles.label}>File Upload</Text>
            <View style={styles.fileContainer}>
              <Icon name="upload" size={48} color="#666" style={styles.fileIcon} />
              <Text style={styles.fileText}>Tap to select files</Text>
              <TouchableOpacity style={styles.fileButton}>
                <Text style={styles.fileButtonText}>Select Files</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      
      case 'text':
      default:
        return (
          <View style={styles.inputSection}>
            <Text style={styles.label}>Knowledge Content</Text>
            <TextInput
              style={styles.contentInput}
              placeholder="Share your insights, experience, or expertise..."
              value={content}
              onChangeText={setContent}
              multiline
              numberOfLines={6}
              textAlignVertical="top"
              placeholderTextColor="#999"
            />
          </View>
        );
    }
  };

  return (
    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
      <View style={styles.formContent}>
        {/* Title Input */}
        <View style={styles.inputSection}>
          <Text style={styles.label}>Title (Optional)</Text>
          <TextInput
            style={styles.titleInput}
            placeholder="Brief title for this knowledge..."
            value={title}
            onChangeText={setTitle}
            placeholderTextColor="#999"
          />
        </View>
        {renderInputMethodContent()}

        {/* Tags */}
        <View style={styles.inputSection}>
          <Text style={styles.label}>Tags</Text>
          <View style={styles.tagsContainer}>
            {tags.map((tag) => (
              <TouchableOpacity
                key={tag}
                style={[
                  styles.tag,
                  selectedTags.includes(tag) && styles.selectedTag
                ]}
                onPress={() => toggleTag(tag)}
              >
                <Icon 
                  name="tag" 
                  size={12} 
                  color={selectedTags.includes(tag) ? '#007AFF' : '#666'} 
                />
                <Text style={[
                  styles.tagText,
                  selectedTags.includes(tag) && styles.selectedTagText
                ]}>
                  {tag}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Input Method Options */}
        <View style={styles.inputSection}>
          <View style={styles.inputMethodContainer}>
            {inputMethods.map((method) => (
              <TouchableOpacity
                key={method.key}
                style={[
                  styles.inputMethodButton,
                  inputMethod === method.key && styles.selectedInputMethod
                ]}
                onPress={() => setInputMethod(method.key)}
              >
                <Icon 
                  name={method.icon} 
                  size={16} 
                  color={inputMethod === method.key ? '#007AFF' : '#666'} 
                />
                <Text style={[
                  styles.inputMethodText,
                  inputMethod === method.key && styles.selectedInputMethodText
                ]}>
                  {method.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Save Button */}
        <TouchableOpacity 
          style={[styles.saveButton, isSaveDisabled && styles.saveButtonDisabled]}
          disabled={isSaveDisabled}
        >
          <Text style={[styles.saveButtonText, isSaveDisabled && styles.saveButtonTextDisabled]}>
            Save to AI Twin
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const AddNewScreen = () => {
  const [activeTab, setActiveTab] = useState('pinned');

  const pinnedData = dummyData.filter(item => item.pinned);

  const handleAddKnowledge = (item) => {
    // Handle adding knowledge logic here
    console.log('Adding knowledge for:', item.question);
  };

  const renderPinnedCards = () => (
    <FlatList
      data={pinnedData}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <PinnedCard item={item} onAddKnowledge={handleAddKnowledge} />
      )}
      contentContainerStyle={styles.listContainer}
      showsVerticalScrollIndicator={false}
    />
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'pinned':
        return renderPinnedCards();
      case 'newEntry':
        return <NewEntryForm />;
      default:
        return renderPinnedCards();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {renderContent()}
      </View>
      
      {/* Entry Navigation Tabs */}
      <View style={styles.entryTabs}>
        <TouchableOpacity 
          style={[styles.entryTab, activeTab === 'pinned' && styles.activeEntryTab]}
          onPress={() => setActiveTab('pinned')}
        >
          <Text style={[styles.entryTabText, activeTab === 'pinned' && styles.activeEntryTabText]}>Pinned</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.entryTab, activeTab === 'newEntry' && styles.activeEntryTab]}
          onPress={() => setActiveTab('newEntry')}
        >
          <Text style={[styles.entryTabText, activeTab === 'newEntry' && styles.activeEntryTabText]}>New Entry</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
  },
  listContainer: {
    padding: 16,
  },
  // Pinned Card Styles
  card: {
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 12,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  expandButton: {
    marginRight: 8,
    padding: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
    lineHeight: 22,
  },
  expandedContent: {
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 8,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timestamp: {
    fontSize: 12,
    color: '#999',
  },
  addKnowledgeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 4,
  },
  addKnowledgeText: {
    fontSize: 12,
    color: '#007AFF',
    fontWeight: '500',
  },
  // Entry Tabs Styles
  entryTabs: {
    flexDirection: 'row',
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    margin: 16,
    padding: 4,
  },
  entryTab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 6,
  },
  activeEntryTab: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  entryTabText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  activeEntryTabText: {
    color: '#333',
    fontWeight: '600',
  },
  // New Entry Form Styles
  scrollView: {
    flex: 1,
  },
  formContent: {
    padding: 20,
  },
  inputSection: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  titleInput: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#F8F9FA',
  },
  contentInput: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#F8F9FA',
    minHeight: 120,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    gap: 4,
  },
  selectedTag: {
    backgroundColor: '#E3F2FD',
    borderColor: '#007AFF',
  },
  tagText: {
    fontSize: 14,
    color: '#666',
  },
  selectedTagText: {
    color: '#007AFF',
    fontWeight: '500',
  },
  inputMethodContainer: {
    flexDirection: 'row',
    gap: 4,
  },
  inputMethodButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderRadius: 4,
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    gap: 6,
  },
  selectedInputMethod: {
    backgroundColor: '#E3F2FD',
    borderColor: '#007AFF',
  },
  inputMethodText: {
    fontSize: 14,
    color: '#666',
  },
  selectedInputMethodText: {
    color: '#007AFF',
    fontWeight: '500',
  },
  saveButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 24,
  },
  saveButtonDisabled: {
    backgroundColor: '#E5E5E5',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  saveButtonTextDisabled: {
    color: '#999',
  },
  // New Entry Form Specific Styles
  voiceContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  voiceIcon: {
    marginBottom: 10,
  },
  voiceText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  recordButtonVoice: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  recordButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  recordButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  cameraContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  cameraIcon: {
    marginBottom: 10,
  },
  cameraText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  cameraButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  cameraButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  fileContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  fileIcon: {
    marginBottom: 10,
  },
  fileText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  fileButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  fileButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AddNewScreen; 