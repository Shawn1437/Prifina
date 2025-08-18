import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import CustomText from './CustomText';
import { styles } from './BottomTabSwitcher.styles';

const BottomTabSwitcher = ({ 
  tabs, 
  activeTab, 
  setActiveTab, 
  containerStyle, 
  tabButtonStyle, 
  tabTextStyle 
}) => {
  return (
    <View style={[styles.bottomButtonContainer, containerStyle]}>
      <View style={styles.segmentedContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.segmentedBtn, 
              activeTab === tab && styles.segmentedBtnActive,
              tabButtonStyle
            ]}
            onPress={() => setActiveTab(tab)}
          >
            <CustomText 
              style={[
                activeTab === tab ? styles.segmentedBtnTextActive : styles.segmentedBtnText,
                tabTextStyle
              ]}
            >
              {tab}
            </CustomText>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default BottomTabSwitcher;
