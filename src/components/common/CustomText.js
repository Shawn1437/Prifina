import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { colors, typography } from '../../styles';

const CustomText = ({
  children,
  variant = 'body',
  color,
  style,
  numberOfLines,
  ...props
}) => {
  const textStyles = [styles.base, styles[variant], color && { color }, style];

  return (
    <Text style={textStyles} numberOfLines={numberOfLines} {...props}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  base: {
    color: colors.textPrimary,
  },
  heading1: {
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 40,
  },
  heading2: {
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 32,
  },
  heading3: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 28,
  },
  postTitle: {
    ...typography.postTitle,
    color: colors.textPrimary,
  },
  body: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
  postContent: {
    ...typography.postContent,
    color: colors.textPrimary,
  },
  caption: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
  },
  timestamp: {
    ...typography.timestamp,
    color: colors.textSecondary,
  },
  tabLabel: {
    ...typography.tabLabel,
  },
});

export default CustomText;
