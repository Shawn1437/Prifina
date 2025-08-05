import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { CustomText } from '../common';
import { colors } from '../../styles';

const ImproveTabBar = ({ activeTab, onTabChange }) => {
  return (
    <View style={styles.container}>
      <View style={styles.segmentedContainer}>
        <TouchableOpacity
          style={[styles.segmentedBtn, activeTab === 'Improve Tips' && styles.segmentedBtnActive]}
          onPress={() => onTabChange('Improve Tips')}
        >
          <CustomText 
            style={activeTab === 'Improve Tips' ? styles.segmentedBtnTextActive : styles.segmentedBtnText}
          >
            Improve Tips
          </CustomText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.segmentedBtn, activeTab === 'Smart Recommendations' && styles.segmentedBtnActive]}
          onPress={() => onTabChange('Smart Recommendations')}
        >
          <CustomText 
            style={activeTab === 'Smart Recommendations' ? styles.segmentedBtnTextActive : styles.segmentedBtnText}
          >
            Smart Recommendations
          </CustomText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    marginBottom: -20,
  },
  segmentedContainer: {
    flexDirection: 'row',
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
    marginTop: 0,
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
    fontSize: 14,
  },
  segmentedBtnTextActive: {
    color: colors.textPrimary,
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default ImproveTabBar;
