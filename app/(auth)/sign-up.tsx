import { useRouter } from 'expo-router';
import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import CustomButton from '../components/CustomButton';

import BaseForm from "../components/forms/baseForm/BaseForm";
import BaseFormField from "../components/forms/baseForm/BaseFormField";
import { signupSchema } from "../validation/signupSchema";

export default function SignUp() {
  const router = useRouter();

  const initialValues = {
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = (values?: any) => {
    console.log("Sign Up:", values);
    router.replace('/(auth)/employee');
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

        {/* Form */}
        <View style={styles.form}>
  <BaseForm
    initialValues={initialValues}
    validationSchema={signupSchema}
    onSubmit={handleSubmit}
  >
    {(formik?: any) => (
      <>
        <BaseFormField
          name="fullName"
          label="Full Name"
          placeholder="Antony Taylor"
        />

        <BaseFormField
          name="email"
          label="Email Address"
          placeholder="antony@sait.ca"
          keyboardType="email-address"
        />

        <BaseFormField
          name="password"
          label="Password"
          placeholder="Enter secure password"
          secureTextEntry
        />

        <BaseFormField
          name="confirmPassword"
          label="Confirm Password"
          placeholder="Re-enter your password"
          secureTextEntry
        />

        <CustomButton
          title="Sign Up"
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
