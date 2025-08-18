import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Eye } from 'lucide-react-native';
import { CustomText } from '../common';
import { colors } from '../../styles';

const HiddenSuggestionsSection = ({ visible, onToggle, items = [] }) => {
  const defaultItems = [
    {
      title: 'Enable weekly email summaries',
      desc: 'Get insights about your AI twin\'s performance delivered to your inbox',
      tag: 'Notifications',
    },
    {
      title: 'Connect your calendar',
      desc: 'Auto-generate knowledge from your meeting notes and presentations',
      tag: 'Integrations',
    },
  ];

  const suggestionsToShow = items.length > 0 ? items : defaultItems;

  return (
    <>
      <TouchableOpacity style={styles.container} onPress={onToggle}>
        <CustomText style={styles.title}>Hidden Suggestions</CustomText>
        <View style={styles.eyeWrap}>
          <Eye size={22} color={colors.textSecondary} style={styles.eyeIcon} />
          {visible && <View style={styles.eyeSlash} />}
        </View>
      </TouchableOpacity>
      {visible && (
        <View style={[styles.cardsWrap]}>
          {suggestionsToShow.map((item, index) => (
            <View key={index} style={styles.card}>
              <CustomText style={styles.cardTitle}>{item.title}</CustomText>
              <CustomText style={styles.cardDesc}>{item.desc}</CustomText>
              <View style={styles.cardFooter}>
                <CustomText style={styles.cardTag}>{item.tag}</CustomText>
                <TouchableOpacity>
                  <CustomText style={styles.restoreText}>Restore</CustomText>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.background,
    borderRadius: 14,
    paddingVertical: 18,
    paddingHorizontal: 18,
    marginHorizontal: 8,
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#F0F1F3',
  },
  title: {
    color: colors.gray,
    fontWeight: '600',
    fontSize: 16,
  },
  eyeWrap: {
    position: 'relative',
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  eyeIcon: {
    fontSize: 22,
    color: colors.textSecondary,
    opacity: 1,
  },
  eyeSlash: {
    position: 'absolute',
    left: -2,
    top: 13,
    width: 32,
    height: 2.5,
    backgroundColor: colors.textSecondary,
    opacity: 0.7,
    transform: [{ rotate: '-28deg' }],
    borderRadius: 1.5,
  },
  cardsWrap: {
    marginTop: 0,
    marginBottom: 10,
    marginHorizontal: 8,
  },
  card: {
    backgroundColor: '#F8F9FB',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#F0F1F3',
    padding: 18,
    marginBottom: 14,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 15,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  cardDesc: {
    color: colors.textSecondary,
    fontSize: 14,
    marginBottom: 14,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardTag: {
    color: '#7B61FF',
    fontSize: 13,
    fontWeight: '500',
  },
  restoreText: {
    color: '#7B61FF',
    fontWeight: '500',
    fontSize: 14,
    backgroundColor: 'transparent',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
});

export default HiddenSuggestionsSection;
