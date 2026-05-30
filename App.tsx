import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {BiometricCamera} from './src/components/BiometricCamera';

type Screen = 'home' | 'auth';

interface AuthedUser {
  name: string;
  role: string;
  personnelId: string;
  confidence: number;
}

export default function App() {
  const [screen, setScreen]       = useState<Screen>('home');
  const [authedUser, setAuthedUser] = useState<AuthedUser | null>(null);

  const handleAuthenticated = (user: AuthedUser) => {
    setAuthedUser(user);
    setScreen('home');
  };

  if (screen === 'auth') {
    return (
      <View style={styles.full}>
        <StatusBar barStyle="light-content" backgroundColor="#000" />
        <BiometricCamera
          targetFps={4}
          onAuthenticated={handleAuthenticated}
          onFailed={reason => {
            console.log('Auth failed:', reason);
          }}
          style={styles.full}
        />
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => setScreen('home')}>
          <Text style={styles.backBtnText}>← Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.home}>
      <StatusBar barStyle="light-content" backgroundColor="#0A0A0A" />

      <View style={styles.header}>
        <Text style={styles.title}>Biometric Auth</Text>
        <Text style={styles.subtitle}>100% Offline · On-Device AI</Text>
      </View>

      {authedUser ? (
        <View style={styles.card}>
          <Text style={styles.welcomeIcon}>✅</Text>
          <Text style={styles.welcomeName}>Welcome, {authedUser.name}</Text>
          <Text style={styles.welcomeRole}>{authedUser.role}</Text>
          <Text style={styles.welcomeId}>ID: {authedUser.personnelId}</Text>
          <Text style={styles.confidence}>
            Confidence: {(authedUser.confidence * 100).toFixed(1)}%
          </Text>
        </View>
      ) : (
        <View style={styles.card}>
          <Text style={styles.cardIcon}>🔒</Text>
          <Text style={styles.cardText}>No active session</Text>
          <Text style={styles.cardSub}>Authenticate to continue</Text>
        </View>
      )}

      <View style={styles.features}>
        {['Face Detection', 'Liveness Check', 'On-Device TFLite', 'Offline SQLite DB'].map(f => (
          <View key={f} style={styles.featureRow}>
            <Text style={styles.featureDot}>●</Text>
            <Text style={styles.featureText}>{f}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity
        style={styles.authBtn}
        onPress={() => setScreen('auth')}>
        <Text style={styles.authBtnText}>
          {authedUser ? '🔄  Re-Authenticate' : '🔐  Authenticate'}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  full:         {flex: 1, backgroundColor: '#000'},
  home:         {flex: 1, backgroundColor: '#0A0A0A', padding: 24, justifyContent: 'space-between'},
  header:       {marginTop: 24, alignItems: 'center'},
  title:        {fontSize: 32, fontWeight: '800', color: '#00E5FF', letterSpacing: 1},
  subtitle:     {fontSize: 14, color: '#555', marginTop: 6},
  card:         {backgroundColor: '#161616', borderRadius: 20, padding: 28, alignItems: 'center', borderWidth: 1, borderColor: '#222'},
  cardIcon:     {fontSize: 48, marginBottom: 12},
  cardText:     {fontSize: 18, fontWeight: '600', color: '#CCC'},
  cardSub:      {fontSize: 14, color: '#555', marginTop: 6},
  welcomeIcon:  {fontSize: 48, marginBottom: 12},
  welcomeName:  {fontSize: 22, fontWeight: '700', color: '#00E676'},
  welcomeRole:  {fontSize: 15, color: '#888', marginTop: 4},
  welcomeId:    {fontSize: 13, color: '#555', marginTop: 4},
  confidence:   {fontSize: 13, color: '#00E5FF', marginTop: 8},
  features:     {gap: 12},
  featureRow:   {flexDirection: 'row', alignItems: 'center', gap: 10},
  featureDot:   {color: '#00E5FF', fontSize: 10},
  featureText:  {color: '#888', fontSize: 15},
  authBtn:      {backgroundColor: '#00E5FF', borderRadius: 16, paddingVertical: 18, alignItems: 'center'},
  authBtnText:  {color: '#000', fontSize: 17, fontWeight: '700'},
  backBtn:      {position: 'absolute', top: 52, left: 20, backgroundColor: 'rgba(0,0,0,0.6)', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20},
  backBtnText:  {color: '#FFF', fontSize: 15},
});
