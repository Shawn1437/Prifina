import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, spacing } from '../../styles';
import CustomText from './CustomText';

const FeedTabBar = ({ activeTab, setActiveTab }) => (
  <View style={styles.header}>
    <View style={styles.tabContainer}>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'Live Feed' && styles.activeTab]}
        onPress={() => setActiveTab('Live Feed')}
      >
        <CustomText
          variant="body"
          color={activeTab === 'Live Feed' ? colors.primary : colors.gray}
          style={styles.tabText}
        >
          Live Feed
        </CustomText>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'Sessions' && styles.activeTab]}
        onPress={() => setActiveTab('Sessions')}
      >
        <CustomText
          variant="body"
          color={activeTab === 'Sessions' ? colors.primary : colors.gray}
          style={styles.tabText}
        >
          Sessions
        </CustomText>
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.white,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: colors.lightGray,
    borderRadius: 8,
    padding: spacing.xs,
  },
  tab: {
    flex: 1,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    borderRadius: 6,
  },
  activeTab: {
    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tabText: {
    fontWeight: '600',
  },
});

export default FeedTabBar;
