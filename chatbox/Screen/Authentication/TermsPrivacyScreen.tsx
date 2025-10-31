import React, { useState, useEffect } from 'react';
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
import { SafeAreaView } from 'react-native-safe-area-context';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { RootStackParamList } from '../../Navigations/StackNavigations';
import AsyncStorage from '@react-native-async-storage/async-storage';

type TermsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'terms'>;

interface Props {
  navigation: TermsScreenNavigationProp;
}

const TermsScreen = ({ navigation }: Props) => {
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);
  const [loading, setLoading] = useState(false);

  const isDarkMode = useColorScheme() === 'dark';

  const user = auth().currentUser;

  // Load existing checkbox values from Realtime Database
  useEffect(() => {
    if (!user) return;

    const ref = database().ref(`userAgreements/${user.uid}`);
    ref.on('value', snapshot => {
      const data = snapshot.val();
      if (data) {
        setAcceptedTerms(!!data.terms);
        setAcceptedPrivacy(!!data.privacy);
      }
    });

    // Cleanup listener
    return () => ref.off();
  }, [user]);

  const handleEmailPress = () => {
    Linking.openURL('mailto:nikhilkeshvala1@gmail.com?subject=ChatBox Support');
  };

  const saveAgreement = async (type: 'terms' | 'privacy', value: boolean) => {
    if (!user) return;

    setLoading(true);
    try {
      await database().ref(`userAgreements/${user.uid}`).update({
         email: user.email, 
        [type]: value  
        });
    } catch (error) {
      console.log('Error saving agreement:', error);
      Alert.alert('Error', 'Failed to save your acceptance. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleTermsToggle = () => {
    const newValue = !acceptedTerms;
      AsyncStorage.setItem("terms", "accepted");
      setAcceptedTerms(newValue);
AsyncStorage.setItem("terms", JSON.stringify(newValue));

};

const handlePrivacyToggle = () => {
  const newValue = !acceptedPrivacy;
  setAcceptedPrivacy(newValue);
  saveAgreement('privacy', newValue);

  AsyncStorage.setItem("privacy", JSON.stringify(newValue));
  };

const handleContinue = () => {
  if (!acceptedTerms || !acceptedPrivacy) {
    Alert.alert(
      'Accept Agreements',
      'Please accept both Terms of Service and Privacy Policy to continue.'
    );
    return;
  }

  if (user) {
    database().ref(`userAgreements/${user.uid}`).update({
      email: user.email,
      terms: acceptedTerms,
      privacy: acceptedPrivacy,
    }).catch(err => console.log('Error saving agreements on continue:', err));
  }

  // Handle navigation: works both before and after signup
  if (navigation.canGoBack()) {
    // If user came from signup or another screen, just go back
    navigation.goBack();
  } else {
    navigation.navigate('HomeScreen'); // or HomeScreen if already signed in
  }
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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Terms & Privacy</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.appHeader}>
            <View style={styles.logoContainer}>
              <Icon name="message" size={40} color="#007AFF" />
            </View>
            <Text style={styles.appTitle}>ChatBox</Text>
            <Text style={styles.appSubtitle}>Secure Messaging Platform</Text>
          </View>

          <Text style={styles.introText}>
            Welcome to ChatBox! Before creating your account, please review the following terms. We handle your data securely and responsibly.
          </Text>

          <Section title="📋 Terms of Service">
            <Text style={styles.sectionIntro}>
              By using ChatBox, you agree to these Terms of Service. Developer is here to help with any issue while you are responsible for your use.
            </Text>
            <BulletPoint>Eligibility: You must be 13+ and, if under 18, use with guardian consent.</BulletPoint>
            <BulletPoint>User Responsibility: Responsible for messages and content shared; harmful/illegal content is prohibited.</BulletPoint>
            <BulletPoint>Account Security: Keep login info safe; contact support if unauthorized access occurs.</BulletPoint>
          </Section>

          <Section title="🔒 Privacy Policy">
            <Text style={styles.sectionIntro}>
              ChatBox collects only the information necessary to provide a secure messaging service:
            </Text>
            <BulletPoint>Personal Info: Name, email, phone, profile picture.</BulletPoint>
            <BulletPoint>Chat Data: Messages, files, images, videos you share.</BulletPoint>
            <BulletPoint>Technical Info: Device type, app version, crash logs.</BulletPoint>
            <BulletPoint>All data is securely stored in Firebase Realtime Database.</BulletPoint>
            <BulletPoint>
              Questions? Contact us at{' '}
              <Text style={styles.emailLink} onPress={handleEmailPress}>
                📧 nikhilkeshvala1@gmail.com
              </Text>
            </BulletPoint>
          </Section>

          <View style={styles.agreementContainer}>
            <Text style={styles.agreementTitle}>Agreement</Text>

            <TouchableOpacity style={styles.checkboxContainer} onPress={handleTermsToggle}>
              <View style={[styles.checkbox, acceptedTerms && styles.checkboxChecked]}>
                {acceptedTerms && <Icon name="check" size={16} color="#fff" />}
              </View>
              <Text style={styles.checkboxText}>
                I accept the <Text style={styles.checkboxBold}>Terms of Service</Text>
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.checkboxContainer} onPress={handlePrivacyToggle}>
              <View style={[styles.checkbox, acceptedPrivacy && styles.checkboxChecked]}>
                {acceptedPrivacy && <Icon name="check" size={16} color="#fff" />}
              </View>
              <Text style={styles.checkboxText}>
                I accept the <Text style={styles.checkboxBold}>Privacy Policy</Text>
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.finalNote}>
            <Text style={styles.finalNoteText}>
              By continuing, you confirm that you understand the terms and that your data is handled responsibly.
            </Text>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.continueButton, (!acceptedTerms || !acceptedPrivacy) && styles.continueButtonDisabled]}
            onPress={handleContinue}
            disabled={!acceptedTerms || !acceptedPrivacy || loading}
          >
            <Text style={styles.continueButtonText}>{loading ? 'Saving...' : 'Continue'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  title: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  placeholder: { width: 32 },
  scrollView: { flex: 1 },
  scrollContent: { padding: 20, paddingBottom: 120 },
  appHeader: { alignItems: 'center', marginBottom: 24 },
  logoContainer: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#f0f8ff', justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  appTitle: { fontSize: 28, fontWeight: 'bold', color: '#007AFF', marginBottom: 4 },
  appSubtitle: { fontSize: 16, color: '#666' },
  introText: { fontSize: 16, color: '#666', textAlign: 'center', lineHeight: 22, marginBottom: 32 },
  section: { marginBottom: 32 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#333', marginBottom: 12 },
  sectionIntro: { fontSize: 15, color: '#666', lineHeight: 22, marginBottom: 16 },
  bulletPoint: { flexDirection: 'row', marginBottom: 16, paddingLeft: 8 },
  bullet: { fontSize: 16, color: '#007AFF', marginRight: 12, marginTop: 2 },
  bulletText: { flex: 1, fontSize: 14, color: '#555', lineHeight: 20 },
  emailLink: { color: '#007AFF', fontWeight: '500' },
  agreementContainer: { backgroundColor: '#f8f9fa', borderRadius: 12, padding: 20, marginTop: 20, marginBottom: 16 },
  agreementTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 16 },
  checkboxContainer: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 16 },
  checkbox: { width: 22, height: 22, borderRadius: 6, borderWidth: 2, borderColor: '#ccc', marginRight: 12, justifyContent: 'center', alignItems: 'center' },
  checkboxChecked: { backgroundColor: '#007AFF', borderColor: '#007AFF' },
  checkboxText: { flex: 1, fontSize: 15, color: '#555', lineHeight: 20 },
  checkboxBold: { fontWeight: 'bold', color: '#007AFF' },
  finalNote: { backgroundColor: '#fff3cd', borderRadius: 12, padding: 16, borderLeftWidth: 4, borderLeftColor: '#ffc107' },
  finalNoteText: { fontSize: 14, color: '#856404', lineHeight: 20, textAlign: 'center' },
  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#fff', padding: 20, paddingBottom: 30, borderTopWidth: 1, borderTopColor: '#f0f0f0' },
  continueButton: { backgroundColor: '#007AFF', paddingVertical: 16, borderRadius: 12, alignItems: 'center' },
  continueButtonDisabled: { backgroundColor: '#ccc' },
  continueButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

export default TermsScreen;
