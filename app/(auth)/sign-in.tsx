import React from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import CustomButton from '../components/CustomButton';

import BaseForm from "../components/forms/baseForm/BaseForm";
import BaseFormField from "../components/forms/baseForm/BaseFormField";
import { loginSchema } from "../validation/loginSchema";

export default function SignIn() {

  const initialValues = {
    email: '',
    password: '',
  };

  const handleSignIn = (values?: any) => {
    alert('Successfully signed in');
  };

  return (
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
          <BaseForm
            initialValues={initialValues}
            validationSchema={loginSchema}
            onSubmit={handleSignIn}
          >
            {(formik?: any) => (
              <>
                <BaseFormField
                  name="email"
                  label="Email Address"
                  placeholder="Enter your email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />

                <BaseFormField
                  name="password"
                  label="Password"
                  placeholder="Enter your password"
                  secureTextEntry
                  autoCapitalize="none"
                />

                {/* Forgot password */}
                <View style={styles.forgotContainer}>
                  <Pressable onPress={() => alert('Forgot password pressed!')}>
                    <Text style={styles.forgotText}>Forgot your password?</Text>
                  </Pressable>
                </View>

                {/* Sign In button triggers Formik validation */}
                <CustomButton 
                  title="Sign In" 
                  variant="primary" 
                  onPress={formik.handleSubmit}
                />
              </>
            )}
          </BaseForm>
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
    alignItems: 'flex-end', 
    marginTop: 4,
    marginBottom: 24,
  },
  forgotText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0284c7', 
    textDecorationLine: 'underline', 
  },
  footer: {
    width: '100%',
    marginTop: 8,
  },
});
