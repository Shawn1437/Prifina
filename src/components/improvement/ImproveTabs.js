import React from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { CustomText } from '../common';
import { colors } from '../../styles';

const ImproveTabs = ({ tabs, activeTab, onTabChange }) => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabBar}
      >
        {tabs.map(tab => (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tabBtn, activeTab === tab.key && styles.tabBtnActive]}
            onPress={() => onTabChange(tab.key)}
          >
            <CustomText style={activeTab === tab.key ? styles.tabTextActive : styles.tabText}>
              {tab.label}
            </CustomText>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 18,
    marginTop: 8,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: colors.background,
    borderRadius: 20,
    padding: 4,
    marginHorizontal: 8,
    marginTop: 6,
  },
  tabBtn: {
    paddingHorizontal: 16,
    paddingVertical: 5,
    borderRadius: 22,
    marginRight: 8,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: '#E6E8EC',
  },
  tabBtnActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    shadowColor: 'transparent',
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  tabText: {
    color: colors.textSecondary,
    fontWeight: '500',
    fontSize: 15,
  },
  tabTextActive: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export default ImproveTabs;
