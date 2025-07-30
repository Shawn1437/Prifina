import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView,
  ScrollView,
  Switch,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const BlogCard = ({ item, type }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.title}</Text>
      
      <View style={styles.cardMetadata}>
        <Text style={styles.metadataLeft}>{item.metadata}</Text>
        <Text style={styles.metadataRight}>{item.time}</Text>
      </View>
      
      <Text style={styles.cardSnippet}>{item.snippet}</Text>
      
      <View style={styles.cardTags}>
        {item.tags.map((tag, index) => (
          <View key={index} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>
      
      <View style={styles.cardFooter}>
        <Text style={styles.category}>{item.category}</Text>
        <View style={styles.cardActions}>
          <TouchableOpacity style={styles.editButton}>
            <Icon name="edit-3" size={14} color="#666" />
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.publishButton}>
            <Icon name="send" size={14} color="#fff" />
            <Text style={styles.publishButtonText}>Publish</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton}>
            <Icon name="trash-2" size={14} color="#FF3B30" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const PublishedCard = ({ item }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.metadataRight}>{item.time}</Text>
      
      <View style={styles.cardActions}>
        <TouchableOpacity style={styles.copyButton}>
          <Icon name="link" size={14} color="#007AFF" />
          <Text style={styles.copyButtonText}>Copy Link</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.unpublishButton}>
          <Icon name="eye-off" size={14} color="#666" />
          <Text style={styles.unpublishButtonText}>Unpublish</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const SettingsSection = ({ title, children }) => (
  <View style={styles.settingsSection}>
    <Text style={styles.settingsSectionTitle}>{title}</Text>
    {children}
  </View>
);

const SettingsItem = ({ label, children }) => (
  <View style={styles.settingsItem}>
    <Text style={styles.settingsLabel}>{label}</Text>
    {children}
  </View>
);

