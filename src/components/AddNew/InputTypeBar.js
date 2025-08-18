import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { CustomText, CustomButton } from '../common';
import { Mic, Upload, Camera, Tag } from 'lucide-react-native';

const InputTypeBar = ({ inputType, setInputType }) => (
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
);

const styles = StyleSheet.create({
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
});

export default InputTypeBar;
