import React from 'react';
import { View, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { CustomText } from '../common';
import { Mic, Upload, Camera, Tag } from 'lucide-react-native';

const InputForm = ({
  title,
  setTitle,
  content,
  setContent,
  inputType,
  setInputType,
  selectedTags,
  setSelectedTags,
  TAGS,
}) => {
  return (
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
            onPress={() => setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag])}
          >
            <CustomText style={[styles.tagText, selectedTags.includes(tag) && styles.tagTextSelected]}>{tag}</CustomText>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.spacer} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    margin: 16,
    padding: 16,
    paddingBottom: 160,
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

export default InputForm;
