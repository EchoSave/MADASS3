import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';

export default function EmployeeScreen() {
  // Delete these states when integrated with Formik for form handling and validation. These states are just for testing the UI.
  // SARON handles the employee information
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [position, setPosition] = useState('');

  // SARON handles this function. When clicking the submit button, show a page with a success message.
  // Later, we will integrate Formik for form handling and validation. (Delete this function when integrated with Formik)
  const handleSubmit = () => {
    alert('Submitted employee information successfully');
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/** Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Employee Information</Text>
          <Text style={styles.subtitle}>Enter details to update employee records</Text>
        </View>
        {/** Form */}
        <View style={styles.form}>
          <CustomInput
            label="Full Name"
            placeholder="Antony Taylor"
            value={fullName}
            onChangeText={setFullName}
          />

          <CustomInput
            label="Phone Number"
            placeholder="403-XXX-XXXX"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad" 
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
            label="Employee ID"
            placeholder="EMP-12345"
            value={employeeId}
            onChangeText={setEmployeeId}
            autoCapitalize="characters" 
          />

          <CustomInput
            label="Position"
            placeholder="Software Developer"
            value={position}
            onChangeText={setPosition}
          />
        </View>
        {/** Submit button */}
        <View style={styles.footer}>
          <CustomButton 
            title="Submit Information" 
            variant="primary" 
            onPress={handleSubmit} 
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
    paddingTop: 20,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748b',
  },
  form: {
    width: '100%',
  },
  footer: {
    width: '100%',
    marginTop: 8,
  },
});