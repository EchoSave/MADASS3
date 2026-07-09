import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';

export default function SignIn() {
  // Echo will handle the authentication, so we just need to manage the state for testing the UI.
	//  Later, we will integrate Formik for form handling and validation. (Delete state below when Formik is integrated)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

	// Echo will handle this authentication
  const handleSignIn = () => {
    alert('Successfully signed in');
  };

  return (
    // KeyboardAvoidingView boost for user experience by preventing the keyboard from covering input fields.
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Sign In</Text>
          <Text style={styles.subtitle}>Access your employee account securely</Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <CustomInput
            label="Email Address"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <CustomInput
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry 
            autoCapitalize="none"
          />

          {/* Forget password below */}
          <View style={styles.forgotContainer}>
            <Pressable onPress={() => alert('Forgot password pressed!')}>
              <Text style={styles.forgotText}>Forgot your password?</Text>
            </Pressable>
          </View>
        </View>

        {/* SignIn button */}
        <View style={styles.footer}>
          <CustomButton 
            title="Sign In" 
            variant="primary" 
            onPress={handleSignIn} 
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
    justifyContent: 'center', // Căn giữa form theo chiều dọc cho đẹp mắt
  },
  header: {
    marginBottom: 32,
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
  forgotContainer: {
    alignItems: 'flex-end', // Đẩy chữ sang góc bên phải giống các app thực tế
    marginTop: 4,
    marginBottom: 24,
  },
  forgotText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0284c7', // Đổi sang màu xanh link để phân biệt rõ ràng
    textDecorationLine: 'underline', // Gạch chân tạo cảm giác nhấn được
  },
  footer: {
    width: '100%',
    marginTop: 8,
  },
});