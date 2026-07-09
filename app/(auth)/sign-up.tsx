import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';

export default function SignUp() {
  const router = useRouter();

  // Echo handles these states, it's just for testing the UI. Later, we will replace it with Formik for form handling and validation. !!!!
  // (Delete these states below when integrated Formik)
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Echo handles this function ! 
  // When clicking signup btn --> Employee page (employee information with at least 5 fields: Fullname, phone, email, employee id, position )
  const handleSignUp = () => {
    router.replace('/(tabs)/employee');
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Sign up to start managing employee information</Text>
        </View>

        {/* Form with 4 inputs: Fullname, email, password, confirm password */}
        <View style={styles.form}>
          <CustomInput
            label="Full Name"
            placeholder="Antony Taylor"
            value={fullName}
            onChangeText={setFullName}
            autoCapitalize="words" 
          />

          <CustomInput
            label="Email Address"
            placeholder="antony@sait.ca"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <CustomInput
            label="Password"
            placeholder="Enter secure password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
          />

          <CustomInput
            label="Confirm Password"
            placeholder="Re-enter your password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            autoCapitalize="none"
          />
        </View>

        {/* SignUp button */}
        <View style={styles.footer}>
          <CustomButton 
            title="Sign Up" 
            variant="primary" 
            onPress={handleSignUp} 
          />
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    paddingTop: 40, 
    paddingBottom: 40,
  },
  header: {
    marginBottom: 28,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#64748b',
  },
  form: {
    width: '100%',
  },
  footer: {
    width: '100%',
    marginTop: 16,
  },
});