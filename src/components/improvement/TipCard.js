import React from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, Platform, PermissionsAndroid, ActionSheetIOS } from 'react-native';
import { CustomText } from '../common';
import { Upload, Camera, MessageSquare, PenTool, Target, MoveRight } from 'lucide-react-native';
import { colors } from '../../styles';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';

// Try importing DocumentPicker with graceful fallback
let DocumentPicker = null;
try {
  DocumentPicker = require('@react-native-documents/picker').default;
  if (!DocumentPicker) {
    DocumentPicker = require('@react-native-documents/picker');
  }
} catch (error) {
  console.warn('DocumentPicker import failed in TipCard:', error);
  DocumentPicker = null;
}

const ICON_MAP = {
  upload: Upload,
  photo: Camera,
  chat: MessageSquare,
  edit: PenTool,
  target: Target,
};

const TipCard = ({ icon, title, desc, tag, action, onClose, onAction }) => {
  const IconComponent = ICON_MAP[icon];

  // Handle document upload functionality
  const handleDocumentUpload = async () => {
    try {
      console.log('Starting document upload from TipCard...');
      
      if (!DocumentPicker) {
        console.log('DocumentPicker not available, showing camera/gallery options');
        showMediaSelectionFallback();
        return;
      }
      
      if (!DocumentPicker.pick) {
        console.log('DocumentPicker.pick not available, showing fallback options');
        showMediaSelectionFallback();
        return;
      }

      // Try the document picker
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
        allowMultiSelection: false,
        copyTo: 'cachesDirectory',
      });

      console.log('Document selected:', result);

      if (result && result.length > 0) {
        const file = result[0];
        
        // if (!file.uri) {
        //   throw new Error('Invalid file selected - no URI');
        // }

        // Check file size (limit to 50MB)
        const maxSize = 50 * 1024 * 1024;
        if (file.size && file.size > maxSize) {
          Alert.alert(
            'File Too Large', 
            `The selected file is ${(file.size / (1024 * 1024)).toFixed(1)}MB. Please select a file smaller than 50MB.`
          );
          return;
        }

        Alert.alert('Document Uploaded', `Successfully uploaded: ${file.name || 'Unknown file'}`);
        console.log('Document uploaded:', file);
      }
    } catch (error) {
      // If user cancelled or did nothing, do nothing (no alert, no fallback, no log)
      if (
        error.code === 'DOCUMENT_PICKER_CANCELED' ||
        error.message?.toLowerCase().includes('cancel') ||
        error.message?.toLowerCase().includes('user cancelled') ||
        error.message?.toLowerCase().includes('user canceled')
      ) {
        return;
      }

      // Only log and show fallback for real errors
      if (error.message) {
        console.error('DocumentPicker error:', error.message);
        showMediaSelectionFallback();
        return;
      }

      Alert.alert('Upload Error', 'Failed to upload document. Please try again.');
    }
  };

  // Handle camera functionality
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
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 2000,
        maxWidth: 2000,
        quality: 0.8,
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
          console.log('Photo captured/selected:', asset);
          Alert.alert('Success', `${action === 'camera' ? 'Photo captured' : 'Photo selected'} successfully!`);
        } else {
          Alert.alert('Error', 'No photo was selected or captured');
        }
      };

      if (action === 'camera') {
        launchCamera(options, callback);
      } else {
        launchImageLibrary(options, callback);
      }
    } catch (error) {
      console.error(`${action} error:`, error);
      Alert.alert('Error', `Failed to ${action === 'camera' ? 'take photo' : 'select photo'}: ${error.message}`);
    }
  };

  // Show media selection fallback when DocumentPicker is not available
  const showMediaSelectionFallback = () => {
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
          title: 'Add Content',
          message: 'Select how you want to add content'
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
      Alert.alert(
        'Add Content',
        'Document picker is currently unavailable. You can still add photos:',
        [
          { text: 'Gallery', onPress: () => handleCameraAction('gallery') },
          { text: 'Camera', onPress: () => handleCameraAction('camera') },
          { text: 'Cancel', style: 'cancel' }
        ]
      );
    }
  };

  // Handle the action button press based on the tip type
  const handleActionPress = () => {
    if (icon === 'upload' && action === 'Upload now') {
      handleDocumentUpload();
    } else if (icon === 'photo' && action === 'Try it') {
      handleCameraAction('camera');
    } else {
      // Default behavior for other actions
      if (onAction) {
        onAction();
      }
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.content}>
        <View style={styles.iconWrap}>
          {IconComponent && <IconComponent size={26} color={colors.textSecondary} />}
        </View>
        <CustomText style={styles.title}>{title}</CustomText>
        <CustomText style={styles.description}>{desc}</CustomText>
        <View style={styles.footer}>
          <CustomText style={styles.tag}>{tag}</CustomText>
          <TouchableOpacity style={styles.actionBtn} onPress={handleActionPress}>
            <View style={styles.actionContent}>
              <CustomText style={styles.actionText}>{action}</CustomText>
              <MoveRight size={16} color={colors.primary} style={styles.actionIcon} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
        <CustomText style={styles.closeText}>✕</CustomText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
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
    borderLeftWidth: 4,
    borderLeftColor: '#7B8493',
  },
  content: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F4F5F7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    borderWidth: 1,
    borderColor: '#E6E8EC',
    marginBottom: 12,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 6,
    color: colors.textPrimary,
  },
  description: {
    color: colors.textSecondary,
    fontSize: 14,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 18,
  },
  tag: {
    color: '#7B61FF',
    fontSize: 13,
    fontWeight: '500',
    backgroundColor: 'transparent',
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  actionBtn: {
    backgroundColor: colors.tagsbg,
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 3,
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 90,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E6E8EC',
  },
  actionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    color: colors.primary,
    fontWeight: '500',
    fontSize: 13,
    letterSpacing: 0.1,
  },
  actionIcon: {
    marginLeft: 4,
  },
  closeBtn: {
    position: 'absolute',
    top: 14,
    right: 14,
  },
  closeText: {
    color: colors.textSecondary,
    fontSize: 18,
    opacity: 0.5,
  },
});

export default TipCard;