const BlogScreen = () => {
  const [activeTab, setActiveTab] = useState('drafts');
  const [writingStyle, setWritingStyle] = useState('Conversational');
  const [targetAudience, setTargetAudience] = useState('Startup Founders');
  const [perspective, setPerspective] = useState('Lessons learned');

  const draftsData = [
    {
      title: "The Future of AI in Startup Operations",
      metadata: "Trending topic: AI in business",
      time: "2 hours ago",
      snippet: "As AI continues to evolve, startups are finding innovative ways to leverage these technologies to streamline operations and accelerate growth...",
      tags: ["AI", "Startups", "Operations"],
      category: "Thought Leadership"
    },
    {
      title: "Building Product-Market Fit: Lessons from 100+ Startups",
      metadata: "New knowledge added",
      time: "1 day ago",
      snippet: "After analyzing patterns from successful and failed startups, several key principles emerge for achieving true product-market fit...",
      tags: ["Product Management", "Startups"],
      category: "Analytical"
    }
  ];

  const publishedData = [
    {
      title: "Why Most Startups Fail at Fundraising",
      time: "1 week ago"
    },
    {
      title: "The Rise of No-Code Solutions in 2024",
      time: "2 weeks ago"
    }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'drafts':
        return (
          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {draftsData.map((item, index) => (
              <BlogCard key={index} item={item} type="draft" />
            ))}
          </ScrollView>
        );
      
      case 'published':
        return (
          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {publishedData.map((item, index) => (
              <PublishedCard key={index} item={item} />
            ))}
          </ScrollView>
        );
      
      case 'settings':
        return (
          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            <SettingsSection title="General Settings">
              <SettingsItem label="Enable Blogging">
                <Switch value={true} trackColor={{ false: '#E5E5E5', true: '#007AFF' }} />
              </SettingsItem>
              
              <SettingsItem label="Auto-Generate Drafts">
                <View style={styles.pillContainer}>
                  <TouchableOpacity style={styles.pill}>
                    <Text style={styles.pillText}>Daily</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.pill, styles.activePill]}>
                    <Text style={[styles.pillText, styles.activePillText]}>Weekly</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.pill}>
                    <Text style={styles.pillText}>Off</Text>
                  </TouchableOpacity>
                </View>
              </SettingsItem>
              
              <SettingsItem label="Send Drafts via Email">
                <Switch value={true} trackColor={{ false: '#E5E5E5', true: '#007AFF' }} />
              </SettingsItem>
            </SettingsSection>

            <SettingsSection title="Writing Instructions">
              <SettingsItem label="Writing Style">
                <TextInput
                  style={styles.inputField}
                  value={writingStyle}
                  onChangeText={setWritingStyle}
                  placeholder="Enter writing style"
                  placeholderTextColor="#999"
                />
              </SettingsItem>
              
              <SettingsItem label="Target Audience">
                <TextInput
                  style={styles.inputField}
                  value={targetAudience}
                  onChangeText={setTargetAudience}
                  placeholder="Enter target audience"
                  placeholderTextColor="#999"
                />
              </SettingsItem>
              
              <SettingsItem label="Perspective to Highlight">
                <TextInput
                  style={styles.inputField}
                  value={perspective}
                  onChangeText={setPerspective}
                  placeholder="Enter perspective"
                  placeholderTextColor="#999"
                />
              </SettingsItem>
            </SettingsSection>

            <SettingsSection title="Tracked Topics">
              <TouchableOpacity style={styles.addTopicButton}>
                <Icon name="plus" size={16} color="#007AFF" />
              </TouchableOpacity>       
              <View style={styles.topicCard}>
                <Text style={styles.topicTitle}>AI & Technology</Text>
                <Text style={styles.topicDetails}>Sources: news, research</Text>
                <Text style={styles.topicDetails}>Style: Thought Leadership</Text>
              </View>
              
              <View style={styles.topicCard}>
                <Text style={styles.topicTitle}>Startup Growth</Text>
                <Text style={styles.topicDetails}>Sources: news, social</Text>
                <Text style={styles.topicDetails}>Style: Practical</Text>
              </View>
            </SettingsSection>
          </ScrollView>
        );
      
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {renderContent()}
      </View>
      
      {/* Blog Navigation Tabs */}
      <View style={styles.blogTabs}>
        <TouchableOpacity 
          style={[styles.blogTab, activeTab === 'drafts' && styles.activeBlogTab]}
          onPress={() => setActiveTab('drafts')}
        >
          <Text style={[styles.blogTabText, activeTab === 'drafts' && styles.activeBlogTabText]}>Drafts</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.blogTab, activeTab === 'published' && styles.activeBlogTab]}
          onPress={() => setActiveTab('published')}
        >
          <Text style={[styles.blogTabText, activeTab === 'published' && styles.activeBlogTabText]}>Published</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.blogTab, activeTab === 'settings' && styles.activeBlogTab]}
          onPress={() => setActiveTab('settings')}
        >
          <Text style={[styles.blogTabText, activeTab === 'settings' && styles.activeBlogTabText]}>Settings</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 12,
  },
  // Blog Tabs Styles
  blogTabs: {
    flexDirection: 'row',
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    margin: 16,
    padding: 4,
  },
  blogTab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 6,
  },
  activeBlogTab: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  blogTabText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  activeBlogTabText: {
    color: '#333',
    fontWeight: '600',
  },
  // Card Styles
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  cardMetadata: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  metadataLeft: {
    fontSize: 12,
    color: '#8B5CF6',
    fontWeight: '500',
  },
  metadataRight: {
    fontSize: 12,
    color: '#999',
  },
  cardSnippet: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  cardTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  tag: {
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tagText: {
    fontSize: 12,
    color: '#007AFF',
    fontWeight: '500',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  category: {
    fontSize: 12,
    color: '#999',
  },
  cardActions: {
    flexDirection: 'row',
    gap: 8,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    gap: 4,
  },
  editButtonText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  publishButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    gap: 4,
  },
  publishButtonText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '500',
  },
  deleteButton: {
    padding: 6,
  },
  copyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#007AFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    gap: 4,
    marginTop: 10,
  },
  copyButtonText: {
    fontSize: 12,
    color: '#007AFF',
    fontWeight: '500',
  },
  unpublishButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    gap: 4,
    marginTop: 10,
  },
  unpublishButtonText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  // Settings Styles
  settingsSection: {
    marginBottom: 24,
  },
  settingsSectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  settingsItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  settingsLabel: {
    fontSize: 16,
    color: '#333',
  },
  pillContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  pill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#F8F9FA',
  },
  activePill: {
    backgroundColor: '#007AFF',
  },
  pillText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  activePillText: {
    color: '#fff',
  },
  inputField: {
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    minWidth: 120,
    fontSize: 14,
    color: '#333',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  addTopicButton: {
    alignSelf: 'flex-end',
    marginBottom: 12,
  },
  topicCard: {
    backgroundColor: '#F8F9FA',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  topicTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  topicDetails: {
    fontSize: 12,
    color: '#666',
  },
});

export default BlogScreen; 