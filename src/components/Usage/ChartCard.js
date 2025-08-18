import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CustomText } from '../common';

const ChartCard = ({ dailyData, dailyLabels }) => (
  <View style={styles.chartCard}>
    <CustomText style={styles.chartTitle}>Daily Interactions (Last 7 Days)</CustomText>
    <View style={styles.barChart}>
      {dailyData.map((val, idx) => (
        <View key={idx} style={styles.barItem}>
          <View style={[styles.bar, { height: val * 2 }]} />
          <CustomText style={styles.barValue}>{val}</CustomText>
          <CustomText style={styles.barLabel}>{dailyLabels[idx]}</CustomText>
        </View>
      ))}
    </View>
  </View>
);

const styles = StyleSheet.create({
  chartCard: {
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
  chartTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 16,
    color: '#222',
  },
  barChart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 80,
    marginBottom: 8,
    marginTop: 40,
  },
  barItem: {
    alignItems: 'center',
    flex: 1,
    minWidth: 44,
  },
  bar: {
    width: 18,
    backgroundColor: '#374151',
    borderRadius: 6,
    marginBottom: 6,
  },
  barValue: {
    fontSize: 12,
    color: '#222',
    fontWeight: 'bold',
    marginBottom: 2,
    textAlign: 'center',
    minWidth: 44,
  },
  barLabel: {
    fontSize: 10,
    color: '#888',
    textAlign: 'center',
    flexWrap: 'nowrap',
    minWidth: 44,
  },
});

export default ChartCard;
