import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Alert,
  StatusBar,
  useColorScheme,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { RootStackParamList } from '../Navigations/StackNavigations';
import { SafeAreaView } from 'react-native-safe-area-context';

type TermsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'terms'>;

interface Props {
  navigation: TermsScreenNavigationProp;
}
const TermsScreen = ({ navigation }: Props) => {
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);
    
    const handleEmailPress = () => {
        Linking.openURL('mailto:hnshnbn@gmail.com?subject=ChatBox Support');
    };
    
    const handleContinue = () => {
        if (!acceptedTerms || !acceptedPrivacy) {
            Alert.alert('Accept Agreements', 'Please accept both Terms of Service and Privacy Policy to continue.');
            return;
        }
        // Navigate to signup or next screen
    navigation.navigate('Signup');
  };


  const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
  
  const BulletPoint: React.FC<{ children: React.ReactNode }> = ({ children }) => (
      <View style={styles.bulletPoint}>
      <Text style={styles.bullet}>•</Text>
      <Text style={styles.bulletText}>{children}</Text>
    </View>
  );
  
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <SafeAreaView style={{ flex: 1, }}>

  
    <View style={styles.container}>
     <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={24} color="#007AFF" />
        </TouchableOpacity>
        <Text style={styles.title}>Terms & Privacy</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* App Logo/Header */}
        <View style={styles.appHeader}>
          <View style={styles.logoContainer}>
            <Icon name="message" size={40} color="#007AFF" />
          </View>
          <Text style={styles.appTitle}>ChatBox</Text>
          <Text style={styles.appSubtitle}>Secure Messaging Platform</Text>
        </View>

        {/* Introduction */}
        <Text style={styles.introText}>
          Welcome to ChatBox! Please review our terms and privacy policy before creating your account.
        </Text>

        {/* Terms of Service */}
        <Section title="📋 Terms of Service">
          <Text style={styles.sectionIntro}>
            Welcome to ChatBox, a messaging platform designed to help people connect, communicate, and share securely. By downloading, installing, or using ChatBox, you agree to the following Terms of Service.
          </Text>

          <BulletPoint>
            <Text style={styles.bulletHeading}>Eligibility</Text>
            <Text style={styles.bulletContent}>
              You must be at least 13 years old to create an account on ChatBox. If you are under 18, you must use ChatBox with parental or guardian consent.
            </Text>
          </BulletPoint>

          <BulletPoint>
            <Text style={styles.bulletHeading}>User Responsibility</Text>
            <Text style={styles.bulletContent}>
              You are solely responsible for the messages, media, or any other content shared through your account. You agree not to share harmful, abusive, illegal, or misleading content.
            </Text>
          </BulletPoint>

          <BulletPoint>
            <Text style={styles.bulletHeading}>Account Security</Text>
            <Text style={styles.bulletContent}>
              Keep your login details private. You are responsible for all activities under your account. If you suspect unauthorized access, please contact our support immediately.
            </Text>
          </BulletPoint>

          <BulletPoint>
            <Text style={styles.bulletHeading}>Prohibited Use</Text>
            <Text style={styles.bulletContent}>
              You agree not to use ChatBox for:{'\n'}
              • Spamming or advertising without consent{'\n'}
              • Uploading viruses, malware, or any harmful code{'\n'}
              • Harassing, threatening, or impersonating others{'\n'}
              • Violating laws or third-party rights
            </Text>
          </BulletPoint>

          <BulletPoint>
            <Text style={styles.bulletHeading}>Service Availability</Text>
            <Text style={styles.bulletContent}>
              ChatBox may occasionally undergo maintenance, updates, or temporary downtime. We will always aim to restore services as quickly as possible.
            </Text>
          </BulletPoint>

          <BulletPoint>
            <Text style={styles.bulletHeading}>Account Termination</Text>
            <Text style={styles.bulletContent}>
              We reserve the right to suspend or terminate accounts that violate our Terms, harm other users, or misuse the service.
            </Text>
          </BulletPoint>

          <BulletPoint>
            <Text style={styles.bulletHeading}>Changes to Terms</Text>
            <Text style={styles.bulletContent}>
              ChatBox may modify these Terms from time to time. Updates will be posted in the app, and continued use after such changes means you agree to the new Terms.
            </Text>
          </BulletPoint>
        </Section>

        {/* Privacy Policy */}
        <Section title="🔒 Privacy Policy">
          <Text style={styles.sectionIntro}>
            At ChatBox, your privacy and security are our top priorities. This policy explains how we collect, use, and protect your personal data.
          </Text>

          <BulletPoint>
            <Text style={styles.bulletHeading}>Information We Collect</Text>
            <Text style={styles.bulletContent}>
              • Personal Info: Name, email, phone number, or profile photo (used for identification and contact).{'\n'}
              • Chat Data: Messages, images, videos, or files shared with other users.{'\n'}
              • Technical Info: Device type, app version, and crash logs to improve app performance.
            </Text>
          </BulletPoint>

          <BulletPoint>
            <Text style={styles.bulletHeading}>How We Use Your Information</Text>
            <Text style={styles.bulletContent}>
              • To enable chatting and file sharing features{'\n'}
              • To personalize your experience in the app{'\n'}
              • To improve performance and security{'\n'}
              • To notify you about updates or service changes
            </Text>
          </BulletPoint>

          <BulletPoint>
            <Text style={styles.bulletHeading}>Data Storage & Security</Text>
            <Text style={styles.bulletContent}>
              All chat data and media are securely stored in Google Firebase with encryption and access control. We use standard security protocols to protect your data from unauthorized access.
            </Text>
          </BulletPoint>

          <BulletPoint>
            <Text style={styles.bulletHeading}>Sharing of Information</Text>
            <Text style={styles.bulletContent}>
              We do not sell, rent, or share your personal information with third parties. Only your chat recipients can view the messages or files you send.
            </Text>
          </BulletPoint>

          <BulletPoint>
            <Text style={styles.bulletHeading}>User Control</Text>
            <Text style={styles.bulletContent}>
              You can edit your personal information or delete your account anytime. Once deleted, all your chats and stored media will be permanently removed from our servers.
            </Text>
          </BulletPoint>

          <BulletPoint>
            <Text style={styles.bulletHeading}>Cookies & Analytics</Text>
            <Text style={styles.bulletContent}>
              We may use limited analytics to understand app usage (e.g., number of users, crashes). No personal chat content is ever analyzed.
            </Text>
          </BulletPoint>

          <BulletPoint>
            <Text style={styles.bulletHeading}>Policy Updates</Text>
            <Text style={styles.bulletContent}>
              This Privacy Policy may be updated periodically. We'll notify users within the app about significant changes.
            </Text>
          </BulletPoint>

          <BulletPoint>
            <Text style={styles.bulletHeading}>Contact Us</Text>
            <Text style={styles.bulletContent}>
              For any questions, feedback, or privacy concerns, you can contact us at:{'\n'}
              <Text style={styles.emailLink} onPress={handleEmailPress}>
                📧 nikhilkeshvala1@gmail.com
              </Text>
            </Text>
          </BulletPoint>
        </Section>

        {/* Agreement Section */}
        <View style={styles.agreementContainer}>
          <Text style={styles.agreementTitle}>Agreement</Text>
          
          {/* Terms Checkbox */}
          <TouchableOpacity 
            style={styles.checkboxContainer}
            onPress={() => setAcceptedTerms(!acceptedTerms)}
          >
            <View style={[styles.checkbox, acceptedTerms && styles.checkboxChecked]}>
              {acceptedTerms && <Icon name="check" size={16} color="#fff" />}
            </View>
            <Text style={styles.checkboxText}>
              I accept the <Text style={styles.checkboxBold}>Terms of Service</Text>
            </Text>
          </TouchableOpacity>

          {/* Privacy Checkbox */}
          <TouchableOpacity 
            style={styles.checkboxContainer}
            onPress={() => setAcceptedPrivacy(!acceptedPrivacy)}
          >
            <View style={[styles.checkbox, acceptedPrivacy && styles.checkboxChecked]}>
              {acceptedPrivacy && <Icon name="check" size={16} color="#fff" />}
            </View>
            <Text style={styles.checkboxText}>
              I accept the <Text style={styles.checkboxBold}>Privacy Policy</Text>
            </Text>
          </TouchableOpacity>
        </View>

        {/* Final Note */}
        <View style={styles.finalNote}>
          <Text style={styles.finalNoteText}>
            By signing up or continuing to use ChatBox, you agree to our Terms of Service and Privacy Policy.
          </Text>
        </View>
      </ScrollView>

      {/* Continue Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.continueButton,
            (!acceptedTerms || !acceptedPrivacy) && styles.continueButtonDisabled
          ]}
          onPress={handleContinue}
          disabled={!acceptedTerms || !acceptedPrivacy}
        >
          <Text style={styles.continueButtonText}>
            Continue to Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </View>
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    padding: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  placeholder: {
    width: 32,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  appHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f0f8ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  appTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 4,
  },
  appSubtitle: {
    fontSize: 16,
    color: '#666',
  },
  introText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 32,
    paddingHorizontal: 10,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  sectionIntro: {
    fontSize: 15,
    color: '#666',
    lineHeight: 22,
    marginBottom: 16,
  },
  bulletPoint: {
    flexDirection: 'row',
    marginBottom: 16,
    paddingLeft: 8,
  },
  bullet: {
    fontSize: 16,
    color: '#007AFF',
    marginRight: 12,
    marginTop: 2,
  },
  bulletText: {
    flex: 1,
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  bulletHeading: {
    fontWeight: 'bold',
    color: '#333',
    fontSize: 15,
    marginBottom: 4,
  },
  bulletContent: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  emailLink: {
    color: '#007AFF',
    fontWeight: '500',
  },
  agreementContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 20,
    marginTop: 20,
    marginBottom: 16,
  },
  agreementTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#ccc',
    marginRight: 12,
    marginTop: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  checkboxText: {
    flex: 1,
    fontSize: 15,
    color: '#555',
    lineHeight: 20,
  },
  checkboxBold: {
    fontWeight: 'bold',
    color: '#007AFF',
  },
  finalNote: {
    backgroundColor: '#fff3cd',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#ffc107',
  },
  finalNoteText: {
    fontSize: 14,
    color: '#856404',
    lineHeight: 20,
    textAlign: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 20,
    paddingBottom: 30,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  continueButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  continueButtonDisabled: {
    backgroundColor: '#ccc',
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TermsScreen;