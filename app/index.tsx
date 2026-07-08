import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View, } from 'react-native';
import CustomButton from './components/CustomButton';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Welcome to ABC Company</Text>
        <Text style={styles.subtitle}>
          Manage your employee profiles and authenticate securely.
        </Text>
      </View>

      {/* Khối nút bấm phía dưới */}
      <View style={styles.buttonContainer}>
        <CustomButton 
          title="Sign In" 
          variant="primary" 
          onPress={() => router.push('/(auth)/SignIn')} 
        />
        
        <CustomButton 
          title="Sign Up" 
          variant="secondary" 
          onPress={() => router.push('/(auth)/SignUp')} 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 24,
    justifyContent: 'space-between', 
    paddingTop: 100,
    paddingBottom: 40,
  },
  headerContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0f172a', 
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b', 
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
});