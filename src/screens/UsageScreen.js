import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { colors, spacing } from '../styles';
import { CustomText } from '../components/common';

const UsageScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <CustomText variant="heading2" style={styles.title}>
          Usage
        </CustomText>
        <CustomText variant="body" style={styles.description}>
          Usage analytics and metrics will be displayed here.
        </CustomText>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  title: {
    marginBottom: spacing.md,
  },
  description: {
    textAlign: 'center',
    color: colors.textSecondary,
  },
});

export default UsageScreen;
