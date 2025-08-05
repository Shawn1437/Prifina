import React, { useState, useRef } from 'react';
import { View, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert, PermissionsAndroid, Platform, ActionSheetIOS } from 'react-native';
import { CustomText } from '../common';
import { Mic, Upload, Camera, Tag, Square, Play, FileText, Image as ImageIcon } from 'lucide-react-native';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import AudioRecord from 'react-native-audio-record';

// Try multiple import strategies for DocumentPicker
let DocumentPicker;
try {
  DocumentPicker = require('@react-native-documents/picker').default;
  if (!DocumentPicker) {
    DocumentPicker = require('@react-native-documents/picker');
  }
} catch (error) {
  console.warn('DocumentPicker import failed:', error);
  DocumentPicker = null;
}

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
  const [isRecording, setIsRecording] = useState(false);
  const [recordingPath, setRecordingPath] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [capturedImages, setCapturedImages] = useState([]);
  const [audioInitialized, setAudioInitialized] = useState(false);
  

  // Initialize audio recording configuration
  const initializeAudioRecording = () => {
    if (!audioInitialized) {
      const options = {
        sampleRate: 16000,  // default 44100
        channels: 1,        // 1 or 2, default 1
        bitsPerSample: 16,  // 8 or 16, default 16
        audioSource: 6,     // android only (see below)
        wavFile: 'audio_recording.wav' // default 'audio.wav'
      };
      
      AudioRecord.init(options);
      setAudioInitialized(true);
      console.log('Audio recording initialized');
    }
  };
  

  // Request permissions for Android
  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      try {
        const grants = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          PermissionsAndroid.PERMISSIONS.CAMERA,
        ]);
        
        console.log('Permission grants:', grants);
        
        // Check specifically for audio recording permission
        const audioPermissionGranted = grants[PermissionsAndroid.PERMISSIONS.RECORD_AUDIO] === PermissionsAndroid.RESULTS.GRANTED;
        
        if (!audioPermissionGranted) {
          Alert.alert(
            'Permission Required', 
            'Microphone permission is required for voice recording. Please enable it in app settings.',
            [
              { text: 'OK', style: 'default' }
            ]
          );
          return false;
        }
        
        return true;
      } catch (err) {
        console.warn('Permission request error:', err);
        Alert.alert('Permission Error', 'Failed to request microphone permission');
        return false;
      }
    }
    return true; // iOS permissions are handled differently by the audio library
  };

  // Voice recording functionality with proper error handling
  const handleVoiceRecording = async () => {
    try {
      // Request permissions first
      const hasPermission = await requestPermissions();
      if (!hasPermission) {
        return;
      }

      // Initialize audio recording if not already done
      initializeAudioRecording();

      if (!isRecording) {
        // Start recording
        console.log('Starting audio recording...');
        AudioRecord.start();
        setIsRecording(true);
        setRecordingPath(null); // Clear previous recording
        console.log('Audio recording started');
      } else {
        // Stop recording
        console.log('Stopping audio recording...');
        const audioFile = await AudioRecord.stop();
        setIsRecording(false);
        
        if (audioFile) {
          setRecordingPath(audioFile);
          console.log('Audio recording saved to:', audioFile);
          Alert.alert('Success', 'Voice recording saved successfully!');
        } else {
          Alert.alert('Error', 'Failed to save audio recording');
        }
      }
    } catch (error) {
      console.error('Voice recording error:', error);
      setIsRecording(false);
      
      let errorMessage = 'Failed to record audio';
      
      if (error.code === 'PERMISSION_DENIED') {
        errorMessage = 'Microphone permission is required for voice recording';
      } else if (error.message) {
        errorMessage = `Recording error: ${error.message}`;
      }
      
      Alert.alert('Recording Error', errorMessage);
    }
  };

  // Function to play recorded audio (optional enhancement)
  const handlePlayRecording = () => {
    if (recordingPath) {
      Alert.alert(
        'Audio Recording',
        `Recording saved at: ${recordingPath}\n\nYou can implement audio playback here using a media player library.`,
        [
          { text: 'OK', style: 'default' },
          { text: 'Record Again', onPress: handleVoiceRecording, style: 'cancel' }
        ]
      );
    }
  };

  // Alternative file selection using ActionSheet (iOS) or Alert (Android)
  const showFileSelectionFallback = () => {
    const options = [
      'Choose from Gallery',
      'Take Photo',
      'Cancel'
    ];

    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: options,
          cancelButtonIndex: 2,
          title: 'Add File',
          message: 'Select how you want to add a file'
        },
        (buttonIndex) => {
          if (buttonIndex === 0) {
            handleCameraAction('gallery');
          } else if (buttonIndex === 1) {
            handleCameraAction('camera');
          }
        }
      );
    } else {
      // Only show fallback if user is actively trying to upload, not when returning from picker
      // This prevents the alert from persisting when user goes back
      // You may want to use a modal or navigation state to control this more precisely
    }
  };

  const handleFileUpload = async () => {
    try {
      console.log('Starting file selection...');
      console.log('DocumentPicker available:', !!DocumentPicker);
      console.log('DocumentPicker object:', DocumentPicker);
      
      if (DocumentPicker) {
        console.log('DocumentPicker.pick:', DocumentPicker.pick);
        console.log('DocumentPicker.types:', DocumentPicker.types);
      }

      // Check if DocumentPicker is available
      if (!DocumentPicker) {
        console.log('DocumentPicker not available, showing fallback options');
        showFileSelectionFallback();
        return;
      }
      
      if (!DocumentPicker.pick) {
        console.log('DocumentPicker.pick not available, showing fallback options');
        showFileSelectionFallback();
        return;
      }

      if (!DocumentPicker.types) {
        console.log('DocumentPicker.types not available, showing fallback options');
        showFileSelectionFallback();
        return;
      }

      // Try the file picker
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
        allowMultiSelection: false,
        copyTo: 'cachesDirectory',
      });

      console.log('File selected:', result);

      if (result && result.length > 0) {
        const file = result[0];

        // Validate file
        if (!file.uri) {
          throw new Error('Invalid file selected - no URI');
        }

        const fileInfo = {
          name: file.name || 'Unknown File',
          uri: file.uri,
          type: file.type || 'unknown',
          size: file.size || 0,
          copyUri: file.copyUri || file.uri,
        };

        // Check file size (limit to 50MB)
        const maxSize = 50 * 1024 * 1024;
        if (fileInfo.size > maxSize) {
          Alert.alert(
            'File Too Large', 
            `The selected file is ${(fileInfo.size / (1024 * 1024)).toFixed(1)}MB. Please select a file smaller than 50MB.`
          );
          return;
        }

        setSelectedFiles([fileInfo]);
        Alert.alert('Success', `File "${fileInfo.name}" selected successfully!`);
        console.log('File info stored:', fileInfo);
      } else {
        throw new Error('No file was selected');
      }
    } catch (error) {
      console.error('File selection error:', error);

      if (error.code === 'DOCUMENT_PICKER_CANCELED') {
        console.log('User cancelled file selection');
        return;
      }

      // Handle different error types
      let errorMessage = 'Failed to select file';

      if (error.message && error.message.includes('native module linking')) {
        console.log('Native module linking issue detected, showing fallback');
        showFileSelectionFallback();
        return;
      } else if (error.code === 'PERMISSION_DENIED') {
        errorMessage = 'Permission denied. Please allow file access in settings.';
      } else if (error.code === 'INVALID_FILE_TYPE') {
        errorMessage = 'Invalid file type selected.';
      } else if (error.code === 'FILE_SIZE_EXCEEDED') {
        errorMessage = 'File size is too large.';
      } else if (error.code === 'UNKNOWN_ERROR') {
        errorMessage = 'An unknown error occurred. Please try again.';
      } else if (error.message) {
        console.log('DocumentPicker error, showing fallback:', error.message);
        showFileSelectionFallback();
        return;
      }

      Alert.alert('File Selection Error', errorMessage, [
        { text: 'OK', style: 'default' },
        { text: 'Try Again', onPress: handleFileUpload, style: 'cancel' }
      ]);
    }
  };

  const handleCameraCapture = () => {
    Alert.alert(
      'Select Image',
      'Choose an option',
      [
        { text: 'Camera', onPress: () => openCamera() },
        { text: 'Gallery', onPress: () => openGallery() },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const openCamera = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchCamera(options, (response) => {
      if (response.didCancel || response.error) {
        return;
      }
      
      if (response.assets && response.assets[0]) {
        setCapturedImages(prev => [...prev, response.assets[0]]);
        Alert.alert('Success', 'Photo captured successfully!');
      }
    });
  };

  const openGallery = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel || response.error) {
        return;
      }
      
      if (response.assets && response.assets[0]) {
        setCapturedImages(prev => [...prev, response.assets[0]]);
        Alert.alert('Success', 'Image selected successfully!');
      }
    });
  };

  // Enhanced camera action for file selection fallback
  const handleCameraAction = async (action) => {
    try {
      // Request camera permission for Android
      if (Platform.OS === 'android' && action === 'camera') {
        const cameraPermission = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'This app needs access to your camera to take photos.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );

        if (cameraPermission !== PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert('Permission Denied', 'Camera permission is required to take photos.');
          return;
        }
      }

      const options = {
        mediaType: 'mixed', // Allow both photos and videos
        includeBase64: false,
        maxHeight: 2000,
        maxWidth: 2000,
        quality: 0.8,
        selectionLimit: 1, // Only allow one file
      };

      const callback = (response) => {
        console.log('Camera/Gallery response:', response);

        if (response.didCancel) {
          console.log('User cancelled camera/gallery');
          return;
        }

        if (response.errorMessage) {
          console.error('Camera/Gallery error:', response.errorMessage);
          Alert.alert('Error', `Failed to access ${action}: ${response.errorMessage}`);
          return;
        }

        if (response.assets && response.assets.length > 0) {
          const asset = response.assets[0];
          
          // Create file info object similar to DocumentPicker format
          const fileInfo = {
            name: asset.fileName || `${action}_${Date.now()}.${asset.type.split('/')[1]}`,
            uri: asset.uri,
            type: asset.type,
            size: asset.fileSize || 0,
            copyUri: asset.uri,
          };

          // Check file size (limit to 50MB)
          const maxSize = 50 * 1024 * 1024;
          if (fileInfo.size > maxSize) {
            Alert.alert(
              'File Too Large', 
              `The selected file is ${(fileInfo.size / (1024 * 1024)).toFixed(1)}MB. Please select a file smaller than 50MB.`
            );
            return;
          }

          setSelectedFiles([fileInfo]);
          Alert.alert('Success', `${action === 'camera' ? 'Photo taken' : 'File selected'} successfully!`);
          console.log('Media file stored:', fileInfo);
        } else {
          Alert.alert('Error', 'No file was selected or captured');
        }
      };

      if (action === 'camera') {
        launchCamera(options, callback);
      } else {
        launchImageLibrary(options, callback);
      }
    } catch (error) {
      console.error(`${action} error:`, error);
      Alert.alert('Error', `Failed to ${action === 'camera' ? 'take photo' : 'select file'}: ${error.message}`);
    }
  };
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
            {isRecording ? (
              <Square size={48} color="#F44F4F" style={styles.voiceMicIcon} />
            ) : recordingPath ? (
              <TouchableOpacity onPress={handlePlayRecording}>
                <Play size={48} color="#10B981" style={styles.voiceMicIcon} />
              </TouchableOpacity>
            ) : (
              <Mic size={48} color="#9CA3AF" style={styles.voiceMicIcon} />
            )}
            <CustomText style={styles.voicePrompt}>
              {isRecording ? 'Recording... Tap to stop' : recordingPath ? 'Recording saved! Tap play icon to review' : 'Tap to start recording'}
            </CustomText>
            <TouchableOpacity 
              style={[styles.voiceRecordBtn, isRecording && styles.voiceRecordBtnActive]} 
              onPress={handleVoiceRecording}
            >
              <CustomText style={styles.voiceRecordBtnText}>
                {isRecording ? 'Stop Recording' : recordingPath ? 'Record Again' : 'Start Recording'}
              </CustomText>
            </TouchableOpacity>
            {recordingPath && (
              <View style={styles.recordingInfo}>
                <CustomText style={styles.recordingPath} numberOfLines={1}>
                  Saved: {recordingPath.split('/').pop()}
                </CustomText>
              </View>
            )}
          </View>
        </View>
      ) : inputType === 'File' ? (
        <View style={styles.fileContainer}>
          <CustomText style={styles.fileLabel}>File Upload</CustomText>
          <View style={styles.fileBox}>
            <Upload size={48} color="#9CA3AF" style={styles.fileIcon} />
            <CustomText style={styles.filePrompt}>
              {selectedFiles.length > 0 ? `1 file selected` : 'Tap to select files'}
            </CustomText>
            <TouchableOpacity style={styles.fileSelectBtn} onPress={handleFileUpload}>
              <CustomText style={styles.fileSelectBtnText}>
                {selectedFiles.length > 0 ? 'Change File' : 'Select Files'}
              </CustomText>
            </TouchableOpacity>
          </View>
          {selectedFiles.length > 0 && (
            <View style={styles.selectedFilesContainer}>
              {selectedFiles.map((file, index) => (
                <View key={index} style={styles.fileItem}>
                  <FileText size={16} color="#6B7280" />
                  <View style={styles.fileDetails}>
                    <CustomText style={styles.fileName} numberOfLines={1}>
                      {file.name}
                    </CustomText>
                    <CustomText style={styles.fileSize}>
                      {file.size ? `${(file.size / 1024).toFixed(1)} KB` : 'Size unknown'}
                    </CustomText>
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>
      ) : inputType === 'Camera' ? (
        <View style={styles.cameraContainer}>
          <CustomText style={styles.cameraLabel}>Camera Capture</CustomText>
          <View style={styles.cameraBox}>
            <Camera size={48} color="#9CA3AF" style={styles.cameraIcon} />
            <CustomText style={styles.cameraPrompt}>
              {capturedImages.length > 0 ? `${capturedImages.length} photo(s) captured` : 'Tap to take photo'}
            </CustomText>
            <TouchableOpacity style={styles.cameraBtn} onPress={handleCameraCapture}>
              <CustomText style={styles.cameraBtnText}>
                {capturedImages.length > 0 ? 'Add More Photos' : 'Take Photo'}
              </CustomText>
            </TouchableOpacity>
          </View>
          {capturedImages.length > 0 && (
            <View style={styles.capturedImagesContainer}>
              {capturedImages.map((image, index) => (
                <View key={index} style={styles.imageItem}>
                  <ImageIcon size={16} color="#6B7280" />
                  <CustomText style={styles.imageName} numberOfLines={1}>
                    {image.fileName || `Photo ${index + 1}`}
                  </CustomText>
                </View>
              ))}
            </View>
          )}
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
  voiceRecordBtnActive: {
    backgroundColor: '#DC2626',
  },
  recordingInfo: {
    marginTop: 12,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    width: '100%',
    alignItems: 'center',
  },
  recordingPath: {
    fontSize: 12,
    color: '#6B7280',
    fontStyle: 'italic',
  },
  selectedFilesContainer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  fileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  fileDetails: {
    marginLeft: 12,
    flex: 1,
  },
  fileName: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
    marginBottom: 2,
  },
  fileSize: {
    fontSize: 12,
    color: '#6B7280',
  },
  capturedImagesContainer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  imageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: '#F9FAFB',
    borderRadius: 6,
    marginBottom: 6,
  },
  imageName: {
    marginLeft: 8,
    fontSize: 13,
    color: '#374151',
    flex: 1,
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
