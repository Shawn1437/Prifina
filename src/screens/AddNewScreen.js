import React, { useState } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { colors, spacing } from '../styles';
import { CustomButton, BottomTabSwitcher } from '../components/common';
import PinnedQuestions from '../components/AddNew/PinnedQuestions';
import InputForm from '../components/AddNew/InputForm';
import InputTypeBar from '../components/AddNew/InputTypeBar';

const mockQuestions = [
  {
    id: '1',
    title: "How can I improve my startup's product-market fit?",
    description: 'Product-market fit requires continuous iteration based on customer feedback. Start by identifying your core value proposition and validate it with real users. Focus on retention metrics rather than just acquisition - if users aren\'t coming back, you haven\'t achieved PMF yet. The key is to build something people want so badly they tell their friends about it. This means deeply understanding your target customer\'s pain points and creating a solution that\'s 10x better than existing alternatives.',
    pinned: true,
    timeAgo: '2 hours ago',
    knowledgeAdded: false,
  },
  {
    id: '2',
    title: 'What are the key metrics for SaaS businesses?',
    description: 'The most critical SaaS metrics include Monthly Recurring Revenue (MRR), Customer Acquisition Cost (CAC), Customer Lifetime Value (CLV), and churn rate. Track your MRR growth rate month-over-month, ensuring it\'s accelerating. Your CLV should be at least 3x your CAC for a healthy business model. Monitor both gross and net revenue retention - aim for net retention above 100%. Also track activation metrics, time to value, and expansion revenue from existing customers. Weekly cohort analysis helps identify trends early.',
    pinned: true,
    timeAgo: '1 day ago',
    knowledgeAdded: true,
  },
  {
    id: '3',
    title: 'How do I pitch to investors effectively?',
    description: 'A compelling investor pitch tells a story: problem, solution, market opportunity, traction, business model, competition, team, and financials. Start with a hook that captures attention immediately. Clearly articulate the pain point you\'re solving and why it matters now. Show impressive traction metrics and growth trajectory. Explain your go-to-market strategy and unit economics. Address competition honestly but position your unique advantages. Highlight your team\'s domain expertise and execution track record. End with a clear ask and use of funds.',
    pinned: true,
    timeAgo: '2 days ago',
    knowledgeAdded: false,
  },
];

const TAGS = [
  'Startups', 'SaaS', 'Product Management', 'Fundraising', 'Growth', 'Strategy'
];

const AddNewScreen = () => {
  const [activeTab, setActiveTab] = useState('Pinned');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [inputType, setInputType] = useState('Text');
  const [pinnedQuestions, setPinnedQuestions] = useState(mockQuestions);

  const handleAddKnowledge = (id) => {
    setActiveTab('New Entry');
  };

  const handleUnpin = (id) => {
    setPinnedQuestions(prev => prev.filter(item => item.id !== id));
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <View style={styles.content}>
        {activeTab === 'Pinned' && (
          <PinnedQuestions
            pinnedQuestions={pinnedQuestions}
            onAddKnowledge={handleAddKnowledge}
            onUnpin={handleUnpin}
            styles={styles}
          />
        )}
        {activeTab === 'New Entry' && (
          <>
            <InputForm
              title={title}
              setTitle={setTitle}
              content={content}
              setContent={setContent}
              inputType={inputType}
              setInputType={setInputType}
              selectedTags={selectedTags}
              setSelectedTags={setSelectedTags}
              TAGS={TAGS}
              styles={styles}
            />
            <View style={styles.bottomEntryBar}>
              <InputTypeBar inputType={inputType} setInputType={setInputType} styles={styles} />
              <CustomButton
                title="Save to AI Twin"
                onPress={() => {}}
                style={styles.saveButton}
                textStyle={styles.saveButtonText}
                disabled
              />
            </View>
          </>
        )}
        <BottomTabSwitcher
          tabs={['Pinned', 'New Entry']}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingTop: verticalScale(16),
  },
  bottomEntryBar: {
    backgroundColor: '#fff',
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(8),
    paddingBottom: verticalScale(18),
    borderTopWidth: 1,
    borderTopColor: '#eee',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: verticalScale(60),
    zIndex: 15,
  },
  saveButton: {
    marginTop: verticalScale(10),
    marginBottom: verticalScale(24),
    backgroundColor: '#E5E7EB',
    borderRadius: scale(8),
    paddingVertical: verticalScale(14),
  },
  saveButtonText: {
    color: '#A1A1AA',
    fontWeight: 'bold',
    fontSize: moderateScale(16),
    textAlign: 'center',
  },
});

export default AddNewScreen;
