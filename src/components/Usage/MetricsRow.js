import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CustomText } from '../common';
import { MessageSquare, Users, Clock, Heart } from 'lucide-react-native';

const ICON_MAP = {
  'MessageSquare': MessageSquare,
  'Users': Users,
  'Clock': Clock,
  'Heart': Heart,
};

const MetricsRow = ({ metrics }) => (
  <View style={styles.metricsRow}>
    {metrics.map((m, i) => {
      const IconComponent = ICON_MAP[m.icon];
      return (
        <View key={m.label} style={styles.metricCard}>
          <View style={styles.metricHeaderRow}>
            <View style={styles.metricIconRow}>
              {IconComponent && <IconComponent size={28} color={'#888'} />}
            </View>
            <View style={{ flex: 1 }} />
            {m.change ? (
              <CustomText style={styles.metricChange}>{m.change}</CustomText>
            ) : <View style={{ height: 18, width: 44 }} />}
          </View>
          <CustomText style={styles.metricValue}>{m.value}</CustomText>
          <CustomText style={styles.metricLabel}>{m.label}</CustomText>
        </View>
      );
    })}
  </View>
);

const styles = StyleSheet.create({
  metricsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  metricCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F0F1F3',
  },
  metricHeaderRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 8,
    gap: 0,
  },
  metricChange: {
    color: '#2563EB',
    fontWeight: '600',
    fontSize: 13,
    backgroundColor: '#F4F8FF',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    alignSelf: 'flex-end',
  },
  metricValue: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#222',
    marginBottom: 2,
    marginTop: 12,
  },
  metricLabel: {
    color: '#888',
    fontSize: 14,
    marginBottom: 2,
  },
  metricIconRow: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginRight: 0,
    marginTop: 0,
  },
});

export default MetricsRow;
