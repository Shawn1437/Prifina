import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  ScrollView,
  SafeAreaView 
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const NewEntryScreen = () => {
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

  return (
    <SafeAreaView style={styles.container}>
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

          {/* Knowledge Content */}
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
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
    gap: 8,
  },
  inputMethodButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
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
});

export default NewEntryScreen; 