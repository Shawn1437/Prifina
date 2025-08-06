import React from 'react';
import { View, Switch, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { CustomText } from '../common';
import { Plus } from 'lucide-react-native';

const SettingsCard = ({
  enableBlogging,
  setEnableBlogging,
  autoDraft,
  setAutoDraft,
  sendDraftsEmail,
  setSendDraftsEmail,
  writingStyle,
  setWritingStyle,
  targetAudience,
  setTargetAudience,
  perspective,
  setPerspective,
}) => (
  <View>
    <View style={styles.settingsCard}>
      <CustomText style={styles.settingsTitle}>General Settings</CustomText>
      <View style={styles.settingsRow}>
        <CustomText style={styles.settingsLabel}>Enable Blogging</CustomText>
        <Switch
          value={enableBlogging}
          onValueChange={setEnableBlogging}
          trackColor={{ false: '#ccc', true: '#2563EB' }}
          thumbColor={enableBlogging ? '#2563EB' : '#f4f3f4'}
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
          trackColor={{ false: '#ccc', true: '#2563EB' }}
          thumbColor={sendDraftsEmail ? '#2563EB' : '#f4f3f4'}
        />
      </View>
    </View>
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
    <View style={styles.trackedCard}> 
      <View style={styles.trackedHeader}>
        <CustomText style={styles.trackedTitle}>Tracked Topics</CustomText>
        <TouchableOpacity style={styles.trackedAddBtn}>
          <Plus size={20} color={'#2563EB'} />
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
  </View>
);

const styles = StyleSheet.create({
  settingsCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 18,
    marginBottom: 18,
    alignSelf: 'center',
    width: '100%',
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
    color: '#222',
  },
  settingsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  settingsLabel: {
    fontSize: 16,
    color: '#222',
    fontWeight: '500',
  },
  autoDraftGroup: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    borderRadius: 20,
    padding: 0,
    gap: 8,
    marginLeft: 8,
  },
  autoDraftBtn: {
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 20,
    backgroundColor: '#F4F6FA',
    maxWidth: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
  autoDraftBtnActive: {
    backgroundColor: '#2563EB',
  },
  autoDraftBtnText: {
    color: '#6B7280',
    fontSize: 12,
    fontWeight: '500',
  },
  autoDraftBtnTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  inputLabel: {
    marginTop: 12,
    marginBottom: 6,
    color: '#222',
    fontSize: 15,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    padding: 13,
    fontSize: 15,
    color: '#222',
    backgroundColor: '#FAFAFA',
    marginBottom: 10,
  },
  trackedCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 18,
    marginBottom: 60,
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
    color: '#222',
  },
  trackedAddBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trackedAddBtnText: {
    color: '#2563EB',
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
    color: '#222',
    marginBottom: 2,
  },
  topicMeta: {
    color: '#888',
    fontSize: 13,
    marginBottom: 1,
  },
});

export default SettingsCard;
