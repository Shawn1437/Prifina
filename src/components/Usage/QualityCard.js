import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CustomText } from '../common';

const QualityCard = () => (
  <View style={styles.qualityCard}>
    <CustomText style={styles.qualityTitle}>Interaction Quality</CustomText>
    <View style={styles.qualityBarBg}>
      <View style={[styles.qualityBar, { width: '78%' }]} />
    </View>
    <View style={styles.qualityRowSingle}>
      <CustomText style={styles.qualityLabelSingle}>Based on Knowledge (78%)</CustomText>
    </View>
    <View style={styles.qualityBarBg}>
      <View style={[styles.qualityBar, { width: '15%', backgroundColor: '#B0B3B9' }]} />
    </View>
    <View style={styles.qualityRowSingle}>
      <CustomText style={styles.qualityLabelSingle}>Summary Only (15%)</CustomText>
    </View>
    <View style={styles.qualityBarBg}>
      <View style={[styles.qualityBar, { width: '7%', backgroundColor: '#E5E7EB' }]} />
    </View>
    <View style={styles.qualityRowSingle}>
      <CustomText style={styles.qualityLabelSingle}>General Fallback (7%)</CustomText>
    </View>
  </View>
);

const styles = StyleSheet.create({
  qualityCard: {
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
  qualityTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 16,
    color: '#222',
  },
  qualityRowSingle: {
    marginBottom: 10,
    marginTop: 2,
  },
  qualityLabelSingle: {
    color: '#888',
    fontSize: 14,
    textAlign: 'left',
    marginLeft: 2,
  },
  qualityBarBg: {
    flex: 2,
    height: 8,
    backgroundColor: '#ECEEF2',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 8,
  },
  qualityBar: {
    height: 8,
    backgroundColor: '#374151',
    borderRadius: 6,
  },
});

export default QualityCard;
