import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { colors, spacing } from '../styles';
import { CustomText, CustomButton } from '../components/common';

const AddNewScreen = () => {
  const handleCreatePost = () => {
    console.log('Create new post');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <CustomText variant="heading2" style={styles.title}>
          Add New
        </CustomText>
        <CustomText variant="body" style={styles.description}>
          Create new posts and content here.
        </CustomText>
        <CustomButton
          title="Create Post"
          onPress={handleCreatePost}
          style={styles.button}
        />
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
    marginBottom: spacing.lg,
  },
  button: {
    minWidth: 150,
  },
});

export default AddNewScreen;
