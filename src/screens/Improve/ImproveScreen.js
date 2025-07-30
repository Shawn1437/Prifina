import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Image } from 'react-native';

const { width } = Dimensions.get('window');

const ImproveScreen = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [activeTab, setActiveTab] = useState('Improve Tips');
  const [showHiddenSuggestions, setShowHiddenSuggestions] = useState(false);

  const renderFilterButton = (title, isActive) => (
    <TouchableOpacity
      style={[styles.filterButton, isActive && styles.filterButtonActive]}
      onPress={() => setActiveFilter(title)}
    >
      <Text style={[styles.filterButtonText, isActive && styles.filterButtonTextActive]}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  const renderRecommendationCard = (icon, title, description, category, actionText, priority = null) => (
    <View style={styles.recommendationCard}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardIcon}>{icon}</Text>
        <View style={styles.cardActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionIcon}>✓</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionIcon}>✕</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardDescription}>{description}</Text>
      
      <View style={styles.cardFooter}>
        <View style={styles.categoryContainer}>
          <Text style={styles.categoryText}>{category}</Text>
          <Text style={styles.dropdownIcon}>▼</Text>
        </View>
        <TouchableOpacity style={styles.actionButtonPrimary}>
          <Text style={styles.actionButtonText}>{actionText}</Text>
          <Text style={styles.actionArrow}>→</Text>
        </TouchableOpacity>
      </View>
      
      {priority && (
        <View style={[styles.priorityBadge, priority === 'Urgent' && styles.urgentBadge]}>
          <Text style={styles.priorityText}>{priority}</Text>
        </View>
      )}
    </View>
  );

  const renderHiddenSuggestion = (title, description, category, actionText) => (
    <View style={styles.hiddenSuggestionCard}>
      <Text style={styles.hiddenSuggestionTitle}>{title}</Text>
      <Text style={styles.hiddenSuggestionDescription}>{description}</Text>
      <View style={styles.hiddenSuggestionFooter}>
        <Text style={styles.hiddenCategoryText}>{category}</Text>
        <TouchableOpacity style={styles.restoreButton}>
          <Text style={styles.restoreButtonText}>Restore</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderSmartRecommendation = (imageSource, title, description, actionText, priority = null, imageStyle = null) => (
    <View style={styles.smartRecommendationCard}>
      <View style={styles.cardHeader}>
        <View style={styles.imageContainer}>
          <Image 
            source={imageSource} 
            style={[styles.recommendationImage, imageStyle]}
            resizeMode="cover"
          />
        </View>
        <View style={styles.cardActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionIcon}>🔖</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionIcon}>🗑️</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardDescription}>{description}</Text>
      
      <TouchableOpacity style={styles.actionButtonPrimary}>
        <Text style={styles.actionButtonText}>{actionText}</Text>
        <Text style={styles.actionArrow}>→</Text>
      </TouchableOpacity>
      
      {priority && (
        <View style={[styles.priorityBadge, priority === 'Urgent' && styles.urgentBadge]}>
          <Text style={styles.priorityText}>{priority}</Text>
        </View>
      )}
    </View>
  );

  const renderBeginnerContent = () => (
    <>
      {renderRecommendationCard(
        '🎓',
        'Complete your profile setup',
        'Add your expertise areas and bio to help your AI twin understand your background better',
        'Profile Setup',
        'Complete setup'
      )}
      
      {renderRecommendationCard(
        '📚',
        'Learn the basics',
        'Watch our 5-minute tutorial to understand how to get the most out of your AI twin',
        'Getting Started',
        'Watch tutorial'
      )}
      
      {renderRecommendationCard(
        '💡',
        'Try your first interaction',
        'Start a conversation with your AI twin to see how it works',
        'First Steps',
        'Start chatting'
      )}
    </>
  );

  const renderContentContent = () => (
    <>
      {renderRecommendationCard(
        '📤',
        'Add your first document',
        'Upload a document or note to quickly boost your AI twin\'s knowledge base. This is one of the fastest ways to improve response quality. Supported formats include PDF, Word documents, text files, and images with text.',
        'Content Improvement',
        'Upload now'
      )}

      {renderRecommendationCard(
        '📷',
        'Try photo upload',
        'Speed up knowledge entry by taking photos of notes, whiteboards, or documents',
        'Feature Discovery',
        'Try it'
      )}

      {renderRecommendationCard(
        '💬',
        'Pin and refine 2 sessions',
        'Improve your twin\'s responses by adding knowledge to low-scoring interactions',
        'Content Improvement',
        'View sessions'
      )}
    </>
  );

  const renderBloggingContent = () => (
    <>
      {renderRecommendationCard(
        '✒️',
        'Write your first blog post',
        'Review the AI-generated draft about startup trends and publish your expertise',
        'Blogging',
        'Review draft'
      )}
      
      {renderRecommendationCard(
        '📝',
        'Create content calendar',
        'Plan your content strategy with AI-powered topic suggestions',
        'Content Planning',
        'Create calendar'
      )}
      
      {renderRecommendationCard(
        '📊',
        'Analyze your content performance',
        'See which topics resonate most with your audience',
        'Analytics',
        'View insights'
      )}
    </>
  );

  const renderAllContent = () => (
    <>
      {/* Add your first document */}
      {renderRecommendationCard(
        '📤',
        'Add your first document',
        'Upload a document or note to quickly boost your AI twin\'s knowledge base. This is one of the fastest ways to improve response quality. Supported formats include PDF, Word documents, text files, and images with text.',
        'Content Improvement',
        'Upload now'
      )}

      {/* Try photo upload */}
      {renderRecommendationCard(
        '📷',
        'Try photo upload',
        'Speed up knowledge entry by taking photos of notes, whiteboards, or documents',
        'Feature Discovery',
        'Try it'
      )}

      {/* Pin and refine sessions */}
      {renderRecommendationCard(
        '💬',
        'Pin and refine 2 sessions',
        'Improve your twin\'s responses by adding knowledge to low-scoring interactions',
        'Content Improvement',
        'View sessions'
      )}

      {/* Write blog post */}
      {renderRecommendationCard(
        '✒️',
        'Write your first blog post',
        'Review the AI-generated draft about startup trends and publish your expertise',
        'Blogging',
        'Review draft'
      )}

      {/* Update profile */}
      {renderRecommendationCard(
        '🎯',
        'Update your public profile',
        'Add a bio and expertise areas to help people discover your AI twin',
        'Audience Engagement',
        'Edit profile'
      )}

      {/* Hidden Suggestions Section */}
      <View style={styles.hiddenSection}>
        <TouchableOpacity 
          style={styles.hiddenSectionHeader}
          onPress={() => setShowHiddenSuggestions(!showHiddenSuggestions)}
        >
          <Text style={styles.hiddenSectionTitle}>Hidden Suggestions</Text>
          <Text style={[styles.hiddenIcon, showHiddenSuggestions && styles.hiddenIconActive]}>
            {showHiddenSuggestions ? '👁️‍🗨️' : '👁️'}
          </Text>
        </TouchableOpacity>
        
        {showHiddenSuggestions && (
          <>
            {renderHiddenSuggestion(
              'Enable weekly email summaries',
              'Get insights about your AI twin\'s performance delivered to your inbox',
              'Notifications',
              'Restore'
            )}
            
            {renderHiddenSuggestion(
              'Connect your calendar',
              'Auto-generate knowledge from your meeting notes and presentations',
              'Integrations',
              'Restore'
            )}
          </>
        )}
      </View>
    </>
  );

  const renderContentBasedOnFilter = () => {
    switch (activeFilter) {
      case 'Beginner':
        return renderBeginnerContent();
      case 'Content':
        return renderContentContent();
      case 'Blogging':
        return renderBloggingContent();
      default:
        return renderAllContent();
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Filter Buttons */}
      <View style={styles.filterContainer}>
        {renderFilterButton('All', activeFilter === 'All')}
        {renderFilterButton('Beginner', activeFilter === 'Beginner')}
        {renderFilterButton('Content', activeFilter === 'Content')}
        {renderFilterButton('Blogging', activeFilter === 'Blogging')}
      </View>

      {/* Main Content */}
      {renderContentBasedOnFilter()}

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'Improve Tips' && styles.tabButtonActive]}
          onPress={() => setActiveTab('Improve Tips')}
        >
          <Text style={[styles.tabButtonText, activeTab === 'Improve Tips' && styles.tabButtonTextActive]}>
            Improve Tips
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'Smart Recommendations' && styles.tabButtonActive]}
          onPress={() => setActiveTab('Smart Recommendations')}
        >
          <Text style={[styles.tabButtonText, activeTab === 'Smart Recommendations' && styles.tabButtonTextActive]}>
            Smart Recommendations
          </Text>
        </TouchableOpacity>
      </View>

      {/* Smart Recommendations Content */}
      {activeTab === 'Smart Recommendations' && (
        <>
          {renderSmartRecommendation(
            { uri: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=200&fit=crop' },
            '2 questions had low match scores',
            'Recent questions about "team hiring" and "product roadmaps" could use better responses',
            'Improve now',
            'Urgent',
            { backgroundColor: '#FFE5E5' }
          )}
          
          {renderSmartRecommendation(
            { uri: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=200&fit=crop' },
            'AI in education is trending',
            'This aligns with your expertise. Want to write about it?',
            'Create post',
            'Trending',
            { backgroundColor: '#E5F3FF' }
          )}
          
          {renderSmartRecommendation(
            { uri: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop' },
            'Session saved 10x this week',
            'Your "Startup Fundraising" session is popular. Consider highlighting it.',
            'Highlight',
            'Popular',
            { backgroundColor: '#E5FFE5' }
          )}
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    padding: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  filterButtonActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  filterButtonText: {
    fontSize: 14,
    color: '#666',
  },
  filterButtonTextActive: {
    color: 'white',
    fontWeight: '600',
  },
  recommendationCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  cardIcon: {
    fontSize: 24,
  },
  cardActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionIcon: {
    fontSize: 12,
    color: '#666',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 16,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  categoryText: {
    fontSize: 12,
    color: '#8B5CF6',
    fontWeight: '500',
  },
  dropdownIcon: {
    fontSize: 10,
    color: '#8B5CF6',
  },
  actionButtonPrimary: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  actionButtonText: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
  },
  actionArrow: {
    fontSize: 14,
    color: '#007AFF',
  },
  priorityBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: '#FF6B6B',
  },
  urgentBadge: {
    backgroundColor: '#FF4444',
  },
  priorityText: {
    fontSize: 10,
    color: 'white',
    fontWeight: 'bold',
  },
  hiddenSection: {
    marginTop: 20,
    marginBottom: 20,
  },
  hiddenSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingVertical: 8,
  },
  hiddenSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 8,
  },
  hiddenIcon: {
    fontSize: 16,
    color: '#666',
  },
  hiddenIconActive: {
    color: '#007AFF',
  },
  hiddenSuggestionCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  hiddenSuggestionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  hiddenSuggestionDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  hiddenSuggestionFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  hiddenCategoryText: {
    fontSize: 12,
    color: '#8B5CF6',
    fontWeight: '500',
  },
  restoreButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  restoreButtonText: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
  },
  tabContainer: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 20,
    gap: 8,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
  },
  tabButtonActive: {
    backgroundColor: 'white',
  },
  tabButtonText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  tabButtonTextActive: {
    color: '#333',
    fontWeight: '600',
  },
  smartRecommendationCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: {
    width: 60,
    height: 60,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 8,
  },
  recommendationImage: {
    width: '100%',
    height: '100%',
  },
});

export default ImproveScreen; 